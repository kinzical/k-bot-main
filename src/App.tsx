import React, { Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import "./App.less";
import { AppRoutes } from "./AppRoutes";
import KPInitLoader from "./modules/ui/widgets/KPInitLoader";

function App() {
  return (
    <Router>
      <Suspense fallback={<KPInitLoader></KPInitLoader>}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <AppRoutes></AppRoutes>
        </QueryParamProvider>
      </Suspense>
    </Router>
  );
}

export default App;
