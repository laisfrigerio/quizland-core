# quizland-core

QuizLand is a tiny library with common functions to manage a quiz

## Stack

- Node.js 22
- TypeScript 5
- Jest
- NPM library deploy via Github Actions automation

## Usage

```ts
import { QuizLand } from "quizland-core";

const quizLand = QuizLand({
  {
    "title": "General Knowledge Quiz",
    "category": {
        "name": "General"
    },
    "mode": "exam",
    "questions": [
        {
        "content": "What is the capital of France?",
        "options": [
            { "id": 1, "content": "Paris" },
            { "id": 2, "content": "London" },
            { "id": 3, "content": "Rome" },
            { "id": 4, "content": "Berlin" }
        ],
        "correctAnswerIds": [1]
        },
        {
        "content": "What is the capital of Brazil?",
        "options": [
            { "id": 1, "content": "Salvador" },
            { "id": 2, "content": "Rio de Janeiro" },
            { "id": 3, "content": "São Paulo" },
            { "id": 4, "content": "Brasília"}
        ],
        "correctAnswerIds": [4]
        },
        {
        "content": "Which of these are tourist attractions in Rio de Janeiro?",
        "options": [
            { "id": 1, "content": "Pelourinho" },
            { "id": 2, "content": "Cristo Redentor" },
            { "id": 3, "content": "Museu do Futebol" },
            { "id": 4, "content": "Escadaria Selarón" }
        ],
        "correctAnswerIds": [2, 4]
        },
        {
        "content": "Which of these teams have four World Cup titles?",
        "options": [
            { "id": 1, "content": "Argentina" },
            { "id": 2, "content": "Inglaterra" },
            { "id": 3, "content": "Alemanha" },
            { "id": 4, "content": "Itália" }
        ],
        "correctAnswerIds": [3, 4],
        "answerDetails": "Only the Italian and German teams have 4 World Cup Titles."
        }
    ],
    "tryAgain": false,
    "showTimer": false,
    "showScore": false,
    "level": "easy"
  }
});
```

- Get Current Question

```ts
const currentQuestion = quizLand.getCurrentQuestion();
```

- Check Answer

```ts
const isCorrectAnswer = quizLand.checkAnswer([1, 2]);
```

- Get Current Score

```ts
const score = quizLand.getScore();
```

- Go To Next Question

```ts
quizLand.goToNextQuestion();
```

- Back To Previous Question

```ts
quizLand.goToPreviousQuestion();
```

## 👩 Author

| [<img src="https://avatars.githubusercontent.com/u/20709086?v=4" width="100px;" alt="Lais Frigério"/><br /><sub><b>@laisfrigerio</b></sub>](https://github.com/laisfrigerio)<br /> |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |

## 📄 License

This project is licensed under the MIT License - see the LICENSE.md file for details
