import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import DataTableWithCRUD from '@/app/(full-page)/component/datatable/page';
import { ProgressSpinner } from 'primereact/progressspinner';

const TambahJaminanPanel = () => {
    const [refJenisAgunan, setRefJenisAgunan] = useState([]);
    const [refHakMilik, setRefHakMilik] = useState([]);
    const [refTipe, setRefTipe] = useState([]);
    const [refJenisPengikatan, setRefJenisPengikatan] = useState([]);
    const [refHubunganPemilik, setRefHubunganPemilik] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [
                agunanResponse,
                // hakMilikResponse,
                // tipeResponse,
                // pengikatanResponse,
                // hubunganPemilikResponse
            ] = await Promise.all([
                axios.get(API_ENDPOINTS.GETJENISAGUNAN),
                // axios.get(API_ENDPOINTS.GETHAKMILIK),
                // axios.get(API_ENDPOINTS.GETTIPE),
                // axios.get(API_ENDPOINTS.GETJENISPENGIKATAN),
                // axios.get(API_ENDPOINTS.GETHUBUNGANPEMILIK)
            ]);
            
            setRefJenisAgunan(agunanResponse.data);
            // setRefHakMilik(hakMilikResponse.data);
            // setRefTipe(tipeResponse.data);
            // setRefJenisPengikatan(pengikatanResponse.data);
            // setRefHubunganPemilik(hubunganPemilikResponse.data);
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
                        data={refJenisAgunan}
                        columns={[
                            { field: 'Keterangan', header: 'Jenis Agunan' }
                        ]}
                        onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHJENISAGUNAN, { Keterangan }, setRefJenisAgunan, 'Jenis Agunan berhasil ditambahkan')}
                        onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATEJENISAGUNANBYID, Kode, { Keterangan }, 'Jenis Agunan berhasil diupdate')}
                        onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETEJENISAGUNANBYID, Kode, 'Jenis Agunan berhasil dihapus')}
                        idField="Kode"
                        nameField="Keterangan"
                        inputLabel="Jenis Agunan"
                    />
                    {/* <DataTableWithCRUD
                        data={refHakMilik}
                        columns={[
                            { field: 'Keterangan', header: 'Hak Milik' }
                        ]}
                        onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHHAKMILIK, { Keterangan }, setRefHakMilik, 'Hak Milik berhasil ditambahkan')}
                        onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATEHAKMILIKBYID, Kode, { Keterangan }, 'Hak Milik berhasil diupdate')}
                        onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETEHAKMILIKBYID, Kode, 'Hak Milik berhasil dihapus')}
                        idField="Kode"
                        nameField="Keterangan"
                        inputLabel="Hak Milik"
                    />
                    <DataTableWithCRUD
                        data={refTipe}
                        columns={[
                            { field: 'Keterangan', header: 'Tipe' }
                        ]}
                        onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHTIPE, { Keterangan }, setRefTipe, 'Tipe berhasil ditambahkan')}
                        onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATETIPEBYID, Kode, { Keterangan }, 'Tipe berhasil diupdate')}
                        onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETETIPEBYID, Kode, 'Tipe berhasil dihapus')}
                        idField="Kode"
                        nameField="Keterangan"
                        inputLabel="Tipe"
                    />
                    <DataTableWithCRUD
                        data={refJenisPengikatan}
                        columns={[
                            { field: 'Keterangan', header: 'Jenis Pengikatan' }
                        ]}
                        onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHJENISPENGIKATAN, { Keterangan }, setRefJenisPengikatan, 'Jenis Pengikatan berhasil ditambahkan')}
                        onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATEJENISPENGIKATANBYID, Kode, { Keterangan }, 'Jenis Pengikatan berhasil diupdate')}
                        onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETEJENISPENGIKATANBYID, Kode, 'Jenis Pengikatan berhasil dihapus')}
                        idField="Kode"
                        nameField="Keterangan"
                        inputLabel="Jenis Pengikatan"
                    />
                    <DataTableWithCRUD
                        data={refHubunganPemilik}
                        columns={[
                            { field: 'Keterangan', header: 'Hubungan Pemilik' }
                        ]}
                        onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHHUBUNGANPEMILIK, { Keterangan }, setRefHubunganPemilik, 'Hubungan Pemilik berhasil ditambahkan')}
                        onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATEHUBUNGANPEMILIKBYID, Kode, { Keterangan }, 'Hubungan Pemilik berhasil diupdate')}
                        onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETEHUBUNGANPEMILIKBYID, Kode, 'Hubungan Pemilik berhasil dihapus')}
                        idField="Kode"
                        nameField="Keterangan"
                        inputLabel="Hubungan Pemilik"
                    /> */}
                </>
            )}
        </>
    );
};

export default TambahJaminanPanel;