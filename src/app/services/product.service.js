import _ from "lodash";
import {LINK_STATIC_URL} from "@/configs";
import { FileUpload } from "@/utils/types";
import { Product } from "../models";
import { Category } from "../models/category";

export async function getListProduct({q, page, per_page, field, sort_order, capacity, status}) {
    const query = Product.aggregate();
    const filter = {deleted: false};
    if (q) {
        filter.name = {$regex: q, $options: "i"};
    }
    if (_.isNumber(capacity)) {
        filter.capacity = {$gte: capacity};
    }
    if (status) {
        filter.status = status;
    }
    query.match(filter);
    query.sort({[field]: sort_order}).facet({
        metadata: [{$count: "total"}],
        data: [...(_.isNumber(per_page) ? [{$skip: (page - 1) * per_page}, {$limit: per_page}] : [])],
    });

    const [result] = await query.exec();
    const total = _.isEmpty(result.metadata) ? 0 : result.metadata[0].total;
    const products = result.data.map((item) => {
        item.images_src = item.images.map((img) => LINK_STATIC_URL + img);
        item.image_featured = _.isNumber(item.image_featured) && item.images_src[item.image_featured];
        return item;
    });

    const categoryIds = products.flatMap(item => item.category_id);
    const category = await Category.find({_id: {$in: categoryIds}}, {_id: 1, name: 1}).lean();
    console.log("category là:", category);

    const categoryMap = category.reduce((acc, item) => {
        acc[item._id] = item;
        return acc;
    }, {});

    const productsCustom = products.map(product => {
        const populatedRoles = product.category_id?.map(categoryId => categoryMap[categoryId] || categoryId);
        return {...product, category: populatedRoles};
    });

    return {
        total,
        page: _.isNumber(per_page) ? page : 1,
        per_page: _.isNumber(per_page) ? per_page : total,
        products: productsCustom,
    };
}

export async function getDetailProduct(roomId) {
    const room = await Product.findOne({_id: roomId}, {deleted: false}).populate("bookings").lean();
    if (room && room.bookings) {
        room.bookings.forEach((booking) => {
            if (booking.booker_information && booking.booker_information.avatar) {
                booking.booker_information.avatar = `${LINK_STATIC_URL}${booking.booker_information.avatar}`;
            }
        });
    }
    return room;
}

export async function createProduct({name, capacity, description, images, image_featured, category_id}) {
    images = await Promise.all(images.map((img) => img.save()));
    const room = new Product({
        name,
        capacity,
        description,
        images,
        image_featured: images.length > 0 && _.isNumber(image_featured) ? image_featured : null,
        category_id
    });
    await room.save();
    return room;
}

export async function updateProduct(room, {name, capacity, description, status, images, image_featured, category_id}) {
    const keepImages = room.images.filter((img) => images.includes(img));
    const removeImages = room.images.filter((img) => !images.includes(img));
    images = images.filter((img) => img instanceof FileUpload).map((img) => img.save());
    const newImages = await Promise.all(images);

    for (const img of removeImages) {
        FileUpload.remove(img);
    }

    room.name = name;
    room.capacity = capacity;
    room.description = description;
    room.status = status ? status : room.status;
    room.images = [...keepImages, ...newImages];
    room.image_featured = room.images.length > 0 && _.isNumber(image_featured) ? image_featured : null;
    room.category_id = category_id ;

    await room.save();
    return room;
}

export async function deleteProduct(room) {
    room.deleted = true;
    await room.save();
}

export async function changeStatusProduct(room, status) {
    if (status) {
        room.status = status;
    }

    await room.save();
}
