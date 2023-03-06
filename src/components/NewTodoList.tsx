import React, { useState } from 'react';
import { Input } from 'antd';

const NewTodoListInput = ({ onAddItem }: any) => {
  const [task, setTask] = useState('');

  const handleChange = (event: any) => {
    setTask(event.target.value);
  };

  const handleKey = (event: any) => {
    if (event.key === 'Enter') {
      onAddItem(task);
      setTask('');
    }
  };

  return (
    <div>
      <Input
        value={task}
        onChange={handleChange}
        onKeyDown={handleKey}
        placeholder="Ex.: Trabalhar"
      />
    </div>
  );
};

export default NewTodoListInput;
