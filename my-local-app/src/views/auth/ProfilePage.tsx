import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  notification,
  Select,
  DatePicker,
  Spin,
  Image,
  Upload,
  type UploadFile,
  type GetProp,
  type UploadProps,
} from "antd";
import { authApi } from "../../api/auth.api";
import moment from "moment";
import axiosInstance from "../../axios/axiosConfig";
import { PlusOutlined } from "@ant-design/icons";
import { imgApi } from "../../api/image.api";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const { Option } = Select;

export const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const token = localStorage.getItem("token") || "";

  const baseUrl = axiosInstance.defaults.baseURL;

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const fetchProfile = async () => {
    setFetching(true);
    try {
      const res = await authApi.getprofile(token);
      console.log("Data:", res);

      const profile = res.data.data;

      if (profile.dob) {
        profile.dob = moment(profile.dob);
      }
      setAvatarUrl(profile.avatar);

      if (profile.phone && profile.phone.startsWith("84")) {
        profile.phone = "0" + profile.phone.slice(2);
      }

      form.setFieldsValue(profile);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Unable to load personal information",
      });
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const [not, contextHolder] = notification.useNotification();
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
        showProgress:true,
        pauseOnHover,
        placement: "topRight",
      });
    };
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      let newAvatarUrl = avatarUrl;
      if (fileList.length > 0 && fileList[0].originFileObj) {
        const formData = new FormData();
        formData.append("file", fileList[0].originFileObj as FileType);

        const uploadRes = await imgApi.image(formData);
        newAvatarUrl = uploadRes.data.data.path;
      }

      let phone = values.phone || "";
      if (phone.startsWith("0")) {
        phone = "84" + phone.slice(1);
      }
      const dataToUpdate = {
        ...values,
        avatar: newAvatarUrl,
        phone,
        dob: values.dob ? values.dob.format("YYYY-MM-DD") : null,
      };
      const dataTosend = {
        customer: dataToUpdate,
      };
      await authApi.updateProfile(token, dataTosend);
      setAvatarUrl(newAvatarUrl);
      openNotification(
        "success",
        true,
        "Update Successful!",
        "Your profile information has been successfully updated."
      )();
    } catch (error) {
      openNotification(
        "error",
        true,
        "Operation Failed",
        "Failed to update your information. Please check your input and try again."
      )();

      console.log("Error is:", error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <Spin tip="Is loading..." />;
  }
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name="update profile"
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <h1>Profile Page</h1>
        <Form.Item
          label="Email:"
          name="email"
          rules={[{ required: true, message: "Please input your E-mail!" }]}
        >
          <Input placeholder="Enter your Email..." />
        </Form.Item>

        <Form.Item
          label="First Name:"
          name="firstName"
          rules={[
            { required: true, message: "EPlease input your first Name!" },
          ]}
        >
          <Input placeholder="Enter your First Name..." />
        </Form.Item>

        <Form.Item
          label="Last Name:"
          name="lastName"
          rules={[
            { required: true, message: "Please input your last Name!" },
          ]}
        >
          <Input placeholder="Enter your Last Name..." />
        </Form.Item>

        <Form.Item
          label="Full Name:"
          name="fullName"
          rules={[
            { required: true, message: "Please input your full Name!" },
          ]}
        >
          <Input placeholder="Enter your Full Name..." />
        </Form.Item>

        <Form.Item
          label="Avatar"
          valuePropName="fileList"
          getValueFromEvent={(e: any) => e && e.fileList}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {fileList.length > 0 ? (
              <Image
                src={previewImage}
                alt="New Avatar"
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
              />
            ) : avatarUrl ? (
              <Image
                width={150}
                src={`${baseUrl}${avatarUrl}`}
                alt="Avatar"
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
              />
            ) : (
              <div>Chưa có ảnh</div>
            )}

            {/* Upload Button */}
            <Upload
              listType="picture-card"
              onPreview={handlePreview}
              onChange={handleChange}
              accept="image/*"
              beforeUpload={() => false}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </div>
        </Form.Item>

        <Form.Item
          label="Phone:"
          name="phone"
          rules={[{ required: true, message: "Please input your phone!" }]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Address: "
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input placeholder="Enter your Address..." />
        </Form.Item>

        <Form.Item label="Date of Birth: " name="dob">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Gender: " name="gender">
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
