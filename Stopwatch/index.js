
/*QUE ES QUERY SELECTOR

Query selector busca un elemento en el DOM y lo selecciona, es decir, lo toma para poder manipularlo.
DOM (DOCUMENT OBJECT MODEL)
DOM: En pocas palabras, viene siendo todo el dominio donde se encuentra el documento HTML, CSS y JS.
El DOM es una interfaz de programación de aplicaciones (API) para documentos HTML y XML.
El DOM representa el documento como nodos y objetos, de esta manera, los programadores pueden interactuar con el documento
utilizando document.getElementById("id") o document.querySelector("selector") para seleccionar un elemento y luego manipularlo.


Query selector en este caso, busca el primer elemento que coincida con un selector CSS, en este caso STARTBUTTON, LAPBUTTON, RESETBUTTON, LAPS, TIME.
Para seleccionar un elemento por su id, se utiliza el símbolo #, por ejemplo: document.querySelector('#id').
y para seleccionar un elemento por su clase, se utiliza el símbolo ., por ejemplo: document.querySelector('.class').
si quieres seleccionar todos los que coincidan con el selector, se utiliza querySelectorAll(button).
queryselectorAll devuelve una lista de nodos, es decir, un array de elementos que coinciden con el selector.

En que diferencia querySelector de GetElementById?

La diferencia principal es que querySelector puede seleccionar elementos por su id, clase, nombre, atributo, etc.
Mientras que getElementById solo puede seleccionar elementos por su id.



*/


//Tomar todos los elementos del DOM que necesitamos
const StartButton = document.querySelector('.StartButton');
const MainStartButton = document.querySelector('.MainStartButton');

const LapButton = document.querySelector('.LapButton');

const laps = document.querySelector('.laps');

// Declarar variables para el tiempo

let milisec= 0;
let sec = 0;
let min = 0;

// Declarar variables para el tiempo en formato de cadena

let m = 0;
let s = 0;
let ms = 0;

// Removed the redeclaration of 'laps'
let time = document.querySelector('.time');
// 
let int = null;

// Declarar variable para saber si el tiempo ha comenzado, iniciamos en false, porque el tiempo no ha comenzado
let isTimeStarted = false;

//

let alllaps = [];
let lapsNumber = 1;


// Agregar un evento de clic al botón de inicio 
StartButton.addEventListener('click',() =>{
    if(isTimeStarted === false){
        // Si el tiempo no ha comenzado, comenzamos el tiempo, empezamos un intervalo y cambiamos el texto del botón a detener
      int = setInterval(displayTimer,10);
    }else{
        // Si el tiempo ha comenzado, detenemos el tiempo, detenemos el intervalo y cambiamos el texto del botón a iniciar
        clearInterval(int);
    }
    // Cambiamos el estado del tiempo
    startstop();
    isResetAvailable();
})


// Mostrar el tiempo en pantalla, cada vez que el tiempo cambie
function displayTimer(){
    milisec++;

    if(milisec >= 99){
        milisec = 0;
        sec++;
    }if(sec >= 60){
        sec = 0;
        min++;
    }

    // Formatear el tiempo, si el tiempo es menor a 10, agregar un 0 al inicio del numero, si no, mostrar el número tal cual
    // esto funciona de la siguiente forma, si el tiempo es menor a 10, se le agrega un 0 al inicio, si no, se muestra el número tal cual
    m = min < 10 ? "0" + min : min;
    s = sec < 10 ? "0" + sec : sec;
    ms = milisec < 10 ? "0" + milisec : milisec;

    // Mostrar el tiempo en pantalla
    time.innerHTML = `${m}:${s},${ms}`;

}
// Cambiar el estado del tiempo
function startstop(){
    if(isTimeStarted === false){
        isTimeStarted = true;

        StartButton.innerHTML = 'Stop';
        // Cambiar el color del botón
        //classlist hace referencia a la lista de clases que tiene un elemento, en este caso, estamos agregando una clase al botón
        StartButton.classList.add('timerStarted');
        MainStartButton.classList.add('timerStartedMain');
        }else{
        // Si el tiempo ha comenzado, detenemos el tiempo, detenemos el intervalo y cambiamos el texto del botón a iniciar
        isTimeStarted = false;
        StartButton.innerHTML = 'Start';
        StartButton.classList.remove('timerStarted');
        MainStartButton.classList.remove('timerStartedMain');
        }
}


function isResetAvailable(){
    if(isTimeStarted === false){
        LapButton.innerHTML = 'Reset';
    }else{
        LapButton.innerHTML = 'Lap';
    }
}



function displayLaps(){
    // Incrementar el número de vueltas
    lapsNumber++;
// map funciona de la siguiente forma, recorre un array y por cada elemento, ejecuta una función, en este caso, estamos recorriendo el array de vueltas y por cada vuelta, estamos creando un div con la clase lap y mostrando el número de vuelta y el tiempo de la vuelta
    laps.innerHTML= "";
    if(alllaps.length > 0){
        alllaps.map(item =>{
            laps.innerHTML += `<div class="lap"> 
            <span>Lap${item.number}</span>
            <span>Lap${item.time}</span>
            </div>`;
        })
    }
}

LapButton.addEventListener('click',() =>{
    if(isTimeStarted === false){ 
        clearInterval(int); //resetear el intervalo
        milisec = 0;
        sec = 0;
        min = 0;

        m = 0;
        s = 0;
        ms = 0; 

        time.innerHTML = '00:00,00';
    }else{
        alllaps.push({
            time: ' ' + m + ':' + s + ',' + ms,
            number: ' ' + lapsNumber,
        });
      
        displayLaps();
    }
})
