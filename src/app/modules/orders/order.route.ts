import { Router } from "express";
import { createOrder, generateRevenue,  } from "./order.controller";

const router = Router()

router.route("/orders").post(createOrder)
router.route("/orders/revenue").get(generateRevenue)

export const OrderRoute = router;