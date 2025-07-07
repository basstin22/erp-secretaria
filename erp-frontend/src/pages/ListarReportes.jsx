import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import ReporteMaquinaria from "./ReporteMaquinaria";

function ListarReportes() {
  const [reportes, setReportes] = useState([]);
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/reportes")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReportes(data);
        } else {
          console.error("Respuesta inesperada:", data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener reportes:", error);
      });
  }, []);

  return (
    <Container style={{ maxWidth: 1000, padding: 20 }}>
      <h3 className="mb-4">📁 Reportes Guardados</h3>

      {reportes.length === 0 ? (
        <p>No hay reportes guardados.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>N° Reporte</th>
              <th>Empresa</th>
              <th>Máquina</th>
              <th>Obra</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((r, idx) => (
              <tr key={idx}>
                <td>{r.fecha}</td>
                <td>{r.numero}</td>
                <td>{r.empresa}</td>
                <td>{r.maquina}</td>
                <td>{r.obra}</td>
                <td>
                  <Button variant="info" size="sm" onClick={() => setReporteSeleccionado(r)}>
                    Ver
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {reporteSeleccionado && (
        <div className="mt-5">
          <h4>📝 Detalle del Reporte</h4>
          <ReporteMaquinaria datos={reporteSeleccionado} />
        </div>
      )}
    </Container>
  );
}

export default ListarReportes;
