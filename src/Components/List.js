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
      newTaskName: ``
    };

    this.strings = {
      newTask: `Add New Task`
    };
  }

  addTask = event => {
    event.preventDefault();
    event.stopPropagation();

    this.setState(prevState => ({
      items: prevState.items.concat({ text: prevState.newTaskName }),
      newTaskName: ``
    }));
  };

  handleInputChange = event => {
    const { value } = event.nativeEvent.target;
    this.setState(prevState => ({
      newTaskName: value
    }));
  };

  render() {
    const { title } = this.props;
    const { items, newTaskName } = this.state;

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
            value={this.state.newTaskName}
            onChange={event => this.handleInputChange(event)}
          />
          <button type={`submit`} disabled={newTaskName === ``}>
            {this.strings.newTask}
          </button>
        </form>
      </Wrapper>
    );
  }
}

export default List;
