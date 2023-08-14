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
      const response = await axios.post("http://localhost:9090/hospitalizaciones", values);

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
      <Header title="CREAR HOSPITALIZACIÓN" subtitle="Crear un nuevo Perfil de Hospitalizacion" />

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
                type="date"
                label="Fecha de Inicio"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fecha_inic_hosp}
                name="fecha_inic_hosp"
                error={!!touched.fecha_inic_hosp && !!errors.fecha_inic_hosp}
                helperText={touched.fecha_inic_hosp && errors.fecha_inic_hosp}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Fecha de Fin"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fecha_fin_hosp}
                name="fecha_fin_hosp"
                error={!!touched.fecha_fin_hosp && !!errors.fecha_fin_hosp}
                helperText={touched.fecha_fin_hosp && errors.fecha_fin_hosp}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Personal Encargado"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.personal_encarg_hosp}
                name="personal_encarg_hosp"
                error={!!touched.personal_encarg_hosp && !!errors.personal_encarg_hosp}
                helperText={touched.personal_encarg_hosp && errors.personal_encarg_hosp}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_hosp && !!errors.estado_hosp}>
                <Select
                  value={values.estado_hosp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_hosp"
                  displayEmpty
                  inputProps={{
                    name: 'estado_hosp',
                    id: 'estado_hosp-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value= "true" >Activo</MenuItem>
                  <MenuItem value= "false">Inactivo</MenuItem>
                </Select>
                {touched.estado_hosp && errors.estado_hosp && <FormHelperText>{errors.estado_hosp}</FormHelperText>}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Descripcion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.descripcion_hosp}
                name="descripcion_hosp"
                error={!!touched.descripcion_hosp && !!errors.descripcion_hosp}
                helperText={touched.descripcion_hosp && errors.descripcion_hosp}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Crear Nueva Hospitalizacion
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
  fecha_inic_hosp: yup.date().required("required"),
  fecha_fin_hosp: yup.date().required("required"),
  personal_encarg_hosp: yup.number().required("required"),
  descripcion_hosp: yup.string().required("required"),
  estado_hosp: yup.boolean().required("required"),
});
const initialValues = {
  fecha_inic_hosp:"",
  fecha_fin_hosp: "",
  personal_encarg_hosp:0,
  descripcion_hosp:"",
  estado_hosp: null,
};

export default Form;
