import React from 'react';

function TaskBubble({ task }) {
  const handleClick = () => {
    // code to show the task description pop-up
  };

  return (
    <div className='taskBubble' onClick={handleClick}>
      {task.title}
    </div>
  );
}

export default TaskBubble;
