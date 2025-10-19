"use client";
import React, { useRef } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
import TambahGuru from './Guru/page'; // pastikan path-nya sesuai

const TambahanGuruCMS = () => {
    const toast = useRef<Toast>(null);

    return (
        <div className="card">
            <h2 className="text-2xl font-bold mb-4">CMS Data Guru</h2>
            <TabView activeIndex={0}>
                <Toast ref={toast} />

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