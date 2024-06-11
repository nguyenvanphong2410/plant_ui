import Joi from "joi";
import {GENDER, User, USER_STATUS} from "../models";
import {
    MAX_STRING_SIZE,
    MAX_SIZE_NAME,
    VALIDATE_PASSWORD_REGEX,
    VALIDATE_PHONE_REGEX,
    VALIDATE_NAME_REGEX,
    MAX_STRING_ADDRESS
} from "@/configs";
import {AsyncValidate, FileUpload} from "@/utils/types";
import {tryValidateOrDefault} from "@/utils/helpers";

export const getListUserRequest = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ""),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), 20),
    field: tryValidateOrDefault(Joi.valid("created_at", "name", "email"), "created_at"),
    sort_order: tryValidateOrDefault(Joi.valid("asc", "desc"), "desc"),
}).unknown(true);

export const updateUserRequest = Joi.object({
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
        .label("Email")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function (req) {
                    const userId = req.params.id;
                    const user = await User.findOne({
                        email: value,
                        _id: {$ne: userId},
                        deleted_at: null
                    });
                    return !user ? value : helpers.error("any.exists");
                }),
        ),
    phone: Joi.string()
        .trim()
        .pattern(VALIDATE_PHONE_REGEX)
        .allow(null, "")
        .label("Số điện thoại")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function (req) {
                    const userId = req.params.id;
                    const user = await User.findOne({
                        phone: value,
                        _id: {$ne: userId},
                        deleted_at: null
                    });
                    return !user ? value : helpers.error("any.exists");
                }),
        ),
    status: Joi.number()
        .valid(...Object.values(USER_STATUS))
        .label("Trạng thái")
        .messages({"any.only": "Trạng thái không hợp lệ."}),
    avatar: Joi.object({
        originalname: Joi.string()
            .trim()
            .required()
            .label("Tên ảnh"),
        mimetype: Joi.valid("image/jpg", "image/jpeg", "image/png", "image/svg+xml", "image/webp")
            .required()
            .label("Định dạng ảnh"),
        buffer: Joi.binary()
            .required()
            .label("Ảnh đại diện"),
    })
        .instance(FileUpload)
        .allow(null, "")
        .label("Ảnh đại diện"),
    gender: Joi.number()
        .valid(...Object.values(GENDER))
        .label("Giới tính")
        .messages({"any.only": "Giới tính không hợp lệ."}),
    address: Joi.string()
        .trim()
        .max(MAX_STRING_ADDRESS)
        // .required()
        .label("Địa chỉ"),
});

export const changePasswordUserRequest = Joi.object({
    new_password: Joi.string()
        .min(8)
        .pattern(VALIDATE_PASSWORD_REGEX)
        .max(MAX_STRING_SIZE)
        .required()
        .label("Mật khẩu mới")
        .messages({"string.pattern.base": "Mật khẩu mới phải bao gồm chữ thường, chữ hoa, số và ký tự đặc biệt."}),
    confirm_password: Joi.string()
        .valid(Joi.ref("new_password"))
        .required()
        .label("Xác nhận mật khẩu")
        .messages({"any.only": "Mật khẩu xác nhận không trùng khớp."}),
});

export const changeStatusUserRequest = Joi.object({
    status: Joi.number()
        .valid(...Object.values(USER_STATUS))
        .label("Trạng thái")
        .messages({"any.only": "Trạng thái không hợp lệ."}),
});
