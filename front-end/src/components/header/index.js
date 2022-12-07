import { Grid, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom'
import styles from "./style.module.scss";
import { Search } from "./search";
import clsx from "clsx";


export const Header = () => {
    const { user } = useAuth();
    const navigate = useNavigate()
    return (
        user.UserInfo &&
        <Grid container className={styles.PageHeading}>
            <Grid item width={"20%"}>
                <Typography className={styles.WebName}>Blog BDMT</Typography>
            </Grid>

            <Grid item width={"30%"} className={styles.Search}>
                <Search />
            </Grid>
            <Grid item width={"25%"} className={styles.IconNavbar}>
                <HomeIcon />
                <StoreRoundedIcon />
                <NotificationsActiveRoundedIcon />
            </Grid>
            <Grid
                item
                width={"25%"}
                className={clsx(styles.IconNavbar, styles.UserAccount)}
                style={{cursor: "pointer"}}
                onClick={() => navigate("/profile")}
            >
                <img alt="" className="me-3" style={{height: "40px", width: "40px", borderRadius: "50%"}} src={process.env.REACT_APP_API_URL + user.UserInfo.avatar} />
                <Typography className={styles.Text}>{user.name}</Typography>
            </Grid>
        </Grid>
    );
};
