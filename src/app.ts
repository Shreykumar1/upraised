import express from 'express';
import cors from "cors";
import authRoutes from './routes/authRoutes';
import gadgetRoutes from './routes/gadgetRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import { connectDB } from './config/prisma';
import dotenv from 'dotenv';
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/gadgets', gadgetRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));