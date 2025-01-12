import { externalQuizConfigToInternal } from "./adapters/quiz.adapter";
import { QuizConfigDTO } from "./dto/quiz.dto";
import { QuizManager } from "./manager";
import { QuizConfig } from "./entities/quiz.entity";

export const QuizLand = (quizConfig: QuizConfigDTO): QuizManager => {
  const config: QuizConfig = externalQuizConfigToInternal(quizConfig);
  return new QuizManager(config);
}
