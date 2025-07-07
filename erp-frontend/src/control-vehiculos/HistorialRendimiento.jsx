import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Collapse,
  Table,
  Spinner,
  Badge,
} from "react-bootstrap";

function HistorialRendimiento() {
  const [agrupado, setAgrupado] = useState({});
  const [detalleVisible, setDetalleVisible] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/combustible")
      .then((res) => {
        const agrupadoPorVehiculo = res.data.reduce((acc, reg) => {
          const key = reg.vehiculo;
          if (!acc[key]) acc[key] = [];
          acc[key].push(reg);
          return acc;
        }, {});
        setAgrupado(agrupadoPorVehiculo);
      })
      .catch(() => alert("❌ Error al cargar datos"))
      .finally(() => setCargando(false));
  }, []);

  const toggleDetalle = (vehiculo) => {
    setDetalleVisible((prev) => ({
      ...prev,
      [vehiculo]: !prev[vehiculo],
    }));
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-center">📈 Rendimiento Histórico por Vehículo</h3>

      {cargando ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : Object.keys(agrupado).length === 0 ? (
        <p className="text-center">No hay registros aún.</p>
      ) : (
        <Row xs={1} md={2} lg={2}>
          {Object.entries(agrupado).map(([vehiculo, registros], i) => {
            const totalKM = registros.reduce(
              (sum, r) => sum + (r.kmActual - r.kmAnterior),
              0
            );
            const totalLitros = registros.reduce((sum, r) => sum + r.litrosCargados, 0);
            const totalGasto = registros.reduce((sum, r) => sum + r.totalGastado, 0);
            const promedio = totalLitros > 0 ? totalKM / totalLitros : 0;
            const ultimaFecha = registros[registros.length - 1]?.fecha;
            const patente = registros[0]?.patente || "";

            return (
              <Col key={i} className="mb-4">
                <Card className="shadow-sm border-0">
                  <Card.Body>
                    <Card.Title className="mb-2">
                      🚗 {vehiculo}
                      {patente && (
                        <Badge bg="secondary" className="ms-2">
                          {patente}
                        </Badge>
                      )}
                    </Card.Title>
                    <hr />

                    <Row>
                      <Col xs={6}>
                        <p><strong>⛽ Litros:</strong> {totalLitros.toFixed(1)} L</p>
                        <p><strong>💸 Total:</strong> ${totalGasto.toLocaleString()}</p>
                      </Col>
                      <Col xs={6}>
                        <p><strong>📏 KM Totales:</strong> {totalKM} km</p>
                        <p>
                          <strong>⚙️ Promedio:</strong>{" "}
                          <span style={{ color: promedio < 3 ? "red" : "green" }}>
                            {promedio.toFixed(2)} km/L
                          </span>
                        </p>
                      </Col>
                    </Row>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <small className="text-muted">
                        🔁 Cargas registradas: {registros.length}{" "}
                        {ultimaFecha && <>| Última: {ultimaFecha}</>}
                      </small>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => toggleDetalle(vehiculo)}
                      >
                        {detalleVisible[vehiculo] ? "🔼 Ocultar detalles" : "📂 Ver detalles"}
                      </Button>
                    </div>

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
      )}
    </Container>
  );
}

export default HistorialRendimiento;
