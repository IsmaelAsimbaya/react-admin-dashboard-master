import { Box, Button, TextField, FormControl, Select, MenuItem, FormHelperText, Typography,InputLabel   } from "@mui/material";
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
      const response = await axios.post("http://localhost:9090/departamentos", values);

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
      <Header title="CREAR DEPARTAMENTO" subtitle="Crear un nuevo Departamento" />

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
                label="N.Empleado"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.num_empl_depa}
                name="num_empl_depa"
                error={!!touched.num_empl_depa && !!errors.num_empl_depa}
                helperText={touched.num_empl_depa && errors.num_empl_depa}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ID Encargado"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.encargado_id_dep}
                name="encargado_id_dep"
                error={!!touched.encargado_id_dep && !!errors.encargado_id_dep}
                helperText={touched.encargado_id_dep && errors.encargado_id_dep}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Oficina"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.oficina_depa}
                name="oficina_depa"
                error={!!touched.oficina_depa && !!errors.oficina_depa}
                helperText={touched.oficina_depa && errors.oficina_depa}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_depart && !!errors.estado_depart}>
              <InputLabel htmlFor="sexo_pac-select" sx={{ fontSize: 14 }}>Estado</InputLabel>
                <Select
                  value={values.estado_depart}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_depart"
                  displayEmpty
                  inputProps={{
                    name: 'estado_depart',
                    id: 'estado_depart-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value= "true" >Activo</MenuItem>
                  <MenuItem value= "false">Inactivo</MenuItem>
                </Select>
                {touched.estado_depart && errors.estado_depart && <FormHelperText>{errors.estado_depart}</FormHelperText>}
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Crear Nuevo Departamento
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
  num_empl_depa: yup.number().required("required"),
  encargado_id_dep: yup.string().required("required"),
  oficina_depa: yup.string().required("required"),
  estado_depart: yup.boolean().required("required"),
});
const initialValues = {
  num_empl_depa:0,
  encargado_id_dep: "",
  oficina_depa:"",
  estado_depart:null,


};

export default Form;
