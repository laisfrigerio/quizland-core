import { QuizLevel, QuizMode } from '../types';
export interface OptionDTO {
    id: number;
    content: string;
}
export interface QuestionDTO {
    content: string;
    options: OptionDTO[];
    correctAnswerIds: number[];
    answerDetails?: string;
}
export interface QuizConfigDTO {
    title: string;
    category: string;
    mode?: QuizMode;
    questions: QuestionDTO[];
    tryAgain?: boolean;
    showTimer?: boolean;
    showScore?: boolean;
    level?: QuizLevel;
}
