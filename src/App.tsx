import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import DragabbleCard from "./Components/DragabbleCard";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
`;

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding-top: 30px;
  padding: 20px 10px;
  border-radius: 5px;
  min-height: 300px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    const newToDos = Array.from(toDos);
    const [removed] = newToDos.splice(source.index, 1);
    newToDos.splice(destination.index, 0, removed);
    setToDos(newToDos);

    // 이건 니꼬쌤의 방식 (위의 코드와 동일한 결과) & useRecoilState의 set 함수는
    //값을 보내도 되고 함수를 보내도 된다.
    // if (!destination) return;
    // setToDos((oldToDos) => {
    //   const copyToDos = [...oldToDos];
    //   copyToDos.splice(source.index, 1);
    //   copyToDos.splice(destination?.index, 0, draggableId);
    //   return copyToDos;
    // });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(provided) => (
              <Board ref={provided.innerRef} {...provided.droppableProps}>
                {toDos.map((toDo, index) => (
                  <DragabbleCard toDo={toDo} index={index} key={toDo} />
                ))}
                {provided.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
