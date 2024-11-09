import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <>
            <Header />
            <div className="flex">
                <div className="w-2/12 md:w-2/12">
                    Sidebar
                </div>
                <div className="w-10/12 md:w-10/12">
                    Content
                </div>
            </div>
            {/* Sidebar */}
            {/* Outlet - Might just be a component called "ContentScreen" with children passed down */}
            <Footer />
        </>
    );
};
export default MainLayout;
