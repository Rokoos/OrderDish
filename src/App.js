import { Fragment } from "react";
import OrderForm from "./components/OrderForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <Fragment>
    <ToastContainer />
    <OrderForm />
  </Fragment>
);

export default App;
