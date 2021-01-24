import React from "react";

import SearchButtonGroup from "./SearchButtonGroup";

import { Toolbar, Icon, TextField, Paper, IconButton } from "@material-ui/core";
import { Search, Clear } from "@material-ui/icons";

import { useSelector, useDispatch } from "react-redux";
import { toggleSearch, resetSearch } from "../features/SearchSlice";

const styles = {
  searchbar: {
    border: "2px solid black",
    padding: "2px",
  },
};

export default function Searchbar({ inventory }) {
  const search = useSelector((state) => state.Search.text);
  const dispatch = useDispatch();

  return (
    <Paper style={styles.searchbar}>
      <Toolbar disableGutters>
        <Icon>
          <Search />
        </Icon>
        <TextField
          placeholder="Search Here"
          value={search}
          onChange={(e) =>
            dispatch(toggleSearch({ value: e.target.value.toUpperCase() }))
          }
          InputProps={{ disableUnderline: true }}
        />
        {search.length > 0 && (
          <IconButton onClick={() => dispatch(resetSearch())}>
            <Clear />
          </IconButton>
        )}

        <SearchButtonGroup inventory={inventory} />
      </Toolbar>
    </Paper>
  );
}
