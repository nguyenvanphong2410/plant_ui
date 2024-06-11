import {USER_ROLE, User} from "../models";
import {LINK_STATIC_URL} from "@/configs";
import {generatePassword} from "@/utils/helpers";

export async function getListUser({q, page, per_page, field, sort_order}) {
    q = q ? {$regex: q, $options: "i"} : null;

    const filter = {
        ...(q && {$or: [{name: q}, {email: q}, {phone: q}]}),
        deleted: false,
        role: USER_ROLE.USER
    };

    const users = (
        await User.find(filter, {password: 0})
            .skip((page - 1) * per_page)
            .limit(per_page)
            .sort({[field]: sort_order})
    ).map((user) => {
        if (user.avatar) {
            user.avatar = LINK_STATIC_URL + user.avatar;
        }
        return user;
    });

    const total = await User.countDocuments(filter);
    return {total, page, per_page, users};
}

export async function getDetailUser(userId) {
    const user = await User.findById(
        userId,
        {password: 0}
    );
    user.avatar = LINK_STATIC_URL + user.avatar;
    return user;
}

export async function updateUser(user, {name, email, phone, avatar, status, gender, address}) {
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.status = status;
    user.gender = gender;
    user.address = address;
    if (avatar !== null && typeof avatar === "string") {
        user.avatar = avatar;
    }
    await user.save();
    return user;
}

export async function changePasswordUser(user, new_password) {
    user.password = generatePassword(new_password);
    await user.save();
    return user;
}

export async function deleteUser(user) {
    user.deleted = true;
    await user.save();
}

export async function changeStatusUser(user, status) {
    user.status = status;
    await user.save();
}
