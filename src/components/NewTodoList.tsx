import React, { useState } from 'react';
import { Input } from 'antd';
import { Formik } from 'formik';

const NewTodoListInput = ({ onAddItem, onAddDescription }: any) => {
  const [task, setTask] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleChange = (event: any) => {
    setTask(event.target.value);
  };

  const handleKey = (event: any) => {
    if (event.key === 'Enter') {
      onAddItem(task);
      setTask('');
    }
  };

  const handleDescriptionKey = (event: any) => {
    if (event.key === 'Enter') {
      onAddDescription(taskDescription);
      setTaskDescription('');
    }
  };

  const handleDescriptionChange = (event: any) => {
    setTaskDescription(event.target.value);
  };

  return (
    <>
      <Formik
        initialValues={{
          title: '',
          description: '',
        }}
        onSubmit={() => {}}
        validate={(values) => {
          let errors = {};
          if (!values.title) {
            //@ts-ignore
            errors.title = 'Campo tarefa é necessário';
          }
          return errors;
        }}
      >
        {({ errors, touched, handleBlur, values }) => (
          //@ts-ignore
          <form>
            <Input
              name="task"
              onChange={handleChange}
              value={task}
              onKeyDown={handleKey}
              placeholder="Ex.: Trabalhar"
              onBlur={handleBlur}
            />
            {errors.title && (
              <p style={{ color: 'red', fontFamily: 'Arial' }}>
                {errors.title}
              </p>
            )}
            <Input
              style={{ marginTop: '10px' }}
              value={taskDescription}
              onChange={handleDescriptionChange}
              onKeyDown={handleDescriptionKey}
              placeholder="Ex.: Almoçar 12h"
            />
          </form>
        )}
      </Formik>
    </>
  );
};

export default NewTodoListInput;
