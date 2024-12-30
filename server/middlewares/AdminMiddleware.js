const jwt = require('jsonwebtoken');
const Admin = require('../models/AdminModel');

exports.adminMiddleware = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const token = req.header('Authorization')?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }

        // Log the token for debugging purposes
        console.log('Token received:', token);

        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to the request object

        // Log the decoded token for debugging purposes
        console.log('Decoded token:', decoded);

        // Check the number of admins in the system
        const adminCount = await Admin.countDocuments();

        // If no admins exist, allow the first admin registration
        if (adminCount === 0) {
            return next(); // Proceed to the next middleware to allow first admin registration
        }

        // If the user is not an admin, deny access
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admin access only' });
        }

        // Proceed to the next middleware if the user is an admin
        next();
    } catch (err) {
        // Log the error and send a more detailed message
        console.error('Error in adminMiddleware:', err);

        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token', error: err.message });
        }

        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};
