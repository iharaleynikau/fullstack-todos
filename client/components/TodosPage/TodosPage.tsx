'use client';

import { useEffect, useState } from 'react';
import { Space, Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import {
  fetchTodosByCreatorId,
  createTodo,
} from '@/store/Features/todos/todosSlice';
import TodoItem from '@/components/Todo/TodoItem';
import useShowMessage from '@/hooks/useShowMessage.hook';
import type { Todo } from '@/lib/types';
import './TodosPage.css';

const TodosPage = ({ userId }: { userId: string }) => {
  const [addTodoText, setAddTodoText] = useState('');
  const message = useShowMessage();

  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTodosByCreatorId(userId));
  }, []);

  const onCreateTodo = () => {
    if (!addTodoText.length) {
      return message('Enter todo text!', 'error');
    }

    dispatch(createTodo({ todoText: addTodoText, creatorId: userId }));
  };

  return (
    <div className="container">
      <div className="todos-container">
        <h1>TODOS: {todos.length}</h1>
        <div
          style={{
            margin: '1em 0',
            width: '100%',
            display: 'flex',
          }}
        >
          <Input
            placeholder="Input todo text"
            value={addTodoText}
            onChange={(e) => setAddTodoText(e.target.value)}
          />
          <Button
            style={{ marginLeft: '1em' }}
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={onCreateTodo}
          />
        </div>
        <Space
          direction="vertical"
          size="middle"
          style={{
            display: 'flex',
          }}
        >
          {!todos.length ? (
            <span>no todos yet</span>
          ) : (
            todos.map((todo: Todo) => {
              return (
                <TodoItem
                  withDeleteBtn={true}
                  key={todo.id}
                  todoId={todo.id}
                  todoText={todo.todoText}
                />
              );
            })
          )}
        </Space>
      </div>
    </div>
  );
};

export default TodosPage;
