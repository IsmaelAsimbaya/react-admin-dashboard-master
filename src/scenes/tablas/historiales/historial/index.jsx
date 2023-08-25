import { Box, Button, TextField, FormControl, Select, MenuItem, FormHelperText, Typography , InputLabel   } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useState , useEffect } from "react";
import axios from "axios";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State para manejar el estado de la respuesta de la API
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [patientOptions, setPatientOptions] = useState([]);
  const [consultaOptions, setConsultaOptions] = useState([]);
   // Función para enviar los datos del formulario a la API
   const handleSubmitApi = async (values) => {
    try {
      // Realiza una solicitud POST a la API con los datos del formulario
      const response = await axios.post("https://cloud-service-leonardo13344.cloud.okteto.net/historial", values);

      // Maneja la respuesta de la API (opcional)
      setApiResponse(response.data);
      setApiError(null);
    } catch (error) {
      // Maneja los errores de la API (opcional)
      setApiResponse(null);
      setApiError(error.message || "Hubo un error al conectar con la API.");
    }
  };
  useEffect(() => {
    const fetchPatientOptions = async () => {
      try {
        const response = await axios.get("https://cloud-service-leonardo13344.cloud.okteto.net/pacientes");
        const data = response.data;
        setPatientOptions(data);
      } catch (error) {
        console.error("Error fetching patient options:", error);
      }
    };
    const fetchConsultaOptions = async () => {
      try {
        const response = await axios.get("https://cloud-service-leonardo13344.cloud.okteto.net/consultas");
        const data = response.data;
        setConsultaOptions(data);
      } catch (error) {
        console.error("Error fetching medicos options:", error);
      }
    };
    fetchConsultaOptions();
    fetchPatientOptions();
  }, []);
  return (
    <Box m="20px">
      <Header title="CREAR HISTORIAL" subtitle="Crear un nuevo Historial" />

      <Formik
        onSubmit={handleSubmitApi} // Utiliza la función para enviar los datos a la API
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
               <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.id_consulta_hist && !!errors.id_consulta_hist}
              >
                <InputLabel htmlFor="id_consulta_hist-select" sx={{ fontSize: 14 }}>
                  Consulta
                </InputLabel>
                <Select
                  value={values.id_consulta_hist}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="id_consulta_hist"
                  displayEmpty
                  inputProps={{
                    name: 'id_consulta_hist',
                    id: 'id_consulta_hist-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccionar la Consulta
                  </MenuItem>
                  {consultaOptions.map((consulta) => (
                    <MenuItem key={consulta.id_cons} value={consulta.id_cons}>
                      {consulta.id_cons} - Id. Pac: {consulta.id_paciente_cons} - {consulta.concepto_cons}
                    </MenuItem>
                  ))}
                </Select>
                {touched.id_consulta_hist && errors.id_consulta_hist && (
                  <FormHelperText>{errors.id_consulta_hist}</FormHelperText>
                )}
              </FormControl>
               <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.id_paciente_hist && !!errors.id_paciente_hist}
              >
                <InputLabel htmlFor="id_paciente_cons-select" sx={{ fontSize: 14 }}>
                  Paciente
                </InputLabel>
                <Select
                  value={values.id_paciente_hist}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="id_paciente_hist"
                  displayEmpty
                  inputProps={{
                    name: 'id_paciente_hist',
                    id: 'id_paciente_hist-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccionar el Paciente
                  </MenuItem>
                  {patientOptions.map((patient) => (
                    <MenuItem key={patient.id_pac} value={patient.id_pac}>
                      {patient.id_pac} - {patient.nombre_pac} {patient.apellido_paterno_pac}
                    </MenuItem>
                  ))}
                </Select>
                {touched.id_paciente_hist && errors.id_paciente_hist && (
                  <FormHelperText>{errors.id_paciente_hist}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_hist && !!errors.estado_hist}>
              <InputLabel htmlFor="estadp-select" sx={{ fontSize: 14 }}>Estado</InputLabel>
                <Select
                  value={values.estado_hist}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_hist"
                  displayEmpty
                  inputProps={{
                    name: 'estado_hist',
                    id: 'estado_hist-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value= "true" >Activo</MenuItem>
                  <MenuItem value= "false">Inactivo</MenuItem>
                </Select>
                {touched.estado_hist && errors.estado_hist && <FormHelperText>{errors.estado_hist}</FormHelperText>}
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Crear Nuevo Historial
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
  id_consulta_hist: yup.number().required("required"),
  id_paciente_hist: yup.number().required("required"),
  estado_hist: yup.boolean().required("required"),
});
const initialValues = {
  id_consulta_hist: 0,
  id_paciente_hist: 0,
  estado_hist:null,


};

export default Form;
