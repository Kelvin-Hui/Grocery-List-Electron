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
} from "@material-ui/core";
import { Add, DeleteForever } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { empty_L } from "../features/ListSlice";
import { toggleOpen } from "../features/DialogSlice";

const styles = {
  list: {
    height: "85vh",
    overflowY: "auto",
  },
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
  checked: {
    textDecorationLine: "line-through",
  },
};

const renderRow = (item) => (
  <ListItem key={item.id} divider>
    <ListItemText
      primary={item.name}
      secondary={`Quantity :${item.quantity}`}
      style={item.checked ? styles.checked : null}
    />

    <ButtonGroup item={item} />
  </ListItem>
);

export default function List() {
  const search = useSelector((state) => state.Search.text);
  let listData = useSelector((state) => state.List.data);

  listData = listData.filter((x) => x.name.includes(search));

  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm("Are You Sure To Delete Everything?")) {
      dispatch(empty_L());
    }
  };
  return (
    <>
      <Paper>
        <Searchbar />
        <L style={styles.list}>
          {listData.map((item) => {
            return renderRow(item);
          })}
          <Fab
            onClick={() => dispatch(toggleOpen({ type: "addList" }))}
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

        <Footer style={styles.footer} />
      </Paper>
      <Dialogs type="addList" />
      <Dialogs type="send" />
    </>
  );
}
