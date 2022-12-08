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
import React, { useState,useEffect } from "react";
import Layout from "../../../components/layout";
import StoreItem from "../../../components/store-item";
import "./store.scss";
import storeApi from "../../../api/storeApi";
import {Modal,Rate } from 'antd'


const Menu = (props) => {
  return (
      <MenuMUI
          open={props.open}
          onClose={props.handleClose}
          anchorEl={props.anchorEl}
      >
        <MenuItem className="rate" onClick={props.handleClose}>
          <Typography>5</Typography>
          <Star className="start" />
        </MenuItem>
        <MenuItem className="rate" onClick={props.handleClose}>
          <Typography>4</Typography>
          <Star className="start" />
        </MenuItem>
        <MenuItem className="rate" onClick={props.handleClose}>
          <Typography>3</Typography>
          <Star className="start" />
        </MenuItem>
        <MenuItem className="rate" onClick={props.handleClose}>
          <Typography>2</Typography>
          <Star className="start" />
        </MenuItem>
        <MenuItem className="rate" onClick={props.handleClose}>
          <Typography>1</Typography>
          <Star className="start" />
        </MenuItem>
      </MenuMUI>
  );
};

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const openMenu = Boolean(anchorEl);
  const [showModalRating, setShowModalRating] = useState(false)

  const [listPosts, setListStore] = useState([]);

  useEffect(() => {
    storeApi.getAll().then((response) => {
      setListStore(
            response.data.map((store) => ({
              id: store.id,
              name: store.name,
              address: store.address,
              rateAmount: store.rateAmount,
              user_id: store.user_id
            }))
        );
    });
  
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleCancel = () => {
    setShowModalRating(false)
  }

  return (
      <Layout>
        <div className="action">
          <Button variant="contained" onClick={handleClickPopup}>
            <Add />
          </Button>
          <PopupAdd open={openPopup} handleClose={handleClosePopup} />
          <Button variant="contained" onClick={handleClick}>
            <KeyboardArrowDownRounded />
          </Button>
          <Menu
              open={openMenu}
              anchorEl={anchorEl}
              handleClose={handleClose}
              onClick={handleClick}
          />
        </div>

        <Modal
          className="package-list-modal"
          visible={showModalRating}
          onCancel={handleCancel}
          footer={null}
      > 
      <h1 className="modal-header">Vui lòng đánh giá của hàng</h1>
      <div className="modal-rate">
        <Rate value={1}></Rate>
      </div> 
      <div className="modal-btn">
        <button
            className="modal-btn__cancel"
            onClick={(e) => setShowModalRating(false)}
        >
            Thoát
        </button>
        <button className="modal-btn__ok">Đánh giá</button>
      </div>
      </Modal>

        <Grid container spacing={2} className="grid-container">
          {listPosts.map((store) => (
              <div onClick={(e)=> setShowModalRating(true)}>
                <StoreItem store={store} onRowClick></StoreItem>
              </div>
          ))}
        </Grid>
      </Layout>
  );
};