import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";

const NuevoEquipo = () => {
  const [datos, setDatos] = useState({
    vehiculo: "",
    patente: "",
    tipo: "",
    marca: "",
    modelo: "",
    año: "",
    activo: true,
    observaciones: "",
    operadorNombre: "",
    operadorRut: "",
  });

  const [mensaje, setMensaje] = useState("");

  const actualizar = (campo, valor) => {
    setDatos({ ...datos, [campo]: valor });
  };

  const guardarEquipo = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/equipos", datos);
      setMensaje("✅ Equipo guardado correctamente.");
      setDatos({
        vehiculo: "",
        patente: "",
        tipo: "",
        marca: "",
        modelo: "",
        año: "",
        activo: true,
        observaciones: "",
        operadorNombre: "",
        operadorRut: "",
      });
    } catch (error) {
      setMensaje("❌ Error al guardar el equipo.");
    }
  };

  return (
    <Container className="mt-4">
      <h3>🚛 Nuevo Registro de Equipo</h3>
      {mensaje && <Alert variant={mensaje.includes("✅") ? "success" : "danger"}>{mensaje}</Alert>}
      <Form onSubmit={guardarEquipo}>
        <Row className="mb-3">
          <Col><Form.Control placeholder="Vehículo" value={datos.vehiculo} onChange={(e) => actualizar("vehiculo", e.target.value)} /></Col>
          <Col><Form.Control placeholder="Patente" value={datos.patente} onChange={(e) => actualizar("patente", e.target.value)} /></Col>
        </Row>
        <Row className="mb-3">
          <Col><Form.Control placeholder="Tipo" value={datos.tipo} onChange={(e) => actualizar("tipo", e.target.value)} /></Col>
          <Col><Form.Control placeholder="Marca" value={datos.marca} onChange={(e) => actualizar("marca", e.target.value)} /></Col>
        </Row>
        <Row className="mb-3">
          <Col><Form.Control placeholder="Modelo" value={datos.modelo} onChange={(e) => actualizar("modelo", e.target.value)} /></Col>
          <Col><Form.Control placeholder="Año" type="number" value={datos.año} onChange={(e) => actualizar("año", e.target.value)} /></Col>
        </Row>
        <Row className="mb-3">
          <Col><Form.Control placeholder="Nombre del Operador" value={datos.operadorNombre} onChange={(e) => actualizar("operadorNombre", e.target.value)} /></Col>
          <Col><Form.Control placeholder="RUT del Operador" value={datos.operadorRut} onChange={(e) => actualizar("operadorRut", e.target.value)} /></Col>
        </Row>
        <Row className="mb-3">
          <Col><Form.Control placeholder="Observaciones" value={datos.observaciones} onChange={(e) => actualizar("observaciones", e.target.value)} /></Col>
        </Row>
        <Form.Check
          type="checkbox"
          label="Activo"
          checked={datos.activo}
          onChange={(e) => actualizar("activo", e.target.checked)}
          className="mb-3"
        />
        <Button variant="primary" type="submit">Guardar Equipo</Button>
      </Form>
    </Container>
  );
};

export default NuevoEquipo;
