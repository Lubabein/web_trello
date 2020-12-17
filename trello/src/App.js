import React, {useState} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import './App.css'
const NotStartedList = [
  {
    id: '1',
    name: 'Купить книгу "Умный сад в подробностях"'
  },
  {
    id: '2',
    name: 'Начать захватывать мир'
  },
  {
    id: '3',
    name: 'Стать Хокаге'
  }
]

const InProgressList = [
  {
    id: '4',
    name: 'Записать видео'
  },
  
]

const CompletedList = [
  {
    id: '5',
    name: 'Покормить кролика'
  },
  {
    id: '6',
    name: 'Купить скелет'
  }
]

const columnsAll =
  {
    [uuid()]: {
      name: 'Not Started',
      items:  NotStartedList  },
    [uuid()]: {
      name: 'In progress',
      items: InProgressList
    },
    [uuid()]: {
      name: 'Completed',
      items: CompletedList
    }
  }

const onDragEnd = (result, columns, setColumns) => {
  if(!result.destination) return;
  const {source, destination} = result;
  if(source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destinationItems = [...destinationColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destinationItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items:sourceItems
      },
      [destination.droppableId]: {
        ...destinationColumn,
        items: destinationItems
      }
    })
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    })
  }

}

function App() {
  
  const [columns, setColumns] = useState(columnsAll);

  return ( 
    <div className="App" style={{display: 'flex', justifyContent: 'center', height: '100%'}} className = 'app'>
      
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)} >
        {Object.entries(columns).map(([id, column]) => {
          return(
            
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} className = 'column'>
    
              <h2>{column.name}</h2>
              <div style={{margin: 5}}>
                <Droppable droppableId={id} key={id}>
                  {(provided, snapshot) => {
                    return(
                      <div {...provided.droppableProps} ref={provided.innerRef} style={{background: snapshot.isDraggingOver ? 'MistyRose' : 'MistyRose', padding: 4, width: 250, minHeight:500 }}>
                        {column.items.map((item, index) => {
                          return(
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => {
                                return(
                                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{userSelect: 'none', padding: 16, margin: '0 0 8px 0', minHeight: '50px', backgroundColor: snapshot.isDragging ? 'RosyBrown' : 'RosyBrown', color: 'Seashell', ...provided.draggableProps.style}}>
                                    {item.name}
                                    
                                  </div>
                                )
                              }}
                            </Draggable>
                          )
                        })}
                        {provided.placeholder}
                      </div>
                    )
                  }}
                </Droppable>
              </div>
            </div>
          )
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
