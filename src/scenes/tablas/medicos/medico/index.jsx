import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Typography } from "@mui/material";
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
  const [especialidadOptions, setEspecialidadOptions] = useState([]);

  // Función para enviar los datos del formulario a la API
  const handleSubmitApi = async (values) => {
    console.log(values);
    try {
      // Realiza una solicitud POST a la API con los datos del formulario
      const response = await axios.post("http://localhost:9090/medicos", values);

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

    const fetchEspecialidadesOptions = async () => {
      try {
        const response = await axios.get("http://localhost:9090/especialidades");
        const data = response.data;
        setEspecialidadOptions(data);
      } catch (error) {
        console.error("Error fetching medicos options:", error);
      }
    };
    fetchEspecialidadesOptions();
  }, []);
  return (
    <Box m="20px">
      <Header title="CREAR MEDICO" subtitle="Crear un nuevo Perfil de Medico" />

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
                label="Nombres"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nombre_medi}
                name="nombre_medi"
                error={!!touched.nombre_medi && !!errors.nombre_medi}
                helperText={touched.nombre_medi && errors.nombre_medi}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Apellidos"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.apellidos_medi}
                name="apellidos_medi"
                error={!!touched.apellidos_medi && !!errors.apellidos_medi}
                helperText={touched.apellidos_medi && errors.apellidos_medi}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.id_especialidad_medi && !!errors.id_especialidad_medi}
              >
                <InputLabel htmlFor="id_especialidad_medi-select" sx={{ fontSize: 14 }}>
                  Especialidad 
                </InputLabel>
                <Select
                  value={values.id_especialidad_medi}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="id_especialidad_medi"
                  displayEmpty
                  inputProps={{
                    name: 'id_especialidad_medi',
                    id: 'id_especialidad_medi-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccionar ID Médico
                  </MenuItem>
                  {especialidadOptions.map((especialidad) => (
                    <MenuItem key={especialidad.id_espe} value={especialidad.id_espe}>
                      {especialidad.id_espe} - {especialidad.descripcion_espe} - {especialidad.encargado_espe}
                    </MenuItem>
                  ))}
                </Select>
                {touched.id_especialidad_medi && errors.id_especialidad_medi && (
                  <FormHelperText>{errors.id_paid_medico_consciente_cons}</FormHelperText>
                )}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Hospital"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.hospital_medi}
                name="hospital_medi"
                error={!!touched.hospital_medi && !!errors.hospital_medi}
                helperText={touched.hospital_medi && errors.hospital_medi}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Direccion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.direccion_medi}
                name="direccion_medi"
                error={!!touched.direccion_medi && !!errors.direccion_medi}
                helperText={touched.direccion_medi && errors.direccion_medi}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Correo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.correo_medi}
                name="correo_medi"
                error={!!touched.correo_medi && !!errors.correo_medi}
                helperText={touched.correo_medi && errors.correo_medi}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Salario"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.salario_medi}
                name="salario_medi"
                error={!!touched.salario_medi && !!errors.salario_medi}
                helperText={touched.salario_medi && errors.salario_medi}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_medi && !!errors.estado_medi}>
                <InputLabel htmlFor="estadp-select" sx={{ fontSize: 14 }}>Estado</InputLabel>
                <Select
                  value={values.estado_medi}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_medi"
                  displayEmpty
                  inputProps={{
                    name: 'estado_medi',
                    id: 'estado_medi-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value="true" >Activo</MenuItem>
                  <MenuItem value="false">Inactivo</MenuItem>
                </Select>
                {touched.estado_medi && errors.estado_medi && <FormHelperText>{errors.estado_medi}</FormHelperText>}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Supervisor ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.supervisor_id_medi}
                name="supervisor_id_medi"
                error={!!touched.supervisor_id_medi && !!errors.supervisor_id_medi}
                helperText={touched.supervisor_id_medi && errors.supervisor_id_medi}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Crear Nuevo Medico
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
  nombre_medi: yup.string().required("required"),
  apellidos_medi: yup.string().required("required"),
  id_especialidad_medi: yup.number().required("required"),
  hospital_medi: yup.string().required("required"),
  direccion_medi: yup.string().required("required"),
  correo_medi: yup.string().required("required"),
  salario_medi: yup.number().required("required"),
  supervisor_id_medi: yup.number().required("required"),
  estado_medi: yup.boolean().required("required"),
});
const initialValues = {
  nombre_medi: "",
  apellidos_medi: "",
  id_especialidad_medi: 0,
  hospital_medi: "",
  direccion_medi: "",
  correo_medi: "",
  salario_medi: 0,
  supervisor_id_medi: 0,
  estado_medi: null,


};

export default Form;
