import express from "express";
import { createUser, getUser, updateUser, deleteUser, getAllUsers , toggleUser, loginUser, logoutUser} from "../controllers/userController.js";
import {authenticateAdmin} from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route('/register').post(authenticateAdmin, createUser);
router.route('/update/:id').put(authenticateAdmin ,updateUser);
router.route('/getUser').post(authenticateAdmin, getUser);
router.route('/:id').delete(authenticateAdmin ,deleteUser);
router.route('/').get(authenticateAdmin, getAllUsers); 
router.route('/toggle/:id').put(authenticateAdmin, toggleUser);
router.route('/login').post(loginUser);


router.route('/logout').post(logoutUser)


export default router;