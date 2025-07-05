import express from "express";
import { authenticateAdmin } from "../middlewares/authMiddleware.js";
import { createTest, getUpcomingTestsAdmin, getRecentTestsAdmin, deleteTestById, fetchTestById, updateTestById, getAllowedLiveTestsForUser, getAllowedUpcomingTestsForUser, getAllowedRecentTestsForUser, deleteTestForUser } from "../controllers/testController.js";


const router = express.Router();

router.route('/createTest').post(authenticateAdmin, createTest);
router.route('/upcoming/:id').get(authenticateAdmin, getUpcomingTestsAdmin);
router.route('/recent/:id').get(authenticateAdmin, getRecentTestsAdmin);
router.route('/:testId').delete(authenticateAdmin, deleteTestById);
router.route('/:testId').get(authenticateAdmin, fetchTestById)
.put(authenticateAdmin, updateTestById);
router.route('/live/:userId').get(getAllowedLiveTestsForUser)
router.route('/users/upcoming/:userId').get(getAllowedUpcomingTestsForUser);
router.route('/users/recent/:userId').get(getAllowedRecentTestsForUser);
router.route('/users/delete').post(deleteTestForUser);

export default router;