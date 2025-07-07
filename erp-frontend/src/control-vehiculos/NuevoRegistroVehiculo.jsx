import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";

function NuevoRegistroVehiculo() {
  const [datos, setDatos] = useState({
    fecha: "",
    vehiculo: "",
    patente: "",
    kmAnterior: "",
    kmActual: "",
    litrosCargados: "",
    precioPorLitro: "",
    observaciones: "",
  });

  const [registroGuardado, setRegistroGuardado] = useState(null);

  const handleChange = (campo, valor) => {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
  };

  const guardarRegistro = async () => {
    try {
      const res = await fetch("http://localhost:5000/combustible", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      if (res.ok) {
        const data = await res.json();
        alert("✅ Registro guardado con éxito");
        setRegistroGuardado(data.registro);
      } else {
        alert("❌ Error al guardar el registro");
      }
    } catch (error) {
      alert("❌ Error: " + error.message);
    }
  };

  return (
    <Container style={{ maxWidth: 800, marginTop: 30 }}>
      <h3 className="mb-4">🚚 Nuevo Registro de Combustible</h3>

      <Form>
        <Row className="mb-3">
          <Col><Form.Control type="date" value={datos.fecha} onChange={(e) => handleChange("fecha", e.target.value)} /></Col>
          <Col><Form.Control placeholder="Vehículo" value={datos.vehiculo} onChange={(e) => handleChange("vehiculo", e.target.value)} /></Col>
          <Col><Form.Control placeholder="Patente" value={datos.patente} onChange={(e) => handleChange("patente", e.target.value)} /></Col>
        </Row>

        <Row className="mb-3">
          <Col><Form.Control type="number" placeholder="KM Anterior" value={datos.kmAnterior} onChange={(e) => handleChange("kmAnterior", e.target.value)} /></Col>
          <Col><Form.Control type="number" placeholder="KM Actual" value={datos.kmActual} onChange={(e) => handleChange("kmActual", e.target.value)} /></Col>
        </Row>

        <Row className="mb-3">
          <Col><Form.Control type="number" step="0.01" placeholder="Litros Cargados" value={datos.litrosCargados} onChange={(e) => handleChange("litrosCargados", e.target.value)} /></Col>
          <Col><Form.Control type="number" step="0.01" placeholder="Precio por Litro" value={datos.precioPorLitro} onChange={(e) => handleChange("precioPorLitro", e.target.value)} /></Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Control as="textarea" placeholder="Observaciones" rows={2} value={datos.observaciones} onChange={(e) => handleChange("observaciones", e.target.value)} />
        </Form.Group>

        <Button onClick={guardarRegistro}>Guardar</Button>
      </Form>

      {registroGuardado && (
        <div className="mt-5">
          <h5>📄 Registro Guardado</h5>
          <Table bordered>
            <tbody>
              <tr><td><strong>Fecha</strong></td><td>{registroGuardado.fecha}</td></tr>
              <tr><td><strong>Vehículo</strong></td><td>{registroGuardado.vehiculo}</td></tr>
              <tr><td><strong>Patente</strong></td><td>{registroGuardado.patente}</td></tr>
              <tr><td><strong>KM Recorridos</strong></td><td>{registroGuardado.kmActual - registroGuardado.kmAnterior}</td></tr>
              <tr><td><strong>Litros Cargados</strong></td><td>{registroGuardado.litrosCargados}</td></tr>
              <tr><td><strong>Rendimiento</strong></td><td>{registroGuardado.rendimiento.toFixed(2)} km/L</td></tr>
              <tr><td><strong>Total Gastado</strong></td><td>${registroGuardado.totalGastado.toFixed(0)}</td></tr>
              <tr><td><strong>Observaciones</strong></td><td>{registroGuardado.observaciones}</td></tr>
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}

export default NuevoRegistroVehiculo;
