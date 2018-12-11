import React from "react";
import styled from "styled-components";

import Task from "./Task";

const Wrapper = styled.div`
  border: 1px rgba(0, 0, 0, 0.2) solid;
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  margin: 1rem 1rem 2rem;
  max-width: 450px;
  padding: 0.5rem;

  & h2 {
    text-align: center;
  }
`;

const ItemList = styled.ul`
  list-style: none;
`;

const ListForm = styled.form`
  display: flex;
  justify-content: center;
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
      items: prevState.items.concat({
        text: prevState.newTaskName,
        completed: false
      }),
      newTaskName: ``
    }));
  };

  handleInputChange = event => {
    const { value } = event.nativeEvent.target;
    this.setState(() => ({
      newTaskName: value
    }));
  };

  markCompleted = completed => {
    this.setState(prevState => ({
      items: prevState.items.map(item => {
        if (item === completed) {
          item.completed = true;
        }
        return item;
      })
    }));
    this.sortItems();
  };

  sortItems = () => {
    this.setState(prevState => ({
      items: prevState.items.sort((next, current) => {
        let sortValue = 0;
        if (!current.completed && next.completed) {
          sortValue = 1;
        } else if (current.completed && !next.completed) {
          sortValue = -1;
        }
        return sortValue;
      })
    }));
  };

  render() {
    const { title } = this.props;
    const { items, newTaskName } = this.state;

    return (
      <Wrapper>
        <h2>{title}</h2>
        <ItemList>
          {items.map((item, index) => {
            return (
              <Task
                key={`task-${index}`}
                {...item}
                onClick={() => {
                  this.markCompleted(item);
                }}
              />
            );
          })}
        </ItemList>
        <ListForm className="taskForm" onSubmit={this.addTask}>
          <input
            type={`text`}
            name="newTask"
            value={this.state.newTaskName}
            onChange={event => this.handleInputChange(event)}
          />
          <button type={`submit`} disabled={newTaskName === ``}>
            {this.strings.newTask}
          </button>
        </ListForm>
      </Wrapper>
    );
  }
}

export default List;
