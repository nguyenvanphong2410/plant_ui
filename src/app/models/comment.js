import {COMMENT_STATUS, ObjectId, createModel} from "./base";

export const Config = createModel("Comment", "comment", {
    user_id: {
        type: ObjectId,
        required: true,
        ref: "User",
    },
    product_id: {
        type: ObjectId,
        required: true,
        ref: "Product",
    },
    content: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: Object.values(COMMENT_STATUS),
        required: true,
        default: COMMENT_STATUS.UNLOCK,
    },
});
