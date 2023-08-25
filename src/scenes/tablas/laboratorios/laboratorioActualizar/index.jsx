import { Box, Button, TextField, FormControl, Select, MenuItem, FormHelperText, Typography, InputLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const ActActualizar = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State para manejar el estado de la respuesta de la API
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [patientOptions, setPatientOptions] = useState([]);
  const [medicoOptions, setMedicosOptions] = useState([]);
  const [personalOptions, setPersonalOptions] = useState([]);
  const {
    id_labo,
    nombre_pac_labo,
    med_solicitante_labo,
    fecha_labo,
    tipo_prueba_labo,
    observaciones_labo,
    id_personal_labo,
    estado_labo,
  } = useParams();
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchPatientOptions = async () => {
      try {
        const response = await axios.get("https://cloud-service-leonardo13344.cloud.okteto.net/pacientes");
        const data = response.data;
        setPatientOptions(data);
      } catch (error) {
        console.error("Error fetching patient options:", error);
      }
    };
    const fetchMedicosOptions = async () => {
      try {
        const response = await axios.get("https://cloud-service-leonardo13344.cloud.okteto.net/medicos");
        const data = response.data;
        setMedicosOptions(data);
      } catch (error) {
        console.error("Error fetching medicos options:", error);
      }
    };
    const fetchPersonalOptions = async () => {
      try {
        const response = await axios.get("https://cloud-service-leonardo13344.cloud.okteto.net/personal");
        const data = response.data;
        setPersonalOptions(data);
      } catch (error) {
        console.error("Error fetching personal options:", error);
      }
    };

    fetchMedicosOptions();
    fetchPatientOptions();
    fetchPersonalOptions();
  }, []);
  const initialValues = {

    nombre_pac_labo: nombre_pac_labo,
    med_solicitante_labo: med_solicitante_labo,
    fecha_labo: fecha_labo,
    tipo_prueba_labo: tipo_prueba_labo,
    observaciones_labo: observaciones_labo,
    id_personal_labo: id_personal_labo,
    estado_labo: estado_labo,
  };

  const handleUpdate = async (row) => {

    const updatedData = {

      nombre_pac_labo: row.nombre_pac_labo,
      med_solicitante_labo: row.med_solicitante_labo,
      fecha_labo: row.fecha_labo,
      tipo_prueba_labo: row.tipo_prueba_labo,
      observaciones_labo: row.observaciones_labo,
      id_personal_labo: row.id_personal_labo,
      estado_labo: row.estado_labo,

    };

    // Send the updated data to the API using the PUT method


    try {

      await axios.put(`https://cloud-service-leonardo13344.cloud.okteto.net/laboratorios/${id_labo}`, updatedData);
      const updatedRows = rows.map((r) => {
        if (r.id === row.id) {
          return { ...r, estado_labo: row.estado_labo };
        }
        return r;
      });
      setRows(updatedRows);
      console.log("Estado Laboratorio actualizado en la API.");
      alert("Se ha modificado los datos del Laboratorio");
    }
    catch (error) {
      console.error("Error al obtener datos del Laboratorio:", error);
      alert("No se pudieron modificar los datos de Laboratorio");
    };
    row.nombre_pac_labo = "";
    row.med_solicitante_labo = "";
    row.fecha_labo = "";
    row.tipo_prueba_labo = "";
    row.observaciones_labo = "";
    row.id_personal_labo = 0;
    row.estado_labo = null;
  };

  return (
    <Box m="20px">
      <Header title="ACTUALIZAR LABORATORIO" subtitle="Actualizar Perfil de Laboratorio" />

      <Formik
        onSubmit={handleUpdate} // Utiliza la función para enviar los datos a la API
        initialValues={initialValues}
        validationSchema={checkoutSchema} s
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
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.nombre_pac_labo && !!errors.nombre_pac_labo}
              >
                <InputLabel htmlFor="nombre_pac_labo-select" sx={{ fontSize: 14 }}>
                  Paciente
                </InputLabel>
                <Select
                  value={values.nombre_pac_labo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="nombre_pac_labo"
                  displayEmpty
                  inputProps={{
                    name: 'nombre_pac_labo',
                    id: 'nombre_pac_labo-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccionar ID Paciente
                  </MenuItem>
                  {patientOptions.map((patient) => (
                    <MenuItem key={patient.id_pac} value={patient.id_pac}>
                      {patient.id_pac} - {patient.nombre_pac} {patient.apellido_paterno_pac}
                    </MenuItem>
                  ))}
                </Select>
                {touched.nombre_pac_labo && errors.nombre_pac_labo && (
                  <FormHelperText>{errors.nombre_pac_labo}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.med_solicitante_labo && !!errors.med_solicitante_labo}
              >
                <InputLabel htmlFor="med_solicitante_labo-select" sx={{ fontSize: 14 }}>
                  Médico
                </InputLabel>
                <Select
                  value={values.med_solicitante_labo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="med_solicitante_labo"
                  displayEmpty
                  inputProps={{
                    name: 'med_solicitante_labo',
                    id: 'med_solicitante_labo-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccionar Médico
                  </MenuItem>
                  {medicoOptions.map((medico) => (
                    <MenuItem key={medico.id_medi} value={medico.id_medi}>
                      {medico.id_medi} - {medico.nombre_medi}
                    </MenuItem>
                  ))}
                </Select>
                {touched.med_solicitante_labo && errors.id_medico_cons && (
                  <FormHelperText>{errors.id_personal_labo}</FormHelperText>
                )}
              </FormControl>
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
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.id_personal_labo && !!errors.id_personal_labo}
              >
                <InputLabel htmlFor="id_personal_labo-select" sx={{ fontSize: 14 }}>
                  Personal
                </InputLabel>
                <Select
                  value={values.id_personal_labo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="id_personal_labo"
                  displayEmpty
                  inputProps={{
                    name: 'id_personal_labo',
                    id: 'id_personal_labo-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccionar el personal encargado
                  </MenuItem>
                  {personalOptions.map((personal) => (
                    <MenuItem key={personal.id_pers} value={personal.id_pers}>
                      {personal.id_pers} - Personal ID: {personal.encargado_pers}
                    </MenuItem>
                  ))}
                </Select>
                {touched.id_personal_labo && errors.id_personal_labo && (
                  <FormHelperText>{errors.id_personal_labo}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_labo && !!errors.estado_labo}>
                <InputLabel htmlFor="estadp-select" sx={{ fontSize: 14 }}>Estado</InputLabel>
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
                  <MenuItem value="true" >Activo</MenuItem>
                  <MenuItem value="false">Inactivo</MenuItem>
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
                Actualizar Laboratorio
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

export default ActActualizar;
