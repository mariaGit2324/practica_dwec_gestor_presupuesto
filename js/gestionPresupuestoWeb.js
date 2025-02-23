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

      let borradoEtiquetas = new BorrarEtiquetasHandle();
      borradoEtiquetas.gasto = gasto;
      borradoEtiquetas.etiqueta = etiqueta;
      span.addEventListener("click", borradoEtiquetas);

      etiquetas.appendChild(span);
    });
    bloque.appendChild(etiquetas);

    let botonEditar = document.createElement("button");
    botonEditar.classList.add("gasto-editar");
    botonEditar.type = "button";
    botonEditar.textContent = "Editar";

    let editarGasto = new EditarHandle();
    editarGasto.gasto = gasto;

    botonEditar.addEventListener("click", editarGasto);
    bloque.appendChild(botonEditar);

    let botonBorrar = document.createElement("button");
    botonBorrar.classList.add("gasto-borrar");
    botonBorrar.type = "button";
    botonBorrar.textContent = "Borrar";

    let borrarGasto = new BorrarHandle();
    borrarGasto.gasto = gasto;

    botonBorrar.addEventListener("click", borrarGasto);
    bloque.appendChild(botonBorrar);

    let botonBorrarAPI = document.createElement("button");
    botonBorrarAPI.type = "button";
    botonBorrarAPI.classList.add("gasto-borrar-api");
    botonBorrarAPI.textContent = "Borrar (API)";

    botonBorrarAPI.addEventListener("click", () => borrarGastoAPI(gasto.gastoId));
    bloque.appendChild(botonBorrarAPI);

    let botonEditarFormulario = document.createElement("button");
    botonEditarFormulario.type = "button";
    botonEditarFormulario.classList.add("gasto-editar-formulario");
    botonEditarFormulario.textContent = "Editar (formulario)";

    let editarFormulario = new EditarHandleformulario();
    editarFormulario.gasto = gasto;

    botonEditarFormulario.addEventListener("click", editarFormulario);
    bloque.appendChild(botonEditarFormulario);

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
    let gastoFecha = prompt("Introduzca la fecha del gasto (yyyy-mm-dd)", new Date(this.gasto.fecha).toISOString().slice(0, 10));
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
  this.handleEvent = function (event) {
    this.gasto.borrarEtiquetas(this.etiqueta);
    repintar();
  }
}

function nuevoGastoWebFormulario(event) {
  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

  var formulario = plantillaFormulario.querySelector("form");

  formulario.addEventListener("submit", enviarDatos);

  let datosCancelados = new CancelarDatos();
  datosCancelados.formulario = formulario;
  datosCancelados.botonFormulario = event.currentTarget;

  let botonCancelarFormulario = formulario.querySelector("button.cancelar");
  botonCancelarFormulario.addEventListener("click", datosCancelados);

  let botonEnviarAPI = formulario.querySelector(".gasto-enviar-api");

  botonEnviarAPI.addEventListener("click", async function () {
    await enviarGastoAPI(formulario);
  });

  event.currentTarget.disabled = true;

  let formularioDatos = document.getElementById("controlesprincipales");
  formularioDatos.appendChild(formulario);

  async function enviarGastoAPI(formulario) {
    let nombreUsuario = document.getElementById("nombre_usuario").value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;

    let nuevoGasto = {
      descripcion: formulario.elements.descripcion.value,
      valor: parseFloat(formulario.elements.valor.value),
      fecha: formulario.elements.fecha.value,
      etiquetas: formulario.elements.etiquetas.value.split(",").map(etiqueta => etiqueta.trim())
    };

    try {
      let respuesta = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoGasto)
      });

      if (!respuesta.ok) throw new Error("Error al enviar el gasto.");

      await cargarGastosAPI();
      alert("El gasto se ha creado correctamente.");
    } catch (error) {
      console.log("Error al enviar el gasto a la API: " + error.Message);
    }
  }

}

let botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
botonAnyadirGastoFormulario.addEventListener("click", nuevoGastoWebFormulario);

function enviarDatos(event) {
  event.preventDefault();

  let descripcion = event.currentTarget.elements.descripcion.value;
  let valor = parseFloat(event.currentTarget.elements.valor.value);
  let fecha = event.currentTarget.elements.fecha.value;
  let etiquetas = event.currentTarget.elements.etiquetas.value.split(',');

  let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);
  gestionPresupuesto.anyadirGasto(nuevoGasto);
  repintar();

  let botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
  botonAnyadirGastoFormulario.disabled = false;
}

function CancelarDatos() {
  this.handleEvent = function (event) {
    this.formulario.remove();
    this.botonFormulario.removeAttribute("disabled");
  }
}

function EditarHandleformulario() {
  this.handleEvent = function (event) {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");

    formulario.elements.descripcion.value = this.gasto.descripcion;
    formulario.elements.valor.value = this.gasto.valor;
    formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().slice(0, 10);
    formulario.elements.etiquetas.value = this.gasto.etiquetas.join(",");

    let datosActualizados = new EditarFormularioUpdate();
    datosActualizados.gasto = this.gasto;
    formulario.addEventListener("submit", datosActualizados);

    let botonEnviarAPI = formulario.querySelector(".gasto-enviar-api");
    botonEnviarAPI.addEventListener("click", async () => {
      let nombreUsuario = document.getElementById("nombre_usuario").value;
      if (!nombreUsuario) {
        alert("Introduce un nombre de usuario.");
        return;
      }

      let gastoId = this.gasto.gastoId;
      let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${gastoId}`;

      let gastoActualizado = {
        descripcion: formulario.elements.descripcion.value,
        valor: parseFloat(formulario.elements.valor.value),
        fecha: formulario.elements.fecha.value,
        etiquetas: formulario.elements.etiquetas.value.split(",").map(etiqueta => etiqueta.trim()),
      };

      try {
        let respuesta = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(gastoActualizado)
        });

        if (!respuesta.ok) throw new Error("Error al actualizar el gasto.");

        await cargarGastosAPI();
        alert("Gasto actualizado correctamente.");
      } catch (error) {
        console.log("Error al actualizar el gasto: " + error.Message);
      }
    });

    let botonCancelarActualizacion = formulario.querySelector(".cancelar");
    let cancelarActualizacionDatos = new CancelarDatos();
    cancelarActualizacionDatos.botonFormulario = event.currentTarget;
    cancelarActualizacionDatos.formulario = formulario;
    botonCancelarActualizacion.addEventListener("click", cancelarActualizacionDatos);
    event.currentTarget.disabled = true;

    let bloqueFormulario = document.querySelector(".gasto");
    bloqueFormulario.appendChild(formulario);
  }
}

function EditarFormularioUpdate() {
  this.handleEvent = function (event) {
    this.gasto.actualizarDescripcion(event.currentTarget.elements.descripcion.value);
    this.gasto.actualizarValor(parseFloat(event.currentTarget.elements.valor.value));
    this.gasto.actualizarFecha(event.currentTarget.elements.fecha.value);
    let etiquetas = event.currentTarget.elements.etiquetas.value.split(",");
    this.gasto.borrarEtiquetas(...this.gasto.etiquetas);
    this.gasto.anyadirEtiquetas(...etiquetas);

    event.preventDefault();
    repintar();
  }
}

function filtrarGastosWeb(event) {
  event.preventDefault();

  let nuevoGasto = {};
  let descripcion = event.currentTarget.elements["formulario-filtrado-descripcion"].value;
  if (descripcion) {
    nuevoGasto.descripcionContiene = descripcion;
  }
  let valorMinimo = event.currentTarget.elements["formulario-filtrado-valor-minimo"].value;
  if (valorMinimo) {
    nuevoGasto.valorMinimo = valorMinimo;
  }
  let valorMaximo = event.currentTarget.elements["formulario-filtrado-valor-maximo"].value;
  if (valorMaximo) {
    nuevoGasto.valorMaximo = valorMaximo;
  }
  let fechaDesde = event.currentTarget.elements["formulario-filtrado-fecha-desde"].value;
  if (fechaDesde) {
    nuevoGasto.fechaDesde = fechaDesde;
  }
  let fechaHasta = event.currentTarget.elements["formulario-filtrado-fecha-hasta"].value;
  if (fechaHasta) {
    nuevoGasto.fechaHasta = fechaHasta;
  }
  let etiquetas = event.currentTarget.elements["formulario-filtrado-etiquetas-tiene"].value;
  if (etiquetas) {
    nuevoGasto.etiquetasTiene = gestionPresupuesto.transformarListadoEtiquetas(etiquetas);
  };
  console.log(nuevoGasto);
  let gastosFiltrados = gestionPresupuesto.filtrarGastos(nuevoGasto);

  let resetearListado = document.getElementById("listado-gastos-completo");
  resetearListado.innerHTML = "";

  gastosFiltrados.forEach(gasto => {
    mostrarGastoWeb("listado-gastos-completo", gasto);
  })
}

let botonFiltrarGastosWeb = document.getElementById("formulario-filtrado");
botonFiltrarGastosWeb.addEventListener("submit", filtrarGastosWeb);

function guardarGastosWeb() {
  let gastos = gestionPresupuesto.listarGastos();
  localStorage.setItem("GestorGastosDWEC", JSON.stringify(gastos));
};

let botonGuardarDatos = document.getElementById("guardar-gastos");
botonGuardarDatos.addEventListener("click", guardarGastosWeb);

function cargarGastosWeb() {
  let gastosRecuperados = localStorage.getItem("GestorGastosDWEC");
  let gastosFinales;

  if (gastosRecuperados) {
    gastosFinales = JSON.parse(gastosRecuperados);
  } else {
    gastosFinales = [];
  }

  gestionPresupuesto.cargarGastos(gastosFinales);

  repintar();
};

let botonCargarDatos = document.getElementById("cargar-gastos");
botonCargarDatos.addEventListener("click", cargarGastosWeb);

async function cargarGastosAPI() {
  let nombreUsuario = document.getElementById("nombre_usuario").value;
  if (!nombreUsuario) {
    alert("Introduce un nombre de usuario.");
    return;
  }

  let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;

  try {
    let respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error("Error al cargar los gastos.");

    let gastos = await respuesta.json();
    gestionPresupuesto.cargarGastos(gastos);
    repintar();
  } catch (error) {
    console.log("Error: " + error.message);
  }
}

document.getElementById("cargar-gastos-api").addEventListener("click", cargarGastosAPI);

async function borrarGastoAPI(id) {
  const usuario = document.getElementById("nombre_usuario").value;
  if (!usuario) {
    alert("Introduce un nombre de usuario");
    return;
  }

  const url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${id}`;

  try {
    const respuesta = await fetch(url, { method: "DELETE" });
    if (!respuesta.ok) throw new Error("Error al borrar el gasto.");

    cargarGastosAPI();
    alert("El gasto se ha borrado correctamente.");
  } catch (error) {
    console.log("Error: " + error.Message);
  }
}
