import React from "react";
import styled from "styled-components";

const Li = styled("li")`
  color: ${props => (props.completed ? `rgba(0, 0, 0, 0.4)` : `default`)};
  text-decoration: ${props => (props.completed ? `line-through` : `none`)};
`;

class Task extends React.Component {
  constructor() {
    super();

    this.state = {
      completed: false
    };
  }

  markCompleted = () => {
    this.setState(prevState => ({
      completed: true
    }));
  };

  render() {
    const { text } = this.props;
    const { completed } = this.state;

    return <Li completed={completed}>{text}</Li>;
  }
}

export default Task;
