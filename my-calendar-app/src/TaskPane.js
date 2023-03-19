import React, { useState } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import TaskForm from './TaskForm';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const TaskPane = ({ tasks, onTaskDrop, onNewTask }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormToggle = () => {
    setIsFormOpen(isOpen => !isOpen);
  };

  const handleFormSave = task => {
    onNewTask(task);
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('task', JSON.stringify(task));
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = (e, date) => {
    const task = JSON.parse(e.dataTransfer.getData('task'));
    onTaskDrop(task, date);
  };

  return (
    <>
      <div className="taskPaneHeader">
        <h3>Tasks</h3>
      </div>
      <TaskForm isOpen={isFormOpen} toggle={handleFormToggle} onSave={handleFormSave} />
      <ListGroup onDragOver={handleDragOver} onDrop={e => handleDrop(e, new Date())}>
        {tasks.map(task => (
          <ListGroupItem key={task.title} draggable onDragStart={e => handleDragStart(e, task)}>
            {task.title}
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

export default TaskPane;
