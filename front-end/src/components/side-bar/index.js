import * as React from "react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import styles from "./style.module.scss";
import clsx from "clsx";
import {
    ArrowDropDownRounded,
    ArrowDropUpRounded,
    TripOrigin,
} from "@mui/icons-material";
import { Collapse } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom'

export default function SideMenu(props) {
    const { setToken, setUser } = useAuth();
    const navigate = useNavigate()

    const menus = [
        {
            icon: <HomeIcon />,
            title: "Home",
            path: "/",
        },
        {
            icon: <PersonRoundedIcon />,
            title: "User",
            path: "/accounts",
        },
        {
            icon: <StoreIcon />,
            title: "Store",
            path: "/store",
        },
        {
            icon: <LogoutRoundedIcon />,
            title: "Logout",
            onClick: () => {
              setToken("null")
              setUser("null")
              navigate("/sign-in")
            },
        },
    ];
    const router = useLocation();
    const path = router.pathname;
    const [selected, setSelected] = useState(path.split("/")[1] || "");
    const handleClick = (title) => {
        title.toLowerCase() !== selected.toLowerCase()
            ? setSelected(title)
            : setSelected("");
    };

    return (
        <div className={styles.SideMenu}>
            <List className={styles.list} component="nav">
                {menus.map((item, index) => {
                    if (item.children && item.children.length) {
                        return (
                            <div key={item.title + index}>
                                <ListItem
                                    button
                                    onClick={() => handleClick(item.title)}
                                    className={styles.MenuItem}
                                >
                                    <ListItemIcon
                                        className={clsx(
                                            styles.ListItemIcon,
                                            path.includes(
                                                item.title.toLowerCase()
                                            ) && styles.active
                                        )}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.title}
                                        className={clsx(
                                            styles.Button,
                                            styles.ListText,
                                            path.includes(
                                                item.title.toLowerCase()
                                            ) && styles.active
                                        )}
                                    />
                                    <Box
                                        className={clsx(
                                            styles.ListIcon,
                                            path.includes(
                                                item.title.toLowerCase()
                                            ) && styles.active
                                        )}
                                    >
                                        {item.title.toLowerCase() ===
                                        selected.toLowerCase() ? (
                                            <ArrowDropUpRounded />
                                        ) : (
                                            <ArrowDropDownRounded />
                                        )}
                                    </Box>
                                </ListItem>
                                <Collapse
                                    in={
                                        item.title.toLowerCase() ===
                                        selected.toLowerCase()
                                    }
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    {item.children.map((sub, index) => (
                                        <ListItem
                                            className={styles.ListItemSub}
                                            key={index}
                                        >
                                            <NavLink
                                                to={sub.path}
                                                key={index}
                                                className={styles.linkSub}
                                            >
                                                <Box
                                                    className={styles.iconData}
                                                >
                                                    {path === sub.path && (
                                                        <TripOrigin />
                                                    )}
                                                </Box>
                                                <ListItemText
                                                    primary={sub.title}
                                                    className={clsx(
                                                        styles.listItemButton,
                                                        path === sub.path &&
                                                            styles.subActive
                                                    )}
                                                />
                                            </NavLink>
                                        </ListItem>
                                    ))}
                                </Collapse>
                            </div>
                        );
                    } else {
                        return (
                            <ListItem
                                key={item.title + index}
                                button
                                className={styles.MenuItem}
                                onClick={item.onClick}
                            >
                                <NavLink className={styles.link} to={item.path}>
                                    <ListItemIcon
                                        className={clsx(
                                            styles.ListItemIcon,
                                            path === item.path && styles.active
                                        )}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.title}
                                        className={clsx(
                                            styles.Button,
                                            styles.ListText,
                                            path === item.path && styles.active
                                        )}
                                    />
                                </NavLink>
                            </ListItem>
                        );
                    }
                })}
            </List>
        </div>
    );
}
