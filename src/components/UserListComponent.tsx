import * as React from "react";
import { Link } from "react-router-dom";

// import models
import { PropsType } from "../models/props.type";
import { UsersAny } from "../models/user.type";

export interface UserListProps extends PropsType {
  users: () => UsersAny;
  loggedIn: boolean;
}

export interface UserListState {
  users: UsersAny;
}

class UserList extends React.Component<UserListProps, UserListState> {
  state = {
    users: []
  };

  async componentDidMount() {
    let users: UsersAny = [];
    try {
      users = await this.props.users();
    } catch (e) {
      console.log("Exception Raised as: ");
      console.log(e);
    }
    console.log("Logging Users: ");
    console.log(users);
    this.setState({ users });
  }
  renderBodyConditionally() {
    const { users } = this.state;
    let count = 1;
    if (users.length === 0) {
      if (!this.props.loggedIn) {
        return <h3>Please Login to get Users List</h3>;
      } else {
        return <h3>No User found!!</h3>;
      }
    } else {
      let newUsers: UsersAny = users;
      return (
        <div className="row">
          <div className="col">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Firstname</th>
                  <th scope="col">Lastname</th>
                  <th scope="col">Email</th>
                  <th scope="col">Logo</th>
                  <th scope="col">Profile Image</th>
                  <th scope="col">Status</th>
                  <th scope="col">Taxonomy</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {newUsers.map(user => (
                  <tr key={user.id}>
                    <td>{count++}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.logo}</td>
                    <td>{user.profile_image}</td>
                    <td>
                      <select defaultValue={user.status}>
                        <option value="0">Inactive</option>
                        <option value="1">Active</option>
                      </select>
                    </td>
                    <td>{user.taxonomy}</td>
                    <td>
                      <Link to={"/users/edit/" + user.id}>Edit </Link>
                      <Link to={"/users/delete/" + user.id}>Delete</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }

  render() {
    return <React.Fragment>{this.renderBodyConditionally()}</React.Fragment>;
  }
}

export default UserList;
