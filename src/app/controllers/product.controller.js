import { responseSuccess } from "@/utils/helpers";
import * as productService from "../services/product.service";

export async function getListProduct(req, res) {
    return responseSuccess(res, await productService.getListProduct(req.query));
}

export async function getDetailProduct(req, res) {
    await responseSuccess(res, await productService.getDetailProduct(req.params.id));
}

export async function createProduct(req, res) {
    await productService.createProduct(req.body);
    return responseSuccess(res, null, 201);
}

export async function updateProduct(req, res) {
    await productService.updateProduct(req.room, req.body);
    return responseSuccess(res, null, 201);
}

export async function deleteProduct(req, res) {
    await productService.deleteProduct(req.room);
    return responseSuccess(res);
}

export async function changeStatusProduct(req, res) {
    await productService.changeStatusProduct(req.room, req.body.status);
    return responseSuccess(res, null, 201);
}
