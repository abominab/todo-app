import React, { Component } from "react";
import styled from "styled-components";
import { Button, Intent } from "@blueprintjs/core";

import List from "./Components/List";

const AppTitle = styled.h1`
  text-align: center;
  font-size: 2rem;
  color: rgba(72, 133, 237, 1);
`;

const NewListSection = styled.div`
  display: flex;
  justify-content: center;

  & form {
    display: flex;
    align-items: stretch;
  }
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
      heading: `Task Organizer`,
      newListBtn: `Add New List`,
      newListLbl: `Create a new list`
    };
  }

  addList = event => {
    event.preventDefault();
    event.stopPropagation();

    if (this.state.newListName !== ``) {
      this.setState(prevState => ({
        lists: prevState.lists.concat({ title: prevState.newListName }),
        newListName: ``
      }));
    }
  };

  handleInputChange = event => {
    const { value } = event.nativeEvent.target;
    this.setState(() => ({
      newListName: value
    }));
  };

  render() {
    const { lists, newListName } = this.state;

    return (
      <div className="App">
        <AppTitle>{this.strings.heading}</AppTitle>
        <NewListSection>
          <div>
            <strong>{this.strings.newListLbl}</strong>
            <form onSubmit={this.addList}>
              <input
                type={`text`}
                name="newList"
                value={this.state.newListName}
                onChange={event => this.handleInputChange(event)}
              />
              <Button
                intent={Intent.PRIMARY}
                disabled={newListName === ``}
                type={`submit`}
              >
                {this.strings.newListBtn}
              </Button>
            </form>
          </div>
        </NewListSection>
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
