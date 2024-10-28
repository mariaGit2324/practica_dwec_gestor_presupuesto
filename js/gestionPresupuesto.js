// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(cantidad) {
  if (cantidad >= 0) {
    presupuesto = cantidad;
    return presupuesto;
  } else {
    console.log("Se ha introducido una cantidad negativa.");
    return -1;
  };

};

function mostrarPresupuesto() {
  return `Tu presupuesto actual es de ${presupuesto} €`;
};

function CrearGasto(descripcion, gasto, fecha = Date.now(), ...etiquetas) {
  this.descripcion = descripcion;

  if (gasto >= 0) {
    this.valor = gasto;
  } else {
    this.valor = 0;
  }

  if (isNaN(Date.parse(fecha))) {
    this.fecha = Date.now();
  } else {
    this.fecha = Date.parse(fecha);
  }

  this.mostrarGasto = function () {
    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
  }

  this.mostrarGastoCompleto = function () {
    let fechaFormatoLocalizado = new Date(this.fecha).toLocaleString();

    let etiquetasFormateadas = this.etiquetas.map(etiqueta => `- ${etiqueta}`).join('\n');

    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n` +
      `Fecha: ${fechaFormatoLocalizado}\n` +
      `Etiquetas:\n${etiquetasFormateadas}\n`
  }

  this.actualizarDescripcion = function (nuevaDescripcion) {
    this.descripcion = nuevaDescripcion;
  }

  this.actualizarValor = function (nuevoGasto) {
    if (nuevoGasto >= 0) {
      this.valor = nuevoGasto;
    }
  }

  this.actualizarFecha = function (fechaNueva) {
    if (!isNaN(Date.parse(fechaNueva))) {
      this.fecha = Date.parse(fechaNueva);
    }
  }

  this.anyadirEtiquetas = function (...etiquetasNuevas) {
    etiquetasNuevas.forEach(etiqueta => {
      if (!this.etiquetas.includes(etiqueta)) {
        this.etiquetas.push(etiqueta);
      }
    })
  }

  this.etiquetas = [];
  this.anyadirEtiquetas(...etiquetas);

  this.borrarEtiquetas = function (...etiquetasParaBorrar) {
    this.etiquetas = this.etiquetas.filter(etiqueta => !etiquetasParaBorrar.includes(etiqueta));
  }

}

function listarGastos() {
  return gastos;
};

function anyadirGasto(gasto) {
  gasto.id = idGasto;
  idGasto++;
  gastos.push(gasto);
};

function borrarGasto(id) {
  gastos = gastos.filter(gasto => gasto.id != id);
};

function calcularTotalGastos() {
  return gastos.reduce((suma, gasto) => suma + gasto.valor, 0);
};

function calcularBalance() {
  let gastosTotales = calcularTotalGastos();

  return presupuesto - gastosTotales;
};


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
  mostrarPresupuesto,
  actualizarPresupuesto,
  CrearGasto,
  listarGastos,
  anyadirGasto,
  borrarGasto,
  calcularTotalGastos,
  calcularBalance
}
