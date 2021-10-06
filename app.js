class Question {
  constructor(text, choices, answer, image) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.image = image;
  }
  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}

let questions = [
  new Question(
    "Whish football staduim known as The Theatre of Dreams ?",
    ["Parc des Princes", "Old Traford", "Santiago Bernabéu", "The Anfield"],
    "Old Traford",
    "OldTrafford1.png"
    // "route/vers/une/image.png"
  ),

  new Question(
    "Whish football staduim known as The Bullring ?",
    [
      "Borg El Arab Stadium",
      "Stade des Martyrs",
      "Stade Mohammed V",
      "Wanderers Stadium",
    ],
    "Wanderers Stadium",
    "WanderersStadium2.png"
  ),
  new Question(
    "Whish football staduim known as The Kop ?",
    ["San Siro", "Emirates Stadium", "The Anflied", "Camp Nou"],
    "The Anflied",
    "TheAnflied3.png"
  ),
  new Question(
    "Whish football staduim known as The Ashburton Grove ?",
    ["The Olympico", "Alianz Arena", "Emirates Staduim", "Stade de Luz"],
    "Emirates Staduim",
    "EmiratesStaduim4.png"
  ),
  new Question(
    "Whish football staduim known as The Venue of Legends ?",
    ["The Bombonera", "Signal Iduna Park", "Millerntor Stadiom", "Wembly"],
    "Wembly",
    "Wembly5.png"
  ),
  new Question(
    "Whish football staduim known as Stadio Guiseppe Meazza ?",
    ["Madison", "San Siro", "Stade Artemio-Franchi", "Stadio Olimpico"],
    "San Siro",
    "SanSiro6.png"
  ),
  new Question(
    "Whish football staduim known as The Dingy ?",
    ["Allianz Arena", "Vélodrome", "Stamford Bridge", "Volksparkstadio"],
    "Allianz Arena",
    "AllianzArena7.png"
  ),
  new Question(
    "Whish football staduim known as The Bombonea ?",
    [
      "Diego Armando Maradona Stadium",
      "Borussia-Park",
      "Boca Juniors Stadium",
      "River Plate Stadium",
    ],
    "Boca Juniors Stadium",
    "BocaJuniorsStadium8.png"
  ),
  new Question(
    "Whish football staduim known as The Lane ?",
    ["Home Park", "Celtic Park ", "Boleyn Ground", "White Hart Lane"],
    "White Hart Lane",
    "WhiteHartlane9.png"
  ),
  new Question(
    "Whish football staduim known as The Big Egg ?",
    ["Beijing National Stadium", "Tokyo Dome", "Estadio Leon", "Celtic Park"],
    "Tokyo Dome",
    "TokyoDome10.png"
  ),
];

console.log("questions ???");
console.log(questions);

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
      this.playSound(true);
    } else this.playSound(false);
    this.currentQuestionIndex++;
  }
  playSound(isCorrectAnswer) {
    let audioObj;
    // si isCorrectAnswer vaut true
    if (isCorrectAnswer === true) {
      console.log("bonne réponse");
      audioObj = new Audio("audio/hymnechampionsleaguewinner.mp3");
    } else {
      audioObj = new Audio("audio/NulGermainloser.mp3");
      console.log("mauvaise réponse");
    }
   // document.querySelector("#audioObj").addEventListener("ended", yourFunct, false);
    // trouver un moyen de savoir quand l'audio a finit de jouer ???
    // travailler avec de l'asynchrone ...
    audioObj.play();
    audioObj.addEventListener("ended", () => {
        console.log("hello le son a fini de jouer")
        quizApp()
    })
    // sinon jouer son défaite
  }
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

// Regroup all  functions relative to the App Display
const display = {
  image: function () {
    const body = document.getElementById("body");
    const currentQuestion = quiz.getCurrentQuestion();
    const image = currentQuestion.image;
    body.style.background = "url(images/" + image + ")";
  },
  elementShown: function (id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  endQuiz: function () {
    const endQuizHTML = `
        <h1>Quiz completed !</h1>
        <h3> Your score is : ${quiz.score} / ${quiz.questions.length}</h3>`;
    this.elementShown("quiz", endQuizHTML);
  },
  question: function () {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },
  choices: function () {
    let choices = quiz.getCurrentQuestion().choices;

    const guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function () {
        quiz.guess(guess);
        guessHndler.getElementById('player')
        setTimeout(quizApp); {
            player.play();

            setTimeout(quizApp); {
                player.pause();
                player.curretTime = 0;

            }; 2000
        }; 1000
        // attendre la fin de l'audio pour passer à la suite ...
        // setTimeout ???
        // quizApp();
      };
    };
    // display choices and handle guess
    for (let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },
  progress: function () {
    let currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.elementShown(
      "progress",
      "Question " + currentQuestionNumber + " of " + quiz.questions.length
    );
  },
};

// Game logic
function quizApp() {
  if (quiz.hasEnded()) {
    display.endQuiz();
  } else {
    display.question();
    display.choices();
    display.progress();
    display.image();
  }
}

// Create Quiz
let quiz = new Quiz(questions);
quizApp();

console.log(quiz);
