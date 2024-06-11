import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {verifyToken, validate, ensureRole} from "@/app/middleware/common";

import * as categoryRequest from "@/app/requests/category.request";
import * as categoryController from "@/app/controllers/category.controller";
import { ACCOUNT_TYPE } from "@/configs";
import * as ensurePermissionsMiddleware from "@/app/middleware/admin/ensure-permissions.middleware";

const router = Router();

router.use(asyncHandler(verifyToken));

router.use(asyncHandler(ensureRole(ACCOUNT_TYPE.ADMIN)));

router.get(
    "/",
    asyncHandler(ensurePermissionsMiddleware.ensurePermissions("list-category")),
    asyncHandler(validate(categoryRequest.getListCategoryRequest)),
    asyncHandler(categoryController.getListCategory)
);

router.get(
    "/all",
    asyncHandler(ensurePermissionsMiddleware.ensurePermissions("list-category")),
    asyncHandler(categoryController.getAllCategory)
);

router.get(
    "/:id",
    asyncHandler(ensurePermissionsMiddleware.ensurePermissions("list-category")),
    asyncHandler(categoryController.getDetailCategory)
);

router.post(
    "/",
    asyncHandler(ensurePermissionsMiddleware.ensurePermissions("add-category")),
    asyncHandler(validate(categoryRequest.createCategoryRequest)),
    asyncHandler(categoryController.createCategory)
);

router.put(
    "/:id",
    asyncHandler(ensurePermissionsMiddleware.ensurePermissions("edit-category")),
    asyncHandler(validate(categoryRequest.updateCategoryRequest)),
    asyncHandler(categoryController.updateCategory),
);

router.delete(
    "/:id",
    asyncHandler(ensurePermissionsMiddleware.ensurePermissions("delete-category")),
    asyncHandler(categoryController.deleteCategory)
);

router.put("/update-status/:id",
    asyncHandler(ensurePermissionsMiddleware.ensurePermissions("edit-category")),
    asyncHandler(validate(categoryRequest.changeStatusCategoryRequest)),
    asyncHandler(categoryController.changeStatusCategory),
);

export default router;
