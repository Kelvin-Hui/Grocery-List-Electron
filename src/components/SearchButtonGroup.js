import React from "react";

import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import {
  Sort,
  SortByAlpha,
  FormatListNumbered,
  Label,
  EventBusy,
  Done,
} from "@material-ui/icons";

import { useDispatch } from "react-redux";
import { updateSort_L } from "../features/ListSlice";
import { updateSort_I } from "../features/InventorySlice";

const styles = {
  btn_group: {
    position: "absolute",
    right: 0,
  },
};

export default function SearchButtonGroup({ inventory }) {
  const [sort, setSort] = React.useState(inventory ? "expdate" : "index");
  const dispatch = useDispatch();

  const handleChange = (e, value) => {
    if (inventory) {
      dispatch(updateSort_I({ sortBy: value }));
    } else {
      dispatch(updateSort_L({ sortBy: value }));
    }
    if (value !== null) {
      setSort(value);
    }
  };
  return (
    <ToggleButtonGroup
      exclusive
      value={sort}
      onChange={(e, value) => handleChange(e, value)}
      style={styles.btn_group}
    >
      <ToggleButton value={"index"}>
        <Sort />
      </ToggleButton>

      <ToggleButton value={"alpha"}>
        <SortByAlpha />
      </ToggleButton>

      <ToggleButton value={"quant"}>
        <FormatListNumbered />
      </ToggleButton>

      {!inventory && (
        <ToggleButton value={"check"}>
          <Done />
        </ToggleButton>
      )}

      {inventory && (
        <ToggleButton value={"label"}>
          <Label />
        </ToggleButton>
      )}

      {inventory && (
        <ToggleButton value={"expdate"}>
          <EventBusy />
        </ToggleButton>
      )}
    </ToggleButtonGroup>
  );
}
