import express from "express";
import { authenticateAdmin } from "../middlewares/authMiddleware.js";
import { createTest, getUpcomingTestsAdmin, getRecentTestsAdmin, deleteTestById, fetchTestById } from "../controllers/testController.js";


const router = express.Router();

router.route('/createTest').post(authenticateAdmin, createTest);
router.route('/upcoming/:id').get(authenticateAdmin, getUpcomingTestsAdmin);
router.route('/recent/:id').get(authenticateAdmin, getRecentTestsAdmin);
router.route('/:testId').delete(authenticateAdmin, deleteTestById);
router.route('/:testId').get(authenticateAdmin, fetchTestById);


export default router;