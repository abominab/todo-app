import React, { Component } from "react";
import styled from "styled-components";
import "react-awesome-button/dist/styles.css";

import List from "./Components/List";

const AppTItle = styled.h1`
  text-align: center;
`;

const ListContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;
class App extends Component {
  constructor() {
    super();

    this.state = {
      lists: [],
      newListName: ``
    };

    this.strings = {
      heading: `Task Manager`,
      newListBtn: `Add New List`,
      newListLbl: `Create a new list`
    };
  }

  addList = event => {
    event.preventDefault();
    event.stopPropagation();

    this.setState(prevState => ({
      lists: prevState.lists.concat({ title: prevState.newListName }),
      newListName: ``
    }));
  };

  handleInputChange = event => {
    const { value } = event.nativeEvent.target;
    this.setState(prevState => ({
      newListName: value
    }));
  };

  render() {
    const { lists, newListName } = this.state;

    return (
      <div className="App">
        <AppTItle>{this.strings.heading}</AppTItle>
        <div>
          <strong>{this.strings.newListLbl}</strong>
          <form className="listForm" onSubmit={this.addList}>
            <input
              type={`text`}
              name="newList"
              value={this.state.newListName}
              onChange={event => this.handleInputChange(event)}
            />
            <button disabled={newListName === ``}>
              {this.strings.newListBtn}
            </button>
          </form>
        </div>
        <ListContainer>
          {lists.map((list, index) => (
            <List key={`list-${index}`} title={list.title} />
          ))}
        </ListContainer>
      </div>
    );
  }
}

export default App;
