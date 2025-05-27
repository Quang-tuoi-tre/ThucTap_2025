import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Select,
  notification,
} from "antd";

import { authApi, type Login } from "../../api/auth.api";

const { Option } = Select;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const LoginPage: React.FC = () => {


  const [form] = Form.useForm();
  const [not, contextHolder] = notification.useNotification();
      const navigate= useNavigate();

  const openNotification = (
    type: "success" | "error",
    pauseOnHover: boolean,
    message: string,
    description: string
  ) => {
    return () => {
      not.open({
        message,
        description,
        type,
        pauseOnHover,
        placement: "topRight",
      });
    };
  };
  const onFinish = async (values: any) => {
    const formatPhone = (phone = '', prefix = '') => 
  prefix + phone.replace(/^0+/, '').replace(/\s+/g, '');

    const { prefix, ...formValues } = values;

      const phone = formatPhone(values.phone, values.prefix);

    const dataToSend: Login = {
      ...formValues,
      phone,
    };

    console.log("Data to send to API:", dataToSend);

    try {
      const response = await authApi.login(dataToSend);
      console.log(dataToSend);
       

    //   form.resetFields();
      openNotification(
        "success",
        true,
        "Login successfully",
        "Welcome back! You have successfully logged into your account."
      )();
      console.log("API response:", response);
        const token = response.data.data.token;
        console.log(token)
    
    localStorage.setItem('token', token);
      navigate('/')
    } catch (error) {
      openNotification(
        "error",
        true,
        "Login failed",
        "Invalid email or password. Please check your credentials and try again."
      )();
      console.log("Error is ", error);
    }
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle initialValue="84">
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
        <Option value="87">+87</Option>
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );
  return (
    <>

      {contextHolder}
      <Form
        {...formItemLayout}
        form={form}
        name="login"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <h1>Login Page</h1>
        <br/>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{ width: "100%" }}
            placeholder="Enter your phone..."
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Enter your password..." />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
