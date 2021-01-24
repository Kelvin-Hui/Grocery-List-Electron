import React from "react";

import { ListItemSecondaryAction, IconButton } from "@material-ui/core";
import {
  CheckBoxOutlineBlank,
  CheckBox,
  Delete,
  Add,
  Remove,
  Send,
} from "@material-ui/icons";

import { useDispatch } from "react-redux";
import {
  changeQuantity_L,
  toggleChecked,
  deleteItem_L,
} from "../features/ListSlice";
import { changeQuantity_I, deleteItem_I } from "../features/InventorySlice";
import { toggleOpen } from "../features/DialogSlice";

export default function ButtonGroup({ inventory, item }) {
  const dispatch = useDispatch();

  return (
    <ListItemSecondaryAction>
      <IconButton
        onClick={() =>
          dispatch(
            inventory
              ? changeQuantity_I({ id: item.id, quant: 1 })
              : changeQuantity_L({ id: item.id, quant: 1 })
          )
        }
        disabled={item.checked}
      >
        <Add />
      </IconButton>

      <IconButton
        onClick={() =>
          dispatch(
            inventory
              ? changeQuantity_I({ id: item.id, quant: -1 })
              : changeQuantity_L({ id: item.id, quant: -1 })
          )
        }
        disabled={item.checked}
      >
        <Remove />
      </IconButton>

      <IconButton
        onClick={() =>
          dispatch(
            inventory
              ? deleteItem_I({ id: item.id })
              : deleteItem_L({ id: item.id })
          )
        }
      >
        <Delete />
      </IconButton>

      {!inventory && (
        <IconButton onClick={() => dispatch(toggleChecked(item.id))}>
          {item.checked ? <CheckBox /> : <CheckBoxOutlineBlank />}
        </IconButton>
      )}

      {!inventory && (
        <IconButton
          onClick={() => dispatch(toggleOpen({ type: "send", item: item }))}
        >
          <Send />
        </IconButton>
      )}
    </ListItemSecondaryAction>
  );
}
