import { Question } from "../models/Question.js";
import { BancoPreguntas } from "./BancoPreguntas.js";

var randomize = (array) => {

  var currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex --
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  } 
  return array

}

BancoPreguntas.forEach(preg => {
  preg.opciones = randomize(preg.opciones)
});

var randomizedPreguntas = randomize(BancoPreguntas);

export const preguntas = randomizedPreguntas.map(
  (pregunta) =>
    new Question(pregunta.pregunta, pregunta.opciones, pregunta.ResCorrecta)
);      



