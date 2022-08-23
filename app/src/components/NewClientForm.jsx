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
} from "@mui/material";

export default function NewClientForm({ props }) {
  const {
    ToastAlert,
    openClientForm,
    setOpenClientForm,
    getClients,
    customerTypeValue,
    setCustomerTypeValue,
    setType,
    setAlertMsg,
  } = { ...props };

  const handleClose = (e) => {
    setOpenClientForm(false);
  };

  function OpenToast(msg, type) {
    setType(type);
    setAlertMsg(msg);
    ToastAlert();
  }

  function handleSave() {
    const formBody = {
      firstName: document.getElementById("firstName").value
        ? document.getElementById("firstName").value
        : null,
      lastName: document.getElementById("lastName").value
        ? document.getElementById("lastName").value
        : null,
      dni: document.getElementById("dni").value
        ? document.getElementById("dni").value
        : null,
      cuit: document.getElementById("cuit").value
        ? document.getElementById("cuit").value
        : null,
      address: document.getElementById("address").value
        ? document.getElementById("address").value
        : null,
      location: document.getElementById("location").value
        ? document.getElementById("location").value
        : null,
      customerType: customerTypeValue,
    };

    // console.log("data form", document.getElementById('customer-type').checked);

    axios
      .post("http://localhost:3001/api/clients-create", { ...formBody })
      .then((resp) => {
        console.log(resp.data);
        handleClose();
        getClients();
        OpenToast(
          "Exito: Cliente Guardado!",
          "success"
        );
      })
      .catch((err) => {
        console.error("ERROR--->", err);
        OpenToast(
          "No se puede Guardar: Error de proceso o Datos Ingresados!",
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
          <form action="post" id="customer-form">
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              label="Nombre"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              margin="dense"
              id="lastName"
              label="Apellido"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              margin="dense"
              id="dni"
              label="DNI"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              margin="dense"
              id="phone"
              label="Teléfono"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              margin="dense"
              id="cuit"
              label="CUIT"
              type="number"
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="address"
              label="Direccion"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              margin="dense"
              id="location"
              label="Localidad"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <FormControlLabel
              id="customer-type"
              control={<Switch />}
              label="Habilitar Cuenta Corriente"
              onChange={(e) => setCustomerTypeValue(e.target.checked)}
            />
          </form>
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
