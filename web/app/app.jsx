import React from 'react';
import { Route } from 'react-router-dom';

import Hi from './hi.jsx';
// import { BeerListContainer } from './testdemo/components.jsx';

const App = () => (
  <div>
    {/* <Hi name="World" /> */}
    {/* <BeerListContainer/> */}
    <Route path="/" component={Hi}/>
  </div>
);

export default App;