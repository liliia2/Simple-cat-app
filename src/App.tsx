import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/header";
import { BreedsList } from "./pages/List/BreedsList";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact>
          <BreedsList />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
