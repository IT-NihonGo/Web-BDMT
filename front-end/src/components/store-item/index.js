import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Avatar, Card, CardHeader, CardMedia, Typography } from "@mui/material";
import { Rate } from "antd";
import styles from "./store-item.module.scss";

const StoreItem = (props) => {

    return (
        <Card className={styles.CardContainer}>
            <CardHeader
                avatar={
                    <Avatar src="https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"></Avatar>
                }
                title="fdsdsfsdf"
                className={styles.CardHeader}
            ></CardHeader>
            <div className={props.Address}>
                <LocationOnIcon />
                <Typography>{props.store.address}</Typography>
            </div>
            <CardMedia
                component="img"
                alt="Paella dish"
                image="https://vcdn1-giadinh.vnecdn.net/2021/01/15/bun-1-5687-1610696220.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=0B792FtGSMdB5rk6BhnWqg"
            ></CardMedia>
            <Rate value={props.store.rateAmount}></Rate>
        </Card>
    );
};
export default StoreItem;