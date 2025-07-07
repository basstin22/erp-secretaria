import React, { useState } from "react";
import { Button, Card, Col, Row, Form, Container } from "react-bootstrap";
import Factura from "./Factura";

function NuevaFactura({ onGuardar }) {
  const [cliente, setCliente] = useState({
    nombre: "",
    rut: "",
    giro: "",
    direccion: "",
    comuna: "",
    ciudad: "",
    contacto: "",
  });

  const [productos, setProductos] = useState([
    { nombre: "", cantidad: 1, precio: 0 },
  ]);

  const [formaPago, setFormaPago] = useState(""); // ✅ Nuevo estado para forma de pago
  const [impuestoAdicional, setImpuestoAdicional] = useState(0);
  const [facturaGenerada, setFacturaGenerada] = useState(null);

  const totalProductos = productos.reduce(
    (acc, p) => acc + p.cantidad * p.precio,
    0
  );
  const total = totalProductos + Number(impuestoAdicional);

  const actualizarCliente = (campo, valor) => {
    setCliente((prev) => ({ ...prev, [campo]: valor }));
  };

  const agregarProducto = () => {
    setProductos([...productos, { nombre: "", cantidad: 1, precio: 0 }]);
  };

  const actualizarProducto = (index, campo, valor) => {
    const nuevosProductos = [...productos];
    nuevosProductos[index][campo] = campo === "nombre" ? valor : Number(valor);
    setProductos(nuevosProductos);
  };

  const guardarFactura = async () => {
    const factura = {
      cliente: cliente.nombre,
      rutCliente: cliente.rut,
      giroCliente: cliente.giro,
      direccionCliente: cliente.direccion,
      comunaCliente: cliente.comuna,
      ciudadCliente: cliente.ciudad,
      contactoCliente: cliente.contacto,
      formaPago, // ✅ Agregado aquí
      productos,
      impuestoAdicional: Number(impuestoAdicional),
      total,
      fecha: new Date(),
      numeroFactura: Date.now(),
    };

    try {
      const res = await fetch("http://localhost:5000/facturas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(factura),
      });

      if (res.ok) {
        alert("Factura guardada con éxito");
        setFacturaGenerada(factura);
      } else {
        alert("Error guardando factura");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <Container style={formContainerStyle}>
      <h2>Nueva Factura</h2>

      {/* Datos del Cliente */}
      <h4 style={{ marginTop: "20px" }}>Datos del Cliente</h4>
      <Row className="g-4">
        <Col md={6}>
          <Form.Group controlId="clienteNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={cliente.nombre}
              onChange={(e) => actualizarCliente("nombre", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="clienteRut">
            <Form.Label>RUT</Form.Label>
            <Form.Control
              type="text"
              value={cliente.rut}
              onChange={(e) => actualizarCliente("rut", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="clienteGiro">
            <Form.Label>Giro</Form.Label>
            <Form.Control
              type="text"
              value={cliente.giro}
              onChange={(e) => actualizarCliente("giro", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="clienteDireccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              value={cliente.direccion}
              onChange={(e) => actualizarCliente("direccion", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="clienteComuna">
            <Form.Label>Comuna</Form.Label>
            <Form.Control
              type="text"
              value={cliente.comuna}
              onChange={(e) => actualizarCliente("comuna", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="clienteCiudad">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              value={cliente.ciudad}
              onChange={(e) => actualizarCliente("ciudad", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="clienteContacto">
            <Form.Label>Contacto</Form.Label>
            <Form.Control
              type="text"
              value={cliente.contacto}
              onChange={(e) => actualizarCliente("contacto", e.target.value)}
            />
          </Form.Group>
        </Col>

        {/* Forma de Pago */}
        <Col md={6}>
          <Form.Group controlId="formaPago">
            <Form.Label>Forma de Pago</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Crédito, Débito, Transferencia"
              value={formaPago}
              onChange={(e) => setFormaPago(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Productos */}
      <h4 style={{ marginTop: "40px" }}>Productos</h4>
      {productos.map((producto, index) => (
        <Row key={index}>
          <Col md={4}>
            <Form.Group controlId={`productoNombre${index}`}>
              <Form.Label>Producto</Form.Label>
              <Form.Control
                type="text"
                value={producto.nombre}
                onChange={(e) => actualizarProducto(index, "nombre", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId={`productoCantidad${index}`}>
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                value={producto.cantidad}
                onChange={(e) => actualizarProducto(index, "cantidad", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId={`productoPrecio${index}`}>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={producto.precio}
                onChange={(e) => actualizarProducto(index, "precio", e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      ))}
      <Button onClick={agregarProducto} style={{ marginTop: "10px" }}>
        Agregar producto
      </Button>

      {/* Impuesto */}
      <Row className="g-4" style={{ marginTop: "20px" }}>
        <Col md={6}>
          <Form.Group controlId="impuestoAdicional">
            <Form.Label>Impuesto Adicional</Form.Label>
            <Form.Control
              type="number"
              value={impuestoAdicional}
              onChange={(e) => setImpuestoAdicional(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Total y botón */}
      <h3 style={{ marginTop: "20px" }}>Total: ${total.toLocaleString("es-CL")}</h3>
      <Button onClick={guardarFactura}>Guardar Factura</Button>

      {/* Factura generada */}
      {facturaGenerada && (
        <div style={{ marginTop: "40px" }}>
          <Factura datos={facturaGenerada} />
        </div>
      )}
    </Container>
  );
}

const formContainerStyle = {
  padding: "30px",
  maxWidth: "900px",
  margin: "0 auto",
};

export default NuevaFactura;
