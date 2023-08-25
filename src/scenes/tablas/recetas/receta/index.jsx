import { Box, Button, TextField, FormControl, Select, MenuItem, FormHelperText, Typography,InputLabel   } from "@mui/material";
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
  const [consultaOptions, setConsultaOptions] = useState([]);
   // Función para enviar los datos del formulario a la API
   const handleSubmitApi = async (values) => {
    try {
      // Realiza una solicitud POST a la API con los datos del formulario
      const response = await axios.post("https://cloud-service-leonardo13344.cloud.okteto.net/recetas", values);

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
    const fetchConsultaOptions = async () => {
      try {
        const response = await axios.get("https://cloud-service-leonardo13344.cloud.okteto.net/consultas");
        const data = response.data;
        setConsultaOptions(data);
      } catch (error) {
        console.error("Error fetching consultas options:", error);
      }
    };
    fetchConsultaOptions();
  }, []);
  return (
    <Box m="20px">
      <Header title="CREAR RECETA" subtitle="Crear un nueva Receta" />

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
                label="Duracion D"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.duracionD_rece}
                name="duracionD_rece"
                error={!!touched.duracionD_rece && !!errors.duracionD_rece}
                helperText={touched.duracionD_rece && errors.duracionD_rece}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Duracion M"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.duracionM_rece}
                name="duracionM_rece"
                error={!!touched.duracionM_rece && !!errors.duracionM_rece}
                helperText={touched.duracionM_rece && errors.duracionM_rece}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Duracion A"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.duracionA_rece}
                name="duracionA_rece"
                error={!!touched.duracionA_rece && !!errors.duracionA_rece}
                helperText={touched.duracionA_rece && errors.duracionA_rece}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Motivos"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.motivos_rece}
                name="motivos_rece"
                error={!!touched.motivos_rece && !!errors.motivos_rece}
                helperText={touched.motivos_rece && errors.motivos_rece}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Via Administracion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.via_administracion_rece}
                name="via_administracion_rece"
                error={!!touched.via_administracion_rece && !!errors.via_administracion_rece}
                helperText={touched.via_administracion_rece && errors.via_administracion_rece}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.id_consulta_rece && !!errors.id_consulta_rece}
              >
                <InputLabel htmlFor="id_consulta_rece-select" sx={{ fontSize: 14 }}>
                  Consulta
                </InputLabel>
                <Select
                  value={values.id_consulta_rece}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="id_consulta_rece"
                  displayEmpty
                  inputProps={{
                    name: 'id_consulta_rece',
                    id: 'id_consulta_rece-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccionar ID Consulta
                  </MenuItem>
                  {consultaOptions.map((consulta) => (
                    <MenuItem key={consulta.id_cons} value={consulta.id_cons}>
                      {consulta.id_cons} - Pac. ID: {consulta.id_paciente_cons} - {consulta.concepto_cons}
                    </MenuItem>
                  ))}
                </Select>
                {touched.id_consulta_rece && errors.id_consulta_rece && (
                  <FormHelperText>{errors.id_consulta_rece}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_rece && !!errors.estado_rece}>
                <InputLabel htmlFor="estadp-select" sx={{ fontSize: 14 }}>Estado</InputLabel>
                <Select
                  value={values.estado_rece}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_rece"
                  displayEmpty
                  inputProps={{
                    name: 'estado_rece',
                    id: 'estado_rece-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value= "true" >Activo</MenuItem>
                  <MenuItem value= "false">Inactivo</MenuItem>
                </Select>
                {touched.estado_rece && errors.estado_rece && <FormHelperText>{errors.estado_rece}</FormHelperText>}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Comentarios"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.comentarios_rece}
                name="comentarios_rece"
                error={!!touched.comentarios_rece && !!errors.comentarios_rece}
                helperText={touched.comentarios_rece && errors.comentarios_rece}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Crear Nueva Receta
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
  duracionD_rece: yup.number().required("required"),
  duracionM_rece: yup.number().required("required"),
  duracionA_rece: yup.number().required("required"),
  comentarios_rece: yup.string().required("required"),
  motivos_rece: yup.string().required("required"),
  via_administracion_rece: yup.string().required("required"),
  id_consulta_rece: yup.number().required("required"),
  estado_rece: yup.boolean().required("required"),
});
const initialValues = {
  duracionD_rece: 0,
  duracionM_rece: 0,
  duracionA_rece: 0,
  comentarios_rece:"",
  motivos_rece: "",
  via_administracion_rece: "",
  id_consulta_rece: 0,
  estado_rece: null,
};

export default Form;
