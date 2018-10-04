import * as React from "react";

// import models
import { PropsType } from "../../models/props.type";

export interface DeleteProps extends PropsType {
  deleteItem: (id: number) => void;
}

export interface DeleteState {}

class Delete extends React.Component<DeleteProps, DeleteState> {
  state = {};
  async componentDidMount() {
    await this.props.deleteItem(this.props.match.params.id);
    this.props.history.replace("/");
  }
  render() {
    return <React.Fragment />;
  }
}

export default Delete;
