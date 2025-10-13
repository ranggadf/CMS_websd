import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import DataTableWithCRUD from '@/app/(full-page)/component/datatable/page';
import { ProgressSpinner } from 'primereact/progressspinner';

const TambahNavbar = () => {
    const [Navbar, setNavbar] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const navbarResponse = await axios.get(API_ENDPOINTS.GETNAVBAR);
            console.log("Data dari server:", navbarResponse.data);
            setNavbar(navbarResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengambil data', life: 3000 });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = async (label: string, path_to: string) => {
        try {
            console.log("Mengirim data:", { label, path_to});
            await axios.post(API_ENDPOINTS.TAMBAHNAVBAR, { label, path_to });
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Navbar berhasil ditambahkan', life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error adding data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal menambahkan data', life: 3000 });
        }
    };

    const handleUpdate = async (Kode: string, label: string, path_to: string) => {
        try {
            console.log("Mengedit data:", { Kode, label, path_to });
            await axios.put(API_ENDPOINTS.UPDATENAVBAR(Kode), { label, path_to });
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Navbar berhasil diupdate', life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error updating data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengupdate data', life: 3000 });
        }
    };

    const handleDelete = async (Kode: string) => {
        try {
            await axios.delete(API_ENDPOINTS.DELETENAVBAR(Kode));
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Navbar berhasil dihapus', life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal menghapus data', life: 3000 });
        }
    };

    return (
        <>
            <Toast ref={toast} />
            {isLoading ? (
                <div className="flex justify-content-center align-items-center">
                    <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="7" fill="var(--surface-ground)" animationDuration=".5s" />
                </div>
            ) : (
                <DataTableWithCRUD
                    data={Navbar}
                    loading={isLoading}
                    singleInput={false} // set false jika btuh 2 input
                    imageInput={true}
                    columns={[
                        { field: 'label', header: 'Navbar' },
                        { field: 'path_to', header: 'Path' }
                    ]}
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    nameField="label"
                    nameField2="path_to"
                    inputLabel="Navbar"
                    inputLabel2="Path"
                />
            )}
        </>
    );
};

export default TambahNavbar;