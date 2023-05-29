import React from "react";
import { HiClock } from "react-icons/hi";
import "../../styles/Contador.css"

let intervalo;
let stop;
let countdown = false;
let esInvalido = false;
let numeros = /^[0-9]{1,6}$/; //Regex con numeros del 0 al 9 hasta 6 digitos
let mensaje = "";

//Se inicia el cronometro automaticamente al empezar
intervalo == undefined ? intervalo = setInterval(myChronometer, 1000) : "";

let contador = 0;
let string = "";

function myChronometer() {
    contador += 1
    string = contador.toString().split("");

    //Al ser llamada la funcion, por cada elemento en el array 'string', preguntare si existe un elemento
    //en el string, si es así, lo paso a su casilla con un .pop y en caso de que no haya pongo un 0
    for (let i = 0; i < string.length; i++) {
        document.querySelector('.unidades').innerText = string.length ? string.pop() : '0';
        document.querySelector('.decenas').innerText = string.length ? string.pop() : '0';
        document.querySelector('.centenas').innerText = string.length ? string.pop() : '0';
        document.querySelector('.millares').innerText = string.length ? string.pop() : '0';
        document.querySelector('.centenasMillares').innerText = string.length ? string.pop() : '0';
        document.querySelector('.decenasMillares').innerText = string.length ? string.pop() : '0';
    };
};

function stopChronometer() {
    if (intervalo) {
        window.clearInterval(intervalo);
        stop = true;
        document.querySelector("#btnStop").classList.add('disabled');
        document.querySelector("#btnPlay").classList.remove('disabled');
        document.querySelector("#btnCountdown").classList.remove('disabled');
    }
}

function playChronometer() {
    if (intervalo > 0 && stop) {
        //Se inicia el intervalo con mi funcion cronometro cada un segundo
        intervalo = setInterval(myChronometer, 1000);
        stop = false;
        document.querySelector("#btnPlay").classList.add('disabled');
        document.querySelector("#btnCountdown").classList.add('disabled');
        document.querySelector("#btnStop").classList.remove('disabled');
    }
}

//Limpio los campos de numero, contador en 0 y vuelvo a activar botones.
function reloadChronometer() {
    window.clearInterval(intervalo);
    contador = 0;
    document.querySelector('.unidades').innerText = "0";
    document.querySelector('.decenas').innerText = "0";
    document.querySelector('.centenas').innerText = "0";
    document.querySelector('.millares').innerText = "0";
    document.querySelector('.centenasMillares').innerText = "0";
    document.querySelector('.decenasMillares').innerText = "0";
    document.querySelector("#btnPlay").classList.remove('disabled');
    document.querySelector("#btnStop").classList.remove('disabled');
    document.querySelector("#btnCountdown").classList.remove('disabled');
    document.querySelector("#inputCountdown").value = "";
    document.querySelector('#mensajeAlerta').classList.add('d-none');
    stop = true;
    esInvalido = false;
}

// Funcion para poner un contador indicado por 
function setTimer() {
    //Debe haber parado el contador antes de usar, de lo contrario se seteara otro intervalo sobre el existente
    if (stop == true || countdown == false) {
        //La primera vez que entra limpia todo y da valor a contador con el input.value
        //Además empieza la cuenta atrás y disablea botones hasta que termine
        reloadChronometer
        contador = parseInt(document.querySelector("#inputCountdown").value) + 1;
        intervalo = setInterval(setTimer, 1000);
        stop = false;
        countdown = true;
        document.querySelector("#btnCountdown").classList.add('disabled');
        document.querySelector("#btnPlay").classList.add('disabled');
        document.querySelector("#btnStop").classList.add('disabled');
    }

    //Pregunto si contador cumple con el regex para evitar error al pulsar con input vacio
    //Cada vez que pase por aqui volvera true esInvalido y cada vez que reinicie false.
    if (!numeros.test(parseInt(document.querySelector("#inputCountdown").value))) {
        contador = 1;
        mensaje = document.querySelector("#mensajeAlerta");
        mensaje.textContent = "Debe tener numeros del 0 al 999999";
        mensaje.classList.remove('d-none');
        window.clearInterval(intervalo);
        esInvalido = true;
    }

    //Descuento del contador -1 en cada entrada a la funcion
    contador -= 1;
    string = contador.toString().split("");

    for (let i = 0; i < string.length; i++) {
        document.querySelector('.unidades').innerText = string.length ? string.pop() : '0';
        document.querySelector('.decenas').innerText = string.length ? string.pop() : '0';
        document.querySelector('.centenas').innerText = string.length ? string.pop() : '0';
        document.querySelector('.millares').innerText = string.length ? string.pop() : '0';
        document.querySelector('.centenasMillares').innerText = string.length ? string.pop() : '0';
        document.querySelector('.decenasMillares').innerText = string.length ? string.pop() : '0';
    };

    // Pregunto si el contador es 0, tiro una alarma y reinicio todo a como estaba
    if (contador == 0 && !esInvalido) {
        window.clearInterval(intervalo);
        reloadChronometer;
        alert('Cuenta atras Terminada');
    }
};

const Contador = () => {
    return (
        <>
            <div className="row d-flex justify-content-center">
                <div className="w-50 bg-dark text-light d-flex justify-content-center align-items-center">
                    <div className="recuadro"><HiClock /></div>
                    <div className="decenasMillares recuadro"></div>
                    <div className="centenasMillares recuadro"></div>
                    <div className="millares recuadro"></div>
                    <div className="centenas recuadro"></div>
                    <div className="decenas recuadro"></div>
                    <div className="unidades recuadro"></div>
                </div>
            </div>
            <div className="row">
                <div className=" mt-2 col-12 text-center">
                    <button id="btnPlay" className="btn btn-primary me-2" onClick={playChronometer}>Play</button>
                    <button id="btnStop" className="btn btn-danger me-2" onClick={stopChronometer}>Stop</button>
                    <button id="btnPause" className="btn btn-dark me-2" onClick={reloadChronometer}>Reiniciar</button>
                </div>
            </div>
            <div className="row text-center mt-3">
                <label >Reiniciar o Parar para usar!</label>
                <div className="offset-4 col-4 mt-2 d-flex justify-content-center backcountdown">
                    <input id="inputCountdown" className="form-control w-25 text-center" />
                    <button id="btnCountdown" className="btn btn-warning me-2 disabled" onClick={setTimer}>Cuenta Atras</button>
                </div>
                <small id="mensajeAlerta" className="text-danger d-none"></small>
            </div>
        </>
    );
}

export default Contador;