import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler } from './utils/errorHandler.js';
import router from './routes/index.js';

const app = express();
const PORT = 3000;

// CORS
app.use(cors({
    origin: 'http://localhost:5173'
}));

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error(error.message));

// Middleware
app.use(express.json());

// API Routes
app.use('/api/user', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Error handler
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
})