import Wrapper from "./Components/Wrapper";
import "./App.scss";
import { Provider } from "react-redux";
import store from "./Store/reducers";

function App() {
  return (
    <Provider store={store}>
      <Wrapper />
    </Provider>
  );
}

export default App;
