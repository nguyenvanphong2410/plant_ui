import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {verifyToken, validate, isAdmin} from "@/app/middleware/common";

import * as categoryRequest from "@/app/requests/category.request";
import * as categoryController from "@/app/controllers/category.controller";

const router = Router();

router.use(asyncHandler(verifyToken));

router.use(isAdmin);

router.get(
    "/",
    asyncHandler(validate(categoryRequest.getListCategoryRequest)),
    asyncHandler(categoryController.getListCategory)
);

router.get(
    "/all",
    asyncHandler(categoryController.getAllCategory)
);

router.get(
    "/:id",
    asyncHandler(categoryController.getDetailCategory)
);

router.post(
    "/",
    asyncHandler(validate(categoryRequest.createCategoryRequest)),
    asyncHandler(categoryController.createCategory)
);

router.put(
    "/:id",
    asyncHandler(validate(categoryRequest.updateCategoryRequest)),
    asyncHandler(categoryController.updateCategory),
);

router.delete(
    "/:id",
    asyncHandler(categoryController.deleteCategory)
);

router.put("/update-status/:id",
    // asyncHandler(userMiddleware.checkUserAndRole(USER_ROLE.ADMIN)),
    asyncHandler(validate(categoryRequest.changeStatusCategoryRequest)),
    asyncHandler(categoryController.changeStatusCategory),
);

export default router;
