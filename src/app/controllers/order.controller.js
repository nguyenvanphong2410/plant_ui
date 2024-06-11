import { responseSuccess } from "@/utils/helpers";
import * as orderService from "../services/order.service";

export async function getListOrder(req, res) {
    return responseSuccess(res, await orderService.getListOrder(req.query));
}

export async function createOrder(req, res) {
    await orderService.createOrder(req.body);
    return responseSuccess(res, null, 201);
}

export async function updateOrder(req, res) {
    await orderService.updateOrder(req.order, req.body);
    return responseSuccess(res, null, 201);
}

export async function deleteOrder(req, res) {
    await orderService.deleteOrder(req.order);
    return responseSuccess(res);
}

export async function changeStatusOrder(req, res) {
    await orderService.changeStatusOrder(req.order, req.body.status);
    return responseSuccess(res, null, 201);
}
