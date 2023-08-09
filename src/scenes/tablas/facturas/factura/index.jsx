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
      const response = await axios.post("http://localhost:9090/facturas", values);

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
      <Header title="CREAR FACTURA" subtitle="Crear una nueva Factura" />

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
                label="Paciente"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.paciente_fact}
                name="paciente_fact"
                error={!!touched.paciente_fact && !!errors.paciente_fact}
                helperText={touched.paciente_fact && errors.paciente_fact}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Fecha de Emision"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fecha_emision_fact}
                name="fecha_emision_fact"
                error={!!touched.fecha_emision_fact && !!errors.fecha_emision_fact}
                helperText={touched.fecha_emision_fact && errors.fecha_emision_fact}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Monto"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.monto_fact}
                name="monto_fact"
                error={!!touched.monto_fact && !!errors.monto_fact}
                helperText={touched.monto_fact && errors.monto_fact}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.metodo_pago_fact && !!errors.metodo_pago_fact}>
                <Select
                  value={values.metodo_pago_fact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="metodo_pago_fact"
                  displayEmpty
                  inputProps={{
                    name: 'metodo_pago_fact',
                    id: 'metodo_pago_fact-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Metodo Pago
                  </MenuItem>
                  <MenuItem value= "1" >Credito</MenuItem>
                  <MenuItem value= "2">Efectivo</MenuItem>
                </Select>
                {touched.metodo_pago_fact && errors.metodo_pago_fact && <FormHelperText>{errors.metodo_pago_fact}</FormHelperText>}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ID Receta"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id_receta_fact}
                name="id_receta_fact"
                error={!!touched.id_receta_fact && !!errors.id_receta_fact}
                helperText={touched.id_receta_fact && errors.id_receta_fact}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_fact && !!errors.estado_fact}>
                <Select
                  value={values.estado_fact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_fact"
                  displayEmpty
                  inputProps={{
                    name: 'estado_fact',
                    id: 'estado_fact-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value= "true" >Activo</MenuItem>
                  <MenuItem value= "false">Inactivo</MenuItem>
                </Select>
                {touched.estado_fact && errors.estado_fact && <FormHelperText>{errors.estado_fact}</FormHelperText>}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Descripcion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.descripcion_fact}
                name="descripcion_fact"
                error={!!touched.descripcion_fact && !!errors.descripcion_fact}
                helperText={touched.descripcion_fact && errors.descripcion_fact}
                sx={{ gridColumn: "span 4" }}
              />
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
  fecha_emision_fact: yup.date().required("required"),
  paciente_fact: yup.string().required("required"),
  descripcion_fact: yup.string().required("required"),
  monto_fact: yup.string().required("required"),
  metodo_pago_fact: yup.string().required("required"),
  id_receta_fact: yup.number().required("required"),
  estado_fact: yup.boolean().required("required"),
});
const initialValues = {
  fecha_emision_fact:"",
  paciente_fact: "",
  descripcion_fact:"",
  monto_fact:"",
  metodo_pago_fact: "",
  id_receta_fact: 0,
  estado_fact: null,


};

export default Form;
