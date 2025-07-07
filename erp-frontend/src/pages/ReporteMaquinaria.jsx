import React, { useRef } from "react";

function ReporteMaquinaria({ datos }) {
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const newWindow = window.open("", "_blank", "width=800,height=600");
    newWindow.document.write(`
      <html>
        <head>
          <title>Reporte Maquinaria</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            table { width: 100%; border-collapse: collapse; }
            td, th { border: 1px solid #000; padding: 6px; text-align: left; }
            h2, h4 { text-align: center; }
            .firma { text-align: center; margin-top: 60px; }
            .firma-box { width: 160px; height: 40px; border-bottom: 1px solid #000; margin: 0 auto 6px; }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    newWindow.close();
  };

  if (!datos) return <p>No hay reporte para mostrar.</p>;

  return (
    <div>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <button onClick={handlePrint}>🖨️ Imprimir / Descargar PDF</button>
      </div>

      <div ref={printRef} style={{
        maxWidth: '21cm',
        margin: '0 auto',
        padding: '20px 40px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
        backgroundColor: 'white',
        border: '1px solid #ccc'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src="/logo final con fondo.png" alt="Logo" style={{ width: '100px' }} />
          <div style={{ textAlign: 'right', fontWeight: 'bold' }}>
            <p>FECHA: {datos.fecha}</p>
            <p>REPORTE N°: {datos.numero}</p>
          </div>
        </div>

        <h2 style={{ textAlign: 'center', margin: '20px 0' }}>REPORT DE MAQUINARIA</h2>

        <table style={tabla}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={celda}>EMPRESA</th>
              <th style={celda}>MÁQUINA</th>
              <th style={celda}>SIGLA</th>
              <th style={celda}>OBRA</th>
              <th style={celda}>OPERADOR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={celda}>{datos.empresa}</td>
              <td style={celda}>{datos.maquina}</td>
              <td style={celda}>{datos.sigla}</td>
              <td style={celda}>{datos.obra}</td>
              <td style={celda}>{datos.operador}</td>
            </tr>
          </tbody>
        </table>

        <h4 style={seccion}>HORARIO DE OPERACIÓN</h4>
        <table style={tabla}>
          <thead>
            <tr>
              <th style={celda}>INICIO</th>
              <th style={celda}>TÉRMINO</th>
              <th style={celda}>TOTAL HORAS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={celda}>{datos.horaInicio}</td>
              <td style={celda}>{datos.horaTermino}</td>
              <td style={celda}>{datos.diferencia}</td>
            </tr>
          </tbody>
        </table>

        <h4 style={seccion}>CONTROL DIARIO DE NIVELES</h4>
        <table style={tabla}>
          <tbody>
            <tr>
              <td style={celda}>Combustibles</td>
              <td style={celda}>{datos.combustibles} Lts.</td>
              <td style={celda}>Diferencial</td>
              <td style={celda}>{datos.diferencial} Lts.</td>
            </tr>
            <tr>
              <td style={celda}>Aceite Motor</td>
              <td style={celda}>{datos.aceiteMotor} Lts.</td>
              <td style={celda}>Engrase</td>
              <td style={celda}>{datos.engrase} Lts.</td>
            </tr>
            <tr>
              <td style={celda}>Aceite Caja</td>
              <td style={celda}>{datos.aceiteCaja} Lts.</td>
              <td style={celda}></td>
              <td style={celda}></td>
            </tr>
            <tr>
              <td style={celda}>Aceite Hidráulico</td>
              <td style={celda}>{datos.aceiteHidraulico} Lts.</td>
              <td style={celda}></td>
              <td style={celda}></td>
            </tr>
          </tbody>
        </table>

        <h4 style={seccion}>REPARACIONES PENDIENTES</h4>
        <div style={boxTexto}>{datos.reparaciones}</div>

        <h4 style={seccion}>TRABAJOS REALIZADOS</h4>
        <div style={boxTexto}>{datos.trabajos}</div>

        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '60px', textAlign: 'center' }}>
          <div>
            <div style={firmaBox}></div>
            <p style={firmaLabel}>VºBº ING.</p>
          </div>
          <div>
            <div style={firmaBox}></div>
            <p style={firmaLabel}>VºBº JEFE OBRA</p>
          </div>
          <div>
            <div style={firmaBox}></div>
            <p style={firmaLabel}>FIRMA OPERADOR</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Estilos reutilizables
const celda = {
  border: '1px solid #000',
  padding: '6px',
  textAlign: 'left',
};

const tabla = {
  width: '100%',
  border: '1px solid #000',
  borderCollapse: 'collapse',
  marginBottom: '20px',
};

const seccion = {
  margin: '20px 0 10px',
  borderBottom: '1px solid #000',
  paddingBottom: '4px',
};

const boxTexto = {
  minHeight: '40px',
  border: '1px solid #000',
  padding: '8px',
  marginBottom: '20px',
  whiteSpace: 'pre-line',
};

const firmaBox = {
  width: '160px',
  height: '40px',
  borderBottom: '1px solid #000',
  marginBottom: '6px',
};

const firmaLabel = {
  margin: 0,
  fontWeight: 'bold',
};

export default ReporteMaquinaria;
