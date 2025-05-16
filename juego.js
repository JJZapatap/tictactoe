// Variable que indica cuál jugador tiene el turno actual ('X' o 'O')
let turno = 'X';

// Arreglo para almacenar el estado actual de las celdas del tablero
let celdas = [];

// Variables para guardar los nombres ingresados por los jugadores
let jugadorX = 'Jugador X';
let jugadorO = 'Jugador O';

// Variable booleana que indica si el juego está activo
let juegoActivo = false;

/**
 * Función que se ejecuta al presionar el botón "Iniciar Juego".
 * - Lee los nombres de los jugadores desde los inputs.
 * - Inicializa el turno y el estado del juego.
 * - Genera el tablero de forma dinámica.
 */
function iniciarJuego() {
    // Obtener los nombres ingresados o usar nombres por defecto
    jugadorX = document.getElementById('playerX').value || 'Jugador X';
    jugadorO = document.getElementById('playerO').value || 'Jugador O';

    // Establecer el turno inicial en 'X'
    turno = 'X';
    juegoActivo = true;

    // Mostrar mensaje del turno actual
    document.getElementById('status').textContent = `Turno de: ${jugadorX} (X)`;

    // Limpiar el tablero anterior (si lo había)
    const tablero = document.getElementById('tablero');
    tablero.innerHTML = '';
    celdas = [];

    // Crear 9 celdas del tablero
    for (let i = 0; i < 9; i++) {
        const celda = document.createElement('div');
        celda.classList.add('cell');
        celda.dataset.index = i;  // Guardar índice en el atributo de datos
        celda.addEventListener('click', jugar);  // Asociar evento de clic
        tablero.appendChild(celda);  // Agregar celda al tablero
        celdas.push('');  // Inicializar celda vacía
    }
}

/**
 * Función que se ejecuta cuando un jugador hace clic en una celda.
 * - Marca la celda con el símbolo del jugador (X u O).
 * - Verifica si hay un ganador o empate.
 * - Cambia el turno si no ha terminado el juego.
 */
function jugar(e) {
    const index = e.target.dataset.index;  // Obtener el índice de la celda clickeada

    // Si la celda ya está ocupada o el juego terminó, no hacer nada
    if (celdas[index] || !juegoActivo) return;

    // Marcar la celda con el símbolo del jugador actual
    celdas[index] = turno;
    e.target.textContent = turno;

    // Verificar si hay un ganador después del movimiento
    if (verificarGanador(turno)) {
        const ganador = turno === 'X' ? jugadorX : jugadorO;
        document.getElementById('status').textContent = ` ${ganador} gana!`;
        juegoActivo = false;
        return;
    }

    // Verificar si todas las celdas están llenas y no hay ganador ? empate
    if (!celdas.includes('')) {
        document.getElementById('status').textContent = ' Juego empatado';
        juegoActivo = false;
        return;
    }

    // Cambiar el turno al otro jugador
    turno = turno === 'X' ? 'O' : 'X';
    document.getElementById('status').textContent = `Turno de: ${turno === 'X' ? jugadorX : jugadorO} (${turno})`;
}

/**
 * Función que evalúa si el jugador actual ha ganado.
 * - Revisa las combinaciones posibles de 3 en línea.
 * @param {string} simbolo - 'X' o 'O'
 * @returns {boolean} true si hay ganador, false en caso contrario
 */
function verificarGanador(simbolo) {
    // Definición de todas las combinaciones ganadoras posibles
    const combinaciones = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
        [0, 4, 8], [2, 4, 6]             // diagonales
    ];

    // Verificar si alguna combinación está completamente llena con el símbolo actual
    return combinaciones.some(comb =>
        comb.every(i => celdas[i] === simbolo)
    );
}

/**
 * Función que reinicia completamente el juego.
 * - Llama nuevamente a iniciarJuego() para resetear todo.
 */
function reiniciarJuego() {
    iniciarJuego();
}

