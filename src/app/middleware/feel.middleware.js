
import {responseError} from "@/utils/helpers";
import {isValidObjectId} from "mongoose";
import { Feel } from "../models/feel";

export async function checkFeelId(req, res, next) {
    if (isValidObjectId(req.params.feelId)) {
        const userFeedback = await Feel.findOne({_id: req.params.feelId, deleted: false});
        if (userFeedback) {
            req.userFeedback = userFeedback;
            return next();
        }
    }

    return responseError(res, 404, "Nhận xét của khách hàng không tồn tại.");
}
