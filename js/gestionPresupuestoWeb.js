import * as gestionPresupuesto from './gestionPresupuesto.js';

export function mostrarDatoEnId(idElemento, valor) {
  let elemento = document.getElementById(idElemento);

  if (elemento) {
    elemento.textContent = valor;
  }
}

export function mostrarGastoWeb(idElemento, gasto) {
  let mostrarGasto = document.getElementById(idElemento);

  if (mostrarGasto) {
    let bloque = document.createElement("div");
    bloque.classList.add("gasto");

    let descripcion = document.createElement("div");
    descripcion.classList.add("gasto-descripcion");
    descripcion.textContent = gasto.descripcion;
    bloque.appendChild(descripcion);

    let fecha = document.createElement("div");
    fecha.classList.add("gasto-fecha");
    fecha.textContent = gasto.fecha;
    bloque.appendChild(fecha);

    let gastoValor = document.createElement("div");
    gastoValor.classList.add("gasto-valor");
    gastoValor.textContent = gasto.valor;
    bloque.appendChild(gastoValor);

    let etiquetas = document.createElement("div");
    etiquetas.classList.add("gasto-etiquetas");

    gasto.etiquetas.forEach(etiqueta => {
      let span = document.createElement("span");
      span.classList.add("gasto-etiquetas-etiqueta");
      span.textContent = etiqueta;
      etiquetas.appendChild(span);
    });
    bloque.appendChild(etiquetas);

    mostrarGasto.appendChild(bloque);

  }
}

export function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
  let gastosAgrupados = document.getElementById(idElemento);

  if (gastosAgrupados) {
    let bloque = document.createElement("div");
    bloque.classList.add("agrupacion");

    let titulo = document.createElement("h1");
    if (periodo == "anyo") {
      titulo.textContent = "Gastos agrupados por año";
    } else {
      titulo.textContent = `Gastos agrupados por ${periodo}`;
    }
    bloque.appendChild(titulo);

    Object.entries(agrup).forEach(([clave, valor]) => {
      let dato = document.createElement("div");
      dato.classList.add("agrupacion-dato");

      let claveSpan = document.createElement("span");
      claveSpan.classList.add("agrupacion-dato-clave");
      claveSpan.textContent = clave;
      dato.appendChild(claveSpan);

      let valorSpan = document.createElement("span");
      valorSpan.classList.add("agrupacion-dato-valor");
      valorSpan.textContent = valor;
      dato.appendChild(valorSpan);

      bloque.appendChild(dato);
    });

    gastosAgrupados.appendChild(bloque);
  }
}

export function repintar() {
  let presupuesto = gestionPresupuesto.mostrarPresupuesto();
  mostrarDatoEnId("presupuesto", presupuesto);

  let gastosTotales = gestionPresupuesto.calcularTotalGastos();
  mostrarDatoEnId("gastos-totales", gastosTotales);

  let balanceTotal = gestionPresupuesto.calcularBalance();
  mostrarDatoEnId("balance-total", balanceTotal);

  let listadoAnterior = document.getElementById("listado-gastos-completo");
  listadoAnterior.innerHTML = "";

  let listadoNuevo = gestionPresupuesto.listarGastos();
  listadoNuevo.forEach(gasto => {
    mostrarGastoWeb("listado-gastos-completo", gasto);
  })
}

function actualizarPresupuestoWeb() {
  let presupuestoNuevo = prompt("Introduzca nuevo presupuesto");
  let numPresupuesto = parseFloat(presupuestoNuevo);

  if (!isNaN(numPresupuesto)) {
    gestionPresupuesto.actualizarPresupuesto(numPresupuesto);
  }

  repintar();
}

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);
