import React, { useEffect, useState } from "react";
import { Container, Table, Spinner } from "react-bootstrap";

function ListarCombustible() {
  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch("http://localhost:5000/combustible");
        const data = await res.json();
        setRegistros(data);
      } catch (error) {
        alert("❌ Error al cargar datos: " + error.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <Container style={{ marginTop: 40 }}>
      <h3 className="mb-4">📊 Historial de Cargas de Combustible</h3>

      {cargando ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Vehículo</th>
              <th>Patente</th>
              <th>KM Anterior</th>
              <th>KM Actual</th>
              <th>KM Recorridos</th>
              <th>Litros</th>
              <th>Precio/Litro</th>
              <th>Total</th>
              <th>Rendimiento (km/L)</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((r, i) => (
              <tr key={i}>
                <td>{r.fecha}</td>
                <td>{r.vehiculo}</td>
                <td>{r.patente}</td>
                <td>{r.kmAnterior}</td>
                <td>{r.kmActual}</td>
                <td>{r.kmActual - r.kmAnterior}</td>
                <td>{r.litrosCargados}</td>
                <td>${r.precioPorLitro.toFixed(0)}</td>
                <td>${r.totalGastado.toFixed(0)}</td>
                <td>{r.rendimiento.toFixed(2)}</td>
                <td>{r.observaciones}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default ListarCombustible;
