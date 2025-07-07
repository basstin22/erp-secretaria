import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import {
  Button,
  Card,
  Col,
  Row,
  Navbar,
  Nav,
  Container,
  NavDropdown,
} from "react-bootstrap";
import axios from "axios";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/combustible")
      .then((res) => setDatos(res.data))
      .catch((err) => console.error(err));
  }, []);

  const agrupado = datos.reduce((acc, d) => {
    if (!acc[d.vehiculo]) acc[d.vehiculo] = [];
    acc[d.vehiculo].push(d);
    return acc;
  }, {});

  const labels = Object.keys(agrupado);
  const totalLitros = labels.map((vehiculo) =>
    agrupado[vehiculo].reduce((sum, r) => sum + r.litrosCargados, 0)
  );
  const totalGasto = labels.map((vehiculo) =>
    agrupado[vehiculo].reduce((sum, r) => sum + r.totalGastado, 0)
  );
  const totalKm = labels.map((vehiculo) =>
    agrupado[vehiculo].reduce((sum, r) => sum + (r.kmActual - r.kmAnterior), 0)
  );
  const rendimiento = labels.map((vehiculo, i) =>
    totalLitros[i] > 0 ? totalKm[i] / totalLitros[i] : 0
  );

  const totalCombustible = totalLitros.reduce((a, b) => a + b, 0);
  const totalDinero = totalGasto.reduce((a, b) => a + b, 0);

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">ERP Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto">

              <NavDropdown title="Servicios" id="navbarScrollingDropdown">
                <NavDropdown.Header>🧾 Facturación</NavDropdown.Header>
                <NavDropdown.Item href="/nueva-factura">Nueva Factura</NavDropdown.Item>
                <NavDropdown.Item href="/listar-facturas">Listar Facturas</NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Header>📝 Cotizaciones</NavDropdown.Header>
                <NavDropdown.Item href="/cotizacion">Crear Cotización</NavDropdown.Item>
                <NavDropdown.Item href="/buscar-cotizaciones">Buscar Cotizaciones</NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Header>🚚 Vehículos</NavDropdown.Header>
                <NavDropdown.Item href="/nuevo-equipo">Ingresar Vehículo</NavDropdown.Item>
                <NavDropdown.Item href="/listar-equipos">Ver Vehículos</NavDropdown.Item>
                <NavDropdown.Item href="/nuevo-combustible">Nueva Carga de Combustible</NavDropdown.Item>
                <NavDropdown.Item href="/rendimiento-historico">Rendimiento Histórico</NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Header>📋 Maquinaria</NavDropdown.Header>
                <NavDropdown.Item href="/nuevo-reporte">Nuevo Reporte</NavDropdown.Item>
                <NavDropdown.Item href="/listar-reportes">Listar Reportes</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="/graficos">📊 Ver Gráficos</Nav.Link>
              <Nav.Link href="/">🏠 Inicio</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container style={{ marginTop: "40px" }}>
        <h4 className="text-center mb-4">Panel de Control</h4>

        <Row className="mb-4">
          <Col md={6} lg={3}>
            <Card>
              <Card.Body>
                <Card.Title>Total Combustible</Card.Title>
                <Card.Text>{totalCombustible.toFixed(1)} L</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card>
              <Card.Body>
                <Card.Title>Total Dinero</Card.Title>
                <Card.Text>${totalDinero.toLocaleString()}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card>
              <Card.Body>
                <Card.Title>Vehículos</Card.Title>
                <Card.Text>{labels.length}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card>
              <Card.Body>
                <Card.Title>Cargas Totales</Card.Title>
                <Card.Text>{datos.length}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={12} lg={6}>
            <Card>
              <Card.Body>
                <Card.Title>⛽ Consumo de Combustible por Vehículo</Card.Title>
                <Bar
                  data={{
                    labels,
                    datasets: [
                      {
                        label: "Litros Cargados",
                        data: totalLitros,
                        backgroundColor: "rgba(54, 162, 235, 0.6)",
                      },
                    ],
                  }}
                  options={{ responsive: true }}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col md={12} lg={6}>
            <Card>
              <Card.Body>
                <Card.Title>💸 Gasto por Vehículo</Card.Title>
                <Doughnut
                  data={{
                    labels,
                    datasets: [
                      {
                        label: "Total Gasto",
                        data: totalGasto,
                        backgroundColor: [
                          "#FF6384",
                          "#36A2EB",
                          "#FFCE56",
                          "#4BC0C0",
                          "#9966FF",
                        ],
                      },
                    ],
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={12} lg={6}>
            <Card>
              <Card.Body>
                <Card.Title>📏 Rendimiento (km/L)</Card.Title>
                <Line
                  data={{
                    labels,
                    datasets: [
                      {
                        label: "Rendimiento Promedio",
                        data: rendimiento,
                        borderColor: "#4caf50",
                        backgroundColor: "rgba(76, 175, 80, 0.2)",
                      },
                    ],
                  }}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col md={12} lg={6}>
            <Card>
              <Card.Body>
                <Card.Title>🔁 Total KM por Vehículo</Card.Title>
                <Bar
                  data={{
                    labels,
                    datasets: [
                      {
                        label: "KM Totales",
                        data: totalKm,
                        backgroundColor: "rgba(255, 99, 132, 0.6)",
                      },
                    ],
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
