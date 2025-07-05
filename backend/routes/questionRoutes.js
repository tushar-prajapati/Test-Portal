import express from "express";
import { fetchQuestionById , fetchQuestionsByTestId, updateQuestionById, deleteQuestionById} from "../controllers/questionController.js";
import { authenticateAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/:quesId').get(fetchQuestionById)
.put(authenticateAdmin, updateQuestionById)
.delete(authenticateAdmin, deleteQuestionById);
router.route('/test/:testId').get(fetchQuestionsByTestId);


export default router;