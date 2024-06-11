import {isValidObjectId} from "mongoose";
import {responseError} from "@/utils/helpers";
import { Order } from "../models/order";

export const checkOrder = async function (req, res, next) {
    const _id = req.params.id;

    if (!isValidObjectId(_id)) {
        return responseError(res, 400, "Đơn hàng không hợp lệ.");
    }

    const order = await Order.findOne({ _id , deleted: false});

    if (!order) {
        return responseError(res, 404, "Đơn hàng không tồn tại");
    }

    req.order = order;
    return next();
};
