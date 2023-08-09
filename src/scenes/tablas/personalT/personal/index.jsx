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
      const response = await axios.post("http://localhost:9090/personal", values);

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
      <Header title="CREAR PERSONAL" subtitle="Crear un nuevo Perfil de Personal" />

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
                label="ID Departamento"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id_departamento_pers}
                name="id_departamento_pers"
                error={!!touched.id_departamento_pers && !!errors.id_departamento_pers}
                helperText={touched.id_departamento_pers && errors.id_departamento_pers}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Encargado"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.encargado_pers}
                name="encargado_pers"
                error={!!touched.encargado_pers && !!errors.encargado_pers}
                helperText={touched.encargado_pers && errors.encargado_pers}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Horario"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.horario_pers}
                name="horario_pers"
                error={!!touched.horario_pers && !!errors.horario_pers}
                helperText={touched.horario_pers && errors.horario_pers}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_pers && !!errors.estado_pers}>
                <Select
                  value={values.estado_pers}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_pers"
                  displayEmpty
                  inputProps={{
                    name: 'estado_pers',
                    id: 'estado_pers-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value= "true" >Activo</MenuItem>
                  <MenuItem value= "false">Inactivo</MenuItem>
                </Select>
                {touched.estado_pers && errors.estado_pers && <FormHelperText>{errors.estado_pers}</FormHelperText>}
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Crear Nuevo Paciente
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
  id_departamento_pers: yup.number().required("required"),
  encargado_pers: yup.string().required("required"),
  horario_pers: yup.string().required("required"),
  estado_pers: yup.boolean().required("required"),
});
const initialValues = {
  id_departamento_pers:0,
  encargado_pers: "",
  horario_pers:"",
  estado_pers:null,
};

export default Form;
