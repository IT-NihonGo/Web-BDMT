import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Table, Input, Menu, Dropdown, Space, Modal } from "antd";
import {
    FilterOutlined,
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";
import useAuth from "../../../hooks/useAuth";
import userApi from "../../../api/userApi";
import * as roles from "../../../shared/constants/role";
import * as defaultImageUrl from '../../../shared/constants/defaultImageUrl'
import Layout from "../../../components/layout";
import EditProfile from "../../../components/modal/edit-profile";
import "./account-list.scss";
import AddUser from "../../../components/modal/add-user";

const { Search } = Input;
const numOfItem = [10, 15, 20];

function Accounts() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [allUser, setAllUser] = useState([]);
    const [userList, setUserList] = useState([]);
    const [deleteUser, setDeleteUser] = useState();
    const [editUser, setEditUser] = useState();
    const [total, setTotal] = useState(0);
    const defaultParams = {
        limit: 10,
        page: 1,
        role: roles.REVIEWER,
        txt_search: null,
        is_deleted: null,
    };
    const [params, setParams] = useState(defaultParams);

    const handleSubmit = async () => {
        try {
            const response = await userApi.softDeleteById(deleteUser.id);
            alert(response.data.message);
            window.location.reload();
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handleCancel = () => {
        setShowDeleteUserModal(false);
    };

    const handleGetImageError = (e) => {
        e.target.src = defaultImageUrl.USER_AVATAR
    };

    const handleShowEditModal = (value) => {
        setShowEditUserModal(value);
    };
    const handleShowAddModal = (value) => {
        setShowAddUserModal(value);
    };
    const state = {
        pagination: {
            pageSize: params.limit,
            total: total,
            onChange: (page, pageSize) => {
                setParams({
                    ...params,
                    limit: pageSize,
                    page: page,
                });
            },
        },
    };
    useEffect(() => {
        if (!!user) {
            userApi.getAll().then((response) => {
                setAllUser(
                    response.data.rows.map((user) => ({
                        id: user.id,
                        name: user.name,
                        role: user.role_id,
                        deletedAt: user.deletedAt,
                        email: user.email,
                        UserInfo: {
                            avatar: user.UserInfo?.avatar,
                            phone_number: user.UserInfo?.phone_number,
                            address: user.UserInfo?.address,
                            birthday: user.UserInfo?.birthday,
                        },
                    }))
                );
            });
        }
    }, [user]);
    useEffect(() => {
        if (allUser.length > 0) {
            setUserList(
                allUser
                    .filter((user) => user.role === params.role)
                    .map((user) => ({
                        id: user.id,
                        role: user.role,
                        name: user.name,
                        email: user.email,
                        avatar: user.UserInfo.avatar,
                        phone_number: user.UserInfo.phone_number,
                        address: user.UserInfo.address,
                        deletedAt: user.deletedAt ? "Đã xóa" : "Chưa xóa",
                    }))
            );
            setTotal(
                allUser.filter((user) => user.role === params.role).length
            );
        }
    }, [params, allUser]);
    const columns = [
        {
            title: "Avatar",
            dataIndex: "avatar",
            width: "5%",
            render: (text, record) => {
                let imgSource = process.env.REACT_APP_API_URL + record.avatar;
                return (
                    <img
                        src={imgSource}
                        className="avatar-user"
                        alt=""
                        onError={handleGetImageError}
                    />
                );
            },
        },
        {
            title: "Chủ tài khoản",
            dataIndex: "name",
            width: "15%",
        },
        {
            title: "Email",
            dataIndex: "email",
            width: "20%",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone_number",
            width: "15%",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            width: "35%",
        },
        {
            title: "Trạng thái",
            dataIndex: "deletedAt",
            width: "10%",
            render: (text, record) => (
                <span
                    className={
                        record.deletedAt === "Đã xóa"
                            ? "txt-red"
                            : "txt-green"
                    }
                >
                    {record.deletedAt}
                </span>
            ),
        },
        {
            title: "Action",
            dataIndex: "action",
            width: "5%",
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined
                        onClick={() => {
                            handleShowEditModal(true);
                            setEditUser(allUser.find(user => user.id === record.id ));
                        }}
                        className="icon-delete"
                    />
                    <DeleteOutlined
                        onClick={() => {
                            setShowDeleteUserModal(true);
                            setDeleteUser(record);
                        }}
                        className="icon-delete"
                    />
                </Space>
            ),
        },
    ];

    const menu = () => {
        return (
            <Menu class="account-list-menu">
                <div className="account-list-menu__item">
                    <div className="account-list-menu__item__row">
                        <span className="account-list-menu__item__row__span">
                            Trạng thái
                        </span>
                        <select
                            className="account-list-menu__item__row__select"
                            onChange={(e) => {
                                e.target.value === "All"
                                    ? setParams({ ...params, is_deleted: null })
                                    : setParams({
                                          ...params,
                                          is_deleted: e.target.value,
                                      });
                            }}
                        >
                            <option key={0} value={"All"}>
                                All
                            </option>
                            <option key={1} value={0}>
                                Chưa xóa
                            </option>
                            <option key={2} value={1}>
                                Đã xóa
                            </option>
                        </select>
                    </div>
                </div>
            </Menu>
        );
    };

    return user.role_id === roles.ADMIN ? (
        <Layout>
            <div>
                {/* --------------------------------------------------- TAB REVIEWER USER --------------------------------------------------- */}
                <div
                    className={
                        params.role === 1
                            ? "account-list-content"
                            : "account-list-content-unactive"
                    }
                >
                    <h2 className="txt-green py-4">Danh sách tài khoản</h2>

                    <div className="account-list-content__swap-page">
                        <button className="button-active">Reviewer</button>
                        <button
                            className="button-unactive"
                            onClick={() =>
                                setParams({
                                    ...defaultParams,
                                    role: roles.STORE_OWNER,
                                })
                            }
                        >
                            Store Owner
                        </button>
                        <button
                            className="button-unactive"
                            onClick={() =>
                                setParams({ ...params, role: roles.ADMIN })
                            }
                        >
                            Admin
                        </button>
                    </div>

                    <div className="account-list-content__action">
                        <div className="account-list-content__action__select">
                            <span>Hiển thị </span>
                            <select
                                defaultValue={{ value: params.pageSize }}
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        limit: e.target.value,
                                    })
                                }
                            >
                                {numOfItem.map((numOfItem, index) => {
                                    return (
                                        <option key={index} value={numOfItem}>
                                            {numOfItem}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <Dropdown
                            overlay={menu}
                            trigger="click"
                            placement="bottom"
                        >
                            <div
                                className={
                                    params.is_deleted !== null
                                        ? "account-list-content__action__filter-active"
                                        : "account-list-content__action__filter-unactive"
                                }
                            >
                                <FilterOutlined />
                            </div>
                        </Dropdown>

                        <div className="account-list-content__action__search">
                            <Search
                                className="search-box"
                                placeholder="Chủ tài khoản, email, số điện thoại, địa chỉ"
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        txt_search: e.target.value,
                                    })
                                }
                                allowClear
                                suffix
                            />
                            <SearchOutlined className="account-list-content__action__search__icon" />
                        </div>
                        <Link
                            className="account-list-content__action__add"
                            onClick={() => handleShowAddModal(true)}
                        >
                            <PlusCircleOutlined className="account-list-content__action__add__icon" />
                            <span>Thêm </span>
                        </Link>
                    </div>

                    <div className="account-list-content__sub">
                        <Table
                            className="account-list-content__sub__table"
                            columns={columns}
                            dataSource={userList}
                            pagination={state.pagination}
                        ></Table>
                    </div>
                </div>

                {/* ------------------------------------------------ TAB STORE OWNER ------------------------------------------------ */}
                <div
                    className={
                        params.role === 2
                            ? "account-list-content"
                            : "account-list-content-unactive"
                    }
                >
                    <h2 className="txt-green py-4">Danh sách tài khoản</h2>
                    <div className="account-list-content__swap-page">
                        <button
                            className="button-unactive"
                            onClick={() =>
                                setParams({
                                    ...defaultParams,
                                    role: roles.REVIEWER,
                                })
                            }
                        >
                            Reviewer
                        </button>
                        <button className="button-active">Store Owner</button>
                        <button
                            className="button-unactive"
                            onClick={() =>
                                setParams({ ...params, role: roles.ADMIN })
                            }
                        >
                            Admin
                        </button>
                    </div>
                    <div className="account-list-content__action">
                        <div className="account-list-content__action__select">
                            <span>Hiển thị </span>
                            <select
                                defaultValue={{ value: params.pageSize }}
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        limit: e.target.value,
                                    })
                                }
                            >
                                {numOfItem.map((numOfItem, index) => {
                                    return (
                                        <option key={index} value={numOfItem}>
                                            {numOfItem}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <Dropdown
                            overlay={menu}
                            trigger="click"
                            placement="bottom"
                        >
                            <div
                                className={
                                    params.is_deleted !== null
                                        ? "account-list-content__action__filter-active"
                                        : "account-list-content__action__filter-unactive"
                                }
                            >
                                <FilterOutlined />
                            </div>
                        </Dropdown>

                        <div className="account-list-content__action__search">
                            <Search
                                className="search-box"
                                placeholder="Chủ tài khoản, email, số điện thoại, địa chỉ"
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        txt_search: e.target.value,
                                    })
                                }
                                allowClear
                                suffix
                            />
                            <SearchOutlined className="account-list-content__action__search__icon" />
                        </div>
                        <Link
                            className="account-list-content__action__add"
                            onClick={() => handleShowAddModal(true)}
                        >
                            <PlusCircleOutlined className="account-list-content__action__add__icon" />
                            <span>Thêm</span>
                        </Link>
                    </div>

                    <div className="account-list-content__sub">
                        <Table
                            className="account-list-content__sub__table"
                            columns={columns}
                            dataSource={userList}
                            pagination={state.pagination}
                        ></Table>
                    </div>
                </div>

                {/* --------------------------------------------------- TAB ADMIN -------------------------------------------------- */}
                <div
                    className={
                        params.role === 3
                            ? "account-list-content"
                            : "account-list-content-unactive"
                    }
                >
                    <h2 className="txt-green py-4">Danh sách tài khoản</h2>
                    <div className="account-list-content__swap-page">
                        <button
                            className="button-unactive"
                            onClick={() =>
                                setParams({
                                    ...defaultParams,
                                    role: roles.REVIEWER,
                                })
                            }
                        >
                            Reviewer
                        </button>
                        <button
                            className="button-unactive"
                            onClick={() =>
                                setParams({
                                    ...params,
                                    role: roles.STORE_OWNER,
                                })
                            }
                        >
                            Store Owner
                        </button>
                        <button className="button-active">Admin</button>
                    </div>
                    <div className="account-list-content__action">
                        <div className="account-list-content__action__select">
                            <span>Hiển thị </span>
                            <select
                                defaultValue={{ value: params.pageSize }}
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        limit: e.target.value,
                                    })
                                }
                            >
                                {numOfItem.map((numOfItem, index) => {
                                    return (
                                        <option key={index} value={numOfItem}>
                                            {numOfItem}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <Dropdown
                            overlay={menu}
                            trigger="click"
                            placement="bottom"
                        >
                            <div
                                className={
                                    params.is_deleted !== null
                                        ? "account-list-content__action__filter-active"
                                        : "account-list-content__action__filter-unactive"
                                }
                            >
                                <FilterOutlined />
                            </div>
                        </Dropdown>

                        <div className="account-list-content__action__search">
                            <Search
                                className="search-box"
                                placeholder="Chủ tài khoản, email, số điện thoại, địa chỉ"
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        txt_search: e.target.value,
                                    })
                                }
                                allowClear
                                suffix
                            />
                            <SearchOutlined className="account-list-content__action__search__icon" />
                        </div>
                        <Link
                            className="account-list-content__action__add"
                            onClick={() => handleShowAddModal(true)}
                        >
                            <PlusCircleOutlined className="account-list-content__action__add__icon" />
                            <span>Thêm </span>
                        </Link>
                    </div>

                    <div className="account-list-content__sub">
                        <Table
                            className="account-list-content__sub__table"
                            columns={columns}
                            dataSource={userList}
                            pagination={state.pagination}
                        ></Table>
                    </div>
                </div>

                <Modal
                    className="delete-account-modal"
                    title="Xóa người dùng"
                    visible={showDeleteUserModal}
                    onOk={handleSubmit}
                    onCancel={handleCancel}
                >
                    <p>Bạn có chắn chắn muốn xóa người dùng hay không ?</p>
                </Modal>
                <EditProfile editUser={editUser} isModalOpen={showEditUserModal} handleOpenModal={handleShowEditModal}/>
                <AddUser isModalOpen={showAddUserModal} handleOpenModal={handleShowAddModal}/>
            </div>
        </Layout>
    )
    : (
        <Navigate to="/" />
    )
}

export default Accounts;
