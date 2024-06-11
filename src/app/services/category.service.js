import { CATEGORY_STATUS, Product } from "../models";
import { Category } from "../models/category";

export async function createCategory({name, desc}) {
    const category = new Category({
        name,
        desc,
    });
    await category.save();
    return category;
}

export async function getListCategory({q, page, per_page, field, sort_order}) {
    q = q ? {$regex: q, $options: "i"} : null;

    const filter = {
        ...(q && { $or: [{ name: q }] }),
        deleted: false,
    };

    const categorys = (
        await Category.find(filter)
            .skip((page - 1) * per_page)
            .limit(per_page)
            .sort({[field]: sort_order})
    );

    const total = await Category.countDocuments(filter);
    return {total, page, per_page, categorys};
}

export async function getAllCategory() {
    const categorys = (
        await Category.find({
            deleted: false,
            status: CATEGORY_STATUS.UNLOCK,
        })
    );
    return {categorys};
}

export async function getDetailCategory(categoryId) {
    const category = await Category.findById(categoryId);
    return category;
}

export async function updateCategory(id, {name, desc, status}) {
    const categoryUpdate = await Category.findOneAndUpdate(
        {_id: id},
        { name: name, desc: desc, status: status },
    );
    return categoryUpdate;
}

export async function deleteCategory(categoryId) {
    // Đánh dấu category là đã xóa
    const categoryDelete = await Category.findOneAndUpdate(
        { _id: categoryId },
        { deleted: true },
        { new: true }
    );

    if (!categoryDelete) {
        throw new Error("Category not found");
    }

    // Tìm tất cả các sản phẩm có chứa categoryId trong mảng category_id
    const products = await Product.find({ category_id: categoryId });

    // Loại bỏ categoryId khỏi mảng category_id của các sản phẩm tìm được
    await Promise.all(products.map(async (product) => {
        product.category_id = product.category_id.filter(id => !id.equals(categoryId));
        await product.save();
    }));

    return categoryDelete;
}


export async function changeStatusCategory(categoryId, status) {
    const categoryUpdateStatus = await Category.findOneAndUpdate(
        {_id: categoryId},
        {status: status}
    );

    return categoryUpdateStatus;
}
