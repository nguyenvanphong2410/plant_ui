import Joi from "joi";
import {
    MAX_SIZE_NAME,
    VALIDATE_NAME_REGEX,
} from "@/configs";
import {tryValidateOrDefault} from "@/utils/helpers";
import { CATEGORY_STATUS } from "../models";

export const getListCategoryRequest = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ""),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), 20),
    field: tryValidateOrDefault(Joi.valid("created_at", "name", "email"), "created_at"),
    sort_order: tryValidateOrDefault(Joi.valid("asc", "desc"), "desc"),
}).unknown(true);

export const createCategoryRequest = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_SIZE_NAME)
        .required()
        .pattern(VALIDATE_NAME_REGEX)
        .label("Tên danh mục"),
    desc: Joi.string().trim().allow(null, "").label("Mô tả danh mục"),
});

export const updateCategoryRequest = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_SIZE_NAME)
        .required()
        .pattern(VALIDATE_NAME_REGEX)
        .label("Tên danh mục"),
    desc: Joi.string()
        .trim()
        .allow(null, "")
        .label("Mô tả danh mục"),
    status: Joi.string()
        .valid(...Object.values(CATEGORY_STATUS))
        .label("Trạng thái")
        .messages({"any.only": "Trạng thái không hợp lệ."}),
});

export const changeStatusCategoryRequest = Joi.object({
    status: Joi.string()
        .valid(...Object.values(CATEGORY_STATUS))
        .label("Trạng thái")
        .messages({"any.only": "Trạng thái không hợp lệ."}),
});
