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
    fecha.textContent = new Date(gasto.fecha).toISOString().slice(0, 10);
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

function nuevoGastoWeb() {
  let gastoDescripcion = prompt("Introduzca la descripción del gasto");
  let gastoValor = prompt("Introduzca el valor del gasto");
  let gastoFecha = prompt("Introduzca la fecha del gasto (yyyy-mm-dd)");
  let gastoEtiquetas = prompt("Introduzca etiquetas del gasto (primera,segunda,...)");
  let valorNumero = parseFloat(gastoValor);
  let etiquetas = gastoEtiquetas.split(",");

  let nuevoGasto = new gestionPresupuesto.CrearGasto(gastoDescripcion, valorNumero, gastoFecha, ...etiquetas);
  gestionPresupuesto.anyadirGasto(nuevoGasto);

  repintar();
}

let botonAnyadirGasto = document.getElementById("anyadirgasto");
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);


function EditarHandle() {
  this.handleEvent = function (event) {
    let gastoDescripcion = prompt("Introduzca la descripción del gasto.", this.gasto.descripcion);
    let gastoValor = prompt("Introduzca el valor del gasto.", this.gasto.valor);
    let gastoFecha = prompt("Introduzca la fecha del gasto (yyyy-mm-dd)", new Date(this.gasto.fecha)).toISOString().slice(0, 10);
    let gastoEtiquetas = prompt("Introduzca las etiquetas del gasto (primera,segunda,...)", this.gasto.etiquetas.join(","));
    let valorNumero = parseFloat(gastoValor);
    let etiquetas = gastoEtiquetas.split(",");

    this.gasto.actualizarDescripcion(gastoDescripcion);
    this.gasto.actualizarValor(valorNumero);
    this.gasto.actualizarFecha(gastoFecha);
    this.gasto.anyadirEtiquetas(...etiquetas);

    repintar();

  }
}

function BorrarHandle() {
  this.handleEvent = function (event) {
    gestionPresupuesto.borrarGasto(this.gasto.id);
    repintar();
  }
}

function BorrarEtiquetasHandle() {
  this.hadleEvent = function (event) {
    this.gasto.borrarEtiquetas(this.etiqueta);
    repintar();
  }
}
