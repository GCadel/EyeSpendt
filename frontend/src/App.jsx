import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Unauthenticated } from "./layouts/Unauthenticated";
import { Welcome } from "./pages/Unauthenticated/Welcome";
import { Register } from "./pages/Unauthenticated/Register";
import { Login } from "./pages/Unauthenticated/Login";
import { Dashboard } from "./pages/Authenticated/Dashboard";
import { Authenticated } from "./layouts/Authenticated";
import { CreateTransaction } from "./pages/Authenticated/CreateTransaction";
import { EditTransaction } from "./pages/Authenticated/EditTransaction";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={<Welcome />}
          />
          <Route element={<Unauthenticated />}>
            <Route
              path='/register'
              element={<Register />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
          </Route>
          <Route element={<Authenticated />}>
            <Route
              path='/dashboard'
              element={<Dashboard />}
            />
            <Route
              path='/createTransaction'
              element={<CreateTransaction />}
            />
            <Route
              path='/editTransaction/:transactionID'
              element={<EditTransaction />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
