import { memo, useEffect, useState } from 'react'
import { API_END_POINT } from '../../config';
import axios from 'axios';
import { Button, Modal, Popconfirm, Space, Table } from 'antd';
import UserForm from './UserForm';
import { errorMsg, successMsg } from '../../halpers/general';

const UserList = memo(() => {
    const [userData, setUserData] = useState([]);
    const [isModalOpen, setTsModalOpen] = useState(false);
    const [user, setUser] = useState(null);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Popconfirm
                        title="Delete the Record"
                        description="Are you sure to delete this record?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    const getUserList = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token is missing!!');
            let config = {
                method: 'GET',
                url: API_END_POINT + "users",
                headers: {
                    'Content-Type': 'application/json',
                    authtoken: token
                },
            };

            const result = await axios.request(config);

            if (result?.data?.settings?.success) {
                setUserData(result?.data?.data);
                successMsg(result.data.settings.message)
            }
            return result.data
        } catch (error) {
            console.log(error);
            successMsg(result.data.settings.message)
        }

    }
    const handleModal = () => {
        setTsModalOpen(prev => !prev)
        setUser(null)
    }
    const handleOk = () => {
        handleModal();
    }
    const handleEdit = (record) => {
        handleModal()
        setUser(record)
    }
    const handleDelete = async (id) => {
        let API_PATH = `${API_END_POINT}users/${id}`;
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token is missing!!');
            let config = {
                method: 'DELETE',
                url: API_PATH,
                headers: {
                    'Content-Type': 'application/json',
                    authtoken: token
                }
            };
            const result = await axios.request(config);

            if (result?.data?.settings?.success) {
                setUserData(result?.data?.data);
            }
        } catch (error) {
            errorMsg(error.response.data.settings.message);
        }
    }
    useEffect(() => {
        getUserList()
    }, []);

    return (
        <>
            <Button type="primary" onClick={handleModal}>
                Add Record
            </Button>
            <Table dataSource={userData} columns={columns} />;
            <Modal
                title={user ? 'Update Record' : 'Add Record'}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleModal}
                destroyOnHidden
                footer={false}
            >
                <UserForm handleModal={handleModal} setUserData={setUserData} user={user} />
            </Modal>
        </>
    )
})
export default UserList;