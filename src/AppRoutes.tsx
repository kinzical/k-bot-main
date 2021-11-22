import { Route, Switch } from "react-router-dom";
import Bot from "./modules/bot/Bot";
import ChatWindowAsWidgetPage from "./modules/bot/pages/ChatWindowAsWidgetPage";
import ChatWindowPage from "./modules/bot/pages/ChatWindowPage";
import JoinChatRoomPage from "./modules/bot/pages/JoinChatRoomPage";
export const AppRoutes = () => {
  const test: any = document.getElementById('kaptivate-chatbot')?.dataset.parent;
  console.log(test)
  return (
    <Switch>
      <Route path="/bot">
        <Bot></Bot>
      </Route>
      {
        test === "3rd party" ?
          <Route>
            <ChatWindowAsWidgetPage></ChatWindowAsWidgetPage>
          </Route>
          :
          null
      }
      {
        test === "our kaptivate" ?
          <Route>
            <JoinChatRoomPage></JoinChatRoomPage>
          </Route>
          :
          null
      }
    </Switch>
  );
};
