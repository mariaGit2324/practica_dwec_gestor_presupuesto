import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';

gestionPresupuesto.actualizarPresupuesto(1500);

let presupuesto = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", presupuesto);

let gastosCreados = [
  gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"),
  gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"),
  gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"),
  gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"),
  gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"),
  gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")
];

gastosCreados.forEach(gasto => gestionPresupuesto.anyadirGasto(gasto));

let gastosTotales = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", gastosTotales);

let balanceTotal = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", balanceTotal);

let listadoGastos = gestionPresupuesto.listarGastos();
listadoGastos.forEach(gasto => gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto));

let gastosSeptiembre2021 = gestionPresupuesto.filtrarGastos({ mes: "2021-09" });
gastosSeptiembre2021.forEach(gasto => gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto));

let gastoMayor50 = gestionPresupuesto.filtrarGastos({ valorMinimo: 50 });
gastoMayor50.forEach(gasto => gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto));

let gastoMayor200Seguros = gestionPresupuesto.filtrarGastos({ valorMinimo: 200, etiquetas: ["seguros"] });
gastosMayor200Seguros.forEach(gasto => gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto));

let gastosComidaTransporteMenos50 = gestionPresupuesto.filtrarGastos({ valorMaximo: 49; etiquetas: ["comida", "transporte"] });
gastosComidaTransporteMenos50.forEach(gasto => gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto));

let gastosDia = gestionPresupuesto.agruparGastos(dia);
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gastosDia, "día");

let gastosMes = gestionPresupuesto.agruparGastos(mes);
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gastosMes, "mes");

let gastosAnyo = gestionPresupuesto.agruparGastos(anyo);
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAnyo, "anyo");
