import React from "react";
import { Routes, Route } from "react-router-dom";

import GuestRoute from "./guest-route"
import AuthenticatedRoute from "./authenticated-route"
import SignUp from "../pages/sign-up";
import SignIn from "../pages/sign-in";
import { Home } from "../pages/home";
import Profile from "../pages/profile";
import { Store } from "../pages/store";
import Accounts from "../pages/account-list";
import ApprovePost from "../pages/approve-post";

function AllRoutes() {
    return (
        <Routes>
            <Route element={<GuestRoute />}>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Route>
            <Route
                element={<AuthenticatedRoute/>}
            >
                <Route path="/" element={<Home />} />
                <Route path="/approve-post" element={<ApprovePost />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/rating-stores" element={<Store />} />
                <Route path="/stores-owner/:id" element={<Store />} />
                <Route path="/accounts" element={<Accounts />} />
            </Route>
        </Routes>
    );
}
export default AllRoutes;



