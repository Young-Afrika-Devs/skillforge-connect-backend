// Backend/utils/auth.middleware.js
import jwt from 'jsonwebtoken';

export const requireAdmin = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

    try {
        const { userId, role } = jwt.verify(token, process.env.JWT_SECRET);
        if (role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admin access required' });
        }

        // Attach user ID and role to the request object
        req.userId = userId;
        req.role = role;
        next();
    } catch (error) {
        next(error);
    }
};

