import React from "react";

function Factura({ datos }) {
  if (!datos) return <p>No hay factura para mostrar.</p>;

  const {
    cliente,
    rutCliente,
    giroCliente,
    direccionCliente,
    comunaCliente,
    ciudadCliente,
    contactoCliente,
    tipoCompra,
    productos,
    total,
    fecha,
    numeroFactura = "000228",
    impuestoAdicional = 0,
  } = datos;

  const empresa = {
    nombre: "MOVIELMONTE SPA",
    rut: "77.886.172-0",
    giro: "Transporte de carga, movimiento de tierra y compra y venta de áridos",
    direccion: "Santa María 191, El Monte",
    email: "pedro_valpo@hotmail.com",
    telefono: "+56 9 8785 4321",
    tipoVenta: "Del giro",
    sii: "S.I.I. MAIPÚ",
  };

  const fechaFormateada = new Date(fecha).toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const montoNeto = total / 1.19;
  const iva = montoNeto * 0.19;
  const totalFinal = montoNeto + iva + Number(impuestoAdicional);

  return (
    <div style={{
      maxWidth: "800px",
      margin: "20px auto",
      padding: "20px",
      border: "1px solid #000",
      fontFamily: "Arial, sans-serif",
      fontSize: "14px"
    }}>
      {/* Encabezado */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", maxWidth: "65%" }}>
          <img
            src="/logo final con fondo.png"
            alt="Logo Empresa"
            style={{ width: "80px", height: "auto", marginRight: "15px" }}
          />
          <div>
            <h2 style={{ color: "red", marginBottom: 5 }}>{empresa.nombre}</h2>
            <p style={{ color: "blue", margin: 2 }}><strong>Giro:</strong> {empresa.giro}</p>
            <p style={{ color: "blue", margin: 2 }}><strong>Dirección:</strong> {empresa.direccion}</p>
            <p style={{ color: "blue", margin: 2 }}><strong>Email:</strong> {empresa.email}</p>
            <p style={{ color: "blue", margin: 2 }}><strong>Teléfono:</strong> {empresa.telefono}</p>
            <p style={{ color: "blue", margin: 2 }}><strong>Tipo de venta:</strong> {empresa.tipoVenta}</p>
          </div>
        </div>
        <div style={{
          border: "2px solid red",
          padding: "10px 15px",
          textAlign: "center",
          fontWeight: "bold",
          color: "red"
        }}>
          <div>RUT: {empresa.rut}</div>
          <div style={{ marginTop: 5 }}>FACTURA ELECTRÓNICA</div>
          <div style={{ marginTop: 5 }}>N° {numeroFactura}</div>
          <div style={{ marginTop: 5 }}>{empresa.sii}</div>
        </div>
      </div>

      {/* Fecha emisión */}
      <div style={{ textAlign: "right", marginBottom: 20 }}>
        <strong>Fecha emisión:</strong> {fechaFormateada}
      </div>

      {/* Datos cliente */}
      <div style={{ border: "1px solid black", padding: 10, marginBottom: 20 }}>
        <p><strong>Señor(es):</strong> {cliente}</p>
        <p><strong>RUT:</strong> {rutCliente || "Sin RUT"}</p>
        <p><strong>Giro:</strong> {giroCliente || "No especificado"}</p>
        <p><strong>Dirección:</strong> {direccionCliente || "-"}</p>
        <p><strong>Comuna:</strong> {comunaCliente || "-"}</p>
        <p><strong>Ciudad:</strong> {ciudadCliente || "-"}</p>
        <p><strong>Contacto:</strong> {contactoCliente || "-"}</p>
        <p><strong>Tipo de compra:</strong> {tipoCompra || "Del giro"}</p>
      </div>

      {/* Tabla productos */}
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: 20
      }}>
        <thead style={{ backgroundColor: "#eee" }}>
          <tr>
            <th style={thStyle}>Código</th>
            <th style={thStyle}>Descripción</th>
            <th style={thStyle}>Cantidad</th>
            <th style={thStyle}>Precio</th>
            <th style={thStyle}>Valor</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p, i) => (
            <tr key={i}>
              <td style={tdStyle}>-</td>
              <td style={tdStyle}>{p.nombre}</td>
              <td style={tdStyle}>{p.cantidad}</td>
              <td style={tdStyle}>${p.precio.toLocaleString("es-CL")}</td>
              <td style={tdStyle}>${(p.cantidad * p.precio).toLocaleString("es-CL")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Forma de pago + totales + timbre */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 30 }}>
        {/* Timbre */}
        <div style={{ width: "48%" }}>
          <p style={{ color: "blue" }}>
  <strong>Forma de Pago:</strong> {datos.formaPago || "No especificado"}
</p>

          <div style={{
            border: "1px solid #000",
            marginTop: 10,
            height: "140px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontStyle: "italic",
            color: "#555",
            backgroundColor: "#f9f9f9",
            textAlign: "center",
            fontSize: "12px",
            padding: 10,
          }}>
            <div>
              Timbre Electrónico SII<br />
              Res.99 de 2014 Verifique documento: www.sii.cl
            </div>
          </div>
        </div>

        {/* Totales */}
        <div style={{
          width: "48%",
          border: "1px solid #000",
          padding: "10px",
          fontWeight: "bold",
          color: "#002B80"
        }}>
          <p>MONTO NETO <span style={{ float: "right" }}>${montoNeto.toLocaleString("es-CL")}</span></p>
          <p>I.V.A. 19% <span style={{ float: "right" }}>${iva.toLocaleString("es-CL")}</span></p>
          <p>IMPUESTO ADICIONAL <span style={{ float: "right" }}>${Number(impuestoAdicional).toLocaleString("es-CL")}</span></p>
          <hr />
          <p style={{ fontSize: 16 }}>TOTAL <span style={{ float: "right" }}>${totalFinal.toLocaleString("es-CL")}</span></p>
        </div>
      </div>
    </div>
  );
}

const thStyle = {
  border: "1px solid #000",
  padding: "6px",
  textAlign: "center"
};

const tdStyle = {
  border: "1px solid #000",
  padding: "6px",
  textAlign: "center"
};

export default Factura;
