import { useState, useEffect } from "react";
import axios from "axios";

import {
  Select,
  MenuItem,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
} from "@mui/material";
//import { makeStyles } from "@mui/styles";
//Styles for customers dropdown list
const useStyles = makeStyles({
  paper: {
    overflowY: "scroll",
    height: "200px",
  },
}); 

export default function NewVehicleForm({ props }) {
  //const classes = useStyles();
  const {
         setType,
         toastAlert,
         setOpenClientForm,
         openVehicleForm,
         setOpenVehicleForm,
         setAlertMsg,
         getVehicles,
  } = { ...props };

  const handleClose = (e) => {
    setOpenVehicleForm(false);
  };

  const [form, setForm] = useState({
    domain: null,
    BrandId: null,
    model: null,
    year: null,
    CustomerId: null,
  });

  const [brands, setBrands] = useState([]);
  const [customers, setCustomers] = useState([]);

  //const [pathNAme, setPathName] = useState("");

  //set currentPath
  //setPathName(useLocation().pathname);

  useEffect(() => {
    axios
      .get("https://app-taller-api.vercel.app/api/vehicles/brands")
      .then((brandResponse) => {
        setBrands(brandResponse.data);
        axios
          .get("https://app-taller-api.vercel.app/api/clients/all-customers")
          .then((customerResponse) => {
            setCustomers(customerResponse.data);
          });
      });
  }, [openVehicleForm]);

  function OpenToast(msg, type) {
    setType(type);
    setAlertMsg(msg);
    toastAlert();
  }

  function handleSave() {
    setForm({ ...form });
    axios
      .post("https://app-taller-api.vercel.app/api/vehicles-create", { ...form })
      .then((resp) => {
        console.log(resp.data);
        handleClose();
        OpenToast("Exito: Vehiculo creado!", "success");
        getVehicles();
        setForm({
          domain: null,
          BrandId: null,
          model: null,
          year: null,
          CustomerId: null,
        });
      })
      .catch((err) => {
        console.error("ERROR--->", err);
        OpenToast(
          "No se puede Guardar: Error de proceso o Datos Ingresados!",
          err.message
        );
      });
  }

  return (
    <>
      <Dialog open={openVehicleForm} onClose={handleClose}>
        <DialogTitle>Ingresar Nuevo Vehiculo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Complete el formulario, luego presione "Guardar"
          </DialogContentText>

          <InputLabel id="brand">Marca</InputLabel>
          <Select
            fullWidth
            multiple={false}
            autoFocus
            labelId="brand"
            id="brand-select"
            value={form.BrandId}
            label="Marca"
            onChange={(e) => {
                              form.BrandId = e.target.value;
                              setForm({ ...form });
            }}
          >
            {brands.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.brandName}
              </MenuItem>
                )
              )
            }
          </Select>
          <br />
          <InputLabel id="customer">Propietario</InputLabel>
          <Select
           /*  MenuProps={{
              classes: {
                paper: classes.paper,
              },
            }} */
            fullWidth
            labelId="customer"
            id="customer-select"
            value={form.CustomerId}
            label="Propietario"
            onChange={(e) => {
              form.CustomerId = e.target.value;
              setForm({ ...form });
            }}
          >
             <MenuItem
              key="newCustomer"
              value=""
              onClick={() => {
                setOpenVehicleForm(false);
                setOpenClientForm(true);
              }}
            >
              Ingresar Nuevo (+)
            </MenuItem>
            {customers
              .sort((a, b) => {
                return a.firstName < b.firstName
                  ? -1
                  : b.firstName < a.firstName
                  ? 1
                  : 0;
              })
              .map((customer) => (
                <MenuItem key={customer.id} value={customer.id}>
                  {`${customer.firstName} ${customer.lastName}`}
                </MenuItem>
              ))}
          </Select>

          <FormControl fullWidth>
            <TextField
              margin="dense"
              id="domain"
              label="Dominio"
              type="text"
              placeholder="Ingresar: ABC-123 ó AB-123-CD"
              fullWidth
              variant="outlined"
              value={form.domain}
              onChange={(e) => {
                form.domain = e.target.value;
                setForm({ ...form });
              }}
              required
            />

            <TextField
              margin="dense"
              id="model"
              label="Modelo"
              type="text"
              variant="outlined"
              value={form.model}
              onChange={(e) => {
                form.model = e.target.value;
                setForm({ ...form });
              }}
              required
            />
            <TextField
              margin="dense"
              id="year"
              label="Año"
              type="text"
              fullWidth
              variant="outlined"
              value={form.year}
              onChange={(e) => {
                form.year = e.target.value;
                setForm({ ...form });
              }}
              required
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
