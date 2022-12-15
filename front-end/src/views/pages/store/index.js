import { Add } from "@mui/icons-material";
import { Button, Grid, Menu as MenuMUI } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../../components/layout";
import StoreItem from "../../../components/store-item";
import "./store.scss";
import storeApi from "../../../api/storeApi";
import useAuth from "../../../hooks/useAuth";
import { AddStore } from "../../../components/modal/add-store";
import * as roles from "../../../shared/constants/role";

export const Store = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [listPosts, setListStore] = useState([]);
    const [textSearch, setTextSearch] = useState();
    const [params, setParams] = useState({
        id: id,
        txt_search: "",
    });
    useEffect(() => {
        setParams({ ...params, id: id });
    }, [id]);
    useEffect(() => {
        storeApi.getListStores(params).then((response) => {
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
    }, [params]);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Layout>
           
            <div className="action-add">
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
                <AddStore
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                />
            </div>
            <div className="action-search" >
                <SearchIcon className="icon-search" />
                <input
                    placeholder="Tên, địa chỉ,..."
                    onChange={(e) =>
                        setParams({
                            ...params,
                            txt_search: e.target.value,
                        })
                    }
                />
            </div>
            <Grid container spacing={2} className="grid-container">
                {listPosts.map((store) => (
                    <StoreItem store={store} onRowClick></StoreItem>
                ))}
            </Grid>
        </Layout>
    );
};
