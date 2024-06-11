import {createModel} from "./base";

export const Feel = createModel("Feel", "feels", {
    avatar: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
});
