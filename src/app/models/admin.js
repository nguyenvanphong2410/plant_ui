
import { PROTECTED } from "@/configs/enum";
import {GENDER, ObjectId, USER_STATUS, createModel} from "./base";

export const Admin = createModel(
    "Admin",
    "admins",
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
            default: null,
        },
        password: {
            type: String,
            required: true,
        },
        role_ids: {
            type: [{type: ObjectId, ref: "Role"}],
            default: [],
        },
        status: {
            type: String,
            default: USER_STATUS.UNLOCK,
        },
        deleted: {type: Boolean, default: false},
        protected: {
            type: Number,
            required: true,
            enum: [...Object.values(PROTECTED)],
            default: PROTECTED.UNPROTECTED,
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
        virtuals: {
            roles: {
                options: {
                    ref: "Role",
                    localField: "role_ids",
                    foreignField: "_id",
                },
            },
        },
    },
);
