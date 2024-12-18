import express, { Request, Response } from 'express'
import cors from 'cors'
import { productRoute } from './app/modules/products/product.route'
import { OrderRoute } from './app/modules/orders/order.route'
export const app = express()

// express middleware 

app.use(cors())
app.use(express.json())


// routes

app.use("/api",productRoute )
app.use("/api",OrderRoute )

app.get("/", (req: Request, res: Response) => {
    res.json({message: "SERVER CONNECTED"})
})