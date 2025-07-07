import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Inicio from "./pages/Inicio";
import NuevaFactura from "./pages/NuevaFactura";
import Factura from "./pages/Factura";
import Cotizacion from "./pages/Cotizacion";
import BuscarCotizaciones from "./pages/BuscarCotizaciones";
import Dashboard from "./pages/Dashboard";
import NuevoReporte from "./pages/NuevoReporte";
import ListarReportes from "./pages/ListarReportes";
import ListarFacturas from "./pages/ListarFacturas";
import ControlVehiculos from "./control-vehiculos/ControlVehiculos";
import NuevoCombustible from "./control-vehiculos/NuevoCombustible";
import NuevoEquipo from "./control-vehiculos/NuevoEquipo";
import ListarEquipos from "./control-vehiculos/ListarEquipos";
import HistorialRendimiento from "./control-vehiculos/HistorialRendimiento";
import DashboardGraficos from "./control-vehiculos/DashboardGraficos";

function App() {
  const [facturaGuardada, setFacturaGuardada] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} /> {/* ✅ Dashboard ahora es la raíz */}
        <Route path="/inicio" element={<Inicio />} /> {/* Puedes mover Inicio acá si aún lo usas */}
        <Route path="/nueva-factura" element={<NuevaFactura onGuardar={setFacturaGuardada} />} />
        <Route
          path="/factura"
          element={
            facturaGuardada ? (
              <Factura datos={facturaGuardada} />
            ) : (
              <p style={{ textAlign: "center" }}>No hay factura guardada aún.</p>
            )
          }
        />
        <Route path="/cotizacion" element={<Cotizacion />} />
        <Route path="/buscar-cotizaciones" element={<BuscarCotizaciones />} />
        <Route path="/nuevo-reporte" element={<NuevoReporte />} />
        <Route path="/listar-reportes" element={<ListarReportes />} />
        <Route path="/listar-facturas" element={<ListarFacturas />} />
        <Route path="/control-vehiculos" element={<ControlVehiculos />} />
        <Route path="/nuevo-combustible" element={<NuevoCombustible />} />
        <Route path="/nuevo-equipo" element={<NuevoEquipo />} />
        <Route path="/listar-equipos" element={<ListarEquipos />} />
        <Route path="/rendimiento-historico" element={<HistorialRendimiento />} />
        <Route path="/graficos" element={<DashboardGraficos />} />
      </Routes>
    </Router>
  );
}

export default App;
