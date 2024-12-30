const jwt = require('jsonwebtoken');
const Admin = require('../models/AdminModel');

const authMiddleware = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const token = req.header('Authorization')?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }

        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Save decoded token payload to req.user

        // Check if the user is an admin
        const admin = await Admin.findById(req.user.id || req.user._id);

        if (admin && admin.role === 'admin') {
            // If the user is an admin, allow unrestricted access
            return next();
        }

        // If not an admin, continue processing as a regular employee
        req.employee = decoded;

        next();
    } catch (err) {
        console.error(err.message); // Log the error for debugging
        res.status(401).json({ message: 'Unauthorized: Invalid token', error: err.message });
    }
};

module.exports = authMiddleware;
