'use client'

import UserItem from '../UserItem/UserItem'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Space } from 'antd'
import { fetchUsers } from '@/store/Features/users/usersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store/store'

import type { RootState } from '@/store/store'
import type { User } from '@/lib/types'

const UsersPage = () => {
  const users = useSelector((state: RootState) => state.users.users)
  const dispatch = useDispatch<AppDispatch>()

  const { data: session } = useSession()

  useEffect(() => {
    dispatch(
      fetchUsers({
        currentUserId: session!.user.id,
        token: session!.tokens.accessToken,
      })
    )
  }, [])

  return (
    <div className="container">
      <h1>Users:</h1>
      <Space
        style={{
          display: 'flex',
          marginTop: '1em',
        }}
        direction="vertical"
      >
        {!users.length ? (
          <span>no users found</span>
        ) : (
          users.map((user: User, index: number) => {
            return (
              <UserItem
                key={user.id}
                userId={user.id}
                userLogin={user.login}
                index={index}
              />
            )
          })
        )}
      </Space>
    </div>
  )
}

export default UsersPage
