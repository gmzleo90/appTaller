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

export default function NewClientForm({ props }) {
  const {
    ToastAlert,
    openClientForm,
    setOpenClientForm,
    setType,
    setAlertMsg,
  } = { ...props };

  const [form, setForm] = useState({
    domain: "",
    BrandId: "",
    model: "",
    year: "",
  });

  const [brands, setBrands] = useState();
  const handleClose = (e) => {
    setOpenClientForm(false);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/api/vehicles/brands")
    .then(
      (brandsGet) => {
        setBrands(brandsGet.data);
        console.log("Getted Brands ---> ",brandsGet.data)
      }
      
      );
  }, []);

  function OpenToast(msg, type) {
    setType(type);
    setAlertMsg(msg);
    ToastAlert();
  }

  function handleSave() {
    // console.log(form);
    // setForm({ ...form });
    // axios
    //   .post("http://localhost:3001/api/vehicles-create", { ...form })
    //   .then((resp) => {
    //     console.log(resp.data);
    //     handleClose();
    //     OpenToast("Exito: Cliente Guardado!", "success");
    //     setForm({
    //       domain: "",
    //       BrandId: "",
    //       model: "",
    //       year: "",
    //     });
    //   })
    //   .catch((err) => {
    //     console.error("ERROR--->", err);
    //     OpenToast(
    //       "No se puede Guardar: Error de proceso o Datos Ingresados!",
    //       err.message
    //     );
    //   });
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
              id="domain"
              label="Dominio"
              type="text"
              placeholder="Ingresar: ABC-123 ó AB-123-CD"
              fullWidth
              variant="outlined"
              onChange={(e) => (form.domain = e.target.value)}
              required
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={""}
              label="Modelo"
              onChange={(e) => (form.BrandId = e.target.value)}
            >
              {brands? brands.map((brand)=> <MenuItem key={brand.id} value={brand.id}>{brand.brandName}</MenuItem>):  <MenuItem value={10}>Ten</MenuItem>}
            </Select>

            <TextField
              margin="dense"
              id="year"
              label="Año"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) => (form.year = e.target.value)}
              required
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
