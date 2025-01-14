"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizLand = void 0;
const quiz_adapter_1 = require("./adapters/quiz.adapter");
const quiz_manager_1 = require("./quiz-manager");
const QuizLand = (quizConfig) => {
    const config = (0, quiz_adapter_1.externalQuizConfigToInternal)(quizConfig);
    return new quiz_manager_1.QuizManager(config);
};
exports.QuizLand = QuizLand;
