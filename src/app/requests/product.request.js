import Joi from "joi";
import {MAX_STRING_SIZE} from "@/configs";
import {AsyncValidate, FileUpload} from "@/utils/types";
import {PRODUCT_STATUS, Product} from "../models";
import {tryValidateOrDefault} from "@/utils/helpers";
import _ from "lodash";
import moment from "moment";

export const getListProductRequest = Joi.object({
    q: tryValidateOrDefault(Joi.string().trim(), ""),
    page: tryValidateOrDefault(Joi.number().integer().min(1), 1),
    per_page: tryValidateOrDefault(Joi.number().integer().min(1).max(100), null),
    field: tryValidateOrDefault(Joi.valid("created_at", "name", "capacity"), "created_at"),
    sort_order: tryValidateOrDefault(Joi.valid("asc", "desc"), "desc"),
    capacity: tryValidateOrDefault(Joi.number().integer().min(0), null),
    status: tryValidateOrDefault(Joi.string().valid(...Object.values(PRODUCT_STATUS)), null),
}).unknown(true);

export const createRoomRequest = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .required()
        .label("Tên sản phẩm")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function () {
                    const employee = await Product.findOne({
                        name: value,
                        deleted: false,
                    });
                    return !employee ? value : helpers.error("any.exists");
                }),
        ),
    capacity: Joi.number().integer().allow(null, "").min(1).label("Quy mô sản phẩm"),
    description: Joi.string().trim().allow(null, "").label("Mô tả sản phẩm"),
    images: Joi.array()
        .single()
        .items(
            Joi.object({
                originalname: Joi.string().trim().required().label("Tên ảnh"),
                mimetype: Joi.valid("image/jpg", "image/jpeg", "image/png", "image/svg+xml", "image/webp")
                    .required()
                    .label("Định dạng ảnh"),
                buffer: Joi.binary()
                    .required()
                    .label("Kích thước ảnh")
                    .max(10000000)
                    .messages({"binary.max": "{{#label}} không được vượt quá 10mb."}),
            })
                .instance(FileUpload)
                .allow(null, "")
                .label("Ảnh mô tả phòng"),
        )
        .default([])
        .max(3)
        .label("Ảnh mô tả phòng"),
    image_featured: Joi.number()
        .integer()
        .min(0)
        .allow(null, "")
        .label("Ảnh nổi bật")
        .custom((value, helpers) => {
            const images = helpers.prefs.context.data.images;
            if (_.isArray(images) && images.length > 0) {
                return value < images.length ? value : helpers.error("any.invalid");
            } else {
                return value;
            }
        }),
    category_id: Joi.array()
        .items(
            Joi.string()
                .label("Danh mục")
        )
        .label("Danh mục"),
});

export const updateProductRequest = Joi.object({
    name: Joi.string()
        .trim()
        .max(MAX_STRING_SIZE)
        .required()
        .label("Tên sản phẩm")
        .custom(
            (value, helpers) =>
                new AsyncValidate(value, async function (req) {
                    const roomId = req.params.id;
                    const room = await Product.findOne({
                        name: value,
                        _id: {$ne: roomId},
                        deleted: false,
                    });
                    return !room ? value : helpers.error("any.exists");
                }),
        ),
    capacity: Joi.number().allow(null, "").min(1).label("Quy mô phòng"),
    description: Joi.string().allow(null, "").trim().label("Mô tả phòng"),
    images: Joi.array()
        .single()
        .items(
            Joi.object({
                originalname: Joi.string().trim().required().label("Tên ảnh"),
                mimetype: Joi.valid("image/jpg", "image/jpeg", "image/png", "image/svg+xml", "image/webp")
                    .required()
                    .label("Định dạng ảnh"),
                buffer: Joi.binary()
                    .required()
                    .label("Kích thước ảnh")
                    .max(10000000)
                    .messages({"binary.max": "{{#label}} không vượt quá 10mb."}),
            })
                .instance(FileUpload)
                .allow(null, "")
                .label("Ảnh mô tả phòng"),
            Joi.string().trim(),
        )
        .max(3)
        .default([])
        .label("Ảnh mô tả phòng"),
    status: Joi.string()
        .valid(...Object.values(PRODUCT_STATUS))
        .label("Trạng thái")
        .messages({"any.only": "Trạng thái không hợp lệ."}),
    image_featured: Joi.number()
        .integer()
        .min(0)
        .allow(null, "")
        .label("Ảnh nổi bật")
        .custom((value, helpers) => {
            const images = helpers.prefs.context.data.images;
            if (_.isArray(images) && images.length > 0) {
                return value < images.length ? value : helpers.error("any.invalid");
            } else {
                return value;
            }
        }),
    category_id: Joi.array()
        .items(
            Joi.string()
                .label("Danh mục")
        )
        .required()
        .label("Danh mục"),
});

export const changeStatusProductRequest = Joi.object({
    status: Joi.string()
        .valid(...Object.values(PRODUCT_STATUS))
        .label("Trạng thái")
        .messages({"any.only": "Trạng thái không hợp lệ."}),
});

export const bookingRoom = Joi.object({
    start_time: Joi.number()
        .integer()
        .min(0)
        .required()
        .label("Thời gian nhận phòng")
        .custom((value, helpers) =>
            value > moment().unix() ? value : helpers.message("{{#label}} phải lớn hơn thời gian hiện tại."),
        ),
    end_time: Joi.number()
        .integer()
        .min(0)
        .greater(Joi.ref("start_time"))
        .required()
        .label("Thời gian trả phòng")
        .messages({"number.greater": "{{#label}} phải lớn hơn thời gian nhận phòng."}),
    purpose: Joi.string().trim().max(1500).required().label("Mục đích sử dụng"),
});
