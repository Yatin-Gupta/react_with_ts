import * as React from "react";

// import common components
import Input from "./common/InputComponent";
import Select from "./common/SelectComponent";

// import Models
import { UserType } from "../models/user.type";
import { PropsType } from "../models/props.type";

// import utilites
import validator from "../utilities/validation";
const Joi = require("joi-browser");
const _ = require("lodash");

export interface RegisterProps extends PropsType {
  isEdit: boolean;
  getUser?: (id: number) => UserType | {};
  updateUser?: (id: number, user: UserType) => object;
  addUser?: (user: UserType) => object;
}

export interface RegisterState {
  account: UserType;
  errors: {} | UserType;
}

class Register extends React.Component<RegisterProps, RegisterState> {
  state = {
    account: {
      firstname: "",
      lastname: "",
      email: "",
      logo: "",
      profile_image: "",
      taxonomy: "",
      status: "",
      company_name: "",
      password: "",
      company_desc: "",
      company_region: "",
      company_url: ""
    },
    errors: {}
  };
  schema = {
    firstname: Joi.string()
      .required()
      .label("Firstname"),
    lastname: Joi.string()
      .required()
      .label("Lastname"),
    logo: Joi.string().required(),
    profile_image: Joi.string().required(),
    taxonomy: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
      .label("Email"),
    password: Joi.string()
      .min(4)
      .required()
      .label("Password"),
    status: Joi.string()
      .valid("0", "1")
      .required(),
    company_name: Joi.string().required(),
    company_desc: Joi.string().required(),
    company_region: Joi.string().required(),
    company_url: Joi.string().required()
  };

  async componentDidMount() {
    const isEdit = this.props.isEdit;
    if (isEdit) {
      // @ts-ignore
      const user = await this.props.getUser(this.props.match.params.id);
      let newUser: UserType | {} = {};
      if (Object.keys(user).length > 0) {
        newUser["firstname"] = user["firstname"];
        newUser["lastname"] = user["lastname"];
        newUser["email"] = user["email"];
        newUser["logo"] = user["logo"];
        newUser["profile_image"] = user["profile_image"];
        newUser["taxonomy"] = user["taxonomy"];
        newUser["status"] = user["status"];
        newUser["company_name"] = user["company_name"];
        newUser["company_desc"] = user["company_desc"];
        newUser["company_url"] = user["company_url"];
        newUser["company_region"] = user["company_region"];
        newUser["password"] = "";
      }
      // @ts-ignore
      this.setState({ account: newUser });
    }
  }

  getErrorByField = (field: string) => {
    if (_.isEmpty(this.state.errors) || this.state.errors[field] === undefined)
      return "";
    return this.state.errors[field];
  };

  getButton(label: string) {
    let errors = validator.validateAllFields(this.state.account, this.schema);
    console.log(errors);
    if (errors.length > 0) {
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

  submitHandler = async (e: React.FormEvent<HTMLElement>) => {
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

    if (_.isEmpty(errors)) {
      let account = { ...this.state.account };
      account["status"] = "" + account["status"];
      if (!this.props.isEdit) {
        // @ts-ignore
        await this.props.addUser(account);
      } else {
        // @ts-ignore
        await this.props.updateUser(this.props.match.params.id, account);
      }
    }
    // call to server made

    //window.location.href = "/";
    this.props.history.push("/");
  };

  render() {
    let isEdit = this.props.isEdit;
    let formTitle = "Register";
    if (isEdit) {
      formTitle = "Update";
    }
    return (
      <React.Fragment>
        <h1>{formTitle}</h1>
        <form className="form-horizontal" onSubmit={this.submitHandler}>
          <Input
            label={"Firstname:"}
            id={"firstname"}
            placeholder={"Enter Firstname"}
            value={this.state.account.firstname}
            name={"firstname"}
            type={"text"}
            onChange={this.changeHandler}
            errors={this.getErrorByField("firstname")}
          />
          <Input
            label={"Lastname:"}
            id={"lastname"}
            placeholder={"Enter Lastname"}
            value={this.state.account.lastname}
            name={"lastname"}
            type={"text"}
            onChange={this.changeHandler}
            errors={this.getErrorByField("lastname")}
          />
          <Input
            label={"Email:"}
            id={"email"}
            placeholder={"Enter Email"}
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
          <Select
            options={[
              { label: "Active", value: "1" },
              { label: "InActive", value: "0" }
            ]}
            name="status"
            id="status"
            defaultValue={this.state.account.status}
            errors={this.getErrorByField("status")}
            label="Select Status:"
            onChange={this.changeHandler}
          />
          <Input
            label={"Logo:"}
            id={"logo"}
            placeholder={"Enter Logo"}
            value={this.state.account.logo}
            name={"logo"}
            type={"text"}
            onChange={this.changeHandler}
            errors={this.getErrorByField("logo")}
          />
          <Input
            label={"Profile Image"}
            id={"profile_image"}
            placeholder={"Enter Profile Image"}
            value={this.state.account.profile_image}
            name={"profile_image"}
            type={"text"}
            onChange={this.changeHandler}
            errors={this.getErrorByField("profile_image")}
          />
          <Input
            label={"Taxonomy"}
            id={"taxonomy"}
            placeholder={"Enter Taxonomy"}
            value={this.state.account.taxonomy}
            name={"taxonomy"}
            type={"text"}
            onChange={this.changeHandler}
            errors={this.getErrorByField("taxonomy")}
          />
          <Input
            label={"Company Name"}
            id={"company_name"}
            placeholder={"Enter Company Name"}
            value={this.state.account.company_name}
            name={"company_name"}
            type={"text"}
            onChange={this.changeHandler}
            errors={this.getErrorByField("company_name")}
          />
          <Input
            label={"Company Description"}
            id={"company_desc"}
            placeholder={"Enter Company Description"}
            value={this.state.account.company_desc}
            name={"company_desc"}
            type={"text"}
            onChange={this.changeHandler}
            errors={this.getErrorByField("company_desc")}
          />
          <Input
            label={"Company URL"}
            id={"company_url"}
            placeholder={"Enter Company URL"}
            value={this.state.account.company_url}
            name={"company_url"}
            type={"text"}
            onChange={this.changeHandler}
            errors={this.getErrorByField("company_url")}
          />
          <Input
            label={"Company Region"}
            id={"company_region"}
            placeholder={"Enter Company Region"}
            value={this.state.account.company_region}
            name={"company_region"}
            type={"text"}
            onChange={this.changeHandler}
            errors={this.getErrorByField("company_region")}
          />
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              {this.getButton(formTitle)}
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Register;
