import { Box, Button, TextField, FormControl, Select, MenuItem, InputLabel, FormHelperText, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useState ,useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';


const ActPaciente = () => {
  const {

    cedula_pac,
    nombre_pac,
    apellido_paterno_pac,
    apellido_materno_pac,
    sexo_pac,
    fecha_nac_pac,
    domicilio_pac,
    telefono_pac,
    num_expediente_pac,
    id_hospitalario_pac,
    estado_pac,
  } = useParams();
  const [rows, setRows] = useState([]);
  const [pacienteId, setPacienteId] = useState();

  const fechaFormat = new Date(fecha_nac_pac);
  const initialValues = {

    cedula_pac: cedula_pac,
    nombre_pac: nombre_pac,
    apellido_paterno_pac: apellido_paterno_pac,
    apellido_materno_pac: apellido_materno_pac,
    sexo_pac: sexo_pac,
    fecha_nac_pac: fechaFormat,
    domicilio_pac: domicilio_pac,
    telefono_pac: telefono_pac,
    num_expediente_pac: num_expediente_pac,
    estado_pac: estado_pac,
    id_hospitalario_pac: id_hospitalario_pac,
  };
  console.log(initialValues);
  useEffect(() => {
    // Llamada GET a la API al cargar la ventana
    axios.get(`http://localhost:9090/pacientes/C/${cedula_pac}`)
      .then((response) => {
        const pacienteData = response.data;

        if (pacienteData && pacienteData.id_pac) {
          setPacienteId(pacienteData.id_pac);
        } else {
          console.log("Datos del paciente no encontrados.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos del paciente:", error);
      });
  }, []);
  const handleUpdate = async (row) => {
    // Invert the estado_pac value when the button is clicked
    const updatedEstadoPac = !row.estado_pac;
    //const navigate = useNavigate();

    // Prepare the data object to be sent in the PUT request
    const updatedData = {
      cedula_pac: row.cedula_pac,
      nombre_pac: row.nombre_pac,
      apellido_paterno_pac: row.apellido_paterno_pac,
      apellido_materno_pac: row.apellido_materno_pac,
      sexo_pac: row.sexo_pac,
      fecha_nac_pac: row.fecha_nac_pac,
      domicilio_pac: row.domicilio_pac,
      telefono_pac: row.telefono_pac,
      num_expediente_pac: row.num_expediente_pac,
      id_hospitalario_pac: row.id_hospitalario_pac,
      estado_pac: updatedEstadoPac, // Use the updated estado_pac value
    };

    // Send the updated data to the API using the PUT method

    console.log(cedula_pac);
    try {
        await axios.put(`http://localhost:9090/pacientes/${pacienteId}`, updatedData);
        const updatedRows = rows.map((r) => {
          if (r.id === row.id) {
            return { ...r, estado_pac: updatedEstadoPac };
          }
          return r;
        });
        setRows(updatedRows);
        console.log("Estado Paciente actualizado en la API.");
        alert("Se ha modificado los datos del Paciente");
      } 
     catch (error) {
      console.error("Error al obtener datos del paciente:", error);
      alert("No se pudieron modificar los datos de paciente");
    };
    console.log(pacienteId);
    row.cedula_pac = "";
    row.nombre_pac = "";
    row.apellido_paterno_pac = "";
    row.apellido_materno_pac = "";
    row.sexo_pac = 0;
    row.fecha_nac_pac = "";
    row.domicilio_pac = "";
    row.telefono_pac = "";
    row.num_expediente_pac = "";
    row.estado_pac = null;
    row.id_hospitalario_pac = "";
  };
  //console.log("La cedula en la clase hija es:",cedula_pac); 
  const isNonMobile = useMediaQuery("(min-width:600px)");

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
      <Header title="ACTUALIZAR PACIENTE" subtitle="Actualizar el Perfil de Paciente" />

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
                <InputLabel htmlFor="sexo_pac-select" sx={{ fontSize: 18 }}>Sexo</InputLabel>
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
                  <MenuItem value="1" >Masculino</MenuItem>
                  <MenuItem value="2">Femenino</MenuItem>
                </Select>
                {touched.sexo_pac && errors.sexo_pac && < FormHelperText>{errors.sexo_pac}</FormHelperText>}
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
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_pac && !!errors.estado_pac}>
                <Select
                  value={values.estado_pac}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_pac"
                  displayEmpty
                  inputProps={{
                    name: 'estado_pac',
                    id: 'estado_pac-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value="true" >Activo</MenuItem>
                  <MenuItem value="false">Inactivo</MenuItem>
                </Select>
                {touched.estado_pac && errors.estado_pac && <FormHelperText>{errors.estado_pac}</FormHelperText>}
              </FormControl>
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
                Actualizar Datos Paciente
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
  estado_pac: yup.boolean().required("required"),
  id_hospitalario_pac: yup.string().required("required"),
});


export default ActPaciente;
