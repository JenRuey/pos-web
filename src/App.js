import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import { PrivateRoutes } from "./navigation/Config";
import Path from "./navigation/Path";
import Store from "./redux/store";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import WebView from "./screens/WebView";

function App() {
  return (
    <Provider store={Store.store}>
      <PersistGate loading={null} persistor={Store.persistor}>
        <BrowserRouter>
          <Switch>
            <Route path={Path.login} component={Login} />
            <Route path={Path.register} component={Register} />

            <PrivateRoutes path={Path.webView} component={WebView} />

            <Route component={Home} />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
