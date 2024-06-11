import { USER_STATUS } from "@/app/models";
import { Admin } from "@/app/models/admin";
import { Role } from "@/app/models/role";
import { PROTECTED } from "@/configs/enum";
import {generatePassword} from "@/utils/helpers";

export default async function () {
    let EMAIL = process.env.SUPER_ADMIN_EMAIL;
    let PASSWORD = process.env.SUPER_ADMIN_PASSWORD;
    if (!EMAIL || !PASSWORD) {
        EMAIL = "admin@zent.vn";
        PASSWORD = "Zent@123.edu.vn";
        console.warn("---------------------------------------------------------------");
        console.warn('"Super Admin" is not configured. Using the default account:');
        console.warn(`Email: ${EMAIL}`);
        console.warn(`Password: ${PASSWORD}`);
        console.warn("---------------------------------------------------------------");
    }
    const role = await Role.findOne({name: "super_admin"});
    if (!role) {
        return console.warn("\"Role\" is not exist.");
    }
    const superAdmin = {
        name: "Super Admin",
        email: EMAIL,
        password: generatePassword(PASSWORD),
        role_ids: [role._id],
        status: USER_STATUS.UNLOCK,
        protected: PROTECTED.PROTECTED
    };

    const admin = await Admin.findOneAndUpdate({email: superAdmin.email}, {$set: superAdmin}, {upsert: true, new: true});

    await Role.findOneAndUpdate({name: "super_admin"}, {$set: {admin_ids: [admin._id]}});
}
