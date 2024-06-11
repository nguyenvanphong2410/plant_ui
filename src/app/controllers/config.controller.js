import {responseSuccess} from "@/utils/helpers";
import * as configService from "@/app/services/config.service";

export async function getListConfig(req, res) {
    await responseSuccess(res, await configService.getListConfig());
}

export async function updateConfig(req, res) {
    await responseSuccess(res, await configService.updateConfig(req.body));
}
