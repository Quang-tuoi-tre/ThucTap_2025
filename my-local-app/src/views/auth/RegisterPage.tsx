import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

// import type { CascaderProps } from 'antd';
import {
  // AutoComplete,
  Button,
  // Cascader,
  // Col,
  Form,
  Input,
  // InputNumber,
  // Row,
  DatePicker,
  Select,
  Image,
  Upload,
  notification
} from "antd";

import type { GetProp, UploadFile, UploadProps } from "antd";
import { authApi, type Customer } from "../../api/auth.api";
import { imgApi } from "../../api/image.api";
import { useNavigate } from "react-router-dom";

const { Option } = Select;


type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

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

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const RegisterPage: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);


  const [form] = Form.useForm();
  const [not, contextHolder] = notification.useNotification(); 
    const openNotification = (type: 'success' | 'error', pauseOnHover: boolean, message: string, description: string) => {
  return () => {
    not.open({
      message,
      description,
      type,
      pauseOnHover,
      placement: 'topRight',
    });
  };
};

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const navigate = useNavigate();


  const onFinish = async (values: any) => {
    

    const formatPhone = (phone = '', prefix = '') => 
  prefix + phone.replace(/^0+/, '').replace(/\s+/g, '');

     let avatarUrl = "";
      if (fileList.length > 0) {
        const formData = new FormData();
        formData.append("file", fileList[0].originFileObj as FileType);

        const uploadRes = await imgApi.image(formData);
        avatarUrl = uploadRes.data.data.path; 
      }


    const dob = values.dob.format("YYYY-MM-DD");
    
    const phone = formatPhone(values.phone, values.prefix);


    const { prefix, confirm, ...formValues } = values;

    const dataToSend: Customer = {
      ...formValues,
      avatar: avatarUrl,
      phone,
      dob,
    };

    console.log("Data to send to API:", dataToSend);

    try {
      const response = await authApi.register({
        customer: dataToSend,
        refCustomerId: 0,
      });

      console.log("API response:", response);

      
      
      form.resetFields();
      setFileList([]);
      openNotification('success', true, 'Registration Successful', 'Your account has been created successfully!')();
      navigate('/login')
    } catch (error) {
      // form.resetFields();
      // setFileList([]);
    openNotification('error', true, 'Registration Failed', 'There was an error during registration. Please try again.')();

      console.error("Error during registration:", error);
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

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
      name="register"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
            <h1>Register Page</h1>
            <br />

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input placeholder="Enter your email..." />
      </Form.Item>

      <Form.Item
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: "Please input your First Name!",
          },
        ]}
      >
        <Input placeholder="Enter your First Name..." />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[
          {
            required: true,
            message: "Please input your Last Name!",
          },
        ]}
      >
        <Input placeholder="Enter your Last Name..." />
      </Form.Item>

      <Form.Item
        name="fullName"
        label="Full Name"
        rules={[
          {
            required: true,
            message: "Please input your full Name!",
          },
        ]}
      >
        <Input placeholder="Enter your Full Name..." />
      </Form.Item>

      <Form.Item
        name="dob"
        label="Date of Birth"
        rules={[
          {
            required: true,
            message: "Please input your Date of Birth!",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[
          {
            required: true,
            message: "Please input your Address",
          },
        ]}
      >
        <Input placeholder="Enter your Address..." />
      </Form.Item>

      <Form.Item
        name="avatar"
        label="Avatar"
        valuePropName="fileList"
        getValueFromEvent={(e: any) => e && e.fileList}
      >
        <Upload
          listType="picture-card"
          onPreview={handlePreview}
          onChange={handleChange}
          accept="image/*"
          beforeUpload={() => false}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </Form.Item>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}

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

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder="Enter your confirm password..." />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{ width: "100%" }}
          placeholder="Enter your phone..."
        />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: "Please select gender!" }]}
      >
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};
