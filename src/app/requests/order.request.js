import Joi from "joi";
import {MAX_STRING_ADDRESS} from "@/configs";
import {ORDER_STATUS} from "../models";
import {tryValidateOrDefault} from "@/utils/helpers";

export const getListOrdertRequest = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ""),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), null),
    field: tryValidateOrDefault(Joi.valid("created_at", "name", "capacity"), "created_at"),
    sort_order: tryValidateOrDefault(Joi.valid("asc", "desc"), "desc"),
    quantity: tryValidateOrDefault(Joi.number().integer().min(0), null),
    status: tryValidateOrDefault(Joi.string().valid(...Object.values(ORDER_STATUS)), null),
}).unknown(true);

export const createOrderRequest = Joi.object({
    user_id: Joi.any(),
    product_id: Joi.any(),
    quantity: Joi.number()
        .integer()
        .allow(null, "")
        .min(1)
        .label("Số lượng"),
    total_pay: Joi.number()
        .integer()
        .allow(null, "")
        .min(1)
        .label("Tổng tiền"),
    address: Joi.string()
        .trim()
        .max(MAX_STRING_ADDRESS)
        .required()
        .label("Địa chỉ"),
    note: Joi.string()
        .trim()
        .allow(null, "")
        .label("Ghi chú đơn hàng"),
});

export const updateOrderRequest = Joi.object({
    quantity: Joi.number()
        .integer()
        .allow(null, "")
        .min(1)
        .label("Số lượng"),
    total_pay: Joi.number()
        .integer()
        .allow(null, "")
        .min(1)
        .label("Tổng tiền"),
    address: Joi.string()
        .trim()
        .max(MAX_STRING_ADDRESS)
        .required()
        .label("Địa chỉ"),
    note: Joi.string()
        .trim()
        .allow(null, "")
        .label("Ghi chú đơn hàng"),
});

export const changeStatusOderRequest = Joi.object({
    status: Joi.string()
        .valid(...Object.values(ORDER_STATUS))
        .label("Trạng thái")
        .messages({"any.only": "Trạng thái không hợp lệ."}),
});
