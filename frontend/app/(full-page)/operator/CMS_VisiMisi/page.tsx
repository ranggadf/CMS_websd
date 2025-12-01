'use client';
import React, { useState, useRef } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
// Import komponen logika utama
import CMSVisiMisi from './Visimisi/page';

const EditVisimisi = () => {
    // useRef untuk Toast
    const toast = useRef<Toast>(null);

    return (
        <div className="card">
            <h2 className="text-2xl font-bold mb-4">CMS Visi Misi</h2>
            <Toast ref={toast} />

            {/* Hapus TabView karena kita hanya fokus pada satu tampilan tabel/edit */}
            <div className="p-0">
                <h3 className="text-xl font-semibold mb-3">Kelola Data Visi & Misi</h3>
                {/* Mode 'tabel' akan menampilkan data dan memicu dialog Edit/Hapus */}
                <CMSVisiMisi toastRef={toast} mode="tabel" />
            </div>
        </div>
    );
};

export default EditVisimisi;
