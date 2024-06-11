import {responseSuccess} from "@/utils/helpers";
import * as employeeService from "../services/employee.service";

export async function getListEmployee(req, res) {
    return responseSuccess(res, await employeeService.getListEmployee(req.query));
}

export async function getDetailEmployee(req, res) {
    await responseSuccess(res, await employeeService.getDetailEmployee(req.params.id));
}

export async function createEmployee(req, res) {
    if (req.body.avatar) {
        req.body.avatar = req.body.avatar.save("images");
    }
    await employeeService.createEmployee(req.body);
    return responseSuccess(res, null, 201);
}

export async function updateEmployee(req, res) {
    console.log("tioiday");
    if (req.body.avatar) {
        req.body.avatar = req.body.avatar.save("images");
    }
    await employeeService.updateEmployee(req.admin, req.body);
    return responseSuccess(res, null, 201);
}

export async function deleteEmployee(req, res) {
    await employeeService.deleteEmployee(req.admin);
    return responseSuccess(res);
}

export async function changePasswordEmployee(req, res) {
    await employeeService.changePasswordEmployee(req.admin, req.body.new_password);
    return responseSuccess(res, null, 201);
}

export async function changeStatusEmployee(req, res) {
    await employeeService.changeStatusEmployee(req.admin, req.body.status);
    return responseSuccess(res, null, 201);
}
