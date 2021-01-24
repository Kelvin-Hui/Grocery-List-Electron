import { combineReducers } from "redux";

import ListReducer from "../features/ListSlice";
import InventoryReducer from "../features/InventorySlice";
import SearchReducer from "../features/SearchSlice";
import DialogReducer from "../features/DialogSlice";

const rootReducer = combineReducers({
  List: ListReducer,
  Inventory: InventoryReducer,
  Search: SearchReducer,
  Dialog: DialogReducer,
});

export default rootReducer;
