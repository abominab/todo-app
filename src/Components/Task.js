import React from "react";
import styled from "styled-components";

const COLOR_COMPLETED = `rgba(0, 0, 0, 0.4)`;

const Li = styled.li`
  color: ${props => (props.completed ? COLOR_COMPLETED : `default`)};
  margin: 2px 20px;

  &:hover {
    &:before {
      content: "☑";
    }
  }

  &:before {
    content: ${props => (props.completed ? `"☑"` : `"☐"`)};
    color: ${props => (props.completed ? COLOR_COMPLETED : `default`)};

    font-size: 1.5rem;
    margin: 0 10px 0 -50px;
  }

  & span {
    text-decoration: ${props => (props.completed ? `line-through` : `none`)};
    font-family: "Handlee";
  }
`;

class Task extends React.Component {
  render() {
    const { completed, text } = this.props;

    return (
      <Li completed={completed} {...this.props}>
        <span>{text}</span>
      </Li>
    );
  }
}

export default Task;
