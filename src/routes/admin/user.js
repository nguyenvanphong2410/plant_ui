import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {
    verifyToken,
    validate,
    upload,
    ensureRole,
} from "@/app/middleware/common";

import * as userRequest from "@/app/requests/user.request";
import * as userMiddleware from "@/app/middleware/user.middleware";
import * as userController from "@/app/controllers/user.controller";
import { USER_ROLE } from "@/app/models";
import { ACCOUNT_TYPE } from "@/configs";
import * as ensurePermissionsMiddleware from "@/app/middleware/admin/ensure-permissions.middleware";

const router = Router();

router.use(asyncHandler(verifyToken));

router.use(asyncHandler(ensureRole(ACCOUNT_TYPE.ADMIN)));

router.get(
    "/",
    asyncHandler(ensurePermissionsMiddleware.ensurePermissions("list-customer")),
    asyncHandler(validate(userRequest.getListUserRequest)),
    asyncHandler(userController.getListUser)
);

router.get(
    "/:id",
    asyncHandler(ensurePermissionsMiddleware.ensurePermissions("detail-customer")),
    asyncHandler(userMiddleware.checkUserAndRole(USER_ROLE.USER)),
    asyncHandler(userController.getDetailUser)
);

router.put(
    "/:id",
    asyncHandler(ensurePermissionsMiddleware.ensurePermissions("edit-customer")),
    asyncHandler(upload),
    asyncHandler(userMiddleware.checkUserAndRole(USER_ROLE.USER)),
    asyncHandler(validate(userRequest.updateUserRequest)),
    asyncHandler(userController.updateUser),
);

router.delete(
    "/:id",
    asyncHandler(ensurePermissionsMiddleware.ensurePermissions("delete-customer")),
    asyncHandler(userMiddleware.checkUserAndRole(USER_ROLE.USER)),
    asyncHandler(userMiddleware.checkDeleteUserId),
    asyncHandler(userController.deleteUser)
);

router.patch(
    "/reset-password/:id",
    asyncHandler(ensurePermissionsMiddleware.ensurePermissions("edit-password-customer")),
    asyncHandler(userMiddleware.checkUserAndRole(USER_ROLE.USER)),
    asyncHandler(validate(userRequest.changePasswordUserRequest)),
    asyncHandler(userController.changePasswordUser),
);

router.put("/update-status/:id",
    asyncHandler(ensurePermissionsMiddleware.ensurePermissions("edit-password-customer")),
    asyncHandler(userMiddleware.checkUserAndRole(USER_ROLE.USER)),
    asyncHandler(validate(userRequest.changeStatusUserRequest)),
    asyncHandler(userController.changeStatusUser),
);

export default router;
