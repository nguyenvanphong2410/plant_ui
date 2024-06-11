import {LINK_STATIC_URL} from "@/configs";
import { FileUpload } from "@/utils/types";
import { Feel } from "../models/feel";

export async function all() {
    const result = await Feel.find({deleted: false}).lean();
    result.forEach(function (item) {
        item.cover = LINK_STATIC_URL + item.cover;
        item.avatar = LINK_STATIC_URL + item.avatar;
    });
    return result;
}

export async function filter() {
    const result = await Feel.find({deleted: false}).lean();
    result.forEach(function (item) {
        item.cover = LINK_STATIC_URL + item.cover;
        item.avatar = LINK_STATIC_URL + item.avatar;
    });
    return result;
}

export async function create({cover, avatar, name, content}) {
    cover = cover.save();
    avatar = avatar.save();
    await Feel.create({cover, avatar, name, content});
}

export async function update(userFeedback, {cover, avatar, name, content}) {
    if (cover) {
        FileUpload.remove(userFeedback.cover);
        userFeedback.cover = cover.save();
    }
    if (avatar) {
        FileUpload.remove(userFeedback.avatar);
        userFeedback.avatar = avatar.save();
    }
    userFeedback.name = name;
    userFeedback.content = content;
    await userFeedback.save();
}

export async function remove(userFeedback) {
    userFeedback.deleted = true;
    await userFeedback.save();
}
