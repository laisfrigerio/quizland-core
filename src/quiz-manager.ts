import { AnswerState, Question, QuizConfig } from './entities/quiz.entity';

export class QuizManager {
  private config: QuizConfig;
  private currentQuestionIndex: number;
  private score: number;
  private answerState: Map<string, AnswerState>;

  constructor(config: QuizConfig) {
    this.config = config;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.answerState = new Map<string, AnswerState>();
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
    if (currentQuestion.typeAnswer === 'one-correct') {
      return (
        selectedOptionIds.length === 1 &&
        currentQuestion.correctAnswerIds.includes(selectedOptionIds[0])
      );
    }

    return currentQuestion.correctAnswerIds.every((answerId) =>
      selectedOptionIds.includes(answerId),
    );
  }

  checkAnswer(selectedOptionIds: number[]): boolean {
    const currentQuestion = this.getCurrentQuestion();
    const isCorrect = this.matchAnwers(currentQuestion, selectedOptionIds);

    const questionAlreadyAnswered = this.answerState.has(currentQuestion.id);

    if (questionAlreadyAnswered) {
      const previousAnswer = this.answerState.get(currentQuestion.id);
      const previousAnswerIsCorrect = previousAnswer?.isCorrect;
      if (previousAnswerIsCorrect && !isCorrect) {
        this.score--;
      } else if (!previousAnswerIsCorrect && isCorrect) {
        this.score++;
      }
    } else if (isCorrect) {
      this.score++;
    }

    this.answerState.set(currentQuestion.id, {
      isCorrect,
      selectedIds: selectedOptionIds,
    });
    return isCorrect;
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
    const answerStateValues = Array.from(this.answerState.values());
    return Array.from(answerStateValues).filter(
      (answerState) => !answerState.isCorrect,
    ).length;
  }

  getAnswerState(): Map<string, AnswerState> {
    return this.answerState;
  }

  getConfig(): QuizConfig {
    return this.config;
  }
}
