/***
 * API for a single Feedback
 * @param req
 * @param res
 */
import {buildFeedbackPath, extractFeedback} from "../feedback";

function handler(req, res) {
    const feedbackId = req.query.id;

    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    const feedback = data.find(item => item.id === feedbackId);

    res.status(200).json({feedback: feedback});
}

export default handler
