import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
    authUser,
    deleteUser,
    getUserById,
    getUserProfile,
    getUsers,
    logout,
    registerUser,
    updateUser,
    updateUserProfile,
} from '../controllers/user.controller.js';
const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.route('/login').post(authUser);
router.route('/logout').post(logout);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router
    .route('/:id')
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);

export default router;
