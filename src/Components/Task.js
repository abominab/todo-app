import React from "react";
import styled from "styled-components";

const Remove = props => <span {...props}>{`✗`}</span>;

const RemoveIcon = styled(Remove)`
  color: red;
  cursor: pointer;
  position: absolute;
  right: 0;
  background-color: white;
`;

const Li = styled.li`
  opacity: ${props => (props.completed ? 0.4 : 1)};
  margin: 2px 20px;
  font-size: 1.5rem;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &:hover {
    &:before {
      content: "☑";
    }
  }

  &:before {
    content: ${props => (props.completed ? `"☑"` : `"☐"`)};
    font-size: 2rem;
    margin: 0 10px 0 -50px;
  }

  & .task {
    text-decoration: ${props => (props.completed ? `line-through` : `none`)};
    font-family: "Handlee";
  }
`;

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovering: false
    };
  }

  // Mouse over mimics css hover behavior but allows the RemoveIcon component to be clickable
  handleMouseHover = () => this.toggleHoverState();

  toggleHoverState = () => {
    this.setState(prevState => ({
      isHovering: !prevState.isHovering
    }));
  };

  render() {
    const { completed, onCompletion, onDelete, text } = this.props;
    const { isHovering } = this.state;

    return (
      <Li
        completed={completed}
        onClick={() => onCompletion()}
        onMouseEnter={() => this.handleMouseHover()}
        onMouseLeave={() => this.handleMouseHover()}
      >
        <span className={`task`}>{text}</span>
        {isHovering && <RemoveIcon onClick={() => onDelete()} />}
      </Li>
    );
  }
}

export default Task;
