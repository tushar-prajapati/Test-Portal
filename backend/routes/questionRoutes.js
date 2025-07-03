import express from "express";
import { fetchQuestionById } from "../controllers/questionController.js";

const router = express.Router();

router.route('/:quesId').get(fetchQuestionById);

export default router;