import { React } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Switch,
  FormControl,
} from "@mui/material";
import { useState } from "react";

export default function NewClientForm({ props }) {
  const {
    pathName,
    toastAlert,
    openClientForm,
    setOpenClientForm,
    getClients,
    setType,
    setAlertMsg,
  } = { ...props };

  const [form, setForm] = useState({
    firstName: null,
    lastName: null,
    dni: null,
    cuit: null,
    address: null,
    location: null,
    phone: null,
    customerType: false,
  });
  const handleClose = (e) => {
    setOpenClientForm(false);
  };

  function OpenToast(msg, type) {
    setType(type);
    setAlertMsg(msg);
    toastAlert();
  }

  function handleSave() {
    console.log(form);
    setForm({ ...form });
    axios
      .post("https://app-taller-api.vercel.app/api/clients-create", { ...form })
      .then((resp) => {
        console.log(resp.data);
        handleClose();
        getClients();
        OpenToast("Exito: Cliente Guardado!", "success");
        setForm({
          firstName: null,
          lastName: null,
          dni: null,
          cuit: null,
          address: null,
          location: null,
          phone: null,
          customerType: false,
        });
      })
      .catch((err) => {
        console.error("ERROR--->", err);
        OpenToast(
          "No se puede Guardar: Verifique los datos ingresados!",
          "error"
        );
      });
  }

  return (
    <>
      <Dialog open={openClientForm} onClose={handleClose}>
        <DialogTitle>Ingresar Nuevo Cliente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Complete el formulario, luego presione "Guardar"
          </DialogContentText>
          <FormControl className="">
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              label="Nombre"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) =>
                (form.firstName = e.target.value ? e.target.value : null)
              }
              required
            />
            <TextField
              margin="dense"
              id="lastName"
              label="Apellido"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) =>
                (form.lastName = e.target.value ? e.target.value : null)
              }
              required
            />
            <TextField
              margin="dense"
              id="dni"
              label="DNI"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) =>
                (form.dni = e.target.value ? e.target.value : null)
              }
              required
            />
            <TextField
              margin="dense"
              id="phone"
              label="Teléfono"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) =>
                (form.phone = e.target.value ? e.target.value : null)
              }
              required
            />
            <TextField
              margin="dense"
              id="cuit"
              label="CUIT"
              type="number"
              fullWidth
              variant="outlined"
              onChange={(e) =>
                (form.cuit = e.target.value ? e.target.value : null)
              }
            />
            <TextField
              margin="dense"
              id="address"
              label="Direccion"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) =>
                (form.address = e.target.value ? e.target.value : null)
              }
              required
            />
            <TextField
              margin="dense"
              id="location"
              label="Localidad"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) =>
                (form.location = e.target.value ? e.target.value : null)
              }
              required
            />
            <FormControlLabel
              id="customer-type"
              control={<Switch />}
              label="Habilitar Cuenta Corriente"
              onChange={(e) => (form.customerType = e.target.checked)}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            type="submit"
            form="customer-form"
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
