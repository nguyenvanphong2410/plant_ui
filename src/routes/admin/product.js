import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {verifyToken, validate, upload, isAdmin, ensureRole} from "@/app/middleware/common";

import * as productRequest from "@/app/requests/product.request";
import * as productController from "@/app/controllers/product.controller";
import * as productMiddleware from "@/app/middleware/product.middleware";
import { USER_ROLE } from "@/app/models";

const router = Router();

router.use(asyncHandler(verifyToken));

router.get(
    "/",
    asyncHandler(validate(productRequest.getListProductRequest)),
    asyncHandler(productController.getListProduct)
);

router.post(
    "/:id/booking",
    ensureRole(USER_ROLE.USER),
    asyncHandler(productMiddleware.checkProduct),
    asyncHandler(productMiddleware.checkCategory),
    asyncHandler(validate(productRequest.bookingRoom)),
);

router.get(
    "/:id",
    isAdmin,
    asyncHandler(productMiddleware.checkProduct),
    asyncHandler(productController.getDetailProduct)
);

router.post(
    "/",
    isAdmin,
    asyncHandler(upload),
    asyncHandler(validate(productRequest.createRoomRequest)),
    asyncHandler(productMiddleware.checkCategory),
    asyncHandler(productController.createProduct)
);

router.put(
    "/:id",
    isAdmin,
    asyncHandler(upload),
    asyncHandler(productMiddleware.checkProduct),
    asyncHandler(validate(productRequest.updateProductRequest)),
    asyncHandler(productMiddleware.checkCategory),
    asyncHandler(productController.updateProduct),
);

router.delete(
    "/:id",
    isAdmin,
    asyncHandler(productMiddleware.checkProduct),
    asyncHandler(productController.deleteProduct)
);

router.put("/update-status/:id",
    asyncHandler(productMiddleware.checkProduct),
    isAdmin,
    asyncHandler(validate(productRequest.changeStatusProductRequest)),
    asyncHandler(productController.changeStatusProduct),
);

export default router;
