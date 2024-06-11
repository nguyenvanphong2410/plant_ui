import { USER_ROLE } from "@/app/models";
import { responseError } from "@/utils/helpers";

export function isAdmin(req, res, next) {
    if ([USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN].includes(req.currentAccount.role)) {
        next();
    } else {
        return responseError(res, 403, "Không có quyền truy cập.");
    }

}
