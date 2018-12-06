import React from "react";
import styled from "styled-components";

import Task from "./Task";

const Wrapper = styled("div")`
  border: 1px rgba(0, 0, 0, 0.2) solid;
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  margin: 1rem 1rem 2rem;
  max-width: 600px;
  padding: 0.5rem;
`;

class List extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
      newTask: ``
    };

    this.strings = {
      newTask: `Add New Task`
    };
  }

  addTask = event => {
    event.preventDefault();
    event.stopPropagation();

    this.setState(prevState => ({
      items: prevState.items.concat({ text: prevState.newTask }),
      newTask: ``
    }));
  };

  handleInputChange = event => {
    const { value } = event.nativeEvent.target;
    this.setState(prevState => ({
      newTask: value
    }));
  };

  render() {
    const { title } = this.props;
    const { items } = this.state;

    return (
      <Wrapper>
        <h2>{title}</h2>
        <ul>
          {items.map((item, index) => {
            return <Task key={`task-${index}`} text={item.text} />;
          })}
        </ul>
        <form className="taskForm" onSubmit={this.addTask}>
          <input
            type={`text`}
            name="newTask"
            value={this.state.newTask}
            onChange={event => this.handleInputChange(event)}
          />
          <button type={`submit`}>{this.strings.newTask}</button>
        </form>
      </Wrapper>
    );
  }
}

export default List;
