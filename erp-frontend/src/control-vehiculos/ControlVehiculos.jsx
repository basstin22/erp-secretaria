import React, { useEffect, useState } from "react";
import { Container, Table, Spinner, Form } from "react-bootstrap";

function ControlVehiculos() {
  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroVehiculo, setFiltroVehiculo] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
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

    cargarDatos();
  }, []);

  const registrosFiltrados = filtroVehiculo
    ? registros.filter((r) => r.vehiculo === filtroVehiculo)
    : registros;

  // Agrupar resumen por vehículo
  const resumenVehiculos = registrosFiltrados.reduce((acc, r) => {
    const kmRecorridos = r.kmActual - r.kmAnterior;
    const totalGasto = r.litrosCargados * r.precioPorLitro;

    if (!acc[r.vehiculo]) {
      acc[r.vehiculo] = {
        vehiculo: r.vehiculo,
        cargas: 0,
        totalKM: 0,
        totalLitros: 0,
        totalGasto: 0,
      };
    }

    acc[r.vehiculo].cargas += 1;
    acc[r.vehiculo].totalKM += kmRecorridos;
    acc[r.vehiculo].totalLitros += r.litrosCargados;
    acc[r.vehiculo].totalGasto += totalGasto;

    return acc;
  }, {});

  const resumenArray = Object.values(resumenVehiculos).map((v) => ({
    ...v,
    rendimiento: v.totalKM / v.totalLitros,
  }));

  const vehiculosUnicos = [...new Set(registros.map((r) => r.vehiculo))];

  return (
    <Container style={{ marginTop: 40 }}>
      <h3 className="mb-4">📋 Control de Combustible y Kilometraje</h3>

      <Form.Group className="mb-3">
        <Form.Label>🔍 Filtrar por Vehículo</Form.Label>
        <Form.Select
          value={filtroVehiculo}
          onChange={(e) => setFiltroVehiculo(e.target.value)}
        >
          <option value="">Todos</option>
          {vehiculosUnicos.map((v, i) => (
            <option key={i} value={v}>
              {v}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {cargando ? (
        <Spinner animation="border" />
      ) : (
        <>
          <h5 className="mt-4 mb-3">📄 Detalle de Cargas</h5>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Vehículo</th>
                <th>Patente</th>
                <th>KM Anterior</th>
                <th>KM Actual</th>
                <th>KM Recorridos</th>
                <th>Litros</th>
                <th>Rendimiento (km/L)</th>
                <th>$/Litro</th>
                <th>Total</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {registrosFiltrados.map((r, i) => {
                const kmRecorridos = r.kmActual - r.kmAnterior;
                const rendimiento = kmRecorridos / r.litrosCargados;
                const total = r.litrosCargados * r.precioPorLitro;

                return (
                  <tr key={i}>
                    <td>{r.fecha}</td>
                    <td>{r.vehiculo}</td>
                    <td>{r.patente}</td>
                    <td>{r.kmAnterior}</td>
                    <td>{r.kmActual}</td>
                    <td>{kmRecorridos}</td>
                    <td>{r.litrosCargados}</td>
                    <td>{rendimiento.toFixed(2)}</td>
                    <td>${r.precioPorLitro.toLocaleString("es-CL")}</td>
                    <td>${total.toLocaleString("es-CL")}</td>
                    <td>{r.observaciones}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <h5 className="mt-5 mb-3">📊 Resumen por Vehículo</h5>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Vehículo</th>
                <th>Cargas</th>
                <th>KM Totales</th>
                <th>Litros Totales</th>
                <th>Total Gastado</th>
                <th>Rendimiento Promedio</th>
              </tr>
            </thead>
            <tbody>
              {resumenArray.map((v, i) => (
                <tr key={i}>
                  <td>{v.vehiculo}</td>
                  <td>{v.cargas}</td>
                  <td>{v.totalKM}</td>
                  <td>{v.totalLitros.toFixed(1)}</td>
                  <td>${v.totalGasto.toLocaleString("es-CL")}</td>
                  <td
                    style={{
                      fontWeight: "bold",
                      color: v.rendimiento < 3 ? "red" : "green",
                    }}
                  >
                    {v.rendimiento.toFixed(2)} km/L
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
}

export default ControlVehiculos;
