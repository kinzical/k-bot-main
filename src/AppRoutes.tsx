import { Route, Switch } from "react-router-dom";
import Bot from "./modules/bot/Bot";
import JoinChatRoomPage from "./modules/bot/pages/JoinChatRoomPage";
export const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/bot">
        <Bot></Bot>
      </Route>
      <Route>
        <JoinChatRoomPage></JoinChatRoomPage>
      </Route>
    </Switch>
  );
};
