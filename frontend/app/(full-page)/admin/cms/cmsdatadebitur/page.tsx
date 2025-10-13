import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import DataTableWithCRUD from '@/app/(full-page)/component/datatable/page';
import { ProgressSpinner } from 'primereact/progressspinner';

const TambahDataDebiturPanel = () => {
    const [refSektorEkonomi, setRefSektorEkonomi] = useState([]);
    const [refStatusUsaha, setRefStatusUsaha] = useState([]);
    const [refStatusTempatTinggal, setRefStatusTempatTinggal] = useState([]);
    const [refProfesiSampingan, setRefProfesiSampingan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [
                sektorEkonomiResponse,
                statusUsahaResponse,
                statusTempatTinggalResponse,
                profesiSampinganResponse
            ] = await Promise.all([
                axios.get(API_ENDPOINTS.GETSEKTOREKONOMI),
                axios.get(API_ENDPOINTS.GETSTATUSUSAHA),
                axios.get(API_ENDPOINTS.GETSTATUSTEMPATTINGGAL),
                axios.get(API_ENDPOINTS.GETPROFESISAMPAINGAN)
            ]);
            setRefSektorEkonomi(sektorEkonomiResponse.data);
            setRefStatusUsaha(statusUsahaResponse.data);
            setRefStatusTempatTinggal(statusTempatTinggalResponse.data);
            setRefProfesiSampingan(profesiSampinganResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengambil data', life: 3000 });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = async (endpoint: string, data: any, setterFunction: any, successMessage: string) => {
        try {
            await axios.post(endpoint, data);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error adding data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal menambahkan data', life: 3000 });
        }
    };

    const handleUpdate = async (endpoint: (id: string) => string, Kode: string, data: any, successMessage: string) => {
        try {
            await axios.put(endpoint(Kode), data);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error updating data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengupdate data', life: 3000 });
        }
    };

    const handleDelete = async (endpoint: (id: string) => string, Kode: string, successMessage: string) => {
        try {
            await axios.delete(endpoint(Kode));
            toast.current?.show({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
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
                <>
                    <DataTableWithCRUD
                        data={refSektorEkonomi}
                        columns={[
                            { field: 'Keterangan', header: 'Sektor Ekonomi' },
                        ]}
                        onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHSEKTORPEMOHON, { Keterangan }, setRefSektorEkonomi, 'Sektor Ekonomi berhasil ditambahkan')}
                        onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATESEKTORPERMOHON, Kode, { Keterangan }, 'Sektor Ekonomi berhasil diupdate')}
                        onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETESEKTORPERMOHON, Kode, 'Sektor Ekonomi berhasil dihapus')}  
                        idField="Kode"
                        nameField="Keterangan"
                        inputLabel="Sektor Ekonomi"
                    />
                    <DataTableWithCRUD
                        data={refStatusUsaha}
                        columns={[
                            { field: 'Keterangan', header: 'Status Usaha' },
                        ]}
                        onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHSTATUSUSAHA, { Keterangan }, setRefStatusUsaha, 'Status Usaha berhasil ditambahkan')}
                        onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATESTATUSUSAHA, Kode, { Keterangan }, 'Status Usaha berhasil diupdate')}
                        onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETESTATUSUSAHA, Kode, 'Status Usaha berhasil dihapus')}  
                        idField="Kode"
                        nameField="Keterangan"
                        inputLabel="Status Usaha"
                    />
                    <DataTableWithCRUD
                        data={refStatusTempatTinggal}
                        columns={[
                            { field: 'Keterangan', header: 'Status Tempat Tinggal' },
                        ]}
                        onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHSTATUSTEMPATTINGGAL, { Keterangan }, setRefStatusTempatTinggal, 'Status Tempat Tinggal berhasil ditambahkan')}
                        onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATESTATUSTEMPATTINGGAL, Kode, { Keterangan }, 'Status Tempat Tinggal berhasil diupdate')}
                        onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETESTATUSTEMPATTINGGAL, Kode, 'Status Tempat Tinggal berhasil dihapus')}  
                        idField="Kode"
                        nameField="Keterangan"
                        inputLabel="Status Tempat Tinggal"
                    />
                    <DataTableWithCRUD
                        data={refProfesiSampingan}
                        columns={[
                            { field: 'Keterangan', header: 'Profesi Sampingan' },
                        ]}
                        onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHPROFESISAMPAINGAN, { Keterangan }, setRefProfesiSampingan, 'Profesi Sampingan berhasil ditambahkan')}
                        onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATEPROFESISAMPAINGAN, Kode, { Keterangan }, 'Profesi Sampingan berhasil diupdate')}
                        onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETEPROFESISAMPAINGAN, Kode, 'Profesi Sampingan berhasil dihapus')}  
                        idField="Kode"
                        nameField="Keterangan"
                        inputLabel="Profesi Sampingan"
                    />
                </>
            )}
        </>
    );
};

export default TambahDataDebiturPanel;