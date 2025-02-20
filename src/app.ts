import express, { Request, Response } from 'express';
import cors from 'cors';
import { productRoute } from './app/modules/products/product.route';
import { OrderRoute } from './app/modules/orders/order.route';
import { UserRoutes } from './app/modules/user/user.route';
import { AuthRoutes } from './app/modules/auth/auth.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFoundRoute';
const app = express();

// express middleware

app.use(
    cors({
        origin: ['http://localhost:5173'], // Add frontend URLs
        credentials: true, // Allow cookies/auth headers
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

// Handle Preflight Requests
app.options('*', cors());

// Ensure CORS headers in all responses
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Adjust for production
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS',
    );
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS',
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization',
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.status(200).send(); // Ensure preflight returns 200 OK
});

app.use('/api', productRoute);
app.use('/api', OrderRoute);
app.use('/api', UserRoutes);
app.use('/api', AuthRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'SERVER CONNECTED' });
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
