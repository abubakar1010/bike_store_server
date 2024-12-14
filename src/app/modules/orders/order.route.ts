import { Router } from "express";
import { createOrder } from "./order.controller";

const router = Router()

router.route("/orders").post(createOrder)

export const OrderRoute = router;