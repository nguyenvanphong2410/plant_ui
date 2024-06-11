import { Feedback } from "../models/feedback";

export async function createFeedback({name, email, phone, content}) {
    const feedback = Feedback ({
        name,
        email,
        phone,
        content
    });
    await feedback.save();
    return feedback;
}

export async function deleteFeedback(feedback) {
    console.log(feedback.params.id);
    const feedbackDelete = await Feedback.findOneAndUpdate(
        {_id: feedback.params.id},
        {deleted: true}
    );
    return feedbackDelete;
}

// export async function getListEmployee({q, page, per_page, field, sort_order}) {
//     q = q ? {$regex: q, $options: "i"} : null;

//     const filter = {
//         ...(q && { $or: [{ name: q }, { email: q }, { phone: q }] }),
//         deleted: false,
//         role: USER_ROLE.ADMIN
//     };

//     const employees = (
//         await User.find(filter, {password: 0})
//             .skip((page - 1) * per_page)
//             .limit(per_page)
//             .sort({[field]: sort_order})
//     ).map((employee) => {
//         if (employee.avatar) {
//             employee.avatar = LINK_STATIC_URL + employee.avatar;
//         }
//         return employee;
//     });

//     const total = await User.countDocuments(filter);
//     return {total, page, per_page, employees};
// }

// export async function getDetailEmployee(employeeId) {
//     const employee = await User.findById(
//         employeeId,
//         {password: 0}
//     );
//     employee.avatar = LINK_STATIC_URL + employee.avatar;
//     return employee;
// }
