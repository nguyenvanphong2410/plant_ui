import { PROTECTED } from "@/configs/enum";
import {GENDER, ObjectId, USER_ROLE, USER_STATUS, createModel} from "./base";

export const User = createModel(
    "User",
    "users",
    {
        avatar: {
            type: String,
            default: null,
        },
        name: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: Object.values(GENDER),
            required: true,
            default: GENDER.OTHER,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
        },
        phone: {
            type: String,
            default: "",
        },
        password: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            required: true,
            default: USER_STATUS.UNLOCK,
        },
        role: {
            type: String,
            enum: Object.values(USER_ROLE),
            required: true,
            default: USER_ROLE.USER,
        },
        role_ids: {
            type: [{type: ObjectId, ref: "Role"}],
            default: [],
        },
        protected: {
            type: Number,
            required: true,
            enum: [...Object.values(PROTECTED)],
            default: PROTECTED.UNPROTECTED,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                // eslint-disable-next-line no-unused-vars
                const {password, ...result} = ret;
                return result;
            },
        },
    },
);
