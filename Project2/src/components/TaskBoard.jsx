import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './TaskBoard.css';

const initialTasks = [
  { id: 'task-1', content: 'Learn React' },
  { id: 'task-2', content: 'Build a Project' },
  { id: 'task-3', content: 'Deploy to Vercel' }
];

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination || destination.index === source.index) return;

    const updatedTasks = Array.from(tasks);
    const [moved] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, moved);

    setTasks(updatedTasks);
  };

  return (
    <div className="task-board">
      <h2>🗂️ Task Board</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="taskList">
          {(provided) => (
            <div
              className="task-column"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      className="task-card"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {task.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
