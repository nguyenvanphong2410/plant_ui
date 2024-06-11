import {responseSuccess} from "@/utils/helpers";
import * as userService from "../services/user.service";

export async function getListUser(req, res) {
    return responseSuccess(res, await userService.getListUser(req.query));
}

export async function getDetailUser(req, res) {
    await responseSuccess(res, await userService.getDetailUser(req.params.id));
}

export async function updateUser(req, res) {
    if (req.body.avatar) {
        req.body.avatar = req.body.avatar.save("images");
    }
    await userService.updateUser(req.user, req.body);
    return responseSuccess(res, null, 201);
}

export async function deleteUser(req, res) {
    await userService.deleteUser(req.user);
    return responseSuccess(res);
}

export async function changePasswordUser(req, res) {
    await userService.changePasswordUser(req.user, req.body.new_password);
    return responseSuccess(res, null, 201);
}

export async function changeStatusUser(req, res) {
    await userService.changeStatusUser(req.user, req.body.status);
    return responseSuccess(res, null, 201);
}
