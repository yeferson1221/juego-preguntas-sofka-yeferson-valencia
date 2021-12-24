class Question {
  
    constructor(pregunta, opciones, ResCorrecta) {
      this.pregunta = pregunta;
      this.opciones = opciones;
      this.ResCorrecta = ResCorrecta;
    }
  
    correctAnswer(opciones) {
      if (opciones === this.ResCorrecta) {
        return true
      } else {
        return false
      }
    }
  
  }
  
  export { Question };
  