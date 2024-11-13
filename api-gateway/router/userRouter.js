import express from "express";
import axios from "axios";
import { verifyAccessToken } from "../middleware/authentication.js";
import { verifyIsAdmin } from "../middleware/authorization.js";
import { verifyIsOwnerOrAdmin } from "../middleware/authorization.js";

const USER_SERVICE = process.env.USER_SERVICE_URL || "http://localhost:3001";

export const userRouter = express.Router();

// Create user
userRouter.post("/", async (req, res) => {
    try {
        const response = await axios.post(`${USER_SERVICE}/users`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.response?.data?.message,
        });
    }
});

// Get user
userRouter.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const response = await axios.get(`${USER_SERVICE}/users/${userId}`, {
            headers: req.headers,
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.response?.data?.message,
        });
    }
});

// Get all users
userRouter.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${USER_SERVICE}/users`, {
            headers: req.headers,
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.response?.data?.message,
        });
    }
});

// Update user profile
userRouter.patch(
    "/:userId",
    async (req, res) => {
        try {
            const { userId } = req.params;
            const response = await axios.patch(
                `${USER_SERVICE}/users/${userId}`,
                req.body,
                {
                    headers: req.headers
                }
            );
            res.status(response.status).json(response.data);
        } catch (error) {
            res.status(error.response?.status || 500).json({
                message: error.response?.data?.message,
            });
        }
    }
);

// Update user privilege
userRouter.patch(
    "/:userId/privilege",
    async (req, res) => {
        try {
            const { userId } = req.params;
            const response = await axios.patch(
                `${USER_SERVICE}/users/${userId}`,
                req.body,
                {
                    headers: req.headers
                }
            );
            res.status(response.status).json(response.data);
        } catch (error) {
            res.status(error.response?.status || 500).json({
                message: error.response?.data?.message,
            });
        }
    }
);

// Delete user
userRouter.delete(
    "/:userId",
    async (req, res) => {
        try {
            const { userId } = req.params;
            const response = await axios.delete(
                `${USER_SERVICE}/users/${userId}`,
                {
                    headers: req.headers,
                    data: req.body 
                }
            );
            res.status(response.status).json(response.data);
        } catch (error) {
            res.status(error.response?.status || 500).json({
                message: error.response?.data?.message,
            });
        }
    }
);
