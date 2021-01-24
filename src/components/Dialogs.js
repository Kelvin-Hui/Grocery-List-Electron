import React from "react";

import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
} from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { toggleOpen } from "../features/DialogSlice";
import { addList, deleteItem_L } from "../features/ListSlice";
import { addInventory } from "../features/InventorySlice";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import format from "date-fns/format";

const DialogInfo = {
  addList: {
    title: "Add New Item To List",
  },
  addInventory: {
    title: "Add New Item To Inventory",
  },
  send: {
    title: "Send To Inventory",
  },
};

const styles = {
  title: {
    margin: "auto",
    marginTop: "5px",
    border: "2px solid black",
    borderRadius: "20px",
  },
};

export default function Dialogs({ type }) {
  const dispatch = useDispatch();
  const dialogOpen = useSelector((state) => state.Dialog[type]);
  const [date, setDate] = React.useState(new Date().toLocaleDateString());

  const name = React.useRef();
  const quantity = React.useRef();
  const label = React.useRef();

  const handleSubmit = () => {
    switch (type) {
      case "addList":
        dispatch(
          addList({
            name: name.current.value.toUpperCase(),
            quantity: parseInt(quantity.current.value),
          })
        );
        break;
      case "addInventory":
        dispatch(
          addInventory({
            name: name.current.value.toUpperCase(),
            quantity: parseInt(quantity.current.value),
            label: label.current.value,
            expiration: date,
          })
        );
        break;
      case "send":
        dispatch(
          addInventory({
            name: dialogOpen.item.name,
            quantity: dialogOpen.item.quantity,
            label: label.current.value,
            expiration: date,
          })
        );
        dispatch(deleteItem_L({ id: dialogOpen.item.id }));

        break;
      default:
        break;
    }
    dispatch(toggleOpen({ type: type }));
    setDate("");
  };

  return (
    <Dialog
      open={dialogOpen.open}
      onClose={() => dispatch(toggleOpen({ type: type }))}
    >
      <DialogTitle style={styles.title}>{DialogInfo[type].title}</DialogTitle>
      <DialogContent>
        {type !== "send" && (
          <>
            <TextField
              inputRef={name}
              autoFocus
              margin="dense"
              label="Name"
              placeholder="Enter here"
              variant="outlined"
              fullWidth
              inputProps={{ style: { textTransform: "uppercase" } }}
            />
            <TextField
              inputRef={quantity}
              margin="dense"
              label="Quantity"
              placeholder="Enter here"
              variant="outlined"
              defaultValue={1}
              fullWidth
            />
          </>
        )}
        {type !== "addList" && (
          <>
            <TextField
              inputRef={label}
              margin="dense"
              label="Label"
              placeholder="Leave It Blank If None"
              variant="outlined"
              fullWidth
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                format="MM/dd/yyyy"
                margin="normal"
                fullWidth
                disablePast
                inputVariant="outlined"
                label="Expiration Date"
                value={date}
                onChange={(date) => setDate(format(date, "MM/dd/yyyy"))}
              />
            </MuiPickersUtilsProvider>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => dispatch(toggleOpen({ type: type }))}
          color="primary"
        >
          Cancel
        </Button>
        <Button onClick={() => handleSubmit()} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
