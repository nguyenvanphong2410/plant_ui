import {generatePassword} from "@/utils/helpers";
import {USER_ROLE, User} from "@/app/models";

export default async function userSeeder() {
    const superAdmin = await User.findOne({role: USER_ROLE.SUPER_ADMIN});
    let EMAIL = process.env.SUPER_ADMIN_EMAIL;
    let PASSWORD = process.env.SUPER_ADMIN_PASSWORD;

    if (!superAdmin) {
        if (!EMAIL || !PASSWORD) {
            EMAIL = "admin@zent.vn";
            PASSWORD = "Zent@123.edu.vn";
            console.warn("---------------------------------------------------------------");
            console.warn('"Super Admin" is not configured. Using the default account:');
            console.warn(`Email: ${EMAIL}`);
            console.warn(`Password: ${PASSWORD}`);
            console.warn("---------------------------------------------------------------");
        }
        await User.create({
            name: "Super Admin",
            email: EMAIL,
            password: generatePassword(PASSWORD),
            role: USER_ROLE.SUPER_ADMIN,
        });
    } else if (EMAIL && PASSWORD) {
        superAdmin.email = EMAIL;
        superAdmin.password = generatePassword(PASSWORD);
        await superAdmin.save();
    }
}
