/* ==================================================
   PAOLA MARIE | BABY SHOWER
================================================== */

/* ---------- ELEMENTOS ---------- */

const botonAbrir = document.getElementById("abrirInvitacion");
const portada = document.getElementById("portada");
const invitacion = document.getElementById("invitacion");
const transicion = document.getElementById("transicionEntrada");

const musica = document.getElementById("musica");
const botonMusica = document.getElementById("botonMusica");
const textoMusica = document.getElementById("textoMusica");
const controlMusicaFlotante = document.getElementById("controlMusicaFlotante");


/* ---------- ABRIR INVITACIÓN ---------- */

if (botonAbrir) {
    botonAbrir.addEventListener("click", () => {
        botonAbrir.classList.add("abriendo");

        const textoBoton = botonAbrir.querySelector("span");
        if (textoBoton) textoBoton.textContent = "ABRIENDO...";

        if (invitacion) invitacion.classList.add("visible");
        if (portada) portada.classList.add("salir");

        setTimeout(() => {
            if (portada) portada.style.display = "none";
            document.body.style.overflowY = "auto";
        }, 900);
    });
}


/* ---------- MÚSICA ---------- */

botonMusica.addEventListener("click", () => {
    if (musica.paused) {
        reproducirMusica();
    } else {
        pausarMusica();
    }
});

if (controlMusicaFlotante) controlMusicaFlotante.addEventListener("click", () => {
    if (musica.paused) {
        reproducirMusica();
    } else {
        pausarMusica();
    }
});

function reproducirMusica() {

    musica.play()
        .then(() => {

            botonMusica.classList.add("sonando");

            textoMusica.textContent = "MÚSICA ACTIVADA";

            if (controlMusicaFlotante) controlMusicaFlotante.classList.add(
                "visible",
                "sonando"
            );

            botonMusica.setAttribute(
                "aria-label",
                "Pausar música"
            );
        })
        .catch(() => {

            textoMusica.textContent =
                "TOCA DE NUEVO PARA ESCUCHAR";
        });
}

function pausarMusica() {

    musica.pause();

    botonMusica.classList.remove("sonando");

    if (controlMusicaFlotante) controlMusicaFlotante.classList.remove("sonando");

    textoMusica.textContent = "TOCA PARA ESCUCHAR";

    botonMusica.setAttribute(
        "aria-label",
        "Reproducir música"
    );
}


/* ---------- CUENTA REGRESIVA ---------- */

const fechaEvento = new Date("2026-11-15T16:00:00");

function actualizarCuenta() {

    const ahora = new Date();
    const diferencia = fechaEvento - ahora;

    if (diferencia <= 0) {

        ["dias", "horas", "minutos", "segundos"].forEach(id => {
            document.getElementById(id).textContent = "00";
        });

        return;
    }

    const dias = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );

    const horas = Math.floor(
        (diferencia / (1000 * 60 * 60)) % 24
    );

    const minutos = Math.floor(
        (diferencia / (1000 * 60)) % 60
    );

    const segundos = Math.floor(
        (diferencia / 1000) % 60
    );

    actualizarNumero("dias", dias);
    actualizarNumero("horas", horas);
    actualizarNumero("minutos", minutos);
    actualizarNumero("segundos", segundos);
}

function actualizarNumero(id, valor) {

    const elemento = document.getElementById(id);

    const nuevoValor = String(valor).padStart(2, "0");

    if (elemento.textContent !== nuevoValor) {

        elemento.textContent = nuevoValor;

        const caja = elemento.parentElement;

        caja.classList.remove("cambio");

        void caja.offsetWidth;

        caja.classList.add("cambio");
    }
}

actualizarCuenta();
setInterval(actualizarCuenta, 1000);


/* ---------- ENTRADA DE SECCIONES ---------- */

const secciones = document.querySelectorAll(".seccion");

const observador = new IntersectionObserver(
    entradas => {

        entradas.forEach(entrada => {

            if (entrada.isIntersecting) {
                entrada.target.classList.add("activa");
            }

        });
    },
    {
        threshold: 0.20
    }
);

secciones.forEach(seccion => {
    observador.observe(seccion);
});


/* ---------- DRESS CODE ---------- */

const opcionesColor = document.querySelectorAll(".color-opcion");
const dressMensaje = document.getElementById("dressMensaje");

opcionesColor.forEach(opcion => {

    opcion.addEventListener("click", () => {

        opcionesColor.forEach(otra => {
            otra.classList.remove("seleccionado");
        });

        opcion.classList.add("seleccionado");

        const color = opcion.dataset.color;

        dressMensaje.textContent =
            `ELEGISTE ${color} · ¡TE ESPERAMOS!`;
    });
});


/* ---------- CONTADOR INTERACTIVO ---------- */

const contadorItems = document.querySelectorAll(".contador-item");
const cuentaMensaje = document.getElementById("cuentaMensaje");

contadorItems.forEach(item => {

    item.addEventListener("click", () => {

        item.classList.remove("pulsado");

        void item.offsetWidth;

        item.classList.add("pulsado");

        const unidad = item.dataset.unidad;

        cuentaMensaje.textContent =
            `${unidad}: cada segundo cuenta para este día especial.`;
    });
});


/* ---------- CALENDARIO ---------- */

document
    .getElementById("calendarioBtn")
    .addEventListener("click", () => {

        const inicio = "20261115T160000";
        const fin = "20261115T200000";

        const url =
            "https://calendar.google.com/calendar/render" +
            "?action=TEMPLATE" +
            "&text=Baby%20Shower%20Paola%20Marie" +
            "&dates=" +
            inicio +
            "/" +
            fin;

        window.open(url, "_blank");
    });


/* ---------- MAPA ---------- */

document
    .getElementById("mapaBtn")
    .addEventListener("click", () => {

        const direccion =
            encodeURIComponent("Dirección del evento");

        window.open(
            "https://www.google.com/maps/search/?api=1&query=" +
            direccion,
            "_blank"
        );
    });


/* ---------- SUBIR FOTOS ---------- */

const subirFotos = document.getElementById("subirFotos");
const fotosMensaje = document.getElementById("fotosMensaje");

subirFotos.addEventListener("change", () => {

    const cantidad = subirFotos.files.length;

    if (cantidad === 0) {
        fotosMensaje.textContent = "";
        return;
    }

    fotosMensaje.textContent =
        cantidad === 1
            ? "1 FOTO SELECCIONADA"
            : `${cantidad} FOTOS SELECCIONADAS`;
});


/* ---------- RSVP ---------- */

const rsvpBotones = document.querySelectorAll(".rsvp-btn");
const rsvpMensaje = document.getElementById("rsvpMensaje");

rsvpBotones.forEach(boton => {

    boton.addEventListener("click", () => {

        rsvpBotones.forEach(otro => {
            otro.classList.remove("seleccionado");
        });

        boton.classList.add("seleccionado");

        const respuesta = boton.dataset.respuesta;

        rsvpMensaje.textContent =
            `${respuesta} · ¡GRACIAS!`;
    });
});


/* ---------- PEQUEÑOS MOVIMIENTOS DE LOS ELEMENTOS ---------- */

document.querySelectorAll(".grafico-fresa").forEach(fresa => {

    fresa.addEventListener("click", () => {

        fresa.animate(
            [
                {
                    transform:
                        getComputedStyle(fresa).transform +
                        " rotate(0deg) scale(1)"
                },
                {
                    transform:
                        "rotate(10deg) scale(1.12)"
                },
                {
                    transform:
                        "rotate(-7deg) scale(1)"
                }
            ],
            {
                duration: 500,
                easing: "cubic-bezier(.2,.8,.2,1)"
            }
        );
    });
});


/* ---------- DESEOS PARA PAOLA ---------- */
const deseosForm = document.getElementById("deseosForm");
const deseoTexto = document.getElementById("deseoTexto");
const deseoMensaje = document.getElementById("deseoMensaje");

if (deseosForm) {
    deseosForm.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const deseo = deseoTexto.value.trim();

        if (!deseo) return;

        deseoMensaje.textContent = "¡Gracias por tu mensajito! ♡ Puedes copiarlo y compartirlo con Paola.";
        deseoTexto.select();

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(deseo).catch(() => {});
        }
    });
}

/* =========================================================
   LIMPIEZA DE BLANCOS EN PNG DECORATIVOS
   =========================================================
   Si algún PNG fue exportado con un blanco pegado alrededor,
   lo convierte a transparencia real en el navegador. Los tonos
   rosados, rojos y verdes no se eliminan.
*/
(function limpiarFondosBlancosDePNG() {
    const imagenes = document.querySelectorAll(
        ".marco-imagen, .grafico-lazo, .grafico-fresa"
    );

    imagenes.forEach((img) => {
        const limpiar = () => {
            if (!img.naturalWidth || !img.naturalHeight) return;

            try {
                const canvas = document.createElement("canvas");
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;

                const ctx = canvas.getContext("2d", { willReadFrequently: true });
                if (!ctx) return;

                ctx.drawImage(img, 0, 0);

                const datos = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const px = datos.data;

                let hayBlancoOpaco = false;

                for (let i = 0; i < px.length; i += 4) {
                    const r = px[i];
                    const g = px[i + 1];
                    const b = px[i + 2];
                    const a = px[i + 3];

                    if (
                        a > 245 &&
                        r >= 242 && g >= 242 && b >= 242 &&
                        Math.max(r, g, b) - Math.min(r, g, b) <= 10
                    ) {
                        hayBlancoOpaco = true;
                        break;
                    }
                }

                if (!hayBlancoOpaco) return;

                for (let i = 0; i < px.length; i += 4) {
                    const r = px[i];
                    const g = px[i + 1];
                    const b = px[i + 2];
                    const a = px[i + 3];

                    const esBlancoNeutral =
                        a > 0 &&
                        r >= 242 && g >= 242 && b >= 242 &&
                        Math.max(r, g, b) - Math.min(r, g, b) <= 10;

                    if (esBlancoNeutral) {
                        px[i + 3] = 0;
                    }
                }

                ctx.putImageData(datos, 0, 0);
                img.src = canvas.toDataURL("image/PNG");
            } catch (error) {
                /* Si el navegador bloquea canvas, se conserva el PNG original. */
            }
        };

        if (img.complete) {
            limpiar();
        } else {
            img.addEventListener("load", limpiar, { once: true });
        }
    });
})();
