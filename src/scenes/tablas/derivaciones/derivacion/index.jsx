import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Typography   } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useState , useEffect} from "react";
import axios from "axios";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State para manejar el estado de la respuesta de la API
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [patientOptions, setPatientOptions] = useState([]);
  const [medicoOptions, setMedicosOptions] = useState([]);
   // Función para enviar los datos del formulario a la API
   const handleSubmitApi = async (values) => {
    try {
      // Realiza una solicitud POST a la API con los datos del formulario
      const response = await axios.post("http://localhost:9090/derivaciones", values);

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

  return (
    <Box m="20px">
      <Header title="CREAR DERIVACIÓN" subtitle="Crear una nueva derivacion" />

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
                error={!!touched.id_paciente_cons && !!errors.id_paciente_cons}
              >
                <InputLabel htmlFor="id_usuario_deri-select" sx={{ fontSize: 14 }}>
                  ID Paciente
                </InputLabel>
                <Select
                  value={values.id_paciente_cons}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="id_paciente_cons"
                  displayEmpty
                  inputProps={{
                    name: 'id_usuario_deri',
                    id: 'id_usuario_deri-select',
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
                {touched.id_usuario_deri && errors.id_usuario_deri && (
                  <FormHelperText>{errors.id_usuario_deri}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.id_med_deri && !!errors.id_med_deri}
              >
                <InputLabel htmlFor="id_med_deri-select" sx={{ fontSize: 14 }}>
                  ID Médico
                </InputLabel>
                <Select
                  value={values.id_med_deri}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="id_med_deri"
                  displayEmpty
                  inputProps={{
                    name: 'id_med_deri',
                    id: 'id_med_deri-select',
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
                {touched.id_med_deri && errors.id_med_deri && (
                  <FormHelperText>{errors.id_paid_medico_consciente_cons}</FormHelperText>
                )}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Fecha"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fecha_deri}
                name="fecha_deri"
                error={!!touched.fecha_deri && !!errors.fecha_deri}
                helperText={touched.fecha_deri && errors.fecha_deri}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_deri && !!errors.estado_deri}>
              <InputLabel htmlFor="sexo_pac-select" sx={{ fontSize: 14 }}>Estado</InputLabel>
                <Select
                  value={values.estado_deri}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_deri"
                  displayEmpty
                  inputProps={{
                    name: 'estado_deri',
                    id: 'estado_deri-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value= "true" >Activo</MenuItem>
                  <MenuItem value= "false">Inactivo</MenuItem>
                </Select>
                {touched.estado_deri && errors.estado_deri && <FormHelperText>{errors.estado_deri}</FormHelperText>}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Descripcion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.descripcion_deri}
                name="descripcion_deri"
                error={!!touched.descripcion_deri && !!errors.descripcion_deri}
                helperText={touched.descripcion_deri && errors.descripcion_deri}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Crear Nueva Derivacion
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
  id_usuario_deri: yup.string().required("required"),
  descripcion_deri: yup.string().required("required"),
  fecha_deri: yup.date().required("required"),
  id_med_deri: yup.number().required("required"),
  estado_deri: yup.boolean().required("required"),
});
const initialValues = {
  id_usuario_deri:"",
  descripcion_deri: "",
  fecha_deri:"",
  id_med_deri:0,
  estado_deri: null,


};

export default Form;
