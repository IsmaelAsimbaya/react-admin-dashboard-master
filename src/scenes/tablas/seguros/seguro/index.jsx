import { Box, Button, TextField, FormControl, Select, MenuItem, FormHelperText, Typography, InputLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State para manejar el estado de la respuesta de la API
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [patientOptions, setPatientOptions] = useState([]);


  // Función para enviar los datos del formulario a la API
  const handleSubmitApi = async (values) => {
    try {
      // Realiza una solicitud POST a la API con los datos del formulario
      const response = await axios.post("http://localhost:9090/segurosmedicos", values);

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
    fetchPatientOptions();
  }, []);
  return (
    <Box m="20px">
      <Header title="CREAR SEGURO MEDICO" subtitle="Crear un nuevo Perfil de Seguro Medico" />

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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nombre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nombre_segmed}
                name="nombre_segmed"
                error={!!touched.nombre_segmed && !!errors.nombre_segmed}
                helperText={touched.nombre_segmed && errors.nombre_segmed}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Num Poliza"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.num_poliza_segmed}
                name="num_poliza_segmed"
                error={!!touched.num_poliza_segmed && !!errors.num_poliza_segmed}
                helperText={touched.num_poliza_segmed && errors.num_poliza_segmed}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Compañia"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.compania_segmed}
                name="compania_segmed"
                error={!!touched.compania_segmed && !!errors.compania_segmed}
                helperText={touched.compania_segmed && errors.compania_segmed}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Fecha Vencimiento"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fecha_segmed}
                name="fecha_segmed"
                error={!!touched.fecha_segmed && !!errors.fecha_segmed}
                helperText={touched.fecha_segmed && errors.fecha_segmed}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tipo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tipo_segmed}
                name="tipo_segmed"
                error={!!touched.tipo_segmed && !!errors.tipo_segmed}
                helperText={touched.tipo_segmed && errors.tipo_segmed}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="% Covertura"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.porc_cobert_segmed}
                name="porc_cobert_segmed"
                error={!!touched.porc_cobert_segmed && !!errors.porc_cobert_segmed}
                helperText={touched.porc_cobert_segmed && errors.porc_cobert_segmed}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.id_paciente_segmed && !!errors.id_paciente_segmed}
              >
                <InputLabel htmlFor="id_paciente_segmed-select" sx={{ fontSize: 14 }}>
                  Paciente
                </InputLabel>
                <Select
                  value={values.id_paciente_segmed}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="id_paciente_segmed"
                  displayEmpty
                  inputProps={{
                    name: 'id_paciente_segmed',
                    id: 'id_paciente_segmed-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccionar Paciente
                  </MenuItem>
                  {patientOptions.map((patient) => (
                    <MenuItem key={patient.id_pac} value={patient.id_pac}>
                      {patient.id_pac} - {patient.nombre_pac} {patient.apellido_paterno_pac}
                    </MenuItem>
                  ))}
                </Select>
                {touched.id_paciente_segmed && errors.id_paciente_segmed && (
                  <FormHelperText>{errors.id_paciente_segmed}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_segmed && !!errors.estado_segmed}>
                <InputLabel htmlFor="estadp-select" sx={{ fontSize: 14 }}>Estado</InputLabel>
                <Select
                  value={values.estado_segmed}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_segmed"
                  displayEmpty
                  inputProps={{
                    name: 'estado_segmed',
                    id: 'estado_segmed-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value="true" >Activo</MenuItem>
                  <MenuItem value="false">Inactivo</MenuItem>
                </Select>
                {touched.estado_segmed && errors.estado_segmed && <FormHelperText>{errors.estado_segmed}</FormHelperText>}
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Crear Nueva Consulta Médica
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
  nombre_segmed: yup.string().required("required"),
  num_poliza_segmed: yup.string().required("required"),
  compania_segmed: yup.string().required("required"),
  fecha_segmed: yup.date().required("required"),
  tipo_segmed: yup.string().required("required"),
  porc_cobert_segmed: yup.number().required("required"),
  id_paciente_segmed: yup.number().required("required"),
  estado_segmed: yup.boolean().required("required"),
});
const initialValues = {
  nombre_segmed: "",
  num_poliza_segmed: "",
  compania_segmed: "",
  fecha_segmed: "",
  tipo_segmed: "",
  porc_cobert_segmed: 0,
  id_paciente_segmed: 0,
  estado_segmed: null,
};

export default Form;
