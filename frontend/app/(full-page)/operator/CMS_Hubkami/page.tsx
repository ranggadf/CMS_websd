'use client';
import React, { useRef } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
// Ubah nama import agar lebih jelas
import CMSHubungiKami from './Hubkami/page';

const EditHubungi = () => {
    const toast = useRef<Toast>(null);

    return (
        <div className="card">
            <h2 className="text-2xl font-bold mb-4">CMS Hubungi Kami</h2>
            {/* Perbaiki activeIndex menjadi 0 */}
            <TabView activeIndex={0}>
                <Toast ref={toast} />
                <TabPanel header="Hubungi kami ">
                    {/* Gunakan nama komponen yang benar */}
                    <CMSHubungiKami />
                </TabPanel>
            </TabView>
        </div>
    );
};

export default EditHubungi;
