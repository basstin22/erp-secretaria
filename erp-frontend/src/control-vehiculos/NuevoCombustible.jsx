import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";

function NuevoCombustible() {
  const [vehiculos, setVehiculos] = useState([]);

  const [datos, setDatos] = useState({
    fecha: "",
    vehiculo: "",
    patente: "",
    kmActual: "",
    kmAnterior: "",
    litrosCargados: "",
    precioPorLitro: "",
    observaciones: "",
  });

  const [guardado, setGuardado] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/equipos")
      .then((res) => setVehiculos(res.data))
      .catch((err) => console.error("❌ Error al cargar vehículos:", err));
  }, []);

  const actualizar = (campo, valor) => {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
  };

  const guardar = async () => {
    try {
      const respuesta = await fetch("http://localhost:5000/combustible", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const json = await respuesta.json();

      if (respuesta.ok) {
        setGuardado("✅ Registro guardado correctamente");
        setDatos({
          fecha: "",
          vehiculo: "",
          patente: "",
          kmActual: "",
          kmAnterior: "",
          litrosCargados: "",
          precioPorLitro: "",
          observaciones: "",
        });
      } else {
        setGuardado("❌ Error: " + json.error);
      }
    } catch (error) {
      setGuardado("❌ Error de conexión: " + error.message);
    }
  };

  return (
    <Container style={{ maxWidth: "800px", marginTop: "30px" }}>
      <h3 className="mb-4">🚚 Nueva Carga de Combustible</h3>

      {guardado && <Alert variant="info">{guardado}</Alert>}

      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              value={datos.fecha}
              onChange={(e) => actualizar("fecha", e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Vehículo</Form.Label>
            <Form.Select
              value={datos.vehiculo}
              onChange={(e) => {
                const selected = e.target.value;
                actualizar("vehiculo", selected);

                const seleccionado = vehiculos.find((v) => v.vehiculo === selected);
                if (seleccionado) {
                  actualizar("patente", seleccionado.patente);
                }
              }}
            >
              <option value="">Seleccione un vehículo</option>
              {vehiculos.map((v, i) => (
                <option key={i} value={v.vehiculo}>
                  {v.vehiculo} - {v.patente}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Patente</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: ABCD12"
              value={datos.patente}
              onChange={(e) => actualizar("patente", e.target.value)}
              disabled
            />
          </Col>
          <Col md={6}>
            <Form.Label>Kilometraje Anterior</Form.Label>
            <Form.Control
              type="number"
              value={datos.kmAnterior}
              onChange={(e) => actualizar("kmAnterior", e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Kilometraje Actual</Form.Label>
            <Form.Control
              type="number"
              value={datos.kmActual}
              onChange={(e) => actualizar("kmActual", e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Litros Cargados</Form.Label>
            <Form.Control
              type="number"
              value={datos.litrosCargados}
              onChange={(e) => actualizar("litrosCargados", e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Precio por Litro ($)</Form.Label>
            <Form.Control
              type="number"
              value={datos.precioPorLitro}
              onChange={(e) => actualizar("precioPorLitro", e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Observaciones</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Carga completa en Copec"
              value={datos.observaciones}
              onChange={(e) => actualizar("observaciones", e.target.value)}
            />
          </Col>
        </Row>

        <Button variant="primary" onClick={guardar}>
          Guardar Carga
        </Button>
      </Form>
    </Container>
  );
}

export default NuevoCombustible;
