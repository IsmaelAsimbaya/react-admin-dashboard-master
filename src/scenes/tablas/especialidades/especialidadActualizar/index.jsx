import { Box, Button, TextField, FormControl, Select, MenuItem, FormHelperText, Typography, InputLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ActEspecialidad = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State para manejar el estado de la respuesta de la API
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [departamentoOptions, setDepartamentoOptions] = useState([]);
  const [rows, setRows] = useState([]);
  const {
    id_espe,
    encargado_espe,
    descripcion_espe,
    id_departamento_espe,
    estado_espe,
  } = useParams();
  useEffect(() => {
    const fetchDepartamentoOptions = async () => {
      try {
        const response = await axios.get("http://localhost:9090/departamentos");
        const data = response.data;
        setDepartamentoOptions(data);
      } catch (error) {
        console.error("Error fetching patient options:", error);
      }
    };
    fetchDepartamentoOptions();
  }, []);

  const initialValues = {

    encargado_espe: encargado_espe,
    descripcion_espe: descripcion_espe,
    id_departamento_espe: id_departamento_espe,
    estado_espe: estado_espe,
  };
  const handleUpdate = async (row) => {

    // Invert the estado_pac value when the button is clicked

    //const navigate = useNavigate();

    // Prepare the data object to be sent in the PUT request
    const updatedData = {
      encargado_espe: row.encargado_espe,
      descripcion_espe: row.descripcion_espe,
      id_departamento_espe: row.id_departamento_espe,
      estado_espe: row.estado_espe,

    };

    // Send the updated data to the API using the PUT method


    try {

      await axios.put(`http://localhost:9090/especialidades/${id_espe}`, updatedData);
      const updatedRows = rows.map((r) => {
        if (r.id === row.id) {
          return { ...r, estado_espe: row.estado_espe };
        }
        return r;
      });
      setRows(updatedRows);
      console.log("Estado Especialidad actualizado en la API.");
      alert("Se ha modificado los datos del Especialidad");
    }
    catch (error) {
      console.error("Error al obtener datos del Especialidad:", error);
      alert("No se pudieron modificar los datos de Especialidad");
    };
    row.encargado_espe = "";
    row.descripcion_espe = "";
    row.id_departamento_espe = 0;
    row.estado_espe = null;
  };
  // Función para enviar los datos del formulario a la API
  const handleSubmitApi = async (values) => {
    try {
      // Realiza una solicitud POST a la API con los datos del formulario
      const response = await axios.post("http://localhost:9090/especialidades", values);

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
      <Header title="ACTUALIZAR ESPECIALIDAD" subtitle="Actualizar especialidad" />

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
                label="Encargado"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.encargado_espe}
                name="encargado_espe"
                error={!!touched.encargado_espe && !!errors.encargado_espe}
                helperText={touched.encargado_espe && errors.encargado_espe}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.id_departamento_espe && !!errors.id_departamento_espe}
              >
                <InputLabel htmlFor="id_departamento_espe-select" sx={{ fontSize: 14 }}>
                  Departamento
                </InputLabel>
                <Select
                  value={values.id_departamento_espe}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="id_departamento_espe"
                  displayEmpty
                  inputProps={{
                    name: 'id_departamento_espe',
                    id: 'id_departamento_espe-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccionar Departamento
                  </MenuItem>
                  {departamentoOptions.map((departamento) => (
                    <MenuItem key={departamento.id_depa} value={departamento.id_depa}>
                      {departamento.id_depa} - {departamento.oficina_depa} - #Emp: {departamento.num_empl_depa}
                    </MenuItem>
                  ))}
                </Select>
                {touched.id_departamento_espe && errors.id_departamento_espe && (
                  <FormHelperText>{errors.id_paid_medico_consciente_cons}</FormHelperText>
                )}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Descripcion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.descripcion_espe}
                name="descripcion_espe"
                error={!!touched.descripcion_espe && !!errors.descripcion_espe}
                helperText={touched.descripcion_espe && errors.descripcion_espe}
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_espe && !!errors.estado_espe}>
                <InputLabel htmlFor="estadp-select" sx={{ fontSize: 14 }}>Estado</InputLabel>
                <Select
                  value={values.estado_espe}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_espe"
                  displayEmpty
                  inputProps={{
                    name: 'estado_espe',
                    id: 'estado_espe-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value="true" >Activo</MenuItem>
                  <MenuItem value="false">Inactivo</MenuItem>
                </Select>
                {touched.estado_espe && errors.estado_espe && <FormHelperText>{errors.estado_espe}</FormHelperText>}
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Actualizar especialidad
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
  encargado_espe: yup.string().required("required"),
  descripcion_espe: yup.string().required("required"),
  id_departamento_espe: yup.number().required("required"),
  estado_espe: yup.boolean().required("required"),
});
const initialValues = {
  encargado_espe: "",
  descripcion_espe: "",
  id_departamento_espe: 0,
  estado_espe: null,


};

export default ActEspecialidad;
