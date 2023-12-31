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
      const response = await axios.post("http://localhost:9090/especialidades", values);

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
      <Header title="CREAR ESPECIALIDAD" subtitle="Crear una nueva Especialidad" />

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
                label="Encargado"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.encargado_espe}
                name="encargado_espe"
                error={!!touched.encargado_espe && !!errors.encargado_espe}
                helperText={touched.encargado_espe && errors.encargado_espe}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ID Departamento"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id_departamento_espe}
                name="id_departamento_espe"
                error={!!touched.id_departamento_espe && !!errors.id_departamento_espe}
                helperText={touched.id_departamento_espe && errors.id_departamento_espe}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Descripcion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.descripcion_espe}
                name="descripcion_espe"
                error={!!touched.descripcion_espe && !!errors.descripcion_espe}
                helperText={touched.descripcion_espe && errors.descripcion_espe}
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_espe && !!errors.estado_espe}>
                <Select
                  value={values.estado_espe}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_espe"
                  displayEmpty
                  inputProps={{
                    name: 'estado_espe',
                    id: 'estado_espe-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value= "true" >Activo</MenuItem>
                  <MenuItem value= "false">Inactivo</MenuItem>
                </Select>
                {touched.estado_espe && errors.estado_espe && <FormHelperText>{errors.estado_espe}</FormHelperText>}
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Crear Nueva Especialidad
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
  encargado_espe: yup.string().required("required"),
  descripcion_espe: yup.string().required("required"),
  id_departamento_espe: yup.number().required("required"),
  estado_espe: yup.boolean().required("required"),
});
const initialValues = {
  encargado_espe:"",
  descripcion_espe: "",
  id_departamento_espe:0,
  estado_espe: null,


};

export default Form;
