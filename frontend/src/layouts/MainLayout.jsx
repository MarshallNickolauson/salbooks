import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <>
            <Header />
            {/* Sidebar */}
            {/* Outlet - Might just be a component called "ContentScreen" with children passed down */}
            <Footer />
        </>
    );
};
export default MainLayout;
