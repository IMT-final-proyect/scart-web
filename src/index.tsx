import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from "./redux/store";
import App from "./routes/App";
import theme from "./utils/styles/theme";


ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);