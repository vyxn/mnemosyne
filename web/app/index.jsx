import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './configureStore';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { BrowserRouter as Router } from 'react-router-dom';
// import routes from './routes.jsx';

// import rootSaga from './login/saga.jsx';
import App from './app.jsx';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = configureStore();
// store.runSaga(rootSaga);

/**
 * Checks authentication status on route change
 * @param  {object}   nextState The state we want to change into when we change routes
 * @param  {function} replaceState Function provided by React Router to replace the location
 */
// function checkAuth(nextState, replaceState) {
//   const { loggedIn } = store.getState();
//   const { location } = nextState;
//
//   // store.dispatch(clearError());
//
//   // Check if the path isn't dashboard. That way we can apply specific logic to
//   // display/render the path we want to.
//   if (location.pathname !== '/dashboard') {
//     if (loggedIn) {
//       if (location.state && location.pathname) {
//         replaceState(location.pathname);
//       } else {
//         replaceState('/');
//       }
//     }
//   } else {
//     // If the user is already logged in, forward them to the homepage
//     if (!loggedIn) {
//       if (location.state && location.pathname) {
//         replaceState(location.pathname);
//       } else {
//         replaceState('/');
//       }
//     }
//   }
// }
// checkAuth({}, null);

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);