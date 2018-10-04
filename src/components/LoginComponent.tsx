import * as React from "react";

// import common components
import Input from "./common/InputComponent";

// import models
import { UserLogin } from "../models/user.type";
import { PropsType } from "../models/props.type";

// import utilites
import validator from "../utilities/validation";
const Joi = require("joi-browser");
const _ = require("lodash");

export interface LoginProps extends PropsType {}

export interface LoginState {
  account: UserLogin;
  errors: {} | UserLogin;
}

class Login extends React.Component<LoginProps, LoginState> {
  state = {
    account: {
      email: "",
      password: ""
    },
    errors: {}
  };
  schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
      .label("Username"),
    password: Joi.string()
      .min(4)
      .max(30)
      .required()
      .label("Password")
  };

  submitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    //console.log(this.username.current.value); //this.username.current got reference for HTML Input element
    const formErrors = validator.validateAllFields(
      this.state.account,
      this.schema
    );
    let errors = {};
    formErrors.forEach(function(error) {
      errors[error.key] = error.value;
    });
    this.setState({ errors });
    //if (_.isEmpty(errors)) {
    //this.props.loginUser(this.state.account);
    //}
    //window.location = "/";
    // call to server made
  };

  changeHandler = (e: object) => {
    let { account } = this.state;
    let { name: targetName, value: targetValue } = e["currentTarget"];
    account[targetName] = targetValue;
    let errors = { ...this.state.errors };
    let schema = {
      [targetName]: this.schema[targetName]
    };
    let formFieldError = validator.validateField(
      { [targetName]: targetValue },
      schema
    );
    if (_.isEmpty(formFieldError)) {
      delete errors[targetName];
    } else {
      errors[formFieldError["key"]] = formFieldError["value"];
    }
    this.setState({ account, errors }); // stands for ({account:account})
  };

  getErrorByField = (field: string) => {
    if (_.isEmpty(this.state.errors) || this.state.errors[field] === undefined)
      return "";
    return this.state.errors[field];
  };

  getButton(label: string) {
    if (
      validator.validateAllFields(this.state.account, this.schema).length > 0
    ) {
      return (
        <button type="submit" className="btn btn-default" disabled>
          {label}
        </button>
      );
    } else {
      return (
        <button type="submit" className="btn btn-default">
          {label}
        </button>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form className="form-horizontal" onSubmit={this.submitHandler}>
          <Input
            label={"Email:"}
            id={"email"}
            placeholder={"Enter username/email"}
            value={this.state.account.email}
            name={"email"}
            type={"text"}
            onChange={this.changeHandler}
            errors={this.getErrorByField("email")}
          />
          <Input
            label={"Password:"}
            id={"password"}
            placeholder={"Enter Password"}
            value={this.state.account.password}
            name={"password"}
            type={"password"}
            onChange={this.changeHandler}
            errors={this.getErrorByField("password")}
          />
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              {this.getButton("Login")}
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
