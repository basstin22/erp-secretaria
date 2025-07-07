import React, { useState, useEffect } from "react";
import MostrarCotizacion from "./MostrarCotizacion";
import { Button, Card, Col, Row, Form, Container } from "react-bootstrap";

function Cotizacion() {
  const [contador, setContador] = useState(1);
  const [cotizacionGuardada, setCotizacionGuardada] = useState(null);
  const [productos, setProductos] = useState([
    "Arriendo Maquinaria",
    "Venta aridos",
    "Retiro de escombros",
    "Limpieza de terreno",
    "pene parao jajaaj",
    "Movimiento de tierra",
  ]);
  const [datos, setDatos] = useState({
    numero: 0,
    cliente: "",
    producto: "",
    dias: 0,
    horas: 0,
    precioUnitario: 0,
    descripcion: "",
    nota: "",
  });

  useEffect(() => {
    const obtenerNumero = async () => {
      try {
        const API = import.meta.env.VITE_API_URL || "http://localhost:5000"; // se coloca arriba del todo del archivo
        const res = await fetch(`${API}/combustible`);
        const data = await res.json();
        const nuevoNumero = data.numero ? data.numero + 1 : 1;
        setContador(nuevoNumero);
        setDatos((prev) => ({ ...prev, numero: nuevoNumero }));
      } catch (error) {
        console.error("Error al obtener número:", error);
      }
    };

    obtenerNumero();
  }, []);

  const handleChange = (campo, valor) => {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleGuardar = async () => {
    // Validar si los campos necesarios están vacíos
    if (!datos.cliente || !datos.producto || datos.dias <= 0 || datos.horas <= 0 || datos.precioUnitario <= 0) {
      alert("⚠️ Todos los campos deben estar completos.");
      return;
    }

    const valorNeto = datos.precioUnitario * datos.horas;
    const iva = valorNeto * 0.19;
    const valorTotal = valorNeto + iva;

    const cotizacionFinal = {
      ...datos,
      numero: contador,
      valorNeto,
      iva,
      valorTotal,
      fecha: new Date(),
    };

    // Validar si ya fue guardada
    const yaGuardada =
      cotizacionGuardada &&
      cotizacionGuardada.cliente === datos.cliente &&
      cotizacionGuardada.producto === datos.producto &&
      cotizacionGuardada.dias === datos.dias &&
      cotizacionGuardada.horas === datos.horas &&
      cotizacionGuardada.precioUnitario === datos.precioUnitario &&
      cotizacionGuardada.descripcion === datos.descripcion &&
      cotizacionGuardada.nota === datos.nota;

    if (yaGuardada) {
      alert("⚠️ Esta cotización ya fue guardada.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/cotizaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cotizacionFinal),
      });

      if (res.ok) {
        alert(`✅ Cotización N°${contador} guardada con éxito`);
        setCotizacionGuardada(cotizacionFinal);
        const nuevoNumero = contador + 1;
        setContador(nuevoNumero);
        setDatos((prev) => ({ ...prev, numero: nuevoNumero }));
      } else {
        alert("❌ Error al guardar cotización");
      }
    } catch (error) {
      alert("❌ Error: " + error.message);
    }
  };

  return (
    <Container style={formContainerStyle}>
      <div style={headerContainerStyle}>
        <img src="/logo final con fondo.png" alt="Logo Empresa" style={logoStyle} />
        <div>
          <h1 style={headerStyle}>MOVIMENTOMONTE SPA</h1>
          <h3 style={subHeaderStyle}>Presupuesto N°{contador}</h3>
        </div>
      </div>

      <Row className="g-4">
        {/* Cliente */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <Form.Group controlId="cliente">
                <Form.Label>Cliente</Form.Label>
                <Form.Control
                  type="text"
                  value={datos.cliente}
                  onChange={(e) => handleChange("cliente", e.target.value)}
                  placeholder="Ingrese el nombre del cliente"
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* Producto */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <Form.Group controlId="producto">
                <Form.Label>Producto</Form.Label>
                <Form.Control
                  type="text"
                  value={datos.producto}
                  onChange={(e) => handleChange("producto", e.target.value)}
                  placeholder="Escribe un producto o selecciona uno"
                />
                {/* Dropdown para productos predefinidos */}
                <div className="mt-3">
                  <select
                    value={datos.producto}
                    onChange={(e) => handleChange("producto", e.target.value)}
                    className="form-select"
                  >
                    <option value="">Seleccione un producto</option>
                    {productos.map((producto, index) => (
                      <option key={index} value={producto}>
                        {producto}
                      </option>
                    ))}
                  </select>
                </div>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* Días */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <Form.Group controlId="dias">
                <Form.Label>Días</Form.Label>
                <Form.Control
                  type="number"
                  value={datos.dias}
                  onChange={(e) => handleChange("dias", Number(e.target.value))}
                  placeholder="Número de días"
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* Horas */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <Form.Group controlId="horas">
                <Form.Label>Horas</Form.Label>
                <Form.Control
                  type="number"
                  value={datos.horas}
                  onChange={(e) => handleChange("horas", Number(e.target.value))}
                  placeholder="Número de horas"
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* Precio Unitario */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <Form.Group controlId="precioUnitario">
                <Form.Label>Precio Unitario</Form.Label>
                <Form.Control
                  type="number"
                  value={datos.precioUnitario}
                  onChange={(e) => handleChange("precioUnitario", Number(e.target.value))}
                  placeholder="Precio unitario"
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* Descripción */}
        <Col md={12}>
          <Card>
            <Card.Body>
              <Form.Group controlId="descripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={datos.descripcion}
                  onChange={(e) => handleChange("descripcion", e.target.value)}
                  placeholder="Descripción del servicio"
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* Nota */}
        <Col md={12}>
          <Card>
            <Card.Body>
              <Form.Group controlId="nota">
                <Form.Label>Nota</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={datos.nota}
                  onChange={(e) => handleChange("nota", e.target.value)}
                  placeholder="Nota adicional"
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Botón para guardar la cotización */}
      <div style={buttonContainerStyle}>
        <Button variant="primary" onClick={handleGuardar}>
          Guardar Cotización
        </Button>
      </div>

      {/* Mostrar cotización guardada */}
      {cotizacionGuardada && (
        <div style={{ marginTop: 40 }}>
          <MostrarCotizacion datos={cotizacionGuardada} />
        </div>
      )}
    </Container>
  );
}

const formContainerStyle = {
  padding: "30px",
  maxWidth: "800px",
  margin: "0 auto",
};

const headerContainerStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
};

const logoStyle = {
  width: "80px",
  marginRight: "20px",
};

const headerStyle = {
  fontSize: "30px",
  fontWeight: "bold",
  margin: "0",
};

const subHeaderStyle = {
  fontSize: "18px",
  fontWeight: "300",
};

const buttonContainerStyle = {
  textAlign: "center",
  marginTop: "20px",
};

export default Cotizacion;
