import { Box, Button, TextField, FormControl, Select, MenuItem, FormHelperText, Typography , InputLabel  } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const ActIndumentaria = () => {
  const {
    id_indu, 
    concepto_indu,
    ubicacion_indu,
    area_indu,
    id_laboratorio_indu,
    estado_indu,
  } = useParams(); 
  const [rows, setRows] = useState([]);
  const initialValues = {
    concepto_indu: concepto_indu,
    ubicacion_indu: ubicacion_indu,
    area_indu: area_indu,
    id_laboratorio_indu: id_laboratorio_indu,
    estado_indu: estado_indu,

  };
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State para manejar el estado de la respuesta de la API
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);
  const handleUpdate = async (row) => {
    
    // Invert the estado_pac value when the button is clicked
    
    //const navigate = useNavigate();

    // Prepare the data object to be sent in the PUT request
    const updatedData = {
      
      concepto_indu: row.concepto_indu,
      ubicacion_indu: row.ubicacion_indu,
      area_indu: row.area_indu,
      id_laboratorio_indu: row.id_laboratorio_indu,
      estado_indu: row.estado_indu,
     
    };

    // Send the updated data to the API using the PUT method

   
    try {

      await axios.put(`http://localhost:9090/indumentaria/${id_indu}`, updatedData);
      const updatedRows = rows.map((r) => {
        if (r.id === row.id) {
          return { ...r, estado_indu: row.estado_indu };
        }
        return r;
      });
      setRows(updatedRows);
      console.log("Estado Indumentaria actualizado en la API.");
      alert("Se ha modificado los datos del Indumentaria");
    }
    catch (error) {
      console.error("Error al obtener datos del Indumentaria:", error);
      alert("No se pudieron modificar los datos de Indumentaria");
    };
    row.concepto_indu = ""; 
    row.ubicacion_indu= ""; 
    row.area_indu = ""; 
    row.id_laboratorio_indu = ""; 
    row.estado_indu= null;
  };

  return (
    <Box m="20px">
      <Header title="ACTUALIZAR INDUMENTARIA" subtitle="Actualizar Perfil de Indumentaria" />

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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ID Laboratorio"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id_laboratorio_indu}
                name="id_laboratorio_indu"
                error={!!touched.id_laboratorio_indu && !!errors.id_laboratorio_indu}
                helperText={touched.id_laboratorio_indu && errors.id_laboratorio_indu}
                sx={{ gridColumn: "span 2" }}
              />
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
              Actualizar Indumentaria
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

export default ActIndumentaria;
