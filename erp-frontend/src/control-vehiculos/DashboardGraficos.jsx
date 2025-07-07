import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Badge
} from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

const colores = ["#3f51b5", "#4caf50", "#ff9800", "#00bcd4", "#e91e63"];

const Indicador = ({ titulo, valor, color }) => (
  <Card
    style={{
      padding: 20,
      background: color,
      color: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    }}
  >
    <h6 style={{ fontSize: "16px", marginBottom: 8 }}>{titulo}</h6>
    <h4 style={{ fontSize: "24px", margin: 0 }}>{valor}</h4>
  </Card>
);

const DashboardGraficos = () => {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/combustible")
      .then(res => setDatos(res.data))
      .catch(() => alert("❌ Error al cargar datos"))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  // Agrupar por vehículo
  const agrupado = datos.reduce((acc, d) => {
    const key = d.vehiculo;
    if (!acc[key]) acc[key] = [];
    acc[key].push(d);
    return acc;
  }, {});

  const resumen = Object.entries(agrupado).map(([vehiculo, registros]) => {
    const totalLitros = registros.reduce((a, b) => a + b.litrosCargados, 0);
    const totalGasto = registros.reduce((a, b) => a + b.totalGastado, 0);
    const totalKm = registros.reduce((a, b) => a + (b.kmActual - b.kmAnterior), 0);
    const promedio = totalLitros > 0 ? totalKm / totalLitros : 0;

    return {
      vehiculo,
      totalLitros,
      totalGasto,
      totalKm,
      promedio,
    };
  });

  const totalLitrosGlobal = resumen.reduce((a, b) => a + b.totalLitros, 0);
  const totalGastoGlobal = resumen.reduce((a, b) => a + b.totalGasto, 0);
  const promedioGlobal =
    totalLitrosGlobal > 0 ? resumen.reduce((a, b) => a + b.totalKm, 0) / totalLitrosGlobal : 0;

  return (
    <Container className="mt-5 mb-5">
      <h3 className="text-center mb-4">📊 Dashboard de Rendimiento</h3>

      {/* Indicadores */}
      <Row className="mb-4" xs={1} md={3}>
        <Col><Indicador titulo="⛽ Total Litros" valor={`${totalLitrosGlobal.toFixed(1)} L`} color="#2196f3" /></Col>
        <Col><Indicador titulo="💸 Total Gasto" valor={`$${totalGastoGlobal.toLocaleString()}`} color="#4caf50" /></Col>
        <Col><Indicador titulo="⚙️ Promedio Global" valor={`${promedioGlobal.toFixed(2)} km/L`} color="#ff9800" /></Col>
      </Row>

      {/* Gráfico de barras */}
      <Card className="p-3 mb-4 shadow-sm">
        <h5>🔋 Consumo de Combustible por Maquinaria</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={resumen}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="vehiculo" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalLitros" fill="#3f51b5" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Gráfico circular */}
      <Card className="p-3 mb-4 shadow-sm">
        <h5>🎯 Porcentaje de Gasto por Vehículo</h5>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={resumen}
              dataKey="totalGasto"
              nameKey="vehiculo"
              outerRadius={100}
              label
            >
              {resumen.map((_, i) => (
                <Cell key={i} fill={colores[i % colores.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Gráfico de barras de rendimiento */}
      <Card className="p-3 mb-4 shadow-sm">
        <h5>⚙️ Rendimiento Promedio por Vehículo (km/L)</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={resumen}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="vehiculo" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="promedio" fill="#00bcd4" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </Container>
  );
};

export default DashboardGraficos;
