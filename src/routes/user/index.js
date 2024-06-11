import authRouter from "./auth";
import employeeRouter from "./employee";
import userRouter from "./user";
import configRouter from "./config";
import productReducer from "./product";
import feebbackRouter from "./feedback";
import categoryReducer from "./category";
import orderReducer from "./order";
import roleRouter from "./role";
import permissionRouter from "./permission";
import feelRouter from "./feel";
import {Router} from "express";

const router = Router();

router.use("/auth", authRouter);
router.use("/employees", employeeRouter);
router.use("/users", userRouter);
router.use("/configs", configRouter);
router.use("/product", productReducer);
router.use("/feedback", feebbackRouter);
router.use("/category", categoryReducer);
router.use("/order", orderReducer);
router.use("/roles", roleRouter);
router.use("/permissions", permissionRouter);
router.use("/feel", feelRouter);

export default router;
