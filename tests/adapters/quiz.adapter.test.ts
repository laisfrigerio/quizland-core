import { externalQuizConfigToInternal } from '../../src/adapters/quiz.adapter';
import { QuizConfigDTO } from '../../src/dto/quiz.dto';
import { Question, QuizConfig } from '../../src/entities/quiz.entity';

jest.mock('crypto');

const id = '0123456789';
jest.spyOn(global.Math, "random").mockReturnValue(0.0123456789);

const mockConfig: QuizConfigDTO = {
  title: 'General Knowledge Quiz',
  category: 'General',
  questions: [
    {
      content: 'What is the capital of France?',
      options: [
        { id: 1, content: 'Paris' },
        { id: 2, content: 'London' },
        { id: 3, content: 'Rome' },
        { id: 4, content: 'Berlin' },
      ],
      correctAnswerIds: [1],
    },
    {
      content: 'What is the capital of Brazil?',
      options: [
        { id: 1, content: 'Salvador' },
        { id: 2, content: 'Rio de Janeiro' },
        { id: 3, content: 'São Paulo' },
        { id: 4, content: 'Brasília' },
      ],
      correctAnswerIds: [4],
    },
    {
      content: 'Which of these are tourist attractions in Rio de Janeiro?',
      options: [
        { id: 1, content: 'Pelourinho' },
        { id: 2, content: 'Cristo Redentor' },
        { id: 3, content: 'Museu do Futebol' },
        { id: 4, content: 'Escadaria Selarón' },
      ],
      correctAnswerIds: [2, 4],
    },
    {
      content: 'Which of these teams have four World Cup titles?',
      options: [
        { id: 1, content: 'Argentina' },
        { id: 2, content: 'Inglaterra' },
        { id: 3, content: 'Alemanha' },
        { id: 4, content: 'Itália' },
      ],
      correctAnswerIds: [3, 4],
      answerDetails:
        'Only the Italian and German teams have 4 World Cup Titles.',
    },
  ],
  showTimer: false,
  level: 'easy',
};

const mockConfigAdapted: QuizConfig = {
  id: id,
  title: 'General Knowledge Quiz',
  category: 'General',
  mode: 'training',
  questions: [
    {
      id: id,
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
      id: id,
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
      id: id,
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
      id: id,
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

describe('externalQuizConfigToInternal', () => {
  describe('when level not defined', () => {
    test('should adapter to internal', () => {
      const overrideConfig: QuizConfigDTO = {
        ...mockConfig,
        level: undefined,
      };

      const overrideConfigAdapted: QuizConfig = {
        ...mockConfigAdapted,
        level: 'easy',
      };

      expect(externalQuizConfigToInternal(overrideConfig)).toStrictEqual(
        mockConfigAdapted,
      );
    });
  });

  describe('when mode defined = training', () => {
    test('should adapter to internal', () => {
      expect(externalQuizConfigToInternal(mockConfig)).toStrictEqual(
        mockConfigAdapted,
      );
    });
  });

  describe('when mode not defined, default should be training', () => {
    test('should adapter to internal', () => {
      const overrideConfig: QuizConfigDTO = { ...mockConfig, mode: undefined };
      expect(externalQuizConfigToInternal(overrideConfig)).toStrictEqual(
        mockConfigAdapted,
      );
    });
  });

  describe('when mode defined as exam', () => {
    test('should adapter to internal', () => {
      const overrideConfig: QuizConfigDTO = {
        ...mockConfig,
        mode: 'exam',
      };

      const questions: Question[] = mockConfigAdapted.questions;
      const overrideConfigAdapted: QuizConfig = {
        ...mockConfigAdapted,
        questions: questions.map((question: Question, index: number) => {
          if (index === 3) {
            return {
              ...question,
              hasToShowAnswerDetails: false,
            };
          }

          return question;
        }),
        mode: 'exam',
        hasOptionToTryAgain: false,
      };

      expect(externalQuizConfigToInternal(overrideConfig)).toStrictEqual(
        overrideConfigAdapted,
      );
    });
  });
});
