
  /**
   *clase interfas de usuraio 
   */

export class UI {
  constructor() {}

   getName(callback) {
    var quiz = document.getElementById('quiz');
    var childrenList = quiz.children

    for (var i in childrenList) {
      // console.log(childrenList[i])
      while (childrenList[i].firstChild) {
        childrenList[i].removeChild(childrenList[i].firstChild);
      }
    }
    const formHTML = `
        <input id="inputNombre" placeholder="Nombre">
    `;
  
    const element = document.getElementById("formularioNombre");
    element.innerHTML = formHTML;

    const button = document.createElement("button");
    const inputNombre = document.getElementById("inputNombre");

    

    // button.addEventListener("click", () => {
    //   const inputNombre = document.getElementById("inputNombre");
    //   console.log(inputNombre.value)
    //   jugador.nombre = inputNombre.value;
    // });
    button.className = "button";
    button.innerText = "Enviar";

    element.append(button);

    button.addEventListener("click", () => callback(inputNombre));
    // formularioNombre.innerHTML = "Aqui va el formulario";
  }

  


  showPregunta(round, pregunta) {

    var quiz = document.getElementById('quiz');
    var childrenList = quiz.children

    for (var i in childrenList) {
      // console.log(childrenList[i])
      while (childrenList[i].firstChild) {
        childrenList[i].removeChild(childrenList[i].firstChild);
      }
    }

    const roundTitle = document.getElementById("ronda")
    const questionTitle = document.getElementById("pregunta");
    roundTitle.innerHTML = "Ronda " + round;
    questionTitle.innerHTML = pregunta;
  }

  /**
   *
   * @param {string[]} choices
   * crear botones 
   */
  showOpciones(opciones, callback) {
    const choicesContainer = document.getElementById("opciones");
    choicesContainer.innerHTML = "";

    for (let i = 0; i < opciones.length; i++) {
      const button = document.createElement("button");
      button.addEventListener("click", () => callback(opciones[i]));
      button.className = "button";
      button.innerText = opciones[i];

      choicesContainer.append(button);
    }
  }

  showBono(preguntaIndex, jugador, callback) {

    var quiz = document.getElementById('quiz');
    var childrenList = quiz.children

    for (var i in childrenList) {
      // console.log(childrenList[i])
      while (childrenList[i].firstChild) {
        childrenList[i].removeChild(childrenList[i].firstChild);
      }
    }

    console.log(jugador.nombre)

    

    const bonoHTML = `
      <h1>Felicidades</h1>
      <h2 id="round">Pasaste a la ronda ${(preguntaIndex / 5) + 1}</h2>
      <h3 id="acumulado">Tu puntaje actual: ${jugador.acumulado}</h3>
      <h3 id="bono">Bonificación adicional: ${1000 * (preguntaIndex / 5)} </h3>
    `;

    jugador.acumulado = jugador.acumulado + (1000 * (preguntaIndex / 5));
    localStorage.setItem('acumulado', `${jugador.acumulado}`);
    console.log("Jugador acumulado: " + jugador.acumulado)
  
    const element = document.getElementById("bono");
    element.innerHTML = bonoHTML;

    const button = document.createElement("button");
    button.addEventListener("click", () => callback("Continuar"));
    button.className = "button";
    button.innerText = "Continuar";

    element.append(button);
  }

 /**
   *puntaje y preguntas buenas 
   */
  showScores(preguntaIndex, preguntasLength, acumulado, historial, callback1, callback2) {

    var quiz = document.getElementById('quiz');
    var childrenList = quiz.children

    for (var i in childrenList) {
      // console.log(childrenList[i])
      while (childrenList[i].firstChild) {
        childrenList[i].removeChild(childrenList[i].firstChild);
      }
    }

    console.log(historial)

   
    var ul = document.createElement("ul");
    ul.setAttribute("id", "historial")
    for (i in historial) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(`Juego ${historial[i].juego}: ${historial[i].nombre}, Acumulado: ${historial[i].acumulado}, Rondas ganadas: ${historial[i].rondasGanadas}`));
      ul.appendChild(li);
    }

    console.log(ul)
    

    // Condicional ternario
    var mensajeFinal = preguntaIndex === preguntasLength ? "<h4>Felicidades, has llegado al final del juego</h4>" : "<h4>Te has equivocado</h4>";
    const gameOverHTML = `
      <h5 id="numCorrectas">Has perdido los premios</h5>
      <h5 id="acumulado">tu puntaje es: ${acumulado} </h5>
    `;
  
    const element = document.getElementById("showScores");
    element.innerHTML = mensajeFinal;
    element.appendChild(ul)
    element.innerHTML += gameOverHTML;

    var button = document.createElement("button");
    button.addEventListener("click", () => callback1());
    button.className = "button";
    button.innerText = "Jugar de nuevo";

    element.append(button);

    button = document.createElement("button");
    button.addEventListener("click", () => callback2());
    button.className = "button";
    button.innerText = "Salir";

    element.append(button);
    
  }

  /**
   *progreso de preguntas 
   */

  showProgress(preguntaIndex, total,score) {
    var element = document.getElementById("progress");
    element.innerHTML = `Pregunta ${preguntaIndex} de ${total} y tu puntaje es ${score} `;
  }
   

}
