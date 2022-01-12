import React from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import AsteroidDetail from "./views/AsteroidDetail";
import AsteroidsList from "./views/AsteroidsList";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  document.title = "Medpay"
  return (
    <Router>
      <Switch>
        <Route exact path="/" element={<AsteroidsList />} />
        <Route exact path="/detail/:id" element={<AsteroidDetail />} />
      </Switch>
    </Router>
  )
}

export default App;