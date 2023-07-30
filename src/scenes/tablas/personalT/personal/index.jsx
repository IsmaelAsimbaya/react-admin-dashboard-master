import { Box, Button, TextField, FormControl, Select, MenuItem, FormHelperText, Typography   } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useState } from "react";
import axios from "axios";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  // State para manejar el estado de la respuesta de la API
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);

   // Función para enviar los datos del formulario a la API
   const handleSubmitApi = async (values) => {
    try {
      // Realiza una solicitud POST a la API con los datos del formulario
      const response = await axios.post("http://localhost:9090/pacientes", values);

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
      <Header title="CREAR PERSONAL" subtitle="Crear un nuevo Perfil de Paciente" />

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
                label="Cedula"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cedula_pac}
                name="cedula_pac"
                error={!!touched.cedula_pac && !!errors.cedula_pac}
                helperText={touched.cedula_pac && errors.cedula_pac}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nombres"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nombre_pac}
                name="nombre_pac"
                error={!!touched.nombre_pac && !!errors.nombre_pac}
                helperText={touched.nombre_pac && errors.nombre_pac}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Apellido Paterno"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.apellido_paterno_pac}
                name="apellido_paterno_pac"
                error={!!touched.apellido_paterno_pac && !!errors.apellido_paterno_pac}
                helperText={touched.apellido_paterno_pac && errors.apellido_paterno_pac}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Apellido Materno"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.apellido_materno_pac}
                name="apellido_materno_pac"
                error={!!touched.apellido_materno_pac && !!errors.apellido_materno_pac}
                helperText={touched.apellido_materno_pac && errors.apellido_materno_pac}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.sexo_pac && !!errors.sexo_pac}>
                <Select
                  value={values.sexo_pac}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="sexo_pac"
                  displayEmpty
                  inputProps={{
                    name: 'sexo_pac',
                    id: 'sexo_pac-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Sexo
                  </MenuItem>
                  <MenuItem value= "1" >Masculino</MenuItem>
                  <MenuItem value= "2">Femenino</MenuItem>
                </Select>
                {touched.sexo_pac && errors.sexo_pac && <FormHelperText>{errors.sexo_pac}</FormHelperText>}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Fecha de Nacimiento"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fecha_nac_pac}
                name="fecha_nac_pac"
                error={!!touched.fecha_nac_pac && !!errors.fecha_nac_pac}
                helperText={touched.fecha_nac_pac && errors.fecha_nac_pac}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Domicilio"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.domicilio_pac}
                name="domicilio_pac"
                error={!!touched.domicilio_pac && !!errors.domicilio_pac}
                helperText={touched.domicilio_pac && errors.domicilio_pac}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Telefono"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.telefono_pac}
                name="telefono_pac"
                error={!!touched.telefono_pac && !!errors.telefono_pac}
                helperText={touched.telefono_pac && errors.telefono_pac}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Numero de Expediente"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.num_expediente_pac}
                name="num_expediente_pac"
                error={!!touched.num_expediente_pac && !!errors.num_expediente_pac}
                helperText={touched.num_expediente_pac && errors.num_expediente_pac}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ID Hospitalario"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id_hospitalario_pac}
                name="id_hospitalario_pac"
                error={!!touched.id_hospitalario_pac && !!errors.id_hospitalario_pac}
                helperText={touched.id_hospitalario_pac && errors.id_hospitalario_pac}
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

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  cedula_pac: yup.string().required("required"),
  nombre_pac: yup.string().required("required"),
  apellido_paterno_pac: yup.string().required("required"),
  apellido_materno_pac: yup.string().required("required"),
  sexo_pac: yup.number().required("required"),
  fecha_nac_pac: yup.date().required("required"),
  domicilio_pac: yup.string().required("required"),
  telefono_pac: yup
    .string()
    .matches(phoneRegExp, "El numero no es valido")
    .required("required"),
  num_expediente_pac: yup.string().required("required"),
  id_hospitalario_pac: yup.string().required("required"),
});
const initialValues = {
  cedula_pac:"",
  nombre_pac: "",
  apellido_paterno_pac:"",
  apellido_materno_pac:"",
  sexo_pac: 0,
  fecha_nac_pac: "",
  domicilio_pac: "",
  telefono_pac: "",
  num_expediente_pac: "",
  id_hospitalario_pac: "",


};

export default Form;
