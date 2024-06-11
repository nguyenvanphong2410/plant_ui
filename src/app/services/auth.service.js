import moment from "moment";
import jwt from "jsonwebtoken";
import {User, USER_STATUS} from "../models";
import {ACCOUNT_TYPE, cache, JWT_EXPIRES_IN, LINK_RESET_PASSWORD, LINK_STATIC_URL, TOKEN_TYPE} from "@/configs";
import {FileUpload} from "@/utils/types";
import {
    comparePassword,
    generatePassword,
    generateRandomCode,
    generateToken,
    sendMail,
} from "@/utils/helpers";
import { Admin } from "../models/admin";

export const tokenBlocklist = cache.create("token-block-list");
export const registerCodes = cache.create("register-codes");
export const forgotPasswordList = cache.create("forgot-password-list");

export async function checkValidUserLogin({password}, user) {
    if (user) {
        const verified = comparePassword(password, user.password);
        if (verified) {
            user.account_type = ACCOUNT_TYPE.USER;
            return user;
        }
    }

    return false;
}

export async function checkValidAdminLogin({email, password}) {
    const admin = await Admin.findOne({
        email: email,
        deleted: false,
        status: USER_STATUS.UNLOCK,
    });

    if (admin) {
        const verified = comparePassword(password, admin.password);
        if (verified) {
            admin.account_type = ACCOUNT_TYPE.ADMIN;
            return admin;
        }
    }

    return false;
}

export function authToken(account_id, account_type) {
    const accessToken = generateToken(TOKEN_TYPE.AUTHORIZATION, {account_id, account_type}, JWT_EXPIRES_IN);
    const decode = jwt.decode(accessToken);
    const expireIn = decode.exp - decode.iat;
    return {
        access_token: accessToken,
        expire_in: expireIn,
        auth_type: "Bearer Token",
    };
}

export async function register({name, email, password, phone, avatar, gender, address}) {
    const user = new User({
        name,
        email,
        password: generatePassword(password),
        phone,
        avatar,
        gender,
        address
    });
    return await user.save();
}

export async function sendMailRegister({name, email}) {
    const code = generateRandomCode(6);
    await registerCodes.set(email, code, 300);
    await sendMail(email, "Xác nhận đăng ký tài khoản", "emails/register-code.html", {
        name,
        code,
        logo: LINK_STATIC_URL + "Logo-640x176px.png",
        iconEmailLogo: LINK_STATIC_URL + "icon-email-logo.png",
    });
}

export async function blockToken(token) {
    const decoded = jwt.decode(token);
    const expiresIn = decoded.exp;
    const now = moment().unix();

    await tokenBlocklist.set(token, 1, expiresIn - now);
}

export async function profile(account) {
    let result;
    switch (account.account_type) {
        case ACCOUNT_TYPE.USER:
            result = await User.findOne({_id: account._id}, {password: 0, deleted: false});
            break;
        case ACCOUNT_TYPE.ADMIN:
            result = await Admin.aggregate([
                {
                    $match: {_id: account._id, deleted: false},
                },
                {
                    $lookup: {
                        from: "roles",
                        localField: "role_ids",
                        foreignField: "_id",
                        as: "roles"
                    }
                },
                {
                    $lookup: {
                        from: "permissions",
                        localField: "roles.permission_ids",
                        foreignField: "_id",
                        as: "permissions"
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        email: 1,
                        deleted: 1,
                        phone: 1,
                        avatar: { $concat: [LINK_STATIC_URL, "$avatar"] },
                        status: 1,
                        confirmed_at: 1,
                        permissions: "$permissions.code",
                    }
                }
            ]);
            result = result["0"] || null;
            break;
    }

    if (account.account_type === ACCOUNT_TYPE.USER) {
        result = {...result.toObject()};
    }

    return result;
}

export async function updateProfile(currentAccount, {name, phone, avatar}) {

    currentAccount.name = name;
    if (phone) {
        currentAccount.phone = phone;

    }
    if (avatar) {
        if (currentAccount.avatar) {
            FileUpload.remove(currentAccount.avatar);
        }
        currentAccount.avatar = avatar === "delete" ? "" : avatar.save();
    }

    return await currentAccount.save();
}

export async function sendMailForgotPassword(user) {
    const token = generateToken(TOKEN_TYPE.FORGOT_PASSWORD, {user_id: user._id}, 600);
    await forgotPasswordList.set(`${user._id}`, token, 600);
    sendMail(user.email, "Quên mật khẩu", "emails/forgot-password.html", {
        name: user.name,
        logo: LINK_STATIC_URL + "Logo-640x176px.png",
        iconForgotPassword: LINK_STATIC_URL + "icon-forgot-password.png",
        linkResetPassword: `${LINK_RESET_PASSWORD}?token=${token}`,
    });
}
