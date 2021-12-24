//@ts-check
import { Question } from "./Question.js";

export class Quiz {
  score = 0;
  preguntaIndex = 0;
  mistake = false;
  round = 1;

  constructor(preguntas) {
    this.preguntas = preguntas;
  }

  /**
   *
   * logica de las preguntas
   */
  getPreguntaIndex() {
    return this.preguntas[this.preguntaIndex];
    // [0, 1, 2, 3]
  }

  /**
   *
   * logica fin juego
   */

  isEnded() {

    if (this.preguntas.length === this.preguntaIndex) {
      return true
    } else if (this.mistake === true) {
      return true
    } else{
      return false
    }

  }
  /**
   *
   * logica de puntaje
   */

  guess(ResCorrecta) {
    if (this.getPreguntaIndex().correctAnswer(ResCorrecta)) {
      this.preguntaIndex++;
      
      // this.score = this.score + 100;

      if (this.preguntaIndex % 5 === 0 && this.preguntaIndex !== 0) {
        this.round ++
        console.log("Index: " + this.preguntaIndex)
        console.log("Ronda: " + this.round)
        localStorage.setItem('ronda', `${this.round}`);
        console.log(this.preguntaIndex)
      }

    } else {
      this.mistake = true
    }
   
    
  }
 
  
  
}
