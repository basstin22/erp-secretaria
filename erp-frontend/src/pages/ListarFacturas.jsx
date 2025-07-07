import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Factura from "./Factura";

function ListarFacturas() {
  const [facturas, setFacturas] = useState([]);
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/facturas")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFacturas(data);
        } else {
          console.error("Respuesta inesperada:", data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener facturas:", error);
      });
  }, []);

  return (
    <Container style={{ maxWidth: 1000, padding: 20 }}>
      <h3 className="mb-4">📁 Facturas Guardadas</h3>

      {facturas.length === 0 ? (
        <p>No hay facturas guardadas.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>N° Factura</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((f, idx) => (
              <tr key={idx}>
                <td>{new Date(f.fecha).toLocaleDateString("es-CL")}</td>
                <td>{f.numeroFactura}</td>
                <td>{f.cliente}</td>
                <td>${f.total.toLocaleString("es-CL")}</td>
                <td>
                  <Button variant="info" size="sm" onClick={() => setFacturaSeleccionada(f)}>
                    Ver
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {facturaSeleccionada && (
        <div className="mt-5">
          <h4>🧾 Detalle de la Factura</h4>
          <Factura datos={facturaSeleccionada} />
        </div>
      )}
    </Container>
  );
}

export default ListarFacturas;
