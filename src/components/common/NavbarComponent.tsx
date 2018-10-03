import * as React from "react";
import { Link, NavLink } from "react-router-dom";
// import models
import { LinkType } from "../../models/navbar";

interface NavbarState {
  links: LinkType[];
}

interface NavbarProps {
  links: LinkType[];
  loggedIn: boolean;
}

class NavbarComponent extends React.Component<NavbarProps, NavbarState> {
  public state: NavbarState;

  public static defaultProps: Partial<NavbarProps> = {
    // set default value for props so that if in case some value is not passed from
    // parent component then it will be automatically taken from here.
    // but also you need to make fields optional in interface.
  };

  componentDidMount() {
    this.setState({ links: this.props.links });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Site
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {this.props.links.map(link => {
              return (
                <li className="nav-item active" key={link.label}>
                  <NavLink className="nav-link" to={link.path}>
                    {link.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavbarComponent;
