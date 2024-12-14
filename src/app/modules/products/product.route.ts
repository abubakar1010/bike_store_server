import { Router } from "express";
import { createProduct } from "./product.controller";

const router = Router()

router.route("/products").post(createProduct)

export const productRoute = router