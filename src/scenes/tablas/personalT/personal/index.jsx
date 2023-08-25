import { Box, Button, TextField, FormControl, Select,InputLabel ,MenuItem, FormHelperText, Typography   } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useState , useEffect} from "react";
import axios from "axios";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State para manejar el estado de la respuesta de la API
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [departamentoOptions, setDepartamentoOptions] = useState([]);
   // Función para enviar los datos del formulario a la API
   const handleSubmitApi = async (values) => {
    try {
      // Realiza una solicitud POST a la API con los datos del formulario
      const response = await axios.post("https://cloud-service-leonardo13344.cloud.okteto.net/personal", values);

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
    const fetchDepartamentoOptions = async () => {
      try {
        const response = await axios.get("https://cloud-service-leonardo13344.cloud.okteto.net/departamentos");
        const data = response.data;
        setDepartamentoOptions(data);
      } catch (error) {
        console.error("Error fetching departamento options:", error);
      }
    };

    fetchDepartamentoOptions();
  }, []);
  return (
    <Box m="20px">
      <Header title="CREAR PERSONAL" subtitle="Crear un nuevo Perfil de Personal" />

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
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.id_departamento_pers && !!errors.id_departamento_pers}
              >
                <InputLabel htmlFor="id_departamento_pers-select" sx={{ fontSize: 14 }}>
                  Departamento
                </InputLabel>
                <Select
                  value={values.id_departamento_pers}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="id_departamento_pers"
                  displayEmpty
                  inputProps={{
                    name: 'id_departamento_pers',
                    id: 'id_departamento_pers-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccionar el departamento
                  </MenuItem>
                  {departamentoOptions.map((departamento) => (
                    <MenuItem key={departamento.id_depa} value={departamento.id_depa}>
                      {departamento.id_depa} - {departamento.oficina_depa} - Encar: {departamento.encargado_id_dep}
                    </MenuItem>
                  ))}
                </Select>
                {touched.id_departamento_pers && errors.id_departamento_pers && (
                  <FormHelperText>{errors.id_departamento_pers}</FormHelperText>
                )}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Encargado"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.encargado_pers}
                name="encargado_pers"
                error={!!touched.encargado_pers && !!errors.encargado_pers}
                helperText={touched.encargado_pers && errors.encargado_pers}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Horario"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.horario_pers}
                name="horario_pers"
                error={!!touched.horario_pers && !!errors.horario_pers}
                helperText={touched.horario_pers && errors.horario_pers}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_pers && !!errors.estado_pers}>
              <InputLabel htmlFor="estadp-select" sx={{ fontSize: 14 }}>Estado</InputLabel>
                <Select
                  value={values.estado_pers}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_pers"
                  displayEmpty
                  inputProps={{
                    name: 'estado_pers',
                    id: 'estado_pers-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value= "true" >Activo</MenuItem>
                  <MenuItem value= "false">Inactivo</MenuItem>
                </Select>
                {touched.estado_pers && errors.estado_pers && <FormHelperText>{errors.estado_pers}</FormHelperText>}
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Crear Nuevo Personal
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
  id_departamento_pers: yup.number().required("required"),
  encargado_pers: yup.string().required("required"),
  horario_pers: yup.string().required("required"),
  estado_pers: yup.boolean().required("required"),
});
const initialValues = {
  id_departamento_pers:0,
  encargado_pers: "",
  horario_pers:"",
  estado_pers:null,
};

export default Form;
