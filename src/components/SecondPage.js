import React, { Component } from 'react';

export default class SecondPage extends Component {
  render() {
    return (
      <div>
        <p>画面遷移先のページ</p>
        <p></p>
        <p>{this.props.location.state.inputFirstName}</p>
        <p>{this.props.location.state.inputSecondName}</p>
        <p>{this.props.location.state.inputAddress}</p>
        <p>{this.props.location.state.inputPassWord1}</p>
        <p>{this.props.location.state.inputPassWord2}</p>
        <p>{this.props.location.state.inputNickName}</p>
        <p>{this.props.location.state.inputLocation}</p>
      </div>
    );
  }
}
