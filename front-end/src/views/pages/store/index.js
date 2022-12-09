import { Add } from "@mui/icons-material";
import {
    Button,
    Grid,
    Menu as MenuMUI,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Layout from "../../../components/layout";
import StoreItem from "../../../components/store-item";
import "./store.scss";
import storeApi from "../../../api/storeApi";
import useAuth from "../../../hooks/useAuth";
import { AddStore } from "../../../components/modal/add-store";
import * as roles from "../../../shared/constants/role";


export const Store = () => {
    const [showModal, setShowModal] = useState(false);
    const [listPosts, setListStore] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        storeApi.getAll().then((response) => {
            setListStore(
                response.data.map((store) => ({
                    id: store.id,
                    name: store.name,
                    address: store.address,
                    rate_amount: store.rate_amount,
                    User: {
                        id: store.User.id,
                        name: store.User.name,
                        email: store.User.email,
                        UserInfo: {
                            avatar: store.User.UserInfo.avatar,
                            phone_number: store.User.UserInfo.phone_number,
                        },
                    },
                }))
            );
        });
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Layout>
            <div className="action">
                {(roles.STORE_OWNER === user.role_id ||
                    roles.ADMIN === user.role_id) && (
                    <Button
                        className="btn-green"
                        variant="contained"
                        onClick={() => setShowModal(true)}
                    >
                        <Add />
                    </Button>
                )}
                <AddStore showModal={showModal} handleCloseModal={handleCloseModal} />
            </div>

            <Grid container spacing={2} className="grid-container">
                {listPosts.map((store) => (
                    <StoreItem store={store} onRowClick></StoreItem>
                ))}
            </Grid>
        </Layout>
    );
};
