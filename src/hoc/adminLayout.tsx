import React from "react";
import { Copyright, Header } from "../common/header";
import Sidebar from "../common/sidebar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Loader from "../common/loader";
import { getCookies } from "../common/util/cookies";
import { CDBModalHeader } from "cdbreact";
const adminLayout = (ChildComponent: any) => {

  const RenderHtml = () => {
    const anyState = useSelector((state: RootState) => state);
    const [loader, setLoader] = useState(false);
    var parseLoader = JSON.parse(getCookies("loader") == undefined ? false : getCookies("loader"));
    useEffect(() => {
      setLoader(parseLoader);
    }, [parseLoader])

    return (
      <div className="d-flex" id="wrapper">
        <Loader isLoadading={loader} />
        {/* <!-- Sidebar--> */}
        <Sidebar />
        {/* <!-- Page content wrapper--> */}
        <div style={{ width: "100%" }}>
          {/* <!-- Top navigation--> */}
          <Header />
          {/* <!-- Page content--> */}
          <div >
            <ChildComponent />
          </div>
        </div>
      </div>
    );
  };

  return RenderHtml;
};

export default adminLayout;
