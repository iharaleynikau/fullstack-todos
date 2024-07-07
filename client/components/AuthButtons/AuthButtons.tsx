'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import { Button, Space, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { BACKEND_URL } from '@/lib/constants';

const AuthButtons = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    const onDeleteAccount = async () => {
      try {
        axios.delete(BACKEND_URL + '/user/' + session.user.id);
        signOut();
      } catch (error) {
        console.log(error);
      }
    };

    const items: MenuProps['items'] = [
      {
        label: (
          <Link href={'/changePassword'}>
            <Button type="link">Change password</Button>
          </Link>
        ),
        key: '0',
      },
      {
        type: 'divider',
      },
      {
        label: (
          <Button type="link" danger={true} onClick={onDeleteAccount}>
            Delete account
          </Button>
        ),
        key: '1',
      },
    ];

    return (
      <Space>
        <Dropdown
          menu={{
            items,
          }}
        >
          <span>
            <UserOutlined />
            {session.user.login}
          </span>
        </Dropdown>
        <Button type="primary" onClick={() => signOut()}>
          Log Out
        </Button>
        <Link href={'/users'}>
          <Button type="primary">Users</Button>
        </Link>
        <Link href={'/'}>
          <Button type="primary">Todos</Button>
        </Link>
      </Space>
    );
  }

  return (
    <Space>
      <Link href={'/auth/signin'}>
        <Button type="primary">Sign In</Button>
      </Link>
      <Link href={'/signup'}>
        <Button type="primary">Sign Up</Button>
      </Link>
    </Space>
  );
};

export default AuthButtons;
