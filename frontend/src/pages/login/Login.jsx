import { memo } from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import { API_END_POINT } from "../../config";
import axios from "axios";
import { successMsg } from "../../halpers/general";


const Login = ({ setToken }) => {
    const [form] = Form.useForm();

    const onFinish = async (value) => {
        try {
            let config = {
                method: 'post',
                url: API_END_POINT + "login",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    "userName": value.username,
                    "password": value.password
                })
            };

            const result = await axios.request(config);
            if (result?.data?.settings?.success) {
                localStorage.setItem("token", result?.data?.data.token);
                setToken(result.data.data.token);
                successMsg(result.data.settings.message);
            }
            return result.data
        } catch (err) {
            console.log(err);
            errorMsg(err.message);
        }
    };

    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default memo(Login);