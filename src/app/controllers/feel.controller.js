import * as feelService from "@/app/services/feel.service";
import {responseSuccess} from "@/utils/helpers";

export async function readRoot(req, res) {
    const result = await feelService.filter(req.query);
    return responseSuccess(res, result);
}

export async function createItem(req, res) {
    await feelService.create(req.body);
    return responseSuccess(res, null, 201);
}

export async function updateItem(req, res) {
    await feelService.update(req.userFeedback, req.body);
    return responseSuccess(res, null, 201);
}

export async function deleteItem(req, res) {
    await feelService.remove(req.userFeedback);
    responseSuccess(res);
}
