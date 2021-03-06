import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "./redux/store";
import App from "./routes/App";
import theme from "./utils/styles/theme";

axios.interceptors.request.use(
  function (req) {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
  },
  function (error) {
      console.error(error);
      return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);