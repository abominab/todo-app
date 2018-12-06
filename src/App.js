import React, { Component } from "react";
import List from "./Components/List";

class App extends Component {
  constructor() {
    super();

    this.state = {
      lists: [],
      newListName: ``
    };

    this.strings = {
      newList: `Add New List`
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
        {lists.map((list, index) => (
          <List key={`list-${index}`} title={list.title} />
        ))}
        <form className="listForm" onSubmit={this.addList}>
          <input
            type={`text`}
            name="newList"
            value={this.state.newListName}
            onChange={event => this.handleInputChange(event)}
          />
          <button type={`submit`} disabled={newListName === ``}>
            {this.strings.newList}
          </button>
        </form>
      </div>
    );
  }
}

export default App;
