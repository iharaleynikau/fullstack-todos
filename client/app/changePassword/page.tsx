'use client';

import { Form, Input, Button } from 'antd';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Loader from '@/components/Loader/Loader';
import useShowMessage from '@/hooks/useShowMessage.hook';
import { BACKEND_URL } from '@/lib/constants';

type InputValues = {
  password: string;
  newPassword: string;
};

const ChangePasswordPage = () => {
  const message = useShowMessage();

  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Loader />;
  }

  if (!session) {
    return redirect('/auth/signin');
  }

  const onFinish = async (values: InputValues) => {
    try {
      let response;

      await axios
        .put(BACKEND_URL + '/user/' + session.user.id, values)
        .then(
          (res) =>
            (response = {
              type: 'success',
              data: res.data,
            }),
        )
        .catch((error) => {
          response = {
            type: 'error',
            data: error.response.data,
          };
        });

      if (response!.type === 'error') {
        message(response!.data.message, 'error');
      } else {
        message('Password changed!');

        await signIn('credentials', {
          login: session.user.login,
          password: values.newPassword,
          redirect: true,
          callbackUrl: '/',
        });
      }
    } catch (error: any) {
      message(error.message, 'error');
    }
  };

  return (
    <div className="form-container">
      <Form
        name="signup-form"
        onFinish={onFinish}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your old password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="New password"
          name="newPassword"
          rules={[
            {
              required: true,
              message: 'Please input your new password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Change password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePasswordPage;
