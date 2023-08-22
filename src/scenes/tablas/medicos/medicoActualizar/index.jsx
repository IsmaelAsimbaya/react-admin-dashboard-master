import { Box, Button, TextField, FormControl,InputLabel, Select, MenuItem, FormHelperText, Typography   } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useState , useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const ActMedico = () => {
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
  const {
    id_medi, 
    nombre_medi,
    apellidos_medi,
    id_especialidad_medi,
    hospital_medi,
    direccion_medi,
    correo_medi,
    salario_medi,
    supervisor_id_medi,
    estado_medi
  } = useParams(); 
  const [rows, setRows] = useState([]);
  const initialValues = {

    nombre_medi: nombre_medi,
    apellidos_medi: apellidos_medi,
    id_especialidad_medi: id_especialidad_medi,
    hospital_medi: hospital_medi,
    direccion_medi: direccion_medi,
    correo_medi: correo_medi,
    salario_medi: salario_medi,
    supervisor_id_medi: supervisor_id_medi,
    estado_medi: estado_medi,

  };

  const handleUpdate = async (row) => {
    
    const updatedData = {
      
      nombre_medi: row.nombre_medi,
      apellidos_medi: row.apellidos_medi,
      id_especialidad_medi: row.id_especialidad_medi,
      hospital_medi: row.hospital_medi,
      direccion_medi: row.direccion_medi,
      correo_medi: row.correo_medi,
      salario_medi: row.salario_medi,
      supervisor_id_medi: row.supervisor_id_medi,
      estado_medi: row.estado_medi,

     
    };

    // Send the updated data to the API using the PUT method

   
    try {

      await axios.put(`http://localhost:9090/medicos/${id_medi}`, updatedData);
      const updatedRows = rows.map((r) => {
        if (r.id === row.id) {
          return { ...r, estado_medi: row.estado_medi };
        }
        return r;
      });
      setRows(updatedRows);
      console.log("Estado Médico actualizado en la API.");
      alert("Se ha modificado los datos del Médico");
    }
    catch (error) {
      console.error("Error al obtener datos del Médico:", error);
      alert("No se pudieron modificar los datos de Médico");
    };
    row.nombre_medi= ""; 
    row.apellidos_medi ="";
    row.id_especialidad_medi= 0;
    row.hospital_medi = "";
    row.direccion_medi = ""; 
    row.correo_medi = ""; 
    row.salario_medi = 0;
    row.supervisor_id_medi = 0; 
    row.estado_medi = null; 
  };

  return (
    <Box m="20px">
      <Header title="ACTUALIZAR MEDICO" subtitle="Actualizar Perfil de Medico" />

      <Formik
        onSubmit={handleUpdate} // Utiliza la función para enviar los datos a la API
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
                  <MenuItem value= "true" >Activo</MenuItem>
                  <MenuItem value= "false">Inactivo</MenuItem>
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
                Actualizar Medico
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
  apellidos_medi:"",
  id_especialidad_medi: 0,
  hospital_medi: "",
  direccion_medi: "",
  correo_medi: "",
  salario_medi: 0,
  supervisor_id_medi: 0,
  estado_medi: null,


};

export default ActMedico;
