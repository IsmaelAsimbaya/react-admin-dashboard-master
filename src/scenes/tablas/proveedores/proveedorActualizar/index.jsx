import { Box, Button, TextField, FormControl,InputLabel, Select, MenuItem, FormHelperText, Typography   } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const ActProveedor = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State para manejar el estado de la respuesta de la API
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);
  const {
    id_prov,
    direccion_prov,
    telefono_prov,
    descuento_prov,
    estado_prov,
  } = useParams(); 
  const [rows, setRows] = useState([]);

  const initialValues = {

    direccion_prov: direccion_prov,
    telefono_prov: telefono_prov,
    descuento_prov: descuento_prov,
    estado_prov: estado_prov,

  };

  const handleUpdate = async (row) => {
    const updatedData = {
      
      direccion_prov: row.direccion_prov,
      telefono_prov: row.telefono_prov,
      descuento_prov: row.descuento_prov,
      estado_prov: row.estado_prov,
     
    };

   
    try {

      await axios.put(`http://localhost:9090/proveedores/${id_prov}`, updatedData);
      const updatedRows = rows.map((r) => {
        if (r.id === row.id) {
          return { ...r, estado_prov: row.estado_prov };
        }
        return r;
      });
      setRows(updatedRows);
      console.log("Estado Proveedor actualizado en la API.");
      alert("Se ha modificado los datos del Proveedor");
    }
    catch (error) {
      console.error("Error al obtener datos del Proveedor:", error);
      alert("No se pudieron modificar los datos de Proveedor");
    };
    row.direccion_prov = ""; 
    row.telefono_prov = ""; 
    row.descuento_prov =0;
    row.estado_prov = null;
  };

  return (
    <Box m="20px">
      <Header title="ACTUALIZAR PROVEEDOR" subtitle="Actualizar Perfil de Proveedor" />

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
                label="Direccion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.direccion_prov}
                name="direccion_prov"
                error={!!touched.direccion_prov && !!errors.direccion_prov}
                helperText={touched.direccion_prov && errors.direccion_prov}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Telefono"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.telefono_prov}
                name="telefono_prov"
                error={!!touched.telefono_prov && !!errors.telefono_prov}
                helperText={touched.telefono_prov && errors.telefono_prov}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Descuento"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.descuento_prov}
                name="descuento_prov"
                error={!!touched.descuento_prov && !!errors.descuento_prov}
                helperText={touched.descuento_prov && errors.descuento_prov}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_prov && !!errors.estado_prov}>
              <InputLabel htmlFor="estadp-select" sx={{ fontSize: 14 }}>Estado</InputLabel>
                <Select
                  value={values.estado_prov}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_prov"
                  displayEmpty
                  inputProps={{
                    name: 'estado_prov',
                    id: 'estado_prov-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value= "true" >Activo</MenuItem>
                  <MenuItem value= "false">Inactivo</MenuItem>
                </Select>
                {touched.estado_prov && errors.estado_prov && <FormHelperText>{errors.estado_prov}</FormHelperText>}
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Actualizar Proveedor
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
  direccion_prov: yup.string().required("required"),
  telefono_prov: yup
    .string()
    .matches(phoneRegExp, "El numero no es valido")
    .required("required"),
  descuento_prov: yup.number().required("required"),
  estado_prov: yup.boolean().required("required"),
});

export default ActProveedor;
