import { randomUUID } from "crypto";
import { QuizConfigDTO, QuestionDTO, OptionDTO } from "../dto/quiz.dto";
import { QuizConfig, Question, Option } from "../entities/quiz.entity";
import { QuizLevel, QuizMode, TypeAnswer } from "../types";

const isTrainingMode = (mode: string): boolean => {
  return mode === "training";
}

const hasAnswerDetails = (answerDetails?: string): boolean => {
  return typeof answerDetails !== "undefined" 
          && answerDetails != ""
}

const getTypeAnswer = (correctAnswerIds: number[]): TypeAnswer => {
  if (correctAnswerIds.length > 1) {
    return "multiple-correct";
  }
  return "one-correct";
}

const externalOptionalToInternal = (option: OptionDTO): Option => {
  const { id, content } = option;

  return {
    id,
    content
  };
};

const externalQuestionToInternal = (question: QuestionDTO, mode: string): Question => {
  const { answerDetails, content, options, correctAnswerIds } = question;
  return {
    id: randomUUID(),
    content,
    answerDetails,
    hasToShowAnswerDetails: isTrainingMode(mode) && hasAnswerDetails(answerDetails),
    options: options.map(option => externalOptionalToInternal(option)),
    correctAnswerIds,
    typeAnswer: getTypeAnswer(correctAnswerIds)
  };
};

export const externalQuizConfigToInternal = (config: QuizConfigDTO): QuizConfig => {
  const { category, mode, showTimer, showScore, tryAgain, title, questions, level } = config;
  
  const quizType: QuizMode = mode || "training";
  const quizLevel: QuizLevel = level || "easy";

  return {
    id: randomUUID(),
    title,
    category,
    mode: quizType,
    questions: questions.map(question => externalQuestionToInternal(question, quizType)),
    level: quizLevel,
    hasOptionToTryAgain: tryAgain || isTrainingMode(quizType),
    hasToShowScore: showScore || true,
    hasTimer: showTimer || false,
  };
};
