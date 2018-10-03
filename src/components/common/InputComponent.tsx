import * as React from "react";
import {
  FormElementEventCallbackType,
  FormElementAttributeType
} from "../../models/form.type";

export interface InputProps extends FormElementAttributeType {
  placeholder: string;
  type: string;
  value: string;
  onChange: FormElementEventCallbackType;
  errors: string;
}

export interface InputState {}

class Input extends React.Component<InputProps, InputState> {
  state = {};
  renderErrors = (errors: string) => {
    if (errors === "") return;
    return <div className="text-danger">{errors}</div>;
  };
  render() {
    const {
      label,
      id,
      placeholder,
      onChange,
      value,
      name,
      type,
      errors
    } = this.props;
    return (
      <React.Fragment>
        <div className="form-group">
          <label className="control-label col-sm-2" htmlFor={id}>
            {label}
          </label>
          <div className="col-sm-10">
            <input
              type={type}
              className="form-control"
              name={name}
              id={id}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              //ref={this.username}
            />
            {this.renderErrors(errors)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Input;
