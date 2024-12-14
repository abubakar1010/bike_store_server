import { Router } from "express";
import { createProduct, getAllProducts } from "./product.controller";

const router = Router()

router.route("/products").post(createProduct)
router.route("/products").get(getAllProducts)

export const productRoute = router