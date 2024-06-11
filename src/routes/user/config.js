import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {isAdmin, validate, verifyToken} from "@/app/middleware/common";
import * as configController from "@/app/controllers/config.controller";
import * as configRequest from "@/app/requests/config.request";

const router = Router();

router.use(asyncHandler(verifyToken));

router.get(
    "/",
    asyncHandler(configController.getListConfig)
);

router.post(
    "/",
    isAdmin,
    asyncHandler(validate(configRequest.updateConfig)),
    asyncHandler(configController.updateConfig)
);

export default router;
