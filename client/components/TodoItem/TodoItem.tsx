'use client'

import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useSession } from 'next-auth/react'
import { deleteTodo } from '@/store/Features/todos/todosSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import useShowMessage from '@/hooks/useShowMessage.hook'
import './TodoItem.css'

type TodoProps = {
  todoText: string
  todoId: string
  withDeleteBtn: boolean
}

const TodoItem = ({ todoText, todoId, withDeleteBtn = true }: TodoProps) => {
  const message = useShowMessage()

  const { data: session } = useSession()

  const dispatch = useDispatch<AppDispatch>()

  const onDelete = async () => {
    dispatch(deleteTodo({ todoId, token: session!.tokens.accessToken }))
    message('Todo has been deleted')
  }

  return (
    <div className="todo">
      <div className="todo-text-container">
        <span>{todoText}</span>
      </div>
      {withDeleteBtn ? (
        <Button
          style={{ marginLeft: '1em' }}
          shape="circle"
          type="primary"
          danger={true}
          icon={<DeleteOutlined />}
          onClick={onDelete}
        />
      ) : null}
    </div>
  )
}

export default TodoItem
