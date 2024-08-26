import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding-top: 30px;
  padding: 20px 10px;
  border-radius: 5px;
  min-height: 300px;
`;

interface IBoradProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoradProps) {
  return (
    <Droppable droppableId="one">
      {(provided) => (
        <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
          {toDos.map((toDo, index) => (
            <DragabbleCard toDo={toDo} index={index} key={toDo} />
          ))}
          {provided.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
}

export default Board;
