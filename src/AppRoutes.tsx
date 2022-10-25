import { Switch, Route, Redirect } from "react-router-dom";
import { Main } from "./pages/Main/Main";
import { News } from "./pages/News/News";
import { NoMatch } from "./pages/NoMatch/NoMatch";
import { Endpoints } from "./shared/constants";

export const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path={Endpoints.Home}>
        <Redirect to={Endpoints.News} />
      </Route>
      <Route exact path={Endpoints.News}>
        <Main />
      </Route>
      <Route exact path={`${Endpoints.News}/:newsId`}>
        <News />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
};
