import {isValidObjectId} from "mongoose";
import {responseError} from "@/utils/helpers";
import { Product } from "../models";
import { Category } from "../models/category";

export const checkProduct = async function (req, res, next) {
    const _id = req.params.id;

    if (!isValidObjectId(_id)) {
        return responseError(res, 400, "Sản phẩm không hợp lệ.");
    }

    const room = await Product.findOne({ _id , deleted: false});

    if (!room) {
        return responseError(res, 404, "Sản phẩm không tồn tại");
    }

    req.room = room;
    return next();
};

export const checkCategory = async function (req, res, next) {
    const categoryIds = req.body.category_id;

    console.log("categoryIds", categoryIds);

    if (!Array.isArray(categoryIds) || categoryIds?.some(id => !isValidObjectId(id))) {
        return responseError(res, 400, "Danh mục không hợp lệ.");
    }

    const categories = await Category.find({
        _id: { $in: categoryIds },
        deleted: false
    });

    if (categories.length !== categoryIds.length) {
        return responseError(res, 404, "Danh mục không tồn tại.");
    }

    return next();
};

