import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Container,
  Button,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";

const ListarEquipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [formulario, setFormulario] = useState({});

  useEffect(() => {
    cargarEquipos();
  }, []);

  const cargarEquipos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/equipos");
      setEquipos(res.data);
    } catch (err) {
      console.error("❌ Error cargando equipos:", err);
    }
  };

  const eliminarEquipo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/equipos/${id}`);
      cargarEquipos();
      setShowConfirm(false);
    } catch (err) {
      alert("❌ Error al eliminar el equipo");
    }
  };

  const abrirModalEdicion = (equipo) => {
    setEquipoSeleccionado(equipo);
    setFormulario(equipo);
    setShowEditar(true);
  };

  const handleChange = (campo, valor) => {
    setFormulario((prev) => ({ ...prev, [campo]: valor }));
  };

  const guardarCambios = async () => {
    try {
      await axios.put(
        `http://localhost:5000/equipos/${equipoSeleccionado._id}`,
        formulario
      );
      setShowEditar(false);
      cargarEquipos();
    } catch (err) {
      alert("❌ Error al guardar los cambios");
    }
  };

  return (
    <Container className="mt-5">
      <h3 className="mb-4">📋 Equipos Registrados</h3>
      <Table striped bordered hover responsive className="table-bordered shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Vehículo</th>
            <th>Patente</th>
            <th>Tipo</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Activo</th>
            <th>Operador</th>
            <th>RUT</th>
            <th>Observaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((e) => (
            <tr key={e._id}>
              <td>{e.vehiculo}</td>
              <td>{e.patente}</td>
              <td>{e.tipo}</td>
              <td>{e.marca}</td>
              <td>{e.modelo}</td>
              <td>{e.año}</td>
              <td>{e.activo ? "✅" : "❌"}</td>
              <td>{e.operadorNombre}</td>
              <td>{e.operadorRut}</td>
              <td>{e.observaciones}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModalEdicion(e)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setEquipoSeleccionado(e);
                    setShowConfirm(true);
                  }}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* 🔴 Modal de Confirmación */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>¿Eliminar equipo?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Estás por eliminar el equipo <strong>{equipoSeleccionado?.vehiculo}</strong>.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => eliminarEquipo(equipoSeleccionado._id)}
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 🟡 Modal de Edición */}
      <Modal show={showEditar} onHide={() => setShowEditar(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>✏️ Editar Equipo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-2">
              <Col>
                <Form.Label>Vehículo</Form.Label>
                <Form.Control
                  value={formulario.vehiculo || ""}
                  onChange={(e) => handleChange("vehiculo", e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Patente</Form.Label>
                <Form.Control
                  value={formulario.patente || ""}
                  onChange={(e) => handleChange("patente", e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  value={formulario.tipo || ""}
                  onChange={(e) => handleChange("tipo", e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  value={formulario.marca || ""}
                  onChange={(e) => handleChange("marca", e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Modelo</Form.Label>
                <Form.Control
                  value={formulario.modelo || ""}
                  onChange={(e) => handleChange("modelo", e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Año</Form.Label>
                <Form.Control
                  value={formulario.año || ""}
                  onChange={(e) => handleChange("año", e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Form.Label>Activo</Form.Label>
                <Form.Select
                  value={formulario.activo ? "true" : "false"}
                  onChange={(e) =>
                    handleChange("activo", e.target.value === "true")
                  }
                >
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Operador</Form.Label>
                <Form.Control
                  value={formulario.operadorNombre || ""}
                  onChange={(e) =>
                    handleChange("operadorNombre", e.target.value)
                  }
                />
              </Col>
              <Col>
                <Form.Label>RUT</Form.Label>
                <Form.Control
                  value={formulario.operadorRut || ""}
                  onChange={(e) =>
                    handleChange("operadorRut", e.target.value)
                  }
                />
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Observaciones</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formulario.observaciones || ""}
                onChange={(e) =>
                  handleChange("observaciones", e.target.value)
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditar(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={guardarCambios}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ListarEquipos;
