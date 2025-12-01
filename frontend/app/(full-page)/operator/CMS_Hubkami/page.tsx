// EditHubungi.tsx
'use client';
import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import CMSHubungiKami from './Hubkami/page';

const EditHubungi = () => {
    const toast = useRef<Toast>(null);

    return (
        <div className="card">
            {/* HAPUS JUDUL INI: <h2 className="text-2xl font-bold mb-4">CMS Hubungi Kami</h2> */}

            <Toast ref={toast} />

            {/* Masukkan komponen CMSHubungiKami */}
            <CMSHubungiKami />
        </div>
    );
};

export default EditHubungi;
