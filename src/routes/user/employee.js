import {Router} from "express";
import {asyncHandler} from "@/utils/handlers";
import {verifyToken, validate, upload, isAdmin} from "@/app/middleware/common";

import * as employeeRequest from "@/app/requests/employee.request";
import * as userMiddleware from "@/app/middleware/user.middleware";
import * as employeeController from "@/app/controllers/employee.controller";
import { USER_ROLE } from "@/app/models";

const router = Router();

router.use(asyncHandler(verifyToken));

router.use(isAdmin);

router.get(
    "/",
    asyncHandler(validate(employeeRequest.getListEmployeeRequest)),
    asyncHandler(employeeController.getListEmployee)
);

router.get(
    "/:id",
    asyncHandler(userMiddleware.checkUserAndRole(USER_ROLE.ADMIN)),
    asyncHandler(employeeController.getDetailEmployee)
);

router.post(
    "/",
    asyncHandler(upload),
    asyncHandler(validate(employeeRequest.createEmployeeRequest)),
    asyncHandler(employeeController.createEmployee)
);

router.put(
    "/:id",
    asyncHandler(upload),
    asyncHandler(userMiddleware.checkUserAndRole(USER_ROLE.ADMIN)),
    asyncHandler(validate(employeeRequest.updateEmployeeRequest)),
    asyncHandler(employeeController.updateEmployee),
);

router.delete(
    "/:id",
    asyncHandler(userMiddleware.checkUserAndRole(USER_ROLE.ADMIN)),
    asyncHandler(userMiddleware.checkDeleteUserId),
    asyncHandler(employeeController.deleteEmployee)
);

router.patch(
    "/reset-password/:id",
    asyncHandler(userMiddleware.checkUserAndRole(USER_ROLE.ADMIN)),
    asyncHandler(validate(employeeRequest.changePasswordEmployeeRequest)),
    asyncHandler(employeeController.changePasswordEmployee),
);

router.put("/update-status/:id",
    asyncHandler(userMiddleware.checkUserAndRole(USER_ROLE.ADMIN)),
    asyncHandler(validate(employeeRequest.changeStatusEmployeeRequest)),
    asyncHandler(employeeController.changeStatusEmployee),
);

export default router;
