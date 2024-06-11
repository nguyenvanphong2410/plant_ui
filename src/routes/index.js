// import userRouter from "./user";
import adminRouter from "./admin";

export default function route(app) {
    // app.use("/", userRouter);
    app.use("/admin", adminRouter);
}
