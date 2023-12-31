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
      <Header title="CREAR CONSULTA" subtitle="Crear una nueva Consulta" />

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
                label="Concepto"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.concepto_cons}
                name="concepto_cons"
                error={!!touched.concepto_cons && !!errors.concepto_cons}
                helperText={touched.concepto_cons && errors.concepto_cons}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ID Paciente"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id_paciente_cons}
                name="id_paciente_cons"
                error={!!touched.id_paciente_cons && !!errors.id_paciente_cons}
                helperText={touched.id_paciente_cons && errors.id_paciente_cons}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ID Medico"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id_medico_cons}
                name="id_medico_cons"
                error={!!touched.id_medico_cons && !!errors.id_medico_cons}
                helperText={touched.id_medico_cons && errors.id_medico_cons}
                sx={{ gridColumn: "span 2" }}
              />
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
                  <MenuItem value= "true" >Activo</MenuItem>
                  <MenuItem value= "false">Inactivo</MenuItem>
                </Select>
                {touched.estado_cons && errors.estado_cons && <FormHelperText>{errors.estado_cons}</FormHelperText>}
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Crear Consulta
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
  concepto_cons:"",
  id_paciente_cons: 0,
  id_medico_cons:0,
  fecha_cons:"",
  estado_cons: null,


};

export default Form;
