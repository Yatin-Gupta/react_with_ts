import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// import components

// import UserListComponent from "./components/UserListComponent";
// import LoginComponent from "./components/LoginComponent";
import Register from "./components/RegisterComponent";
import Login from "./components/LoginComponent";
import UserList from "./components/UserListComponent";

// import common components
import Navbar from "./components/common/NavbarComponent";
import Delete from "./components/common/DeleteComponent";

// import models
import { LinkType } from "./models/navbar";

// import Services
import userService from "./services/user.service";

class App extends React.Component {
  getNavigationLinks() {
    const signOutLinks: LinkType[] = [
      { path: "/user-details", label: "Users" },
      { path: "/login", label: "Login" },
      { path: "/register", label: "Register" }
    ];
    const signInLinks: LinkType[] = [
      { path: "/user-details", label: "Users" },
      { path: "/logout", label: "Logout" }
    ];
    if (userService.userIfExists()) {
      return signInLinks;
    }
    return signOutLinks;
  }

  public render() {
    return (
      <React.Fragment>
        <div className="container">
          <Navbar loggedIn={true} links={this.getNavigationLinks()} />
          <Switch>
            <Route
              path="/register"
              exact
              render={props => (
                <Register
                  {...props}
                  isEdit={false}
                  addUser={userService.addNewUser}
                />
              )}
            />
            <Route
              path="/users/edit/:id"
              exact
              render={props => (
                <Register
                  {...props}
                  isEdit={true}
                  getUser={userService.getUserById}
                  updateUser={userService.updateUser}
                />
              )}
            />
            <Route
              path="/users/delete/:id"
              exact
              render={props => (
                <Delete {...props} deleteItem={userService.deleteItem} />
              )}
            />
            <Route
              path="/user-details"
              render={props => (
                <UserList
                  {...props}
                  // @ts-ignore
                  users={userService.getAllUsers}
                  loggedIn={true}
                />
              )}
            />
            <Route path="/login" exact render={props => <Login {...props} />} />
            <Redirect to="/user-details" from="/" exact />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
