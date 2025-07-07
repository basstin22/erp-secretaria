import React, { useState } from "react";
import { Button, Col, Row, Form, Container } from "react-bootstrap";
import ReporteMaquinaria from "./ReporteMaquinaria";

function NuevoReporte() {
  const [datos, setDatos] = useState({
    fecha: "",
    numero: "",
    empresa: "",
    maquina: "",
    sigla: "",
    obra: "",
    operador: "",
    horaInicio: "",
    horaTermino: "",
    diferencia: "",
    combustibles: "",
    aceiteMotor: "",
    aceiteCaja: "",
    aceiteHidraulico: "",
    diferencial: "",
    engrase: "",
    reparaciones: "",
    trabajos: "",
  });

  const [reporteGenerado, setReporteGenerado] = useState(null);

  const actualizarCampo = (campo, valor) => {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
  };

  const generarReporte = async () => {
    try {
      const res = await fetch("http://localhost:5000/reportes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      if (res.ok) {
        alert("✅ Reporte guardado con éxito");
        const nuevoReporte = await res.json();
        setReporteGenerado(nuevoReporte.reporte);
      } else {
        alert("❌ Error guardando el reporte");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <Container style={{ maxWidth: 1000, padding: 20 }}>
      <h3 className="mb-4">📋 Nuevo Reporte de Maquinaria</h3>
      <Form>
        {/* Primera sección */}
        <Row className="mb-3">
          <Col md={4}><Form.Control type="date" placeholder="Fecha" value={datos.fecha} onChange={(e) => actualizarCampo("fecha", e.target.value)} /></Col>
          <Col md={4}><Form.Control placeholder="N°" value={datos.numero} onChange={(e) => actualizarCampo("numero", e.target.value)} /></Col>
          <Col md={4}><Form.Control placeholder="Empresa" value={datos.empresa} onChange={(e) => actualizarCampo("empresa", e.target.value)} /></Col>
        </Row>
        <Row className="mb-3">
          <Col md={4}><Form.Control placeholder="Máquina" value={datos.maquina} onChange={(e) => actualizarCampo("maquina", e.target.value)} /></Col>
          <Col md={4}><Form.Control placeholder="Sigla" value={datos.sigla} onChange={(e) => actualizarCampo("sigla", e.target.value)} /></Col>
          <Col md={4}><Form.Control placeholder="Obra" value={datos.obra} onChange={(e) => actualizarCampo("obra", e.target.value)} /></Col>
        </Row>
        <Row className="mb-3">
          <Col md={4}><Form.Control placeholder="Operador" value={datos.operador} onChange={(e) => actualizarCampo("operador", e.target.value)} /></Col>
          <Col md={4}><Form.Control placeholder="Hora Inicio" value={datos.horaInicio} onChange={(e) => actualizarCampo("horaInicio", e.target.value)} /></Col>
          <Col md={4}><Form.Control placeholder="Hora Término" value={datos.horaTermino} onChange={(e) => actualizarCampo("horaTermino", e.target.value)} /></Col>
        </Row>
        <Row className="mb-4">
          <Col md={12}><Form.Control placeholder="Diferencia Total de Horas" value={datos.diferencia} onChange={(e) => actualizarCampo("diferencia", e.target.value)} /></Col>
        </Row>

        {/* Fluidos */}
        <h5>⛽ Fluidos Aplicados</h5>
        <Row className="mb-3">
          <Col md={4}><Form.Control placeholder="Combustibles" value={datos.combustibles} onChange={(e) => actualizarCampo("combustibles", e.target.value)} /></Col>
          <Col md={4}><Form.Control placeholder="Aceite Motor" value={datos.aceiteMotor} onChange={(e) => actualizarCampo("aceiteMotor", e.target.value)} /></Col>
          <Col md={4}><Form.Control placeholder="Aceite Caja" value={datos.aceiteCaja} onChange={(e) => actualizarCampo("aceiteCaja", e.target.value)} /></Col>
        </Row>
        <Row className="mb-4">
          <Col md={4}><Form.Control placeholder="Aceite Hidráulico" value={datos.aceiteHidraulico} onChange={(e) => actualizarCampo("aceiteHidraulico", e.target.value)} /></Col>
          <Col md={4}><Form.Control placeholder="Diferencial" value={datos.diferencial} onChange={(e) => actualizarCampo("diferencial", e.target.value)} /></Col>
          <Col md={4}><Form.Control placeholder="Engrase" value={datos.engrase} onChange={(e) => actualizarCampo("engrase", e.target.value)} /></Col>
        </Row>

        {/* Sección final */}
        <Form.Group className="mb-3">
          <Form.Label>🛠 Reparaciones Pendientes</Form.Label>
          <Form.Control as="textarea" rows={2} value={datos.reparaciones} onChange={(e) => actualizarCampo("reparaciones", e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>✔ Trabajos Realizados</Form.Label>
          <Form.Control as="textarea" rows={3} value={datos.trabajos} onChange={(e) => actualizarCampo("trabajos", e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={generarReporte}>Guardar Reporte</Button>
      </Form>

      {reporteGenerado && (
        <div className="mt-5">
          <ReporteMaquinaria datos={reporteGenerado} />
        </div>
      )}
    </Container>
  );
}

export default NuevoReporte;
