import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Box from '@mui/material/Box';
import Navigationbar from './Nav';

const Profile = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Box sx={{ p: 1, m: 1, display: 'flex', flexWrap: 'wrap' }}>
        <Box sx={{ p: 1, m: 1, marginBottom: '50px' }}>
          <Navigationbar />
        </Box>
        <Box component="main"
          sx={{
            flexGrow: 1, p: 1,
            m: 1, width: '100%'
          }}>
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Router>
              <AuthProvider>
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <PrivateRoute path="/update-profile" component={UpdateProfile} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  <Route path="/forgot-password" component={ForgotPassword} />
                </Switch>
              </AuthProvider>
            </Router>
          </div>
        </Box>
      </Box>
    </Container>
  )
}

export default Profile