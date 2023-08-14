import { Box, Button, TextField, FormControl, Select, MenuItem, FormHelperText, Typography   } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useState } from "react";
import axios from "axios";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State para manejar el estado de la respuesta de la API
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);

   // Función para enviar los datos del formulario a la API
   const handleSubmitApi = async (values) => {
    try {
      // Realiza una solicitud POST a la API con los datos del formulario
      const response = await axios.post("http://localhost:9090/historial", values);

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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ID Consulta"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id_consulta_hist}
                name="id_consulta_hist"
                error={!!touched.id_consulta_hist && !!errors.id_consulta_hist}
                helperText={touched.id_consulta_hist && errors.id_consulta_hist}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ID Paciente"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id_paciente_hist}
                name="id_paciente_hist"
                error={!!touched.id_paciente_hist && !!errors.id_paciente_hist}
                helperText={touched.id_paciente_hist && errors.id_paciente_hist}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_hist && !!errors.estado_hist}>
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
