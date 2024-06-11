import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {verifyToken, validate, isAdmin} from "@/app/middleware/common";

import * as feedbackRequest from "@/app/requests/feedback.request";
import * as feedbackController from "@/app/controllers/feedback.controller";

// import * as userRequest from "@/app/requests/user.request";
// import * as userMiddleware from "@/app/middleware/user.middleware";
// import * as userController from "@/app/controllers/user.controller";
// import { USER_ROLE } from "@/app/models";

const router = Router();

router.use(asyncHandler(verifyToken));

router.use(isAdmin);

// router.get(
//     "/",
//     asyncHandler(validate(userRequest.getListUserRequest)),
//     asyncHandler(userController.getListUser)
// );

// router.get(
//     "/:id",
//     asyncHandler(userMiddleware.checkUserAndRole(USER_ROLE.ADMIN)),
//     asyncHandler(userController.getDetailUser)
// );

router.post(
    "/",
    asyncHandler(validate(feedbackRequest.createFeedbackRequest)),
    asyncHandler(feedbackController.createFeedback)
);


router.delete(
    "/:id",
    asyncHandler(feedbackController.deleteFeedback)
);

export default router;
