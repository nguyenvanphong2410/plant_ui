import {FEEDBACK_STATUS, createModel} from "./base";

export const Feedback = createModel("Feedback", "feedback", {
    name: {
        type: String,
        required: true,
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
    content: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: Object.values(FEEDBACK_STATUS),
        required: true,
        default: FEEDBACK_STATUS.UNLOCK,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
});
