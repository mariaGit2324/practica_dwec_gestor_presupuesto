// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

let presupuesto = 0;

function actualizarPresupuesto(cantidad) {
  if (cantidad >= 0) {
    presupuesto = cantidad;
    return presupuesto;
  } else {
    console.log("Se ha introducido una cantidad negativa.");
    return -1;
  };

}

function mostrarPresupuesto() {
  return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, gasto) {
  this.descripcion = descripcion;

  if (gasto >= 0) {
    this.valor = gasto;
  } else {
    this.valor = 0;
  }

  this.mostrarGasto = function () {
    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
  }

  this.actualizarDescripcion = function (nuevaDescripcion) {
    this.descripcion = nuevaDescripcion;
  }

  this.actualizarValor = function (nuevoGasto) {
    if (nuevoGasto >= 0) {
      this.valor = nuevoGasto;
    }
  }

}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
  mostrarPresupuesto,
  actualizarPresupuesto,
  CrearGasto
}
