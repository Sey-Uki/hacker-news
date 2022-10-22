import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Main } from "./pages/Main/Main";
import { News } from "./pages/Main/News";

export const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/:id">
          <News />
        </Route>
      </Switch>
    </Router>
  );
};
