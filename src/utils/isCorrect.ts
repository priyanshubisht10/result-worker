import Submission from "../interfaces/submission";
import mng from "../services/quesDB";
import AppError from "./appError";

async function isCorrect(submission: Submission) {
   const questionId = submission.questionId; 
   console.log(questionId);
   const questionsCollection = mng.connection.collection('questions');
   console.log(questionsCollection)

   const quesId = new mng.Types.ObjectId(questionId);
   const question = await questionsCollection.findOne({ _id: quesId});

   if (!question) {
      throw new AppError('Question not found!', 404);
   }

   console.log('Retrieved question:', question);

}

export default isCorrect;