import React from "react";
import styled from "styled-components";
import { Button, Intent } from "@blueprintjs/core";

import Task from "./Task";

const Wrapper = styled.div`
  border: 1px rgba(72, 133, 237, 0.2) solid;
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(72, 133, 237, 0.2);
  margin: 1rem 1rem 2rem;
  max-width: 450px;
  padding: 0.5rem;

  & h2 {
    text-align: center;
    overflow-wrap: break-word;
  }
`;

const ItemList = styled.ul`
  list-style: none;
`;

const ListForm = styled.form`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

class List extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [
        { text: `My task`, completed: false },
        { text: `1`, completed: false },
        { text: `2`, completed: false },
        { text: `3`, completed: false }
      ],
      newTaskName: ``
    };

    this.strings = {
      newTask: `Add New Task`
    };
  }

  addTask = event => {
    event.preventDefault();
    event.stopPropagation();

    if (this.state.newTaskName !== ``) {
      this.setState(prevState => ({
        items: prevState.items.concat({
          text: prevState.newTaskName,
          completed: false
        }),
        newTaskName: ``
      }));
      this.sortItems();
    }
  };

  removeTask = removed => {
    let index = this.state.items.indexOf(removed),
      items = this.state.items.slice(0);

    items.splice(index, 1);
    this.setState(() => ({
      items
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
                onCompletion={() => {
                  this.markCompleted(item);
                }}
                onDelete={() => {
                  this.removeTask(item);
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
          <Button
            intent={Intent.PRIMARY}
            disabled={newTaskName === ``}
            type={`submit`}
          >
            {this.strings.newTask}
          </Button>
        </ListForm>
      </Wrapper>
    );
  }
}

export default List;
