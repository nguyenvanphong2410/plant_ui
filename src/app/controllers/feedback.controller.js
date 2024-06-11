import {responseSuccess} from "@/utils/helpers";
import * as feedbackService from "../services/feedback.service";

// export async function getListEmployee(req, res) {
//     return responseSuccess(res, await employeeService.getListEmployee(req.query));
// }

// export async function getDetailEmployee(req, res) {
//     await responseSuccess(res, await employeeService.getDetailEmployee(req.params.id));
// }

export async function createFeedback(req, res) {
    await feedbackService.createFeedback(req.body);
    return responseSuccess(res, null, 201);
}

export async function deleteFeedback(req, res) {
    await feedbackService.deleteFeedback(req);
    return responseSuccess(res);
}
