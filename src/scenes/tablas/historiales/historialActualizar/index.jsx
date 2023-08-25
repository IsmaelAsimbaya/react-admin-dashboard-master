import { Box, Button, TextField, FormControl, Select, MenuItem, FormHelperText, Typography, InputLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ActHistorial = () => {

  const {
    id_hist,
    id_consulta_hist,
    id_paciente_hist,
    estado_hist,
  } = useParams();
  const [rows, setRows] = useState([]);
  const [patientOptions, setPatientOptions] = useState([]);
  const [consultaOptions, setConsultaOptions] = useState([]);
  const initialValues = {

    id_consulta_hist: id_consulta_hist,
    id_paciente_hist: id_paciente_hist,
    estado_hist: estado_hist,

  };
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
    const fetchConsultaOptions = async () => {
      try {
        const response = await axios.get("https://cloud-service-leonardo13344.cloud.okteto.net/consultas");
        const data = response.data;
        setConsultaOptions(data);
      } catch (error) {
        console.error("Error fetching medicos options:", error);
      }
    };
    fetchConsultaOptions();
    fetchPatientOptions();
  }, []);
  const handleUpdate = async (row) => {

    // Invert the estado_pac value when the button is clicked

    //const navigate = useNavigate();

    // Prepare the data object to be sent in the PUT request
    const updatedData = {
      id_consulta_hist: row.id_consulta_hist,
      id_paciente_hist: row.id_paciente_hist,
      estado_hist: row.estado_hist,
    };

    // console.log("Consulta", id_consulta_hist);
    // console.log("Paciente", id_paciente_hist);


    try {
      console.log("Consulta", updatedData.id_consulta_hist);
      console.log("Paciente", updatedData.id_paciente_hist);
      await axios.put(`https://cloud-service-leonardo13344.cloud.okteto.net/historial/${id_hist}`, updatedData);

      const updatedRows = rows.map((r) => {
        if (r.id === row.id) {
          return { ...r, estado_hist: row.estado_hist };
        }
        return r;
      });
      setRows(updatedRows);
      console.log("Estado Historial actualizado en la API.");
      alert("Se ha modificado los datos del Historial");
    }
    catch (error) {
      console.error("Error al obtener datos del Historial:", error);
      alert("No se pudieron modificar los datos de Historial");
    };
    row.id_consulta_hist = 0;
    row.id_paciente_hist = 0;
    row.estado_hist = null;
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State para manejar el estado de la respuesta de la API
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);

  return (
    <Box m="20px">
      <Header title="ACTUALIZAR HISTORIAL" subtitle="Actualizar Historial" />

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
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.id_consulta_hist && !!errors.id_consulta_hist}
              >
                <InputLabel htmlFor="id_consulta_hist-select" sx={{ fontSize: 14 }}>
                  Consulta
                </InputLabel>
                <Select
                  value={values.id_consulta_hist}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="id_consulta_hist"
                  displayEmpty
                  inputProps={{
                    name: 'id_consulta_hist',
                    id: 'id_consulta_hist-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccionar la Consulta
                  </MenuItem>
                  {consultaOptions.map((consulta) => (
                    <MenuItem key={consulta.id_cons} value={consulta.id_cons}>
                      {consulta.id_cons} - Id. Pac: {consulta.id_paciente_cons} - {consulta.concepto_cons}
                    </MenuItem>
                  ))}
                </Select>
                {touched.id_consulta_hist && errors.id_consulta_hist && (
                  <FormHelperText>{errors.id_consulta_hist}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.id_paciente_hist && !!errors.id_paciente_hist}
              >
                <InputLabel htmlFor="id_paciente_hist-select" sx={{ fontSize: 14 }}>
                  Paciente
                </InputLabel>
                <Select
                  value={values.id_paciente_hist}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="id_paciente_hist"
                  displayEmpty
                  inputProps={{
                    name: 'id_paciente_hist',
                    id: 'id_paciente_hist-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccionar el Paciente
                  </MenuItem>
                  {patientOptions.map((patient) => (
                    <MenuItem key={patient.id_pac} value={patient.id_pac}>
                      {patient.id_pac} - {patient.nombre_pac} {patient.apellido_paterno_pac}
                    </MenuItem>
                  ))}
                </Select>
                {touched.id_paciente_hist && errors.id_paciente_hist && (
                  <FormHelperText>{errors.id_paciente_hist}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_hist && !!errors.estado_hist}>
                <InputLabel htmlFor="estadp-select" sx={{ fontSize: 14 }}>Estado</InputLabel>
                <Select
                  value={values.estado_hist}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_hist"
                  displayEmpty
                  inputProps={{
                    name: 'estado_hist',
                    id: 'estado_hist-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value="true" >Activo</MenuItem>
                  <MenuItem value="false">Inactivo</MenuItem>
                </Select>
                {touched.estado_hist && errors.estado_hist && <FormHelperText>{errors.estado_hist}</FormHelperText>}
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Actualizar Historial
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
  id_consulta_hist: yup.number().required("required"),
  id_paciente_hist: yup.number().required("required"),
  estado_hist: yup.boolean().required("required"),
});


export default ActHistorial;
