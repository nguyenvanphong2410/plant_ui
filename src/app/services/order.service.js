import { Order } from "../models/order";

export async function getListOrder({q, page, per_page, field, sort_order}) {
    q = q ? {$regex: q, $options: "i"} : null;

    const filter = {
        ...(q && { $or: [{ name: q }] }),
        deleted: false,
    };

    const categorys = (
        await Order.find(filter)
            .skip((page - 1) * per_page)
            .limit(per_page)
            .sort({[field]: sort_order})
    );

    const total = await Order.countDocuments(filter);
    return {total, page, per_page, categorys};
}

export async function createOrder({user_id, product_id, quantity, total_pay, address, note}) {
    const order = new Order({
        user_id,
        product_id,
        quantity,
        total_pay,
        address,
        note
    });
    await order.save();
    return order;
}

export async function updateOrder(order, {quantity, total_pay, address, note}) {

    order.quantity = quantity;
    order.total_pay = total_pay;
    order.address = address;
    order.note = note;

    await order.save();
    return order;
}

export async function deleteOrder(order) {
    order.deleted = true;
    await order.save();
}

export async function changeStatusOrder(order, status) {
    if (status) {
        order.status = status;
    }
    await order.save();
}
