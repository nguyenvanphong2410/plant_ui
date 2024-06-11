import jwt, {JsonWebTokenError, NotBeforeError, TokenExpiredError} from "jsonwebtoken";
import {isUndefined} from "lodash";
import {tokenBlocklist} from "@/app/services/auth.service";
import {ACCOUNT_TYPE, SECRET_KEY, TOKEN_TYPE} from "@/configs";
import {responseError, getToken} from "@/utils/helpers";
import { USER_STATUS, User } from "@/app/models";
import { Admin } from "@/app/models/admin";
import { Role } from "@/app/models/role";
import { Permission } from "@/app/models/permisstion";

export async function verifyToken(req, res, next) {
    // console.log("flat 1");
    try {
        const token = getToken(req.headers);
        // console.log("flat 2", token);

        if (token) {
            // console.log("flat 3");
            const allowedToken = isUndefined(await tokenBlocklist.get(token));
            // console.log("flat 3", allowedToken);

            if (allowedToken) {

                const {type, data} = jwt.verify(token, SECRET_KEY);
                // console.log("flat 4.1 Type", type);
                // console.log("flat 4.2 Data", data);


                if (type === TOKEN_TYPE.AUTHORIZATION) {
                    // console.log("flat 5 - data.account_type:", data.account_type);

                    let account;
                    let permissions;
                    switch(data.account_type){
                        case ACCOUNT_TYPE.USER:
                            account = await User.findOne({_id: data.account_id, deleted: false, status: USER_STATUS.UNLOCK});
                            break;
                        case ACCOUNT_TYPE.ADMIN:
                            account = await Admin.findOne({_id: data.account_id, deleted: false, status: USER_STATUS.UNLOCK});
                            if (account) {
                                const roles = await Role.find({ _id: { $in: account.role_ids }, deleted: false });
                                permissions = await Permission.find({ _id: { $in: roles.map(role => role.permission_ids).flat() } });
                                req.permissions =  permissions.map(item => item.code);
                            }
                            break;
                    }
                    if (account) {
                        account.account_type = data.account_type;
                        req.currentAccount = account;
                        return next();
                    }
                }

                if (type === TOKEN_TYPE.FORGOT_PASSWORD) {
                    const account = await Admin.findOne({_id: data.account_id, deleted: false, status: USER_STATUS.UNLOCK});

                    if (account) {
                        account.account_type = data.account_type;
                        req.currentAccount = account;
                        return next();
                    }
                }
            }
        }

        return responseError(res, 401, "Từ chối truy cập");
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            if (error instanceof TokenExpiredError) {
                return responseError(res, 401, "Mã xác thực đã hết hạn");
            } else if (error instanceof NotBeforeError) {
                return responseError(res, 401, "Mã xác thực không hoạt động");
            } else {
                return responseError(res, 401, "Mã xác thực không hợp lệ");
            }
        }

        return next(error);
    }
}
