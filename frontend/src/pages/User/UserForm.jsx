import { Button, Dropdown, Form, Input, Select } from "antd";
import axios from "axios";
import { API_END_POINT } from "../../config";
import { useEffect } from "react";
import { errorMsg, successMsg } from "../../halpers/general";

const UserForm = ({ handleModal, setUserData, user }) => {
    // Implement user form for add/edit
    const [form] = Form.useForm();
    const onFinish = async (value) => {
        let API_PATH = `${API_END_POINT}users`;
        let method = 'POST';

        if (user) {
            API_PATH = `${API_PATH}/${user.id}`;
            method = 'PUT';
        }
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token is missing!!');
            const data = {
                name: value.name,
                email: value.email,
                role: value.role,
            }
            let config = {
                method,
                url: API_PATH,
                headers: {
                    'Content-Type': 'application/json',
                    authtoken: token
                },
                data: data
            };

            const result = await axios.request(config);

            if (!result?.data?.settings?.success) {
                throw new Error(result.data.settings.message)
            }

            setUserData(result?.data?.data);
            handleModal()
            successMsg(result.data.settings.message)
        } catch (error) {
            errorMsg(error.response.data.settings.message)
        }

    }
    useEffect(() => {
        if (user) {
            const updatedData = {
                name: user.name,
                email: user.email,
                role: user.role,
            }
            form.setFieldsValue(updatedData);
        } else {
            form.resetFields();
        }
    }, [user, form])
    return (
        <>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'The input is not a valid E-mail!', }
                    ]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="role"
                    name="role"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Select>
                        <Select.Option value="admin">Admin</Select.Option>
                        <Select.Option value="user">User</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form >
        </>)
};

export default UserForm;