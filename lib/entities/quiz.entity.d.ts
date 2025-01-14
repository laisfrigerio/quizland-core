import { QuizLevel, QuizMode, TypeAnswer } from '../types';
export interface Option {
    id: number;
    content: string;
}
export interface Question {
    id: string;
    content: string;
    options: Option[];
    typeAnswer: TypeAnswer;
    correctAnswerIds: number[];
    answerDetails?: string;
    hasToShowAnswerDetails: boolean;
}
export interface QuizConfig {
    id: string;
    title: string;
    category: string;
    mode: QuizMode;
    questions: Question[];
    hasOptionToTryAgain: boolean;
    hasTimer: boolean;
    hasToShowScore: boolean;
    level: QuizLevel;
}
