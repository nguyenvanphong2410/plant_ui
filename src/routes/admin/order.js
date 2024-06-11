import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {verifyToken, validate, upload, isAdmin} from "@/app/middleware/common";

import * as orderRequest from "@/app/requests/order.request";
import * as orderController from "@/app/controllers/order.controller";
import * as orderMiddleware from "@/app/middleware/order.middleware";

const router = Router();

router.use(asyncHandler(verifyToken));

router.get(
    "/",
    asyncHandler(validate(orderRequest.getListOrdertRequest)),
    asyncHandler(orderController.getListOrder)
);

router.post(
    "/",
    asyncHandler(upload),
    asyncHandler(validate(orderRequest.createOrderRequest)),
    asyncHandler(orderController.createOrder)
);

router.put(
    "/:id",
    asyncHandler(orderMiddleware.checkOrder),
    asyncHandler(validate(orderRequest.updateOrderRequest)),
    asyncHandler(orderController.updateOrder),
);

router.delete(
    "/:id",
    isAdmin,
    asyncHandler(orderMiddleware.checkOrder),
    asyncHandler(orderController.deleteOrder)
);

router.put("/update-status/:id",
    asyncHandler(orderMiddleware.checkOrder),
    asyncHandler(validate(orderRequest.changeStatusOderRequest)),
    asyncHandler(orderController.changeStatusOrder),
);

export default router;
