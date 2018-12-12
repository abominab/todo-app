import React from "react";
import styled from "styled-components";
import { Button, Intent } from "@blueprintjs/core";

import Task from "./Task";

const FADED_BLUE = `rgba(72, 133, 237, 0.2)`;

const Wrapper = styled.div`
  border: 1px ${FADED_BLUE} solid;
  border-radius: 4px;
  box-shadow: 0 6px 10px ${FADED_BLUE};
  margin: 12px 12px 20px;
  max-width: 450px;
  padding: 0.5rem;

  & h2 {
    text-align: center;
    overflow-wrap: break-word;
    color: rgba(72, 133, 237, 1);
    font-size: 1.5rem;
  }
`;

const ItemList = styled.ul`
  list-style: none;
`;

const ListForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
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

    // only make a new task if it has text
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
    // only mark completed if the item wasn't highlighted
    if (document.getSelection().type !== `Range`) {
      this.setState(prevState => ({
        items: prevState.items.map(item => {
          if (item === completed) {
            item.completed = true;
          }
          return item;
        })
      }));
      this.sortItems();
    }
  };

  sortItems = () => {
    this.setState(prevState => ({
      // sort items based on completed
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
        <ListForm onSubmit={this.addTask}>
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
