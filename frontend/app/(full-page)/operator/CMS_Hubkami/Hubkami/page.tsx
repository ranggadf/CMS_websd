'use client';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import DataTableHubungiKami from '@/app/(full-page)/component/datatablehubkami/datablehubkami';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';

export default function CMSHubungiKami() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast>(null);

    // Kolom ID tetap ada untuk keperluan update, tetapi disembunyikan di DataTable
    const columns = [
        { field: 'id', header: 'ID' },
        { field: 'judul', header: 'Judul' },
        { field: 'no_telp', header: 'No. Telp' },
        { field: 'email', header: 'Email' },
        { field: 'alamat', header: 'Alamat' }
    ];

    const getData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(API_ENDPOINTS.GETHubungiKami);
            // Asumsi: API mengembalikan array, kita hanya perlu data pertama (atau seluruhnya jika API sudah tunggal)
            setData(res.data);
        } catch {
            toast.current?.show({ severity: 'error', summary: 'Gagal', detail: 'Gagal mengambil data!' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // Hapus: const handleAdd = ...

    const handleUpdate = async (id: string, form: any) => {
        try {
            await axios.put(API_ENDPOINTS.UPDATEHubungiKami(id), form);
            toast.current?.show({ severity: 'success', summary: 'Berhasil', detail: 'Data berhasil diperbarui!' });
            getData(); // Refresh data setelah update
        } catch {
            toast.current?.show({ severity: 'error', summary: 'Gagal', detail: 'Gagal memperbarui data!' });
        }
    };

    // Hapus: const handleDelete = ...

    return (
        <div className="p-5">
            <Toast ref={toast} />
            <h1 className="text-2xl font-bold mb-4">CMS Hubungi Kami</h1>
            <DataTableHubungiKami
                data={data}
                loading={loading}
                columns={columns}
                // Hanya kirim onUpdate
                onUpdate={handleUpdate}
            />
        </div>
    );
}
