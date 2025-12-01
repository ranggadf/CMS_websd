'use client';
import React, { useEffect, useState, useRef, MutableRefObject } from 'react';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import DataTableVisiMisi from '@/app/(full-page)/component/datatablevisimisi/datablevisimisi';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';

interface VisiMisi {
    id: string;
    visi: string;
    misi: string; // String dipisahkan koma
}

interface CMSVisiMisiProps {
    toastRef: MutableRefObject<Toast | null>;
    mode: 'tabel'; // Mode disederhanakan hanya 'tabel'
}

export default function CMSVisiMisi({ toastRef }: CMSVisiMisiProps) {
    const [data, setData] = useState<VisiMisi[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const toast = toastRef;

    const columns = [
        { field: 'id', header: 'ID' },
        { field: 'visi', header: 'Visi' },
        { field: 'misi', header: 'Misi' }
    ];

    const getData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_ENDPOINTS.GETVisiMisi);
            // Asumsi API mengembalikan array, tapi kita hanya peduli dengan data pertama
            setData(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Gagal',
                detail: 'Gagal mengambil data!',
                life: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // NOTE: Fungsi handleAddData DIHAPUS karena kita hanya mengizinkan EDIT/UPDATE pada data tunggal.
    // Jika data belum ada (array kosong), pengguna harus mengklik tombol "Edit" pada placeholder atau
    // tombol "Tambah Data" (yang sebenarnya memicu update) di DataTable.

    const handleAddOrUpdateData = async (id: string | null, visiText: string, misiList: string[]) => {
        const payload = {
            visi: visiText,
            misi: misiList.join(', ')
        };

        try {
            if (id) {
                // UPDATE: Jika ID ada, panggil PUT
                await axios.put(API_ENDPOINTS.UPDATEVisiMisi(id), payload);
            } else {
                // TAMBAH: Jika ID tidak ada, panggil POST untuk membuat data pertama
                await axios.post(API_ENDPOINTS.TAMBAHVisiMisi, payload);
            }

            toast.current?.show({
                severity: 'success',
                summary: 'Berhasil',
                detail: `Data berhasil di${id ? 'perbarui' : 'tambahkan'}!`,
                life: 3000
            });
            getData();
        } catch {
            toast.current?.show({
                severity: 'error',
                summary: 'Gagal',
                detail: `Gagal men${id ? 'g' : ''}${id ? 'perbarui' : 'ambahkan'} data!`,
                life: 3000
            });
        }
    };

    const handleDeleteData = async (id: string) => {
        try {
            await axios.delete(API_ENDPOINTS.DELETEVisiMisi(id));
            toast.current?.show({
                severity: 'success',
                summary: 'Berhasil',
                detail: 'Data berhasil dihapus!',
                life: 3000
            });
            getData();
        } catch {
            toast.current?.show({
                severity: 'error',
                summary: 'Gagal',
                detail: 'Gagal menghapus data!',
                life: 3000
            });
        }
    };

    return (
        <div className="p-0">
            <DataTableVisiMisi
                data={data}
                loading={loading}
                columns={columns}
                // Mengganti onAdd dan onUpdate menjadi satu handler Update
                onUpdate={handleAddOrUpdateData}
                onDelete={handleDeleteData}
                // Prop ini tidak digunakan lagi, tapi kita pertahankan agar DataTableVisiMisi tetap bekerja
                showOnlyAdd={false}
                toastRef={toast}
            />
        </div>
    );
}
