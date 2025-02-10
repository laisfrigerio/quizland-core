import { QuizConfig } from '../src/entities/quiz.entity';
import { QuizManager } from '../src/quiz-manager';

const mockConfig: QuizConfig = {
  id: 'ac733c67-f6aa-4898-8031-b3d3205ed730',
  title: 'General Knowledge Quiz',
  category: 'General',
  mode: 'training',
  questions: [
    {
      id: '05d1d94f-a971-40f9-8f52-bfdd7e4fd4d5',
      content: 'What is the capital of France?',
      options: [
        { id: 1, content: 'Paris' },
        { id: 2, content: 'London' },
        { id: 3, content: 'Rome' },
        { id: 4, content: 'Berlin' },
      ],
      typeAnswer: 'one-correct',
      correctAnswerIds: [1],
      answerDetails: undefined,
      hasToShowAnswerDetails: false,
    },
    {
      id: 'c63213fc-7e7a-407c-be21-7ff4ec06e56f',
      content: 'What is the capital of Brazil?',
      options: [
        { id: 1, content: 'Salvador' },
        { id: 2, content: 'Rio de Janeiro' },
        { id: 3, content: 'São Paulo' },
        { id: 4, content: 'Brasília' },
      ],
      typeAnswer: 'one-correct',
      correctAnswerIds: [4],
      answerDetails: undefined,
      hasToShowAnswerDetails: false,
    },
    {
      id: '786623e5-5701-4d30-ace3-bcf8a45fb65c',
      content: 'Which of these are tourist attractions in Rio de Janeiro?',
      options: [
        { id: 1, content: 'Pelourinho' },
        { id: 2, content: 'Cristo Redentor' },
        { id: 3, content: 'Museu do Futebol' },
        { id: 4, content: 'Escadaria Selarón' },
      ],
      typeAnswer: 'multiple-correct',
      correctAnswerIds: [2, 4],
      answerDetails: undefined,
      hasToShowAnswerDetails: false,
    },
    {
      id: 'd2d3a2c7-fd27-47a0-a012-9e703b552336',
      content: 'Which of these teams have four World Cup titles?',
      options: [
        { id: 1, content: 'Argentina' },
        { id: 2, content: 'Inglaterra' },
        { id: 3, content: 'Alemanha' },
        { id: 4, content: 'Itália' },
      ],
      typeAnswer: 'multiple-correct',
      correctAnswerIds: [3, 4],
      answerDetails:
        'Only the Italian and German teams have 4 World Cup Titles.',
      hasToShowAnswerDetails: true,
    },
  ],
  hasTimer: false,
  hasOptionToTryAgain: true,
  hasToShowScore: true,
  level: 'easy',
};

describe('QuizManager', () => {
  let manager: QuizManager;

  beforeAll(() => {
    manager = new QuizManager(mockConfig);
  });

  test('should initialize with the first question', () => {
    expect(manager.getCurrentQuestion()).toEqual(mockConfig.questions[0]);
    expect(manager.getScore()).toBe(0);
    expect(manager.getProgress()).toBe('1/4');
  });

  test('should verify a correct answer', () => {
    const result = manager.checkAnswer([1]);
    expect(result).toBe(true);
    expect(manager.getScore()).toBe(1);
  });

  test('should go to the next question', () => {
    manager.goToNextQuestion();
    expect(manager.getCurrentQuestionIndex()).toBe(1);
    expect(manager.getCurrentQuestion()).toEqual(mockConfig.questions[1]);
    expect(manager.getProgress()).toBe('2/4');
  });

  test('should go to previous question', () => {
    const result = manager.goToPreviousQuestion();
    expect(result).toBe(true);
    expect(manager.getCurrentQuestionIndex()).toBe(0);
    expect(manager.getCurrentQuestion()).toEqual(mockConfig.questions[0]);
    expect(manager.getProgress()).toBe('1/4');
  });

  test('should not go to previous question', () => {
    const result = manager.goToPreviousQuestion();
    expect(result).toBe(false);
    expect(manager.getCurrentQuestionIndex()).toBe(0);
    expect(manager.getCurrentQuestion()).toEqual(mockConfig.questions[0]);
    expect(manager.getProgress()).toBe('1/4');
  });

  test('should return progress correctly', () => {
    manager.goToNextQuestion();
    expect(manager.getCurrentQuestionIndex()).toBe(1);
    expect(manager.getProgress()).toBe('2/4');
  });

  test('should verify an incorrect answer', () => {
    const result = manager.checkAnswer([1]);
    expect(result).toBe(false);
    expect(manager.getScore()).toBe(1);
  });

  test('should verify a correct answer with multiples values', () => {
    manager.goToNextQuestion();
    const result = manager.checkAnswer([2, 4]);
    expect(result).toBe(true);
    expect(manager.getScore()).toBe(2);
    expect(manager.getProgress()).toBe('3/4');
  });

  test('should verify an incorrect answer with multiples values', () => {
    manager.goToNextQuestion();
    const result = manager.checkAnswer([2, 4]);
    expect(result).toBe(false);
    expect(manager.getScore()).toBe(2);
    expect(manager.getProgress()).toBe('4/4');
  });

  test('should not go past the last question', () => {
    const result = manager.goToNextQuestion();
    expect(result).toBe(false);
  });

  test('should return the current quiz config', () => {
    expect(manager.getConfig()).toStrictEqual(mockConfig);
  });
});

describe('When answering a question that has already been answered', () => {
  let manager: QuizManager;

  beforeAll(() => {
    manager = new QuizManager(mockConfig);
    manager.checkAnswer([1]);
    manager.goToNextQuestion();
  });

  test('should remains the score when the answer is incorrect', () => {
    manager.checkAnswer([2, 4]);
    expect(manager.getScore()).toBe(1);
    expect(manager.getIncorrectAnswers()).toBe(1);
    expect(Object.fromEntries(manager.getAnswerState())).toStrictEqual({
      '05d1d94f-a971-40f9-8f52-bfdd7e4fd4d5': {
        isCorrect: true,
        selectedIds: [1],
      },
      'c63213fc-7e7a-407c-be21-7ff4ec06e56f': {
        isCorrect: false,
        selectedIds: [2, 4],
      },
    });
  });

  test('should increase the score when the answer is correct', () => {
    manager.checkAnswer([4]);
    expect(manager.getScore()).toBe(2);
    expect(manager.getIncorrectAnswers()).toBe(0);
    expect(Object.fromEntries(manager.getAnswerState())).toStrictEqual({
      '05d1d94f-a971-40f9-8f52-bfdd7e4fd4d5': {
        isCorrect: true,
        selectedIds: [1],
      },
      'c63213fc-7e7a-407c-be21-7ff4ec06e56f': {
        isCorrect: true,
        selectedIds: [4],
      },
    });
  });

  test('should decrease the score when the answer is incorrect', () => {
    manager.checkAnswer([3]);
    expect(manager.getScore()).toBe(1);
    expect(manager.getIncorrectAnswers()).toBe(1);
    expect(Object.fromEntries(manager.getAnswerState())).toStrictEqual({
      '05d1d94f-a971-40f9-8f52-bfdd7e4fd4d5': {
        isCorrect: true,
        selectedIds: [1],
      },
      'c63213fc-7e7a-407c-be21-7ff4ec06e56f': {
        isCorrect: false,
        selectedIds: [3],
      },
    });
  });

  test('should not change the score when the answer is incorrect (again)', () => {
    manager.checkAnswer([2]);
    expect(manager.getScore()).toBe(1);
    expect(manager.getIncorrectAnswers()).toBe(1);
    expect(Object.fromEntries(manager.getAnswerState())).toStrictEqual({
      '05d1d94f-a971-40f9-8f52-bfdd7e4fd4d5': {
        isCorrect: true,
        selectedIds: [1],
      },
      'c63213fc-7e7a-407c-be21-7ff4ec06e56f': {
        isCorrect: false,
        selectedIds: [2],
      },
    });
  });

  test('should increase the score when the answer is correct', () => {
    manager.goToNextQuestion();
    manager.checkAnswer([2, 4]);
    expect(manager.getScore()).toBe(2);
    expect(manager.getIncorrectAnswers()).toBe(1);
    expect(Object.fromEntries(manager.getAnswerState())).toStrictEqual({
      '05d1d94f-a971-40f9-8f52-bfdd7e4fd4d5': {
        isCorrect: true,
        selectedIds: [1],
      },
      'c63213fc-7e7a-407c-be21-7ff4ec06e56f': {
        isCorrect: false,
        selectedIds: [2],
      },
      '786623e5-5701-4d30-ace3-bcf8a45fb65c': {
        isCorrect: true,
        selectedIds: [2, 4],
      },
    });
  });

  test('should increase the score when the answer is correct', () => {
    manager.goToNextQuestion();
    manager.checkAnswer([3, 4]);
    expect(manager.getScore()).toBe(3);
    expect(manager.getIncorrectAnswers()).toBe(1);
    expect(Object.fromEntries(manager.getAnswerState())).toStrictEqual({
      '05d1d94f-a971-40f9-8f52-bfdd7e4fd4d5': {
        isCorrect: true,
        selectedIds: [1],
      },
      'c63213fc-7e7a-407c-be21-7ff4ec06e56f': {
        isCorrect: false,
        selectedIds: [2],
      },
      '786623e5-5701-4d30-ace3-bcf8a45fb65c': {
        isCorrect: true,
        selectedIds: [2, 4],
      },
      'd2d3a2c7-fd27-47a0-a012-9e703b552336': {
        isCorrect: true,
        selectedIds: [3, 4],
      },
    });
  });

  test('should go back to wrong answer (2) and change it to correct', () => {
    manager.goToPreviousQuestion(); // back to 3º question
    manager.goToPreviousQuestion(); // back to 2º question

    manager.checkAnswer([4]);
    expect(manager.getScore()).toBe(4);
    expect(manager.getIncorrectAnswers()).toBe(0);

    expect(Object.fromEntries(manager.getAnswerState())).toStrictEqual({
      '05d1d94f-a971-40f9-8f52-bfdd7e4fd4d5': {
        isCorrect: true,
        selectedIds: [1],
      },
      'c63213fc-7e7a-407c-be21-7ff4ec06e56f': {
        isCorrect: true,
        selectedIds: [4],
      },
      '786623e5-5701-4d30-ace3-bcf8a45fb65c': {
        isCorrect: true,
        selectedIds: [2, 4],
      },
      'd2d3a2c7-fd27-47a0-a012-9e703b552336': {
        isCorrect: true,
        selectedIds: [3, 4],
      },
    });
  });
});
