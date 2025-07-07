// src/pages/BuscarCotizaciones.jsx
import React, { useEffect, useState } from "react";
import MostrarCotizacion from "./MostrarCotizacion";

function BuscarCotizaciones() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);

  // Al cargar la página, obtenemos las cotizaciones desde el backend
  useEffect(() => {
    fetch("http://localhost:5000/cotizaciones")
      .then((res) => res.json())
      .then((data) => setCotizaciones(data))
      .catch((error) => console.error("Error al obtener cotizaciones:", error));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Buscar Cotizaciones</h2>

      {cotizaciones.length === 0 ? (
        <p>No hay cotizaciones guardadas.</p>
      ) : (
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th style={thStyle}>N°</th>
                <th style={thStyle}>Cliente</th>
                <th style={thStyle}>Producto</th>
                <th style={thStyle}>Fecha</th>
                <th style={thStyle}></th>
              </tr>
            </thead>
            <tbody>
              {cotizaciones.map((coti, i) => (
                <tr key={i}>
                  <td style={tdStyle}>{coti.numero}</td>
                  <td style={tdStyle}>{coti.cliente}</td>
                  <td style={tdStyle}>{coti.producto}</td>
                  <td style={tdStyle}>
                    {new Date(coti.fecha).toLocaleDateString("es-CL")}
                  </td>
                  <td style={tdStyle}>
                    <button onClick={() => setSeleccionada(coti)} style={buttonStyle}>
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {seleccionada && (
        <div style={{ marginTop: 40 }}>
          <MostrarCotizacion datos={seleccionada} />
        </div>
      )}
    </div>
  );
}

const thStyle = {
  border: "1px solid #ccc",
  padding: 8,
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: 8,
};

const buttonStyle = {
  padding: "5px 10px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default BuscarCotizaciones;
