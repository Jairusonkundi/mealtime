import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
} from "@material-ui/core";

const Deliverymg = () => {
  const useStyles = makeStyles((theme) => ({
    textField: {
      margin: "10px 0px",
      width: "50%",
      height: "50px",
    },

    app: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    button: {
      margin: "10px 0px",
    },
    heading: {
      textShadow: "3px 3px #ff0000",
    },
    table: {
      width: "800px",
    },
  }));

  const [cars, setCars] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [type, setType] = useState("");
  const [driverId, setDriverId] = useState("");
  const [driverName, setDriverName] = useState("");
  const [contacts, setContacts] = useState("");
  const [carState, setCarState] = useState("");
  const [isValid, setIsValid] = useState(false);

  const classes = useStyles();

  const addCarHandler = () => {
    const oldCars = [...cars];
    const newCar = {
      orderId,
      type,
      driverId,
      driverName,
      contacts,
      carState,
      id: Math.floor(Math.random() * 1000),
    };
    const newCars = oldCars.concat(newCar);

    if (
      orderId === "" ||
      type === "" ||
      driverId === "" ||
      driverName === "" ||
      contacts === "" ||
      carState === ""
    ) {
      alert("Fields are empty");
      setIsValid(true);
    } else {
      const newCars = oldCars.concat(newCar);
      setIsValid(false);
    }

    setCars(newCars);

    localStorage.setItem("cars", JSON.stringify(newCars));

    setOrderId("");
    setType("");
    setDriverId("");
    setDriverName("");
    setContacts("");
    setCarState("");
  };

  const deleteCarHandler = (id) => {
    const oldCars = [...cars];
    const newCars = oldCars.filter((car) => car.id !== id);
    setCars(newCars);

    localStorage.setItem("cars", JSON.stringify(newCars));
  };

  useEffect(() => {
    const localStorageCars = JSON.parse(localStorage.getItem("cars"));
    if (localStorageCars) {
      setCars(localStorageCars);
    }
  }, [setCars]);

  return (
    <div className={classes.app}>
      <h1 className={classes.heading}>Delivery Management</h1>
      <TextField
        id="outlined-basic"
        label="Order ID"
        variant="outlined"
        className={classes.textField}
        onChange={(e) => setOrderId(e.target.value)}
        value={orderId}
        error={isValid}
      />
      <TextField
        id="outlined-basic"
        label="Type"
        variant="outlined"
        className={classes.textField}
        onChange={(e) => setType(e.target.value)}
        value={type}
        error={isValid}
      />
      <TextField
        id="outlined-basic"
        label="Driver ID"
        variant="outlined"
        className={classes.textField}
        onChange={(e) => setDriverId(e.target.value)}
        value={driverId}
        error={isValid}
      />
      <TextField
        id="outlined-basic"
        label="Driver Name"
        variant="outlined"
        className={classes.textField}
        onChange={(e) => setDriverName(e.target.value)}
        value={driverName}
        error={isValid}
      />
      <TextField
        id="outlined-basic"
        label="Contacts"
        variant="outlined"
        className={classes.textField}
        onChange={(e) => setContacts(e.target.value)}
        value={contacts}
        error={isValid}
      />
      <TextField
        id="outlined-basic"
        label="Bike State"
        variant="outlined"
        helperText="Busy OR Idle"
        className={classes.textField}
        onChange={(e) => setCarState(e.target.value)}
        value={carState}
        error={isValid}
      />

      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={addCarHandler}
      >
        Add new Bike
      </Button>

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Order ID</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Driver ID</TableCell>
            <TableCell align="center">Driver Name</TableCell>
            <TableCell align="center">Contacts</TableCell>
            <TableCell align="center">Bike State</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars.map((car, index) => (
            <TableRow key={index} onClick={() => deleteCarHandler(car.id)}>
              <TableCell align="center">{car.orderId}</TableCell>
              <TableCell align="center">{car.type}</TableCell>
              <TableCell align="center">{car.driverId}</TableCell>
              <TableCell align="center">{car.driverName}</TableCell>
              <TableCell align="center">{car.contacts}</TableCell>
              <TableCell align="center">{car.carState}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default Deliverymg;
