import React from "react";
import styled from "styled-components";

const COLOR_COMPLETED = `rgba(72, 133, 237, 0.4)`;

const Remove = props => <span {...props}>{`✗`}</span>;

const RemoveIcon = styled(Remove)`
  color: red;
  cursor: pointer;
  position: absolute;
  right: 0;
`;

const Li = styled.li`
  color: ${props => (props.completed ? COLOR_COMPLETED : `default`)};
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
    color: ${props => (props.completed ? COLOR_COMPLETED : `default`)};
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
        <div>
          <span className={`task`}>{text}</span>
        </div>
        {isHovering && <RemoveIcon onClick={() => onDelete()} />}
      </Li>
    );
  }
}

export default Task;
