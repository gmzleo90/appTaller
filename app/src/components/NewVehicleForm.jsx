import { React } from "react";
import axios from "axios";
import {
  Select,
  InputLabel,
  MenuItem,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

export default function NewVehicleForm({ props }) {
  const {
    toastAlert,
    openVehicleForm,
    setOpenVehicleForm,
    setAlertMsg,
    getVehicles,
  } = { ...props };

  const handleClose = (e) => {
    setOpenVehicleForm(false);
  };

  const [form, setForm] = useState({
    domain: "",
    BrandId: "",
    model: "",
    year: "",
    CustomerId: 2,
  });

  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/vehicles/brands").then((brandsGet) => {
      setBrands(brandsGet.data);
      console.log("Getted Brands ---> ", brandsGet.data);
    });
  }, []);

  function OpenToast(msg, type) {
    setAlertMsg(msg);
    toastAlert();
  }

  function handleSave() {
    setForm({ ...form });
    axios
      .post("http://localhost:3001/api/vehicles-create", { ...form })
      .then((resp) => {
        console.log(resp.data);
        handleClose();
        OpenToast("Exito: Vehiculo creado!", "success");
        getVehicles();
        setForm({
          domain: "",
          BrandId: "",
          model: "",
          year: "",
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
        <DialogTitle>Ingresar Nuevo Cliente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Complete el formulario, luego presione "Guardar"
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="brand">Marca</InputLabel>
            <Select
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
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <TextField
              margin="dense"
              id="domain"
              label="Dominio"
              type="text"
              placeholder="Ingresar: ABC-123 ó AB-123-CD"
              fullWidth
              variant="outlined"
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
