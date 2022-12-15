import { Modal, Form, Input } from "antd";
import { useState } from "react";
import storeApi from "../../../api/storeApi";
import { messages } from "../../../assets/lang/messages";
import "./add-store.scss";
export const AddStore = ({ showModal, handleCloseModal }) => {
    const [focusNameField, setFocusNameField] = useState();
    const [focusAddressField, setFocusAddressField] = useState();
    const [storeName, setStoreName] = useState();
    const [storeAddress, setStoreAddress] = useState();
    const handleCreateStore = async (value) => {
        try {
            const newStore = {
                name: value.name,
                address: value.address,
            }
            const response = await storeApi.createNew(newStore)
            alert(response.data.message)
            window.location.reload(false)
        } catch (error) {
        }
    }
    return (
        <Modal
            className="add-store"
            open={showModal}
            footer={null}
            onOk={handleCloseModal}
            onCancel={handleCloseModal}
        >
            <Form className="add-store__content" onFinish={handleCreateStore}>
                <h3 className="txt-green mb-5">THÊM CỬA HÀNG</h3>
                <div className="add-store__content__item">
                    <lable
                        className={focusNameField ? "text-up" : "text-down"}
                        onClick={() => setFocusNameField(true)}
                    >
                        Name
                    </lable>
                    <Form.Item
                        name="name"
                        className="col-12 mb-0"
                        rules={[
                            {
                                required: true,
                                message: messages["text_required"],
                            },
                        ]}
                    >
                        <Input
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            onFocus={() => setFocusNameField(true)}
                            onBlur={() => {
                                !storeName && setFocusNameField(false);
                            }}
                        />
                    </Form.Item>
                </div>
                <div className="add-store__content__item">
                    <lable
                        className={focusAddressField ? "text-up" : "text-down"}
                        onClick={() => setFocusAddressField(true)}
                    >
                        Address
                    </lable>
                    <Form.Item
                        name="address"
                        className="col-12 mb-0"
                        rules={[
                            {
                                required: true,
                                message: messages["text_required"],
                            },
                        ]}
                    >
                        <Input
                            value={storeAddress}
                            onChange={(e) => setStoreAddress(e.target.value)}
                            onFocus={() => setFocusAddressField(true)}
                            onBlur={() => {
                                !storeAddress && setFocusAddressField(false);
                            }}
                        />
                    </Form.Item>
                </div>
                <div className="add-store__content__footer">
                    <button type="button" onClick={handleCloseModal}>
                        Thoát
                    </button>
                    <button
                        type="primary"
                        htmlType="submit"
                        className="btn-green"
                    >
                        Lưu
                    </button>
                </div>
            </Form>
        </Modal>
    );
};
