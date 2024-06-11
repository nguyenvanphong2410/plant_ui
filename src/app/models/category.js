import {CATEGORY_STATUS, createModel} from "./base";

export const Category = createModel("Category", "category", {
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: CATEGORY_STATUS.UNLOCK,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
});
