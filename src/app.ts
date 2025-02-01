import express, { Request, Response } from 'express'
import cors from 'cors'
import { productRoute } from './app/modules/products/product.route'
import { OrderRoute } from './app/modules/orders/order.route'
import { UserRoutes } from './app/modules/user/user.route'
import { AuthRoutes } from './app/modules/auth/auth.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFoundRoute'
const app = express()

// express middleware 

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// routes

app.use("/api",productRoute )
app.use("/api",OrderRoute )
app.use("/api",UserRoutes )
app.use("/api",AuthRoutes )

;

app.get("/", (req: Request, res: Response) => {
    res.json({message: "SERVER CONNECTED"})
})

app.use(globalErrorHandler);
app.use(notFound)


export default app