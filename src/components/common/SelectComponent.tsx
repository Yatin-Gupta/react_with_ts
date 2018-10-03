import * as React from "react";
import {
  FormElementEventCallbackType,
  FormElementAttributeType
} from "../../models/form.type";
import { OptionsType } from "../../models/htmlElement.type";

export interface SelectProps extends FormElementAttributeType {
  onChange: FormElementEventCallbackType;
  defaultValue: string;
  options: OptionsType;
  errors: string;
}

export interface SelectState {}

class Select extends React.Component<SelectProps, SelectState> {
  state = {};
  renderErrors = (errors: string) => {
    if (errors === "") return;
    return <div className="text-danger">{errors}</div>;
  };
  renderOptions = (defaultValue: string, options: OptionsType) => {
    return options.map(option => {
      if (defaultValue === option.value) {
        return (
          <option key={option.value} value={option.value} selected>
            {option.label}
          </option>
        );
      } else {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      }
    });
  };
  render() {
    const { label, id, onChange, defaultValue, name, errors } = this.props;
    return (
      <React.Fragment>
        <div className="form-group">
          <label htmlFor={id} className="control-label col-sm-2">
            {label}
          </label>
          <div className="col-sm-10">
            <select
              className="form-control"
              id={this.props.id}
              name={name}
              defaultValue={defaultValue}
              onChange={onChange}
            >
              {this.renderOptions(defaultValue, this.props.options)}
            </select>
            {this.renderErrors(errors)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Select;
