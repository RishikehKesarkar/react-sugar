import React from "react";
import { Header } from "../shared/header";
import Sidebar from "../shared/sidebar";
import { useState, useEffect } from "react";
import { CDBModalHeader } from "cdbreact";
import { Copyright } from "../shared/Copyright";
import Loader from "../shared/loader";

const adminLayout = (ChildComponent: any) => {

    const RenderHtml = () => {

        return (
            <div className="d-flex" id="wrapper">
                <Loader isLoading={false} />
                {/* <!-- Sidebar--> */}
                <Sidebar />
                {/* <!-- Page content wrapper--> */}
                <div style={{ width: "100%" }}>
                    {/* <!-- Top navigation--> */}
                    <Header />
                    {/* <!-- Page content--> */}
                    <div >
                        <ChildComponent />
                        <Copyright />
                    </div>
                </div>
            </div>
        );
    };

    return RenderHtml;
};

export default adminLayout;
