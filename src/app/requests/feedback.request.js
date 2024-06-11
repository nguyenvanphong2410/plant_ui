import Joi from "joi";
import {
    MAX_STRING_SIZE,
    MAX_SIZE_NAME,
    VALIDATE_PHONE_REGEX,
    VALIDATE_NAME_REGEX,
    MAX_SIZE_CONTENT,
} from "@/configs";
import {tryValidateOrDefault} from "@/utils/helpers";

export const getListEmployeeRequest = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ""),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), 20),
    field: tryValidateOrDefault(Joi.valid("created_at", "name", "email"), "created_at"),
    sort_order: tryValidateOrDefault(Joi.valid("asc", "desc"), "desc"),
}).unknown(true);

export const createFeedbackRequest = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_SIZE_NAME)
        .required()
        .pattern(VALIDATE_NAME_REGEX)
        .label("Họ và tên"),
    email: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .email()
        .required()
        .label("Email"),
    phone: Joi.string()
        .trim()
        .pattern(VALIDATE_PHONE_REGEX)
        .allow(null, "")
        .label("Số điện thoại"),
    content: Joi.string()
        .trim()
        .max(MAX_SIZE_CONTENT)
        .required()
        .label("Nội dung phản hồi"),
});

