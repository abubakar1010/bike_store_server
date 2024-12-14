import { Router } from "express";
import { createProduct, getAllProducts, getSpecificProducts } from "./product.controller";

const router = Router()

router.route("/products").post(createProduct)
router.route("/products").get(getAllProducts)
router.route("/products/:productId").get(getSpecificProducts)

export const productRoute = router