import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {verifyToken, validate, upload, isAdmin} from "@/app/middleware/common";

import * as userRequest from "@/app/requests/user.request";
import * as userMiddleware from "@/app/middleware/user.middleware";
import * as userController from "@/app/controllers/user.controller";
import { USER_ROLE } from "@/app/models";

const router = Router();

router.use(asyncHandler(verifyToken));

router.use(isAdmin);

router.get(
    "/",
    asyncHandler(validate(userRequest.getListUserRequest)),
    asyncHandler(userController.getListUser)
);

router.get(
    "/:id",
    asyncHandler(userMiddleware.checkUserAndRole(USER_ROLE.USER)),
    asyncHandler(userController.getDetailUser)
);

router.put(
    "/:id",
    asyncHandler(upload),
    asyncHandler(userMiddleware.checkUserAndRole(USER_ROLE.USER)),
    asyncHandler(validate(userRequest.updateUserRequest)),
    asyncHandler(userController.updateUser),
);

router.delete(
    "/:id",
    asyncHandler(userMiddleware.checkUserAndRole(USER_ROLE.USER)),
    asyncHandler(userMiddleware.checkDeleteUserId),
    asyncHandler(userController.deleteUser)
);

router.patch(
    "/reset-password/:id",
    asyncHandler(userMiddleware.checkUserAndRole(USER_ROLE.USER)),
    asyncHandler(validate(userRequest.changePasswordUserRequest)),
    asyncHandler(userController.changePasswordUser),
);

router.put("/update-status/:id",
    asyncHandler(userMiddleware.checkUserAndRole(USER_ROLE.USER)),
    asyncHandler(validate(userRequest.changeStatusUserRequest)),
    asyncHandler(userController.changeStatusUser),
);

export default router;
