import {CONFIG_TYPE, Mixed, createModel} from "./base";

export const Config = createModel("Config", "configs", {
    type: {
        type: String,
        enum: Object.values(CONFIG_TYPE),
        required: true,
    },
    value: {
        type: Mixed,
        required: true,
    },
});
