import {Schema, Types, model} from "mongoose";

export function createModel(name, collection, definition, options) {
    const schema = new Schema(definition, {
        timestamps: {createdAt: "created_at", updatedAt: "updated_at"},
        versionKey: false,
        id: false,
        ...(options ? options : {}),
    });

    return model(name, schema, collection);
}

export const {ObjectId} = Types;
export const {Mixed} = Schema.Types;

export const USER_STATUS = {
    UNLOCK: "UNLOCK",
    LOCK: "LOCK",
};

export const GENDER = {
    MALE: "MALE",
    FEMALE: "FEMALE",
    OTHER: "OTHER",
};

export const USER_ROLE = {
    USER: "USER",
    ADMIN: "ADMIN",
    SUPER_ADMIN: "SUPER_ADMIN",
};

export const PRODUCT_STATUS = {
    AVAILABLE: "AVAILABLE",
    UNAVAILABLE: "UNAVAILABLE",
};

export const BOOKING_STATUS = {
    PENDING: "PENDING",
    CANCEL: "CANCEL",
    ACCEPTED: "ACCEPTED",
    REJECTED: "REJECTED",
};

export const CONFIG_TYPE = {
    MAX_TIME_CANCEL_BOOKING: "MAX_TIME_CANCEL_BOOKING",
    TERMS_OF_USE: "TERMS_OF_USE",
};

export const FEEDBACK_STATUS = {
    UNLOCK: "UNLOCK",
    LOCK: "LOCK",
};

export const COMMENT_STATUS = {
    UNLOCK: "UNLOCK",
    LOCK: "LOCK",
};

export const CATEGORY_STATUS = {
    UNLOCK: "UNLOCK",
    LOCK: "LOCK",
};

export const ORDER_STATUS = {
    PENDING: "PENDING",
    ACCEPT: "ACCEPT",
    COMPLETE: "COMPLETE",
    CANCEL: "CANCEL",
};
