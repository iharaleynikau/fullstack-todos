'use client';

import { Form, Input, Button } from 'antd';
import { BACKEND_URL } from '@/lib/constants';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import useShowMessage from '@/hooks/useShowMessage.hook';

type InputValues = {
  login: string;
  password: string;
};

const SignupPage = () => {
  const message = useShowMessage();

  const onFinish = async (values: InputValues) => {
    try {
      let response;

      await axios
        .post(BACKEND_URL + '/auth/signup', values)
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
        message('You`ve been successfully registered!');

        await signIn('credentials', {
          login: values.login,
          password: values.password,
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
          label="Login"
          name="login"
          rules={[
            {
              required: true,
              message: 'Please input your login!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
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
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupPage;
