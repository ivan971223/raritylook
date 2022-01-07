import logo from './logo.svg';
import './App.css';
import Collection from './Components/Collection'
import ResponsiveDrawer from './Components/ResponsiveDrawer';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useParams } from "react-router-dom";
import Project from "./Components/Project";
import ListProject from "./Components/ListProject";
import UpcomingDrop from "./Components/UpcomingDrop";
import Navigationbar from './Components/Nav';
import TheCollection from './Components/TheCollection';
import Login from './Components/Login';
import Profile from './Components/Profile';
import { AuthProvider } from './contexts/AuthContext';
import Favourite from './Components/Favourite';

function App() {
  return (
    <div className="App">
      <Router forceRefresh={true}>
        <AuthProvider>
          <Switch>
            <Route exact path="/">
              <Project />
            </Route>
            <Route path="/listproject">
              <ListProject />
            </Route>
            <Route path="/upcomingdrop">
              <UpcomingDrop />
            </Route>
            <Route path="/dashboard">
              <Profile />
            </Route>
            <Route path="/login">
              <Profile />
            </Route>
            <Route path="/signup">
              <Profile />
            </Route>
            <Route path="/favourite">
              <Favourite />
            </Route>
            <Route path="/:urlname">
              <TheCollection />
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;