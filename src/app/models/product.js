const {createModel, PRODUCT_STATUS, ObjectId} = require("./base");

export const Product = createModel(
    "Product",
    "products",
    {
        images: {
            type: [String],
            required: true,
            default: [],
        },
        image_featured: {
            type: Number,
            default: null,
        },
        name: {
            type: String,
            required: true,
        },
        category_id: {
            type: [ObjectId],
            required: true,
            default: [],
            ref: "Category",
        },
        count: {
            type: Number,
            default: 0,
        },
        capacity: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
            default: "",
        },
        price: {
            type: Number,
            default: 0,
        },
        promotion: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: Object.values(PRODUCT_STATUS),
            default: PRODUCT_STATUS.AVAILABLE,
            required: true,
        },
        deleted: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
);
