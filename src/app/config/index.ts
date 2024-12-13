import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const DB_URI = process.env.DB_URI as string;
export const PORT = process.env.PORT || 5000;
