import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import css from './styles/app.module.less';
import loadable from '@loadable/component';
const Home = loadable(() => import('./pages/home'), {
  fallback: <div>加载中...</div>,
});
const Graph = loadable(() => import('./pages/graph'), {
  fallback: <div>加载中...</div>,
});
const NotFound = loadable(() => import('./pages/not-found'), {
  fallback: <div>加载中...</div>,
});

const App: React.FC = () => (
  <div className={css.app}>
    <Router>
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/graph" component={Graph} exact={true} />
        <Route path="/404" component={NotFound} exact={true} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  </div>
);

export default App;
