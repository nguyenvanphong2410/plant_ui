import { ORDER_STATUS, ObjectId, createModel} from "./base";

export const Order = createModel("Order", "order", {
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
    quantity: {
        type: Number,
        default: null,
    },
    total_pay: {
        type: Number,
        default: null,
    },
    address: {
        type: String,
        default: null,
    },
    note: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: Object.values(ORDER_STATUS),
        required: true,
        default: ORDER_STATUS.PENDING,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
});
