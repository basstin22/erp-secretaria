import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Button, Collapse, Table } from "react-bootstrap";

function RendimientoVehiculos() {
  const [agrupado, setAgrupado] = useState([]);
  const [detalleVisible, setDetalleVisible] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/combustible")
      .then(res => {
        const agrupadoPorVehiculo = res.data.reduce((acc, reg) => {
          const key = reg.vehiculo;
          if (!acc[key]) acc[key] = [];
          acc[key].push(reg);
          return acc;
        }, {});

        setAgrupado(agrupadoPorVehiculo);
      });
  }, []);

  const toggleDetalle = (vehiculo) => {
    setDetalleVisible(prev => ({
      ...prev,
      [vehiculo]: !prev[vehiculo],
    }));
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">📈 Rendimiento Histórico por Vehículo</h3>
      <Row>
        {Object.entries(agrupado).map(([vehiculo, registros]) => {
          const totalKM = registros.reduce((sum, r) => sum + (r.kmActual - r.kmAnterior), 0);
          const totalLitros = registros.reduce((sum, r) => sum + r.litrosCargados, 0);
          const totalGasto = registros.reduce((sum, r) => sum + r.totalGastado, 0);
          const promedio = totalLitros > 0 ? totalKM / totalLitros : 0;

          return (
            <Col md={6} key={vehiculo} className="mb-4">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <Card.Title className="mb-3">🚗 {vehiculo}</Card.Title>
                  <p><strong>⛽ Litros:</strong> {totalLitros.toFixed(1)} L</p>
                  <p><strong>💸 Total:</strong> ${totalGasto.toLocaleString()}</p>
                  <p><strong>📏 KM Totales:</strong> {totalKM} km</p>
                  <p><strong>⚙️ Promedio:</strong> {promedio.toFixed(2)} km/L</p>
                  <p><strong>🔁 Cargas registradas:</strong> {registros.length}</p>

                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => toggleDetalle(vehiculo)}
                  >
                    {detalleVisible[vehiculo] ? "🔼 Ocultar detalles" : "📂 Ver detalles"}
                  </Button>

                  <Collapse in={detalleVisible[vehiculo]}>
                    <div className="mt-3">
                      <Table bordered size="sm" responsive>
                        <thead>
                          <tr>
                            <th>Fecha</th>
                            <th>KM</th>
                            <th>Litros</th>
                            <th>Total</th>
                            <th>Rend.</th>
                          </tr>
                        </thead>
                        <tbody>
                          {registros.map((r, idx) => (
                            <tr key={idx}>
                              <td>{r.fecha}</td>
                              <td>{r.kmActual - r.kmAnterior}</td>
                              <td>{r.litrosCargados}</td>
                              <td>${r.totalGastado.toLocaleString()}</td>
                              <td>{r.rendimiento.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Collapse>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default RendimientoVehiculos;
