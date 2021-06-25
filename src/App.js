import "./App.css";
import "@fontsource/roboto";
import Home from "./components/Home";
import Detail from "./components/Detail";
import { Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./reduxConfig/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/detail" component={Detail} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
