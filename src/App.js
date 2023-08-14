import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/tablas/pacientes/contacts/";
import Bar from "./scenes/bar";
import Form from "./scenes/tablas/pacientes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";

import Medico from "./scenes/tablas/medicos/medico";
import MedicoInfo from "./scenes/tablas/medicos/medicoInfo";
import Consulta from "./scenes/tablas/consultas/consulta";
import ConsultaInfo from "./scenes/tablas/consultas/consultaInfo";
import Departamento from "./scenes/tablas/departamentos/departamento"
import DepartamentoInfo from "./scenes/tablas/departamentos/departamentoInfo"
import Derivacion from "./scenes/tablas/derivaciones/derivacion";
import DerivacionInfo from "./scenes/tablas/derivaciones/dervicacionInfo";
import Especialidad from "./scenes/tablas/especialidades/especialidad";
import EspecialidadInfo from "./scenes/tablas/especialidades/especialidadInfo";
import Factura from "./scenes/tablas/facturas/factura";
import FacturaInfo from "./scenes/tablas/facturas/facturaInfo";
import Historial from "./scenes/tablas/historiales/historial";
import HistorialInfo from "./scenes/tablas/historiales/historialInfo";
import Hospitalizacion from "./scenes/tablas/hospitalizaciones/hospitalizacion";
import HospitalizacionInfo from "./scenes/tablas/hospitalizaciones/hospitalizacionInfo";
import Indumentaria from "./scenes/tablas/indumentarias/indumentaria";
import IndumentariaInfo from "./scenes/tablas/indumentarias/indumentariaInfo";
import Laboratorio from "./scenes/tablas/laboratorios/laboratorio";
import LaboratorioInfo from "./scenes/tablas/laboratorios/laboratorioInfo";
import Medicina from "./scenes/tablas/medicinas/medicina";
import MedicinaInfo from "./scenes/tablas/medicinas/medicinaInfo";
import Personal from "./scenes/tablas/personalT/personal";
import PersonalInfo from "./scenes/tablas/personalT/personalInfo";
import Proveedor from "./scenes/tablas/proveedores/proveedor";
import ProveedorInfo from "./scenes/tablas/proveedores/proveedorInfo";
import Receta from "./scenes/tablas/recetas/receta";
import RecetaInfo from "./scenes/tablas/recetas/recetaInfo";
import Seguro from "./scenes/tablas/seguros/seguro";
import SeguroInfo from "./scenes/tablas/seguros/seguroInfo";
import ActPaciente from "./scenes/tablas/pacientes/pacientesActualizar/index"

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    

    <ColorModeContext.Provider value={colorMode}>
      
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts/" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />


              
              <Route path="/actPaciente/:cedula_pac/:nombre_pac/:apellido_paterno_pac/:apellido_materno_pac/:sexo_pac/:fecha_nac_pac/:domicilio_pac/:telefono_pac/:num_expediente_pac/:id_hospitalario_pac/:estado_pac" element={<ActPaciente />} />





              <Route path="/medicos" element={<Medico />} />
              <Route path="/infoMedicos" element={<MedicoInfo />} />
              <Route path="/consultas" element={<Consulta />} />
              <Route path="/infoConsultas" element={<ConsultaInfo />} />
              <Route path="/departamentos" element={<Departamento />} />
              <Route path="/infoDepartamentos" element={<DepartamentoInfo />} />
              <Route path="/derivaciones" element={<Derivacion />} />
              <Route path="/infoDerivaciones" element={<DerivacionInfo />} />
              <Route path="/especialidades" element={<Especialidad />} />
              <Route path="/infoEspecialidades" element={<EspecialidadInfo />} />
              <Route path="/facturas" element={<Factura />} />
              <Route path="/infoFacturas" element={<FacturaInfo />} />
              <Route path="/historiales" element={<Historial />} />
              <Route path="/infoHistoriales" element={<HistorialInfo />} />
              <Route path="/hospitalizaciones" element={<Hospitalizacion />} />
              <Route path="/infoHospitalizaciones" element={<HospitalizacionInfo />} />
              <Route path="/indumentarias" element={<Indumentaria />} />
              <Route path="/infoIndumentarias" element={<IndumentariaInfo />} />
              <Route path="/laboratorios" element={<Laboratorio />} />
              <Route path="/infoLaboratorios" element={<LaboratorioInfo />} />
              <Route path="/medicinas" element={<Medicina />} />
              <Route path="/infoMedicinas" element={<MedicinaInfo />} />
              <Route path="/personal" element={<Personal />} />
              <Route path="/infoPersonal" element={<PersonalInfo />} />
              <Route path="/proveedores" element={<Proveedor />} />
              <Route path="/infoProveedores" element={<ProveedorInfo />} />
              <Route path="/recetas" element={<Receta />} />
              <Route path="/infoRecetas" element={<RecetaInfo />} />
              <Route path="/seguros" element={<Seguro />} />
              <Route path="/infoSeguros" element={<SeguroInfo />} />

            </Routes>
            
          </main>
        </div>
        <div>
        
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
