import {isValidObjectId} from "mongoose";
import {responseError} from "@/utils/helpers";
import {User} from "@/app/models";

export const checkUserAndRole = (type) => async (req, res, next) => {
    const _id = req.params.id;

    if (!isValidObjectId(_id)) {
        return responseError(res, 400, "Người dùng không tồn tại.");
    }

    const user = await User.findOne({ _id , deleted: false});

    if (!user || (type !== user.role)) {
        return responseError(res, 404, "Người dùng không hợp lệ.");
    }

    req.user = user;
    return next();
};

export const checkDeleteUserId = async function (req, res, next) {
    if (req.currentAccount._id.equals(req.params.id)) {
        return responseError(res, 400, "Không thể xóa bản thân.");
    }

    return next();
};
