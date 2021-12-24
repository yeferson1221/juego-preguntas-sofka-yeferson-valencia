//@ts-check
import { Quiz } from "./models/Quiz.js";
import { UI } from "./models/UI.js";
import { preguntas } from "./data/Preguntas.js";
import { Jugador } from "./models/Jugador.js";

var counter = 0;
var contadorJuego = 0;

const renderPage = (quiz, ui, jugador) => {
  const nombreJugador = document.getElementById("nombreJugador");
  contadorJuego = localStorage.getItem('contadorJuego') == null ? 0 : parseInt(localStorage.getItem('contadorJuego'));

  if (localStorage.getItem('jugador') !== null) {
    jugador.nombre = localStorage.getItem('jugador')
  }
  
  if (localStorage.getItem('jugador') === null || localStorage.getItem('jugador') === "") {
    
    ui.getName((inputNombre) => {
      jugador.nombre = inputNombre.value;
      localStorage.setItem('jugador', jugador.nombre);
      localStorage.setItem('numPregunta', quiz.preguntaIndex);

    })
    
  } else 
  if (quiz.isEnded()) {

    if (quiz.preguntas.length === quiz.preguntaIndex)  jugador.acumulado = jugador.acumulado + (1000 * (quiz.preguntaIndex / 5));

    counter = 0
    
    var historial = JSON.parse(localStorage.getItem("historial")) === null ? [] : JSON.parse(localStorage.getItem("historial"));

    quiz.preguntaIndex = 0;
    jugador.acumulado = 0;
    localStorage.setItem('acumulado', `${jugador.acumulado}`);
    localStorage.setItem('numPregunta', '0');

    contadorJuego ++;
    localStorage.setItem('contadorJuego', `${contadorJuego}`);
    var datosFinales = {
      nombre: jugador.nombre,
      acumulado: jugador.acumulado,
      rondasGanadas: quiz.round - 1,
      juego: contadorJuego
    }
    historial.push(datosFinales)
    localStorage.setItem("historial", JSON.stringify(historial))
    quiz.round = 1;
    localStorage.setItem('ronda', `${quiz.round}`);
    ui.showScores(
      quiz.preguntaIndex, 
      quiz.preguntas.length, 
      jugador.acumulado,
      historial,
      () => {
        quiz.mistake = false;
        renderPage(quiz, ui, jugador);
      },
      () => {
        localStorage.clear();
        quiz.mistake = false;
        nombreJugador.innerHTML = ``
        renderPage(quiz, ui, jugador);
      }
    );
    
    
    
  } else {

      
    console.log(localStorage.getItem('jugador'))
    nombreJugador.innerHTML = `${localStorage.getItem('jugador')}`;

    var round = localStorage.getItem('ronda') == null ? quiz.round : parseInt(localStorage.getItem('ronda'));
    var acumulado = localStorage.getItem('acumulado') == null ? jugador.acumulado : parseInt(localStorage.getItem('acumulado'));
    quiz.preguntaIndex = parseInt(localStorage.getItem('numPregunta'));
    ui.showPregunta(round, quiz.getPreguntaIndex().pregunta);
    console.log("Ronda: " + round)
    ui.showProgress(quiz.preguntaIndex + 1, quiz.preguntas.length, acumulado);
    counter ++
    if (counter === 6) {
      ui.showBono(quiz.preguntaIndex, jugador, () => {
        counter = 0;
        renderPage(quiz, ui, jugador);
      });
    } else {
      ui.showOpciones(quiz.getPreguntaIndex().opciones, (currenOpciones) => {
        quiz.guess(currenOpciones);
        localStorage.setItem('numPregunta', quiz.preguntaIndex);
        renderPage(quiz, ui, jugador);
      });
    }
  }
};

function main() {
  const jugador = new Jugador();
  const quiz = new Quiz(preguntas);
  const ui = new UI();

  renderPage(quiz, ui, jugador);
}

main();