const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Conexión a MongoDB (usa variable de entorno si existe)
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/erpsecretaria", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error conectando a MongoDB:", err));

// ==========================
// 🧾 Modelo: Factura
// ==========================
const facturaSchema = new mongoose.Schema({
  cliente: String,
  productos: [{ nombre: String, cantidad: Number, precio: Number }],
  total: Number,
  fecha: Date,
});

const Factura = mongoose.model("Factura", facturaSchema);

// ==========================
// 📄 Modelo: Cotización
// ==========================
const cotizacionSchema = new mongoose.Schema({
  numero: Number,
  cliente: String,
  producto: String,
  dias: Number,
  horas: Number,
  precioUnitario: Number,
  valorNeto: Number,
  iva: Number,
  descripcion: String,
  nota: String,
  fecha: Date,
});

const Cotizacion = mongoose.model("Cotizacion", cotizacionSchema);

// ==========================
// 📋 Modelo: Reporte de Maquinaria
// ==========================
const reporteSchema = new mongoose.Schema({
  fecha: String,
  numero: String,
  empresa: String,
  maquina: String,
  sigla: String,
  obra: String,
  operador: String,
  horaInicio: String,
  horaTermino: String,
  diferencia: String,
  combustibles: String,
  aceiteMotor: String,
  aceiteCaja: String,
  aceiteHidraulico: String,
  diferencial: String,
  engrase: String,
  reparaciones: String,
  trabajos: String,
});

const Reporte = mongoose.model("Reporte", reporteSchema);

// ==========================
// 🚚 Modelo: Control Combustible
// ==========================
const combustibleSchema = new mongoose.Schema({
  fecha: String,
  vehiculo: String,
  patente: String,
  kmActual: Number,
  kmAnterior: Number,
  litrosCargados: Number,
  precioPorLitro: Number,
  totalGastado: Number,
  rendimiento: Number,
  observaciones: String,
});

const Combustible = mongoose.model("Combustible", combustibleSchema);

// ==========================
// 🚛 Modelo: Equipos
// ==========================
const equipoSchema = new mongoose.Schema({
  vehiculo: String,
  patente: String,
  tipo: String,
  marca: String,
  modelo: String,
  año: Number,
  activo: Boolean,
  observaciones: String,
  operadorNombre: String,
  operadorRut: String,
});

const Equipo = mongoose.model("Equipo", equipoSchema);

// ==========================
// 🛠️ Rutas API
// ==========================

// 🔹 Facturas
app.post("/facturas", async (req, res) => {
  try {
    const factura = new Factura(req.body);
    await factura.save();
    res.status(201).json({ message: "✅ Factura guardada", factura });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/facturas", async (req, res) => {
  try {
    const facturas = await Factura.find();
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Cotizaciones
app.post("/cotizaciones", async (req, res) => {
  try {
    const cotizacion = new Cotizacion(req.body);
    await cotizacion.save();
    res.status(201).json({ message: "✅ Cotización guardada", cotizacion });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/cotizaciones", async (req, res) => {
  try {
    const cotizaciones = await Cotizacion.find();
    res.json(cotizaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Reportes
app.post("/reportes", async (req, res) => {
  try {
    const reporte = new Reporte(req.body);
    await reporte.save();
    res.status(201).json({ message: "✅ Reporte guardado", reporte });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/reportes", async (req, res) => {
  try {
    const reportes = await Reporte.find();
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Combustible
app.post("/combustible", async (req, res) => {
  try {
    const {
      fecha, vehiculo, patente, kmActual, kmAnterior,
      litrosCargados, precioPorLitro, observaciones
    } = req.body;

    const totalGastado = litrosCargados * precioPorLitro;
    const kilometrosRecorridos = kmActual - kmAnterior;
    const rendimiento = litrosCargados > 0 ? kilometrosRecorridos / litrosCargados : 0;

    const registro = new Combustible({
      fecha,
      vehiculo,
      patente,
      kmActual,
      kmAnterior,
      litrosCargados,
      precioPorLitro,
      totalGastado,
      rendimiento,
      observaciones,
    });

    await registro.save();
    res.status(201).json({ message: "✅ Registro guardado", registro });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/combustible", async (req, res) => {
  try {
    const registros = await Combustible.find().sort({ fecha: -1 });
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Equipos
app.post("/equipos", async (req, res) => {
  try {
    const equipo = new Equipo(req.body);
    await equipo.save();
    res.status(201).json({ message: "✅ Equipo guardado", equipo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/equipos", async (req, res) => {
  try {
    const equipos = await Equipo.find();
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/equipos/:id", async (req, res) => {
  try {
    await Equipo.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Equipo eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/equipos/:id", async (req, res) => {
  try {
    const actualizado = await Equipo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "✅ Equipo actualizado", actualizado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Rendimiento por vehículo
app.get("/rendimiento", async (req, res) => {
  try {
    const registros = await Combustible.find();
    const agrupado = {};

    registros.forEach((r) => {
      const key = `${r.vehiculo}_${r.patente}`;
      if (!agrupado[key]) {
        agrupado[key] = {
          vehiculo: r.vehiculo,
          patente: r.patente,
          totalLitros: 0,
          totalKm: 0,
          totalGasto: 0,
          cargas: 0,
        };
      }

      agrupado[key].totalLitros += r.litrosCargados;
      agrupado[key].totalKm += r.kmActual - r.kmAnterior;
      agrupado[key].totalGasto += r.totalGastado;
      agrupado[key].cargas += 1;
    });

    const resultado = Object.values(agrupado).map((item) => ({
      ...item,
      promedioRendimiento:
        item.totalLitros > 0 ? item.totalKm / item.totalLitros : 0,
    }));

    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================
// 🚀 Iniciar Servidor
// ==========================
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🟢 Servidor corriendo en el puerto ${PORT}`);
});
