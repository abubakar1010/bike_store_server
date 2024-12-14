import { Router } from "express";
import { createProduct, getAllProducts, getSpecificProducts, updateProduct } from "./product.controller";

const router = Router()

router.route("/products").post(createProduct)
router.route("/products").get(getAllProducts)
router.route("/products/:productId").get(getSpecificProducts)
router.route("/products/:productId").put(updateProduct)

export const productRoute = router