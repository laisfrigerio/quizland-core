"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizManager = void 0;
class QuizManager {
    config;
    currentQuestionIndex;
    score;
    incorrectAnswers;
    constructor(config) {
        this.config = config;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.incorrectAnswers = 0;
    }
    getCurrentQuestion() {
        return this.config.questions[this.currentQuestionIndex];
    }
    getCurrentQuestionIndex() {
        return this.currentQuestionIndex;
    }
    matchAnwers(currentQuestion, selectedOptionIds) {
        return currentQuestion.correctAnswerIds.every((answerId) => selectedOptionIds.includes(answerId));
    }
    checkAnswer(selectedOptionIds) {
        const currentQuestion = this.getCurrentQuestion();
        if (this.matchAnwers(currentQuestion, selectedOptionIds)) {
            this.score++;
            return true;
        }
        this.incorrectAnswers++;
        return false;
    }
    goToNextQuestion() {
        if (this.currentQuestionIndex < this.config.questions.length - 1) {
            this.currentQuestionIndex++;
            return true;
        }
        return false;
    }
    goToPreviousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            return true;
        }
        return false;
    }
    getProgress() {
        return `${this.currentQuestionIndex + 1}/${this.config.questions.length}`;
    }
    getScore() {
        return this.score;
    }
    getIncorrectAnswers() {
        return this.incorrectAnswers;
    }
    getConfig() {
        return this.config;
    }
}
exports.QuizManager = QuizManager;
