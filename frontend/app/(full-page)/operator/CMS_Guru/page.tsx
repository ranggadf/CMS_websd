"use client";

import React, { useRef } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
import TambahGuru from './Guru/page'; // pastikan path-nya sesuai

const TambahanGuruCMS = () => {
    const toast = useRef<Toast>(null);
    const [activeIndex, setActiveIndex] = React.useState(0);

    return (
        <div className="card">
            <h2 className="text-2xl font-bold mb-4">CMS Guru dan Staff</h2>

            <Toast ref={toast} />

            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="Tambah Guru">
                    <TambahGuru />
                </TabPanel>

                {/* Kalau nanti mau tambah fitur lain */}
                {/* <TabPanel header="Daftar Guru">
                    <DaftarGuru />
                </TabPanel> */}
            </TabView>
        </div>
    );
};

export default TambahanGuruCMS;