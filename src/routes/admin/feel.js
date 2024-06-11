import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {upload, validate, verifyToken} from "@/app/middleware/common";
import * as feelMiddleware from "@/app/middleware/feel.middleware";
import * as feelRequest from "@/app/requests/feel.request";
import * as feelController from "@/app/controllers/feel.controller";
import * as ensurePermissionsMiddleware from "@/app/middleware/admin/ensure-permissions.middleware";

const router = Router();

router.use(asyncHandler(verifyToken));

router.get(
    "/",
    asyncHandler(ensurePermissionsMiddleware.ensurePermissions("list-feel")),
    asyncHandler(feelController.readRoot)
);
router.post(
    "/",
    asyncHandler(ensurePermissionsMiddleware.ensurePermissions("add-feel")),
    asyncHandler(upload),
    asyncHandler(validate(feelRequest.createItem)),
    asyncHandler(feelController.createItem),
);
router.put(
    "/:feelId",
    asyncHandler(ensurePermissionsMiddleware.ensurePermissions("edit-feel")),
    asyncHandler(upload),
    asyncHandler(feelMiddleware.checkFeelId),
    asyncHandler(validate(feelRequest.updateItem)),
    asyncHandler(feelController.updateItem),
);
router.delete(
    "/:feelId",
    asyncHandler(ensurePermissionsMiddleware.ensurePermissions("delete-feel")),
    asyncHandler(feelMiddleware.checkFeelId),
    asyncHandler(feelController.deleteItem),
);

export default router;
