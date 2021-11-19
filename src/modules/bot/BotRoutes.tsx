import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import ChatWindowPage from "./pages/ChatWindowPage";

export const BotRoutes = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route
        exact
        path={match.path + "/:chatId"}
        component={ChatWindowPage}
      ></Route>
      <Redirect to="/"></Redirect>
    </Switch>
  );
};
