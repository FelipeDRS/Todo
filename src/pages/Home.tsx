import React, { useEffect, useState } from 'react';
import AntTitle from '../components/AntTitle';
import NewTodoListInput from '../components/NewTodoList';
import TodoList from '../components/TodoList';

const Home = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem('todoStorage')
      ? // @ts-ignore
        JSON.parse(localStorage.getItem('todoStorage'))
      : [],
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/todo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'aplication/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTodoList(data);
      });
    setLoading(false);
  }, []);

  useEffect(() => {
    if (todoList) {
      localStorage.setItem('todoStorage', JSON.stringify(todoList));
    }
  }, [todoList]);

  interface ToDo {
    title: string;
    id: number;
    isCompleted: boolean;
    _id?: string;
  }

  const onCreateBackEndItem = async (item: ToDo) => {
    await fetch('http://localhost:5000/todo', {
      body: JSON.stringify(item),
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };

  const onConcludeTask = async (item: ToDo, id: any) => {
    await fetch(`http://localhost:5000/todo/${id}`, {
      body: JSON.stringify(item),
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };

  const onDeleteTask = async (item: ToDo, id: any) => {
    await fetch(`http://localhost:5000/todo/${id}`, {
      body: JSON.stringify(item),
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };

  const handleOnComplete = async (item: ToDo) => {
    const newTodoList = todoList.map((taskItem: ToDo) => {
      if (taskItem.id === item.id) {
        return { ...taskItem, isCompleted: true };
      }
      return taskItem;
    });
    setTodoList(newTodoList);

    onConcludeTask(newTodoList[item.id - 1], item._id);
  };

  const handleOnRemove = (item: ToDo) => {
    const newTodoList = todoList.filter(
      (oldItem: ToDo) => oldItem.id !== item.id,
    );
    setTodoList(newTodoList);
    onDeleteTask(newTodoList[item.id - 1], item._id);
  };

  const handleOnAddItem = (itemTitle: any) => {
    const newItem = {
      title: itemTitle,
      id: todoList.length + 1,
      isCompleted: false,
    };

    setTodoList([...todoList, newItem]);

    onCreateBackEndItem(newItem);
  };

  return (
    <>
      <AntTitle content="Lista de tarefas" />
      <NewTodoListInput onAddItem={handleOnAddItem} />
      <TodoList
        todoList={todoList}
        onComplete={handleOnComplete}
        onRemove={handleOnRemove}
      />
      {loading && <p>Carregando....</p>}
    </>
  );
};

export default Home;
