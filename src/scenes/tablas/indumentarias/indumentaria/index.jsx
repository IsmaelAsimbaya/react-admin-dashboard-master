import { Box, Button, TextField, FormControl, Select, MenuItem, FormHelperText, Typography , InputLabel  } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useState, useEffect} from "react";
import axios from "axios";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State para manejar el estado de la respuesta de la API
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [laboratorioOptions, setLaboratorioOptions] = useState([]);


   // Función para enviar los datos del formulario a la API
   const handleSubmitApi = async (values) => {
    try {
      // Realiza una solicitud POST a la API con los datos del formulario
      const response = await axios.post("http://localhost:9090/indumentaria", values);

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
    const fetchLaboratorioOptions = async () => {
      try {
        const response = await axios.get("http://localhost:9090/laboratorios");
        const data = response.data;
        setLaboratorioOptions(data);
      } catch (error) {
        console.error("Error fetching laboratorio options:", error);
      }
    };
    fetchLaboratorioOptions();
  }, []);


  return (
    <Box m="20px">
      <Header title="CREAR INDUMENTARIA" subtitle="Crear un nuevo Perfil de Indumentaria" />

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
                value={values.concepto_indu}
                name="concepto_indu"
                error={!!touched.concepto_indu && !!errors.concepto_indu}
                helperText={touched.concepto_indu && errors.concepto_indu}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Ubicacion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ubicacion_indu}
                name="ubicacion_indu"
                error={!!touched.ubicacion_indu && !!errors.ubicacion_indu}
                helperText={touched.ubicacion_indu && errors.ubicacion_indu}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Area"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.area_indu}
                name="area_indu"
                error={!!touched.area_indu && !!errors.area_indu}
                helperText={touched.area_indu && errors.area_indu}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.id_laboratorio_indu && !!errors.id_laboratorio_indu}
              >
                <InputLabel htmlFor="id_laboratorio_indu-select" sx={{ fontSize: 14 }}>
                  ID Laboratorio
                </InputLabel>
                <Select
                  value={values.id_paciente_cons}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="id_laboratorio_indu"
                  displayEmpty
                  inputProps={{
                    name: 'id_laboratorio_indu',
                    id: 'id_laboratorio_indu-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccionar el laboratorio
                  </MenuItem>
                  {laboratorioOptions.map((laboratorio) => (
                    <MenuItem key={laboratorio.id_labo} value={laboratorio.id_labo}>
                      {laboratorio.id_labo} - {laboratorio.tipo_prueba_labo} - Solicita:  {laboratorio.med_solicitante_labo}
                    </MenuItem>
                  ))}
                </Select>
                {touched.id_laboratorio_indu && errors.id_laboratorio_indu && (
                  <FormHelperText>{errors.id_laboratorio_indu}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_indu && !!errors.estado_indu}>
              <InputLabel htmlFor="estadp-select" sx={{ fontSize: 14 }}>Estado</InputLabel>
                <Select
                  value={values.estado_indu}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_indu"
                  displayEmpty
                  inputProps={{
                    name: 'estado_indu',
                    id: 'estado_indu-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value= "true" >Activo</MenuItem>
                  <MenuItem value= "false">Inactivo</MenuItem>
                </Select>
                {touched.estado_indu && errors.estado_indu && <FormHelperText>{errors.estado_indu}</FormHelperText>}
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Crear Nueva Indumentaria
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
  concepto_indu: yup.string().required("required"),
  ubicacion_indu: yup.string().required("required"),
  area_indu: yup.string().required("required"),
  id_laboratorio_indu: yup.string().required("required"),
  estado_indu: yup.boolean().required("required"),
});
const initialValues = {
  concepto_indu:"",
  ubicacion_indu: "",
  area_indu:"",
  id_laboratorio_indu:"",
  estado_indu: null,
};

export default Form;
