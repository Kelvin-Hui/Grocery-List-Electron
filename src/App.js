import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import List from "./components/List";
import Inventory from "./components/Inventory";
import Homepage from "./components/Homepage";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./configureStore";

const persistor = persistStore(store);
//persistor.purge();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/List" component={List} />
            <Route exact path="/Inventory" component={Inventory} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
