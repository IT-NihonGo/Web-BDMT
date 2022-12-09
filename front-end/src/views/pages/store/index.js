import { Add, KeyboardArrowDownRounded, Star } from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Menu as MenuMUI,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Layout from "../../../components/layout";
import StoreItem from "../../../components/store-item";
import "./store.scss";
import storeApi from "../../../api/storeApi";
import { Modal, Rate } from "antd";

const PopupAdd = (props) => {
    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>New Store</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    id="name"
                    label="Address"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Hủy</Button>
                <Button onClick={props.handleClose}>Lưu</Button>
            </DialogActions>
        </Dialog>
    );
};

export const Store = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const [listPosts, setListStore] = useState([]);

    useEffect(() => {
        storeApi.getAll().then((response) => {
            console.log(response.data);
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
                        }
                    }
                }))
            );
        });
    }, []);

    const handleClickPopup = () => {
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    return (
        <Layout>
            <div className="action">
                <Button
                    className="btn-green"
                    variant="contained"
                    onClick={handleClickPopup}
                >
                    <Add />
                </Button>
                <PopupAdd open={openPopup} handleClose={handleClosePopup} />
            </div>

            <Grid container spacing={2} className="grid-container">
                {listPosts.map((store) => (
                    <StoreItem store={store} onRowClick></StoreItem>
                ))}
            </Grid>
        </Layout>
    );
};