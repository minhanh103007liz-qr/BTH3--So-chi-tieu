import React, { Component } from "react";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      now: new Date(),
    };
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState({ now: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <span className="clock">
        {this.state.now.toLocaleTimeString("vi-VN")}
      </span>
    );
  }
}

export default Clock;
