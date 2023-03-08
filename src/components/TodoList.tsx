import { Button, List } from 'antd';
import React from 'react';

const TodoList = ({ todoList, onRemove, onComplete, description }: any) => {
  return (
    <List
      style={{ marginTop: '10px' }}
      size="small"
      bordered
      dataSource={todoList}
      renderItem={(item) => (
        <List.Item>
          {' '}
          <Button
            style={{ marginRight: '10px' }}
            onClick={() => {
              onRemove(item);
            }}
            type="primary"
            shape="circle"
          >
            X
          </Button>
          {
            //@ts-ignore
            !item.isCompleted && (
              <Button
                style={{ marginRight: '5px' }}
                onClick={() => {
                  onComplete(item);
                }}
                type="primary"
                shape="circle"
              >
                ✓
              </Button>
            )
          }
          {
            //@ts-ignore
            item.title
          }
          <div>
            {
              //@ts-ignore
              item.description
            }
          </div>
        </List.Item>
      )}
    />
  );
};

export default TodoList;
