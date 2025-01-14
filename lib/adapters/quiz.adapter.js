"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.externalQuizConfigToInternal = void 0;
const crypto_1 = require("crypto");
const isTrainingMode = (mode) => {
    return mode === 'training';
};
const hasAnswerDetails = (answerDetails) => {
    return typeof answerDetails !== 'undefined' && answerDetails != '';
};
const getTypeAnswer = (correctAnswerIds) => {
    if (correctAnswerIds.length > 1) {
        return 'multiple-correct';
    }
    return 'one-correct';
};
const externalOptionalToInternal = (option) => {
    const { id, content } = option;
    return {
        id,
        content,
    };
};
const externalQuestionToInternal = (question, mode) => {
    const { answerDetails, content, options, correctAnswerIds } = question;
    return {
        id: (0, crypto_1.randomUUID)(),
        content,
        answerDetails,
        hasToShowAnswerDetails: isTrainingMode(mode) && hasAnswerDetails(answerDetails),
        options: options.map((option) => externalOptionalToInternal(option)),
        correctAnswerIds,
        typeAnswer: getTypeAnswer(correctAnswerIds),
    };
};
const externalQuizConfigToInternal = (config) => {
    const { category, mode, showTimer, showScore, tryAgain, title, questions, level, } = config;
    const quizType = mode || 'training';
    const quizLevel = level || 'easy';
    return {
        id: (0, crypto_1.randomUUID)(),
        title,
        category,
        mode: quizType,
        questions: questions.map((question) => externalQuestionToInternal(question, quizType)),
        level: quizLevel,
        hasOptionToTryAgain: tryAgain || isTrainingMode(quizType),
        hasToShowScore: showScore || true,
        hasTimer: showTimer || false,
    };
};
exports.externalQuizConfigToInternal = externalQuizConfigToInternal;
