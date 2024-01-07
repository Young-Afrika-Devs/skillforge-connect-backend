// Backend/utils/auth.middleware.js
import jwt from 'jsonwebtoken';

export const requireAdmin = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403);
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admin Access Required' });
        }

        // Attach the user object to the request object
        req.user = user.userId;
        req.role = user.role;
        next();
    });
};

