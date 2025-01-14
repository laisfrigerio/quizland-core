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
  mode?: QuizMode; // default training
  questions: QuestionDTO[];
  tryAgain?: boolean; // Opção para tentar novamente depois de responder uma questão errada (padrão: true)
  showTimer?: boolean; // Opção para exibir um timer (padrão: false)
  showScore?: boolean; // Opção para exibir se a resposta está correta ou errada (padrão: true)
  level?: QuizLevel; // Nível de dificuldade (padrão: easy)
}
