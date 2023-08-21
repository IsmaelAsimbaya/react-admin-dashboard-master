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
import ActConsulta from "./scenes/tablas/consultas/consultaActualizar/index"
import ActDepartamento from "./scenes/tablas/departamentos/departamentoActualizar/index"
import ActDerivacion from "./scenes/tablas/derivaciones/derivacionActualizar/index"
import ActEspecialidad from "./scenes/tablas/especialidades/especialidadActualizar/index"

import ActFactura from "./scenes/tablas/facturas/facturaActualizar/index"
import ActHistorial from "./scenes/tablas/historiales/historialActualizar/index"
import ActHospiralizacion from "./scenes/tablas/hospitalizaciones/hospitalacionActualizar/index"
import ActIndumentaria from "./scenes/tablas/indumentarias/indumentariaActualizar/index"
import ActLaboratorio from "./scenes/tablas/laboratorios/laboratorioActualizar/index"
import ActMedicina from "./scenes/tablas/medicinas/medicinaActualizar/index"
import ActMedico from "./scenes/tablas/medicos/medicoActualizar/index"
import ActPersonal from "./scenes/tablas/personalT/personalActualizar/index"
import ActProveedor from "./scenes/tablas/proveedores/proveedorActualizar/index"
import ActReceta from "./scenes/tablas/recetas/recetaActualizar/index"
import ActSeguro from "./scenes/tablas/seguros/seguroActualizar/index"

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
              <Route path="/actConsulta/:id_cons/:concepto_cons/:id_paciente_cons/:id_medico_cons/:fecha_cons/:estado_cons" element={<ActConsulta />} />
              <Route path="/actDepartamento/:id_depa/:num_empl_depa/:encargado_id_dep/:oficina_depa/:estado_depart"  element = {<ActDepartamento></ActDepartamento>}></Route>
              <Route path="/actDerivacion/:id_deri/:descripcion_deri/:id_usuario_deri/:id_med_deri/:fecha_deri/:estado_deri" element={<ActDerivacion />} />
              <Route path="/actEspecialidad/:id_espe/:encargado_espe/:descripcion_espe/:id_departamento_espe/:estado_espe" element={<ActEspecialidad />} />
              <Route path="/actFactura/:id_fact/:fecha_emision_fact/:paciente_fact/:descripcion_fact/:monto_fact/:metodo_pago_fact/:id_receta_fact/:estado_fact" element={<ActFactura />} />
              <Route path="/actHistorial/:id_hist/:id_consulta_hist/:id_paciente_hist/:estado_hist" element={<ActHistorial />} />
              <Route path="/actHospitalizacion/:id_hosp/:fecha_inic_hosp/:fecha_fin_hosp/:personal_encarg_hosp/:descripcion_hosp/:estado_hosp" element={<ActHospiralizacion />} />
              <Route path="/actIndumentaria/:id_indu/:concepto_indu/:ubicacion_indu/:area_indu/:id_laboratorio_indu/:estado_indu" element={<ActIndumentaria />} />
              <Route path="/actLaboratorio/:id_labo/:nombre_pac_labo/:med_solicitante_labo/:fecha_labo/:tipo_prueba_labo/:observaciones_labo/:id_personal_labo/:estado_labo" element={<ActLaboratorio />} />
              <Route path="/actMedicina/:id_medi/:componentes_medi/:disponibilidad_medi/:cantidad_medi/:id_proveedor_medi/:id_receta_medi/:estado_medi" element={<ActMedicina />} />
              <Route path="/actMedico/:id_medi/:nombre_medi/:apellidos_medi/:id_especialidad_medi/:hospital_medi/:direccion_medi/:correo_medi/:salario_medi/:supervisor_id_medi/:estado_medi" element={<ActMedico />} />
              <Route path="/actPersonal/:id_pers/:id_departamento_pers/:encargado_pers/:horario_pers/:estado_pers" element={<ActPersonal />} />
              <Route path="/actProveedores/:id_prov/:direccion_prov/:telefono_prov/:descuento_prov/:estado_prov" element={<ActProveedor />} />
              <Route path="/actReceta/:id_rece/:duracionD_rece/:duracionM_rece/:duracionA_rece/:comentarios_rece/:motivos_rece/:via_administracion_rece/:id_consulta_rece/:estado_rece" element={<ActReceta />} />  
              <Route path="/actSeguroMedico/:id_segmed/:nombre_segmed/:num_poliza_segmed/:compania_segmed/:fecha_segmed/:tipo_segmed/:porc_cobert_segmed/:id_paciente_segmed/:estado_segmed" element={<ActSeguro />} /> 




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
