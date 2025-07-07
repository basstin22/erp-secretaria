import React, { useRef } from "react";
import "./MostrarCotizacion.css";

const MostrarCotizacion = ({ datos }) => {
  const componenteRef = useRef(null);

  if (!datos) return <p>No hay cotización para mostrar.</p>;

  const {
    numero,
    cliente,
    producto,
    dias,
    horas,
    precioUnitario,
    valorNeto,
    iva,
    valorTotal,
    descripcion,
    nota,
    fecha,
  } = datos;

  const fechaFormateada = new Date(fecha).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const totalCalculado = valorTotal ?? (valorNeto ?? 0) + (iva ?? 0);

  const handlePrint = () => {
    const printContent = componenteRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <div style={{ marginTop: 30 }}>
      <div ref={componenteRef} className="cotizacion-container">
        <div className="cotizacion-header">
          <img
            src="/logo final con fondo.png"
            alt="Logo Empresa"
            className="cotizacion-logo"
          />
          <div>
            <h1 className="cotizacion-title">MOVIMENTOMONTE SPA</h1>
            <h2 className="cotizacion-subtitle">Presupuesto N° {numero}</h2>
          </div>
        </div>

        <div className="cotizacion-info">
          <p><strong>Fecha emisión:</strong> {fechaFormateada}</p>
          <p><strong>Cliente:</strong> {cliente}</p>
        </div>

        <table className="cotizacion-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Días</th>
              <th>Horas</th>
              <th>Precio Unitario</th>
              <th>Valor Neto</th>
              <th>IVA (19%)</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{producto}</td>
              <td>{dias}</td>
              <td>{horas}</td>
              <td>${precioUnitario?.toLocaleString("es-CL")}</td>
              <td>${valorNeto?.toLocaleString("es-CL")}</td>
              <td>${iva?.toLocaleString("es-CL")}</td>
              <td>${totalCalculado?.toLocaleString("es-CL")}</td>
            </tr>
          </tbody>
        </table>

        <div className="cotizacion-details">
          <p><strong>Descripción:</strong> {descripcion}</p>
          <p><strong>Nota:</strong> {nota}</p>
        </div>
      </div>

      {/* ✅ Botón abajo y centrado */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button onClick={handlePrint} className="boton-imprimir">
          Imprimir / Guardar PDF
        </button>
      </div>
    </div>
  );
};

export default MostrarCotizacion;
