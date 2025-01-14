import { Question, QuizConfig } from './entities/quiz.entity';
export declare class QuizManager {
    private config;
    private currentQuestionIndex;
    private score;
    private incorrectAnswers;
    constructor(config: QuizConfig);
    getCurrentQuestion(): Question;
    getCurrentQuestionIndex(): number;
    private matchAnwers;
    checkAnswer(selectedOptionIds: number[]): boolean;
    goToNextQuestion(): boolean;
    goToPreviousQuestion(): boolean;
    getProgress(): string;
    getScore(): number;
    getIncorrectAnswers(): number;
    getConfig(): QuizConfig;
}
