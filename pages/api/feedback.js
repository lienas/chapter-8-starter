import fs from 'fs'
import path from 'path'

export const buildFeedbackPath = () => {
  return path.join(process.cwd(), 'data', 'feedback.json');
}

export const extractFeedback = (filePath) => {
    return JSON.parse(fs.readFileSync(filePath));
}

function handler(req, res) {

    if (req.method === 'POST') {
        const email = req.body.email
        const text = req.body.text

        const newFeedback = {
            id: new Date().toISOString(),
            email: email,
            text: text
        }

        const filePath = buildFeedbackPath();
        const data =extractFeedback(filePath);
        data.push(newFeedback);
        fs.writeFileSync(filePath, JSON.stringify(data));

        res.status(201).json({message: 'Success !', feedBack: newFeedback});
    } else {
        const filePath = buildFeedbackPath();
        const data =extractFeedback(filePath);
        res.status(200).json({message: 'This works!', feedbacks: data});
    }
}


export default handler;
