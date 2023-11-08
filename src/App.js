import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import MainRoutes from "./MainRoutes";
import FrontendTracer from "./config/otel-Tracer";

function App() {

  FrontendTracer();

  return (
    <div className="App">
      <Router>
        <NavBar />
        <MainRoutes />
      </Router>
    </div>
  );
}

export default App;
