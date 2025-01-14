import { QuizConfigDTO } from '../dto/quiz.dto';
import { QuizConfig } from '../entities/quiz.entity';
export declare const externalQuizConfigToInternal: (config: QuizConfigDTO) => QuizConfig;
