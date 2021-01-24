import React from "react";

import Searchbar from "./Searchbar";
import ButtonGroup from "./ButtonGroup";
import Footer from "./footer";
import Dialogs from "./Dialogs";

import {
  Paper,
  List as L,
  ListItem,
  ListItemText,
  Fab,
  Chip,
} from "@material-ui/core";
import { Add, DeleteForever } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { empty_I } from "../features/InventorySlice";
import { toggleOpen } from "../features/DialogSlice";

const styles = {
  inventory: {
    height: "85vh",
    overflowY: "auto",
  },
  chip: {},
  fab_add: {
    backgroundColor: "white",
    color: "green",
    position: "fixed",
    bottom: "8vh",
    right: "5vw",
  },
  fab_delete: {
    backgroundColor: "white",
    color: "red",
    position: "fixed",
    bottom: "14vh",
    right: "5vw",
  },
  expired: {
    color: "red",
    textDecorationLine: "line-through",
  },
};

const renderRow = (item) => (
  <ListItem key={item.id} divider>
    <ListItemText
      primary={item.name}
      secondary={
        <ListItemText
          primary={
            item.label !== "" ? (
              <Chip label={item.label} size="small" variant="outlined" />
            ) : null
          }
          secondary={`Quantity : ${item.quantity}`}
        />
      }
    />
    <ListItemText
      primary="Expiration Date"
      secondary={item.expiration}
      style={
        new Date().setHours(0, 0, 0, 0) >=
        new Date(item.expiration).setHours(0, 0, 0, 0)
          ? styles.expired
          : null
      }
    />
    <ButtonGroup inventory item={item} />
  </ListItem>
);

export default function Inventory() {
  const search = useSelector((state) => state.Search.text);
  let inventoryData = useSelector((state) => state.Inventory.data);

  inventoryData = inventoryData.filter((x) => x.name.includes(search));

  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm("Are You Sure To Delete Everything?")) {
      dispatch(empty_I());
    }
  };

  return (
    <>
      <Paper>
        <Searchbar inventory />
        <L style={styles.inventory}>
          {inventoryData.map((item) => {
            return renderRow(item);
          })}
          <Fab
            onClick={() => dispatch(toggleOpen({ type: "addInventory" }))}
            style={styles.fab_add}
            size="small"
          >
            <Add />
          </Fab>
          <Fab
            onClick={() => handleDelete()}
            style={styles.fab_delete}
            size="small"
          >
            <DeleteForever />
          </Fab>
        </L>
        <Footer />
      </Paper>
      <Dialogs type="addInventory" />
    </>
  );
}
