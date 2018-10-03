import * as React from "react";
import { Route, Switch } from "react-router-dom";

// import components

// import UserListComponent from "./components/UserListComponent";
// import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";

// import common components
import NavbarComponent from "./components/common/NavbarComponent";
//import DeleteComponent from "./components/common/DeleteComponent";

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
          <NavbarComponent loggedIn={true} links={this.getNavigationLinks()} />
          <Switch>
            <Route
              path="/register"
              exact
              render={props => (
                <RegisterComponent
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
                <RegisterComponent
                  {...props}
                  isEdit={true}
                  getUser={userService.getUserById}
                  updateUser={userService.updateUser}
                />
              )}
            />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
