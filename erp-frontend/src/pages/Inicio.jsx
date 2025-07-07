import React from "react";
import { Card, CardContent, Grid, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import ReportIcon from '@mui/icons-material/Report';
import BarChartIcon from "@mui/icons-material/BarChart";


const Inicio = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        Bienvenido al ERP Secretaría
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ textAlign: "center", py: 4 }}>
            <CardContent>
              <DescriptionIcon sx={{ fontSize: 50, color: "#3f51b5" }} />
              <Typography variant="h6" gutterBottom>
                Crear Cotización
              </Typography>
              <Button variant="contained" component={Link} to="/cotizacion">
                Ir
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ textAlign: "center", py: 4 }}>
            <CardContent>
              <SearchIcon sx={{ fontSize: 50, color: "#f50057" }} />
              <Typography variant="h6" gutterBottom>
                Buscar Cotizaciones
              </Typography>
              <Button variant="contained" component={Link} to="/buscar-cotizaciones">
                Ir
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ textAlign: "center", py: 4 }}>
            <CardContent>
              <MonetizationOnIcon sx={{ fontSize: 50, color: "#4caf50" }} />
              <Typography variant="h6" gutterBottom>
                Nueva Factura
              </Typography>
              <Button variant="contained" component={Link} to="/nueva-factura">
                Ir
              </Button>
            </CardContent>
          </Card>
        </Grid>


        <Grid item xs={12} sm={6} md={4}>
  <Card sx={{ textAlign: "center", py: 4 }}>
    <CardContent>
      <DescriptionIcon sx={{ fontSize: 50, color: "#009688" }} />
      <Typography variant="h6" gutterBottom>
        Listar Facturas
      </Typography>
      <Button variant="contained" component={Link} to="/listar-facturas">
        Ir
      </Button>
    </CardContent>
  </Card>
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <Card sx={{ textAlign: "center", py: 4 }}>
    <CardContent>
      <SearchIcon sx={{ fontSize: 50, color: "#ff9800" }} />
      <Typography variant="h6" gutterBottom>
        Listar Reportes
      </Typography>
      <Button variant="contained" component={Link} to="/listar-reportes">
        Ir
      </Button>
    </CardContent>
  </Card>
</Grid>


<Grid item xs={12} sm={6} md={4}>
  <Card sx={{ textAlign: "center", py: 4 }}>
    <CardContent>
      <MonetizationOnIcon sx={{ fontSize: 50, color: "#009688" }} />
      <Typography variant="h6" gutterBottom>
        Control Vehículos
      </Typography>
      <Button variant="contained" component={Link} to="/control-vehiculos">
        Ir
      </Button>
    </CardContent>
  </Card>
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <Card sx={{ textAlign: "center", py: 4 }}>
    <CardContent>
      <MonetizationOnIcon sx={{ fontSize: 50, color: "#00796b" }} />
      <Typography variant="h6" gutterBottom>
        Nueva Carga de Combustible
      </Typography>
      <Button variant="contained" component={Link} to="/nuevo-combustible">
        Ir
      </Button>
    </CardContent>
  </Card>
</Grid>


<Grid item xs={12} sm={6} md={4}>
  <Card sx={{ textAlign: "center", py: 4 }}>
    <CardContent>
      <MonetizationOnIcon sx={{ fontSize: 50, color: "#00796b" }} />
      <Typography variant="h6" gutterBottom>
        ingresar vehiculos
      </Typography>
      <Button variant="contained" component={Link} to="/nuevo-equipo">
        Ir
      </Button>
    </CardContent>
  </Card>
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <Card sx={{ textAlign: "center", py: 4 }}>
    <CardContent>
      <MonetizationOnIcon sx={{ fontSize: 50, color: "#00796b" }} />
      <Typography variant="h6" gutterBottom>
        vehiculos registrados
      </Typography>
      <Button variant="contained" component={Link} to="/listar-equipos">
        Ir
      </Button>
    </CardContent>
  </Card>
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <Card sx={{ textAlign: "center", py: 4 }}>
    <CardContent>
      <MonetizationOnIcon sx={{ fontSize: 50, color: "#00796b" }} />
      <Typography variant="h6" gutterBottom>
        rendiminento vehiculos
      </Typography>
      <Button variant="contained" component={Link} to="/rendimiento-historico">
        Ir
      </Button>
    </CardContent>
  </Card>
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <Card sx={{ textAlign: "center", py: 4 }}>
    <CardContent>
      <BarChartIcon sx={{ fontSize: 50, color: "#009688" }} />
      <Typography variant="h6" gutterBottom>
        Dashboard de Gráficos
      </Typography>
      <Button variant="contained" component={Link} to="/graficos">
        Ver
      </Button>
    </CardContent>
  </Card>
</Grid>

        {/* Nueva tarjeta para Reporte de Maquinaria */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ textAlign: "center", py: 4 }}>
            <CardContent>
              <ReportIcon sx={{ fontSize: 50, color: "#ffa000" }} />
              <Typography variant="h6" gutterBottom>
                Reportes de Maquinaria
              </Typography>
              <Button variant="contained" component={Link} to="/nuevo-reporte">
                Ir
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>



  );
};

export default Inicio;
