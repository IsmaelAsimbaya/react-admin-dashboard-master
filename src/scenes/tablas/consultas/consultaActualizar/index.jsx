import { Box, Button, TextField, FormControl, Select, MenuItem, FormHelperText, Typography, InputLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useState , useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ActConsulta = () => {

  const {
    id_cons, 
    concepto_cons,
    id_paciente_cons,
    id_medico_cons,
    fecha_cons,
    estado_cons,
  } = useParams();
  const [rows, setRows] = useState([]);
  const [patientOptions, setPatientOptions] = useState([]);
  const [medicoOptions, setMedicosOptions] = useState([]);
  const initialValues = {

    concepto_cons: concepto_cons,
    id_paciente_cons: id_paciente_cons,
    id_medico_cons: id_medico_cons,
    fecha_cons: fecha_cons,
    estado_cons: estado_cons,

  };
  useEffect(() => {
    const fetchPatientOptions = async () => {
      try {
        const response = await axios.get("http://localhost:9090/pacientes");
        const data = response.data;
        setPatientOptions(data);
      } catch (error) {
        console.error("Error fetching patient options:", error);
      }
    };
    const fetchMedicosOptions = async () => {
      try {
        const response = await axios.get("http://localhost:9090/medicos");
        const data = response.data;
        setMedicosOptions(data);
      } catch (error) {
        console.error("Error fetching medicos options:", error);
      }
    };
    fetchMedicosOptions();
    fetchPatientOptions();
  }, []);
  const handleUpdate = async (row) => {
    
    // Invert the estado_pac value when the button is clicked
    
    //const navigate = useNavigate();

    // Prepare the data object to be sent in the PUT request
    const updatedData = {
      
      concepto_cons: row.concepto_cons,
      id_paciente_cons: row.id_paciente_cons,
      id_medico_cons: row.id_medico_cons,
      fecha_cons: row.fecha_cons,
      estado_cons: row.estado_cons,
     
    };

    // Send the updated data to the API using the PUT method

   
    try {
      await axios.put(`http://localhost:9090/consultas/${id_cons}`, updatedData);
      const updatedRows = rows.map((r) => {
        if (r.id === row.id) {
          return { ...r, estado_pac: row.estado_cons };
        }
        return r;
      });
      setRows(updatedRows);
      console.log("Estado Consulta actualizado en la API.");
      alert("Se ha modificado los datos del Consulta");
    }
    catch (error) {
      console.error("Error al obtener datos del Consulta:", error);
      alert("No se pudieron modificar los datos de Consulta");
    };
    row.concepto_cons = "";
    row.id_paciente_cons = 0;
    row.id_medico_cons = 0;
    row.fecha_cons = "";
    row.estado = null;
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State para manejar el estado de la respuesta de la API
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);

  // Función para enviar los datos del formulario a la API
  const handleSubmitApi = async (values) => {
    try {
      // Realiza una solicitud POST a la API con los datos del formulario
      const response = await axios.post("http://localhost:9090/consultas", values);

      // Maneja la respuesta de la API (opcional)
      setApiResponse(response.data);
      setApiError(null);
    } catch (error) {
      // Maneja los errores de la API (opcional)
      setApiResponse(null);
      setApiError(error.message || "Hubo un error al conectar con la API.");
    }
  };

  return (
    <Box m="20px">
      <Header title="ACTUALIZAR CONSULTA" subtitle="Actualizar una consulta" />

      <Formik
        onSubmit={handleUpdate} // Utiliza la función para enviar los datos a la API
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Concepto"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.concepto_cons}
                name="concepto_cons"
                error={!!touched.concepto_cons && !!errors.concepto_cons}
                helperText={touched.concepto_cons && errors.concepto_cons}
                sx={{ gridColumn: "span 4" }}
              />
               <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.id_paciente_cons && !!errors.id_paciente_cons}
              >
                <InputLabel htmlFor="id_paciente_cons-select" sx={{ fontSize: 14 }}>
                  ID Paciente
                </InputLabel>
                <Select
                  value={values.id_paciente_cons}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="id_paciente_cons"
                  displayEmpty
                  inputProps={{
                    name: 'id_paciente_cons',
                    id: 'id_paciente_cons-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccionar ID Paciente
                  </MenuItem>
                  {patientOptions.map((patient) => (
                    <MenuItem key={patient.id_pac} value={patient.id_pac}>
                      {patient.id_pac} - {patient.nombre_pac} {patient.apellido_paterno_pac}
                    </MenuItem>
                  ))}
                </Select>
                {touched.id_paciente_cons && errors.id_paciente_cons && (
                  <FormHelperText>{errors.id_paciente_cons}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.id_medico_cons && !!errors.id_medico_cons}
              >
                <InputLabel htmlFor="id_medico_cons-select" sx={{ fontSize: 14 }}>
                  ID Médico
                </InputLabel>
                <Select
                  value={values.id_medico_cons}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="id_medico_cons"
                  displayEmpty
                  inputProps={{
                    name: 'id_medico_cons',
                    id: 'id_medico_cons-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccionar ID Médico
                  </MenuItem>
                  {medicoOptions.map((medico) => (
                    <MenuItem key={medico.id_medi} value={medico.id_medi}>
                      {medico.id_medi} - {medico.nombre_medi} 
                    </MenuItem>
                  ))}
                </Select>
                {touched.id_medico_cons && errors.id_medico_cons && (
                  <FormHelperText>{errors.id_paid_medico_consciente_cons}</FormHelperText>
                )}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Fecha de Consulta"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fecha_cons}
                name="fecha_cons"
                error={!!touched.fecha_cons && !!errors.fecha_cons}
                helperText={touched.fecha_cons && errors.fecha_cons}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_cons && !!errors.estado_cons}>
                <InputLabel htmlFor="sexo_pac-select" sx={{ fontSize: 14 }}>Estado</InputLabel>
                <Select
                  value={values.estado_cons}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_cons"
                  displayEmpty
                  inputProps={{
                    name: 'estado_cons',
                    id: 'estado_cons-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value="true" >Activo</MenuItem>
                  <MenuItem value="false">Inactivo</MenuItem>
                </Select>
                {touched.estado_cons && errors.estado_cons && <FormHelperText>{errors.estado_cons}</FormHelperText>}
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Actualizar Consulta
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {apiResponse && (
        <Box mt={2}>
          <Typography variant="subtitle1">API Response:</Typography>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </Box>
      )}
      {apiError && (
        <Box mt={2}>
          <Typography variant="subtitle1" color="error">
            API Error: {apiError}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  concepto_cons: yup.string().required("required"),
  id_paciente_cons: yup.number().required("required"),
  id_medico_cons: yup.number().required("required"),
  fecha_cons: yup.date().required("required"),
  estado_cons: yup.boolean().required("required"),
});
const initialValues = {
  concepto_cons: "",
  id_paciente_cons: 0,
  id_medico_cons: 0,
  fecha_cons: "",
  estado_cons: null,


};

export default ActConsulta;
