import { Permission } from "@/app/models/permisstion";
import { PermissionGroup } from "@/app/models/permisstion-group";
import { PermissionType } from "@/app/models/permisstion-type";

const permission_types = {
    list: {
        name: "Truy cập",
        code: "list",
        position: 1,
    },
    detail: {
        name: "Xem chi tiết",
        code: "detail",
        position: 2,
    },
    add: {
        name: "Tạo mới",
        code: "add",
        position: 3,
    },
    edit: {
        name: "Chỉnh sửa",
        code: "edit",
        position: 4,
    },
    remove: {
        name: "Xóa",
        code: "delete",
        position: 5,
    },
};

const {list, add, edit, remove, detail} = permission_types;

const permission_groups = [
    {
        name: "Tổng quan",
        code: "admin-management",
        description: "",
        actor: "admin",
        children: [],
        types: {
            [list.code]: {
                name: "Xem tổng quan",
                description: "Xem thống kê tổng quan",
            },
        },
    },
    {
        name: "Quản lý sản phẩm",
        code: "product-management",
        description: "",
        actor: "product",
        types: {
            [list.code]: {
                name: "Xem danh sách sản phẩm",
                description: "Xem danh sách sản phẩm",
            },
            [detail.code]: {
                name: "Xem chi tiết lịch sử hoạt động sản phẩm",
                description: "Xem chi tiết lịch sử hoạt động sản phẩm",
            },
            [add.code]: {
                name: "Thêm mới sản phẩm",
                description: "Thêm mới sản phẩm",
            },
            [edit.code]: {
                name: "Chỉnh sửa thông tin sản phẩm",
                description: "Chỉnh sửa thông tin sản phẩm",
            },
            [remove.code]: {
                name: "Xóa sản phẩm",
                description: "Xóa sản phẩm",
            },
        },
        children: [
            {
                name: "Tìm kiếm sản phẩm",
                code: "search-product",
                description: "Tìm kiếm sản phẩm có trong hệ thống",
                children: [],
                actor: "product",
                types: {
                    [edit.code]: {
                        name: "Tìm kiếm sản phẩm có trong hệ thống",
                        description: "Tìm kiếm sản phẩm có trong hệ thống",
                    },
                },
            },
        ],
    },

    {
        name: "Quản lý danh mục",
        code: "category-management",
        description: "",
        actor: "category",
        types: {
            [list.code]: {
                name: "Xem danh sách danh mục",
                description: "Xem danh sách danh mục",
            },
            [add.code]: {
                name: "Thêm mới danh mục",
                description: "Thêm mới danh mục",
            },
            [edit.code]: {
                name: "Chỉnh sửa thông tin danh mục",
                description: "Chỉnh sửa thông tin danh mục",
            },
            [remove.code]: {
                name: "Xóa danh mục",
                description: "Xóa danh mục",
            },
        },
    },
    {
        name: "Quản lý nhân viên",
        code: "employee-management",
        description: "",
        actor: "employee",
        types: {
            [list.code]: {
                name: "Xem danh sách nhân viên",
                description: "Xem danh sách nhân viên",
            },
            [add.code]: {
                name: "Thêm mới nhân viên",
                description: "Thêm mới nhân viên",
            },
            [edit.code]: {
                name: "Chỉnh sửa thông tin nhân viên",
                description: "Chỉnh sửa thông tin nhân viên",
            },
            [remove.code]: {
                name: "Xóa nhân viên",
                description: "Xóa nhân viên",
            },
        },
        children: [
            {
                name: "Đổi mật khẩu nhân viên",
                code: "reset-password-employee",
                description: "Thay đổi mật khẩu nhân viên",
                children: [],
                actor: "reset-password-employee",
                types: {
                    [edit.code]: {
                        name: "Đổi mật khẩu nhân viên",
                        description: "Thay đổi mật khẩu nhân viên",
                    },
                },
            },
        ],
    },
    {
        name: "Quản lý khách hàng",
        code: "customer-management",
        description: "",
        actor: "customer",
        types: {
            [list.code]: {
                name: "Xem danh sách khách hàng",
                description: "Xem danh sách khách hàng",
            },
            [detail.code]: {
                name: "Xem chi tiết lịch sử hoạt động khách hàng",
                description: "Xem chi tiết lịch sử hoạt động khách hàng",
            },
            [add.code]: {
                name: "Thêm mới khách hàng",
                description: "Thêm mới khách hàng",
            },
            [edit.code]: {
                name: "Chỉnh sửa thông tin khách hàng",
                description: "Chỉnh sửa thông tin khách hàng",
            },
            [remove.code]: {
                name: "Xóa khách hàng",
                description: "Xóa khách hàng",
            },
        },
        children: [
            {
                name: "Đổi mật khẩu khách hàng",
                code: "reset-password-customer",
                description: "Thay đổi mật khẩu khách hàng",
                children: [],
                actor: "password-customer",
                types: {
                    [edit.code]: {
                        name: "Đổi mật khẩu khách hàng",
                        description: "Thay đổi mật khẩu khách hàng",
                    },
                },
            },
        ],
    },
    {
        name: "Quản lý cảm nhận",
        code: "feel-management",
        description: "",
        actor: "feel",
        types: {
            [list.code]: {
                name: "Xem danh sách cảm nhận",
                description: "Xem danh sách cảm nhận",
            },
            [add.code]: {
                name: "Thêm mới cảm nhận",
                description: "Thêm mới cảm nhận",
            },
            [edit.code]: {
                name: "Chỉnh sửa cảm nhận",
                description: "Chỉnh sửa cảm nhận",
            },
            [remove.code]: {
                name: "Xóa cảm nhận",
                description: "Xóa cảm nhận",
            },
        },
    },
    {
        name: "Quản lý quà tặng",
        code: "package-management",
        description: "",
        actor: "package",
        types: {
            [list.code]: {
                name: "Xem danh sách quà tặng",
                description: "Xem danh sách quà tặng",
            },
            [add.code]: {
                name: "Thêm mới quà tặng",
                description: "Thêm mới quà tặng",
            },
            [edit.code]: {
                name: "Chỉnh sửa quà tặng",
                description: "Chỉnh sửa quà tặng",
            },
            [remove.code]: {
                name: "Xóa quà tặng",
                description: "Xóa quà tặng",
            },
        },
        children: [
            {
                name: "Quà tặng đặc biệt",
                code: "special gift",
                description: "Lựa chọn Quà tặng đặc biệt",
                children: [],
                actor: "gift",
                types: {
                    [edit.code]: {
                        name: "Quà tặng đặc biệt",
                        description: "Lựa chọn Quà tặng đặc biệt",
                    },
                },
            },
        ],
    },
    {
        name: "Quản lý vai trò",
        code: "role-management",
        actor: "role",
        description: "",
        types: {
            [list.code]: {
                name: "Xem danh sách vai trò người dùng",
                description: "Xem danh sách vai trò người dùng",
            },
            [add.code]: {
                name: "Thêm mới vai trò người dùng",
                description: "Thêm mới vai trò người dùng",
            },
            [edit.code]: {
                name: "Chỉnh sửa vai trò người dùng",
                description: "Chỉnh sửa vai trò người dùng",
            },
            [remove.code]: {
                name: "Xóa vai trò người dùng",
                description: "Xóa vai trò người dùng",
            },
        },
        children: [
            {
                name: "Quản lý quyền hạn",
                code: "permission-management",
                description: "",
                children: [],
                actor: "permission",
                types: {
                    [list.code]: {
                        name: "Xem danh sách quyền hạn của vai trò người dùng",
                        description: "Xem danh sách quyền hạn của vai trò người dùng",
                    },
                    [edit.code]: {
                        name: "Chỉnh sửa quyền hạn của vai trò người dùng",
                        description: "Chỉnh sửa quyền hạn của vai trò người dùng",
                    },
                },
            },
        ],
    },
    {
        name: "Cấu hình",
        code: "config-management",
        description: "",
        actor: "config",
        types: {
            [list.code]: {
                name: "Xem cấu hình",
                description: "Xem các cấu hình",
            },
        },
        children: [
            {
                name: "Cấu hình tài khoản ngân hàng",
                code: "config-bank-management",
                description: "",
                actor: "bank",
                types: {
                    [list.code]: {
                        name: "Xem cấu hình tài khoản ngân hàng",
                        description: "Xem cấu hình tài khoản ngân hàng",
                    },
                    [edit.code]: {
                        name: "Chỉnh sửa cấu hình tài khoản ngân hàng",
                        description: "Chỉnh sửa cấu hình tài khoản ngân hàng",
                    },
                },
            },
        ],
    },
];

async function handlePermissionAndPermissionGroup(data, parent_code = null) {
    for (const permission_group of data) {
        await PermissionGroup.findOneAndUpdate(
            {code: permission_group.code},
            {
                $set: {
                    code: permission_group.code,
                    name: permission_group.name,
                    description: permission_group.description,
                    parent_code: parent_code,
                },
            },
            {upsert: true, new: true},
        );
        for (const type_key of Object.keys(permission_group.types)) {
            await Permission.findOneAndUpdate(
                {code: `${type_key}-${permission_group.actor}`},
                {
                    $set: {
                        code: `${type_key}-${permission_group.actor}`,
                        name: permission_group.types[type_key].name,
                        description: permission_group.types[type_key].description,
                        permission_group_code: permission_group.code,
                        permission_type_code: type_key,
                    },
                },
                {upsert: true, new: true},
            );
        }
        if (permission_group.children?.length > 0) {
            await handlePermissionAndPermissionGroup(permission_group.children, permission_group.code);
        }
    }
}

export default async function () {
    try {
        // Quyền Quản trị cấp cao
        const super_admin_permission = {
            code: "super-admin",
            name: "Toàn bộ quyền",
            permission_group_code: null,
            permission_type_code: null,
            description: "Có toàn quyền sử dụng hệ thống",
        };
        await Permission.findOneAndUpdate(
            {code: super_admin_permission.code},
            {$set: {...super_admin_permission}},
            {upsert: true, new: true},
        );

        // Permission Types
        for (const key of Object.keys(permission_types)) {
            await PermissionType.findOneAndUpdate(
                {code: permission_types[key].code},
                {
                    $set: {
                        name: permission_types[key].name,
                        code: permission_types[key].code,
                        position: permission_types[key].position,
                    },
                },
                {upsert: true, new: true},
            );
        }

        // Permission Groups
        await handlePermissionAndPermissionGroup(permission_groups);
    } catch (error) {
        console.error(error);
    }
}
