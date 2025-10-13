'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import DataTableWithCRUD from '@/app/(full-page)/component/datablefasilitas/page';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';

const FasilitasPage = () => {
    const [fasilitas, setFasilitas] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        fetchData();
    }, []);

    // 🔹 Ambil data fasilitas
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(API_ENDPOINTS.GETFasilitas);
            setFasilitas(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengambil data', life: 3000 });
        } finally {
            setIsLoading(false);
        }
    };

    // 🔹 Tambah data
    const handleAdd = async (judul: string, deskripsi: string, gambar: File | null) => {
        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append('judul', judul);
            formData.append('deskripsi', deskripsi);
            if (gambar instanceof File) {
                formData.append('Gambar', gambar);
            }

            const res = await axios.post(API_ENDPOINTS.TAMBAHFasilitas, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.message) {
                toast.current?.show({ severity: 'success', summary: 'Sukses', detail: 'Fasilitas berhasil ditambahkan', life: 3000 });
                fetchData();
            }
        } catch (error) {
            console.error('Gagal menambah data:', error);
            toast.current?.show({ severity: 'error', summary: 'Gagal', detail: 'Gagal menambah fasilitas', life: 3000 });
        } finally {
            setIsLoading(false);
        }
    };

    // 🔹 Update data
    const handleUpdate = async (id: string, judul: string, deskripsi: string, gambar: File | null) => {
        try {
            setIsLoading(true);

            const formData = new FormData();
            if (judul) formData.append('judul', judul);
            if (deskripsi) formData.append('deskripsi', deskripsi);
            if (gambar instanceof File) formData.append('gambar', gambar);
            formData.append('_method', 'PUT');

            await axios.post(API_ENDPOINTS.UPDATEFasilitas(id), formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast.current?.show({ severity: 'success', summary: 'Sukses', detail: 'Fasilitas berhasil diupdate', life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error updating data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal update fasilitas', life: 3000 });
        } finally {
            setIsLoading(false);
        }
    };

    // 🔹 Hapus data
    const handleDelete = async (id: string) => {
        try {
            setIsLoading(true);
            await axios.delete(API_ENDPOINTS.DELETEFasilitas(id));
            toast.current?.show({ severity: 'success', summary: 'Sukses', detail: 'Fasilitas berhasil dihapus', life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal hapus fasilitas', life: 3000 });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Toast ref={toast} />
            {isLoading ? (
                <div className="flex justify-content-center align-items-center h-40">
                    <ProgressSpinner style={{ width: '40px', height: '40px' }} strokeWidth="6" />
                </div>
            ) : (
                <DataTableWithCRUD
                    data={fasilitas}
                    loading={isLoading}
                    columns={[
                        { field: 'judul', header: 'Judul' },
                        { field: 'deskripsi', header: 'Deskripsi' },
                        { field: 'Gambar', header: 'Gambar' },
                    ]}
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    nameField="judul"
                    nameField2="deskripsi"
                    nameField3="Gambar"
                    inputLabel="Judul"
                    inputLabel2="Deskripsi"
                    inputLabel3="Gambar"
                />
            )}
        </>
    );
};

export default FasilitasPage;
