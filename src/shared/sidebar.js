import React from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, Routes, Route } from 'react-router-dom';
import pages from '../Routes/pages';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const { dataArr } = useSelector((state) => state.pages);
    const navLinks = pages.filter(page => page.hidden !== true);
    return (
        <div
            style={{ display: 'flex', height:'auto' , overflow: 'scroll initial' }}
        >
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <NavLink
                        to="/Home"
                        className="text-decoration-none"
                        style={{ color: 'inherit' }}
                    >
                        Sidebar
                    </NavLink>
                </CDBSidebarHeader>

                <CDBSidebarContent >
                    <CDBSidebarMenu>
                        {
                            navLinks.map((nav, index) => (
                                <NavLink to={nav.path} key={index} >
                                    <CDBSidebarMenuItem icon={nav.icon}>{nav.title}</CDBSidebarMenuItem>
                                </NavLink>
                            ))
                        }
                    </CDBSidebarMenu>
                </CDBSidebarContent>
                <CDBSidebarFooter style={{ textAlign: 'center' }}> {/*style={{ textAlign: 'center' }} */}
                    <div
                        style={{
                            padding: '20px 5px',
                        }}
                    >
                        Sidebar Footer
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
};

export default Sidebar;