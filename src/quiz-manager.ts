import { Question, QuizConfig } from './entities/quiz.entity';

export class QuizManager {
  private config: QuizConfig;
  private currentQuestionIndex: number;
  private score: number;
  private incorrectAnswers: number;

  constructor(config: QuizConfig) {
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

  private matchAnwers(
    currentQuestion: Question,
    selectedOptionIds: number[],
  ): boolean {
    return currentQuestion.correctAnswerIds.every((answerId) =>
      selectedOptionIds.includes(answerId),
    );
  }

  checkAnswer(selectedOptionIds: number[]): boolean {
    const currentQuestion = this.getCurrentQuestion();
    if (this.matchAnwers(currentQuestion, selectedOptionIds)) {
      this.score++;
      return true;
    }

    this.incorrectAnswers++;
    return false;
  }

  goToNextQuestion(): boolean {
    if (this.currentQuestionIndex < this.config.questions.length - 1) {
      this.currentQuestionIndex++;
      return true;
    }
    return false;
  }

  goToPreviousQuestion(): boolean {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      return true;
    }
    return false;
  }

  getProgress(): string {
    return `${this.currentQuestionIndex + 1}/${this.config.questions.length}`;
  }

  getScore(): number {
    return this.score;
  }

  getIncorrectAnswers(): number {
    return this.incorrectAnswers;
  }

  getConfig(): QuizConfig {
    return this.config;
  }
}
