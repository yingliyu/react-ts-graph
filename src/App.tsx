import React from 'react';
import { Button } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import css from './styles/app.module.less';

function App() {
  return (
    <div className={css.app}>
      <header className={css['app-header']}>
        <p>Hello React!</p>
        <Button type="primary" size="large">
          Start
        </Button>
        <Router>
          <Switch>
            <Route exact path="/"></Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
