'use client'

import { useEffect, useState } from 'react'
import { Collapse, Space } from 'antd'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { BACKEND_URL } from '@/lib/constants'
import TodoItem from '../TodoItem/TodoItem'
import type { Todo } from '@/lib/types'

type UserItemProps = {
  userId: string
  userLogin: string
  index: number
}

const UserItem = ({ userId, userLogin, index }: UserItemProps) => {
  const [todos, setTodos] = useState<Todo[]>([])

  const { data: session } = useSession()

  useEffect(() => {
    axios
      .get(BACKEND_URL + '/todos/byCreator/' + userId, {
        headers: {
          Authorization: `Bearer ${session!.tokens.accessToken}`,
        },
      })
      .then((res) => setTodos(res.data))
  }, [])

  return (
    <Collapse>
      <Collapse.Panel header={userLogin} key={index}>
        <Space
          style={{
            display: 'flex',
          }}
          direction="vertical"
        >
          {todos.length ? (
            todos.map((todo: Todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  todoText={todo.todoText}
                  todoId={todo.id}
                  withDeleteBtn={false}
                />
              )
            })
          ) : (
            <span>this user has no todos yet</span>
          )}
        </Space>
      </Collapse.Panel>
    </Collapse>
  )
}

export default UserItem
