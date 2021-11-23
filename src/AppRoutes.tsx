import { Route, Switch } from "react-router-dom";
import Bot from "./modules/bot/Bot";
import { DataParent } from "./modules/bot/models/enums/bot.enums";
import ChatWindowAsWidgetPage from "./modules/bot/pages/ChatWindowAsWidgetPage";
import JoinChatRoomPage from "./modules/bot/pages/JoinChatRoomPage";

export const AppRoutes = () => {
  const parent: any = document.getElementById('kaptivate-chatbot')?.dataset.parent;
  console.log(parent)

  return (
    <Switch>
      <Route path="/bot">
        <Bot></Bot>
      </Route>
      {
        parent === DataParent.BOT_WIDGET ?
          <Route>
            <ChatWindowAsWidgetPage></ChatWindowAsWidgetPage>
          </Route>
          :
          null
      }
      {
        parent === DataParent.KAPTIVATE ?
          <Route>
            <JoinChatRoomPage></JoinChatRoomPage>
          </Route>
          :
          null
      }
    </Switch>
  );
};
