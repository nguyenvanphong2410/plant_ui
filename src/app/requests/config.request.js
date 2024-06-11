import Joi from "joi";

export const updateConfig = Joi.object({
    MAX_TIME_CANCEL_BOOKING: Joi.object({
        type: Joi.string().valid("MAX_TIME_CANCEL_BOOKING").required().label("Dạng cấu hình"),
        value: Joi.object({
            time: Joi.number().valid(0, 1, 2).required().label("Loại thời gian"),
            limit: Joi.number().min(0).required().label("Giới hạn thời gian huỷ đặt phòng")
        })
    }),
    TERMS_OF_USE: Joi.object({
        type: Joi.string().valid("TERMS_OF_USE").required().label("Dạng cấu hình"),
        value: Joi.string().required().label("Điều khoản sử dụng")
    })
});
