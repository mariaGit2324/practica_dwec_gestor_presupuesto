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
    titulo.textContent = `Gastos agrupados por ${periodo}`;
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
