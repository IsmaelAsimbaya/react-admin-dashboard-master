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
      const response = await axios.post("http://localhost:9090/laboratorios", values);

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
      <Header title="CREAR LABORATORIO" subtitle="Crear un nuevo Perfil de Laboratorio" />

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
                label="Nombre Paciente"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nombre_pac_labo}
                name="nombre_pac_labo"
                error={!!touched.nombre_pac_labo && !!errors.nombre_pac_labo}
                helperText={touched.nombre_pac_labo && errors.nombre_pac_labo}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Medico Solicitante"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.med_solicitante_labo}
                name="med_solicitante_labo"
                error={!!touched.med_solicitante_labo && !!errors.med_solicitante_labo}
                helperText={touched.med_solicitante_labo && errors.med_solicitante_labo}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Fecha"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fecha_labo}
                name="fecha_labo"
                error={!!touched.fecha_labo && !!errors.fecha_labo}
                helperText={touched.fecha_labo && errors.fecha_labo}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tipo Prueba"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tipo_prueba_labo}
                name="tipo_prueba_labo"
                error={!!touched.tipo_prueba_labo && !!errors.tipo_prueba_labo}
                helperText={touched.tipo_prueba_labo && errors.tipo_prueba_labo}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ID Personal"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id_personal_labo}
                name="id_personal_labo"
                error={!!touched.id_personal_labo && !!errors.id_personal_labo}
                helperText={touched.id_personal_labo && errors.id_personal_labo}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_labo && !!errors.estado_labo}>
                <Select
                  value={values.estado_labo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_labo"
                  displayEmpty
                  inputProps={{
                    name: 'estado_labo',
                    id: 'estado_labo-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value= "true" >Activo</MenuItem>
                  <MenuItem value= "false">Inactivo</MenuItem>
                </Select>
                {touched.estado_labo && errors.estado_labo && <FormHelperText>{errors.estado_labo}</FormHelperText>}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Observaciones"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.observaciones_labo}
                name="observaciones_labo"
                error={!!touched.observaciones_labo && !!errors.observaciones_labo}
                helperText={touched.observaciones_labo && errors.observaciones_labo}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Crear Nuevo Laboratorio
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
  nombre_pac_labo: yup.string().required("required"),
  med_solicitante_labo: yup.string().required("required"),
  fecha_labo: yup.date().required("required"),
  tipo_prueba_labo: yup.string().required("required"),
  observaciones_labo: yup.string().required("required"),
  id_personal_labo: yup.number().required("required"),
  estado_labo: yup.boolean().required("required"),
});
const initialValues = {
  nombre_pac_labo:"",
  med_solicitante_labo: "",
  fecha_labo:"",
  tipo_prueba_labo:"",
  observaciones_labo: "",
  id_personal_labo: 0,
  estado_labo: null,
};

export default Form;
