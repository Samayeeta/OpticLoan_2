import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
            <Header />
            <main className="flex-1 pt-32 pb-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
