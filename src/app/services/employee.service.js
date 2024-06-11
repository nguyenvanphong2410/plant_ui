import {USER_ROLE, USER_STATUS} from "../models";
import {LINK_STATIC_URL} from "@/configs";
import {generatePassword} from "@/utils/helpers";
import { Admin } from "../models/admin";

export async function createEmployee({name, email, password, phone, avatar, gender, address}) {
    const employee = new Admin({
        name,
        email,
        phone,
        password: generatePassword(password),
        avatar,
        role: USER_ROLE.ADMIN,
        gender,
        address,
        status: USER_STATUS.UNLOCK
    });
    await employee.save();
    return employee;
}

export async function getListEmployee({q, page, per_page, field, sort_order}) {
    q = q ? {$regex: q, $options: "i"} : null;

    const filter = {
        ...(q && { $or: [{ name: q }, { email: q }, { phone: q }] }),
        deleted: false,
        // role: USER_ROLE.ADMIN
    };

    const employees = (
        await Admin.find(filter, {password: 0})
            .skip((page - 1) * per_page)
            .limit(per_page)
            .sort({[field]: sort_order})
    ).map((employee) => {
        if (employee.avatar) {
            employee.avatar = LINK_STATIC_URL + employee.avatar;
        }
        return employee;
    });

    const total = await Admin.countDocuments(filter);
    return {total, page, per_page, employees};
}

export async function getDetailEmployee(employeeId) {
    const employee = await Admin.findById(
        employeeId,
        {password: 0}
    );
    employee.avatar = LINK_STATIC_URL + employee.avatar;
    return employee;
}

export async function updateEmployee(employee, {name, email, phone, avatar, status, address, gender}) {
    console.log("toi neee");
    employee.name = name;
    employee.email = email;
    employee.phone = phone;
    employee.address = address;
    employee.gender = gender;
    employee.status = status;
    if (avatar !== null && typeof avatar === "string") {
        employee.avatar = avatar;
    }
    await employee.save();
    return employee;
}

export async function changePasswordEmployee(employee, new_password) {
    employee.password = generatePassword(new_password);
    await employee.save();
    return employee;
}

export async function deleteEmployee(employee) {
    employee.deleted = true;
    await employee.save();
}

export async function changeStatusEmployee(employee, status) {
    employee.status = status;
    await employee.save();
}
