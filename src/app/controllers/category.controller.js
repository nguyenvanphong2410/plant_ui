import {responseSuccess} from "@/utils/helpers";
import * as categoryService from "../services/category.service";

export async function getListCategory(req, res) {
    return responseSuccess(res, await categoryService.getListCategory(req.query));
}

export async function getAllCategory(req, res) {
    return responseSuccess(res, await categoryService.getAllCategory(req.query));
}

export async function getDetailCategory(req, res) {
    await responseSuccess(res, await categoryService.getDetailCategory(req.params.id));
}

export async function createCategory(req, res) {
    await categoryService.createCategory(req.body);
    return responseSuccess(res, null, 201);
}

export async function updateCategory(req, res) {
    await categoryService.updateCategory(req.params.id, req.body);
    return responseSuccess(res, null, 201);
}

export async function deleteCategory(req, res) {
    await categoryService.deleteCategory(req.params.id);
    return responseSuccess(res);
}

export async function changeStatusCategory(req, res) {
    await categoryService.changeStatusCategory(req.params.id, req.body.status);
    return responseSuccess(res, null, 201);
}
