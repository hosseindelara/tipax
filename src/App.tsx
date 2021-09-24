import { CookiesProvider } from 'react-cookie';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Authentication } from './componets/Authentication';
import UnAuthentication from './componets/UnAuthentication';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login'
import City from './pages/City'
import { Index } from './pages/Index';

function App() {
  return (
    <CookiesProvider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Switch>
          <Route path='/city' ><City /></Route>
          <Route path='/login' ><Login /></Route>
          <Route exact path='/'>
            <Index />
          </Route>
        </Switch>
      </Router>
    </CookiesProvider>
  );
}

export default App;
