document.addEventListener("DOMContentLoaded", function () {
    // Variable para gestionar el estado del juego
    const juego = {
        dinero: 0.00,
        tasaGanancia: 0.01,
        montoElement: document.getElementById("monto"),
        boletos: Array.from({ length: 6 }, (_, i) => ({ id: i + 1, ganancia: 0 })),
        actualizarContador: function () {
            juego.dinero += juego.tasaGanancia;
            juego.montoElement.textContent = juego.dinero.toFixed(2);
        },
        revelarGanancia: function (boletoId) {
            const boleto = juego.boletos.find(b => b.id === boletoId);

            if (!boleto) {
                return; // Boleto no encontrado
            }

            // Puedes ajustar el ratio de ganancia según tus preferencias
            const ratioGanancia = 0.18; // Porcentaje de ganancia 

            // Genera un número aleatorio para determinar si el usuario ha ganado
            const probabilidadGanancia = Math.random();

            // Determina la ganancia según la probabilidad
            boleto.ganancia = 0;
            if (probabilidadGanancia < ratioGanancia) {
                // El usuario ha ganado
                boleto.ganancia = Math.random() * 10 + 1; // Ganancia aleatoria entre 1 y 10 dólares
            }

            // Actualiza el contador de dinero con la ganancia
            juego.dinero += boleto.ganancia;

            // Actualiza el contenido del boleto con la ganancia
            const boletoElement = document.getElementById(`boleto${boletoId}`);
            boletoElement.textContent = boleto.ganancia.toFixed(2);

            // Actualiza el montoElement con el nuevo valor de dinero
            juego.montoElement.textContent = juego.dinero.toFixed(2);
        },
        iniciarJuego: function () {
            // Iniciar el intervalo para la actualización del contador
            const intervalo = setInterval(juego.actualizarContador, 1000); // Actualizar cada segundo

            // Detener el intervalo después de 60 segundos (puedes ajustar este valor)
            setTimeout(function () {
                clearInterval(intervalo);
            }, 60000);
        }
    };

    // Asignar la variable juego al objeto window para que sea accesible desde otros ámbitos
    window.juego = juego;

    // Iniciar el juego
    juego.iniciarJuego();
});