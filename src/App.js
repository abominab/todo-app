import React, { Component } from "react";
import List from "./Components/List";

class App extends Component {
  constructor() {
    super();

    this.state = {
      lists: [],
      newList: ``
    };

    this.strings = {
      newList: `Add New List`
    };
  }

  addList = event => {
    event.preventDefault();
    event.stopPropagation();

    this.setState(prevState => ({
      lists: prevState.lists.concat({ title: prevState.newList }),
      newList: ``
    }));
  };

  handleInputChange = event => {
    const { value } = event.nativeEvent.target;
    this.setState(prevState => ({
      newList: value
    }));
  };

  render() {
    const { lists } = this.state;

    return (
      <div className="App">
        {lists.map((list, index) => (
          <List key={`list-${index}`} title={list.title} />
        ))}
        <form className="listForm" onSubmit={this.addList}>
          <input
            type={`text`}
            name="newList"
            value={this.state.newList}
            onChange={event => this.handleInputChange(event)}
          />
          <button type={`submit`}>{this.strings.newList}</button>
        </form>
      </div>
    );
  }
}

export default App;
