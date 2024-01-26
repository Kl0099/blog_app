import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { Provider } from "react-redux"
import store from "./store.js"
import { transitions, positions, Provider as AlertProvider } from "react-alert"
import AlertTemplate from "react-alert-template-basic"

const options = {
  positions: positions.BOTTOM_CENTER,
  timeout: 3000,
  offset: transitions.SCALE,
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AlertProvider
      template={AlertTemplate}
      {...options}
    >
      <App />
    </AlertProvider>
  </Provider>
)
