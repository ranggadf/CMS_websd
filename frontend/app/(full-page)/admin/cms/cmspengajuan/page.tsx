import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import DataTableWithCRUD from '@/app/(full-page)/component/datatable/page';
import { ProgressSpinner } from 'primereact/progressspinner';

const TambahPengajuanPanel = () => {
    const [refBidangUsaha, setRefBidangUsaha] = useState([]);
    const [refSifatKredit, setRefSifatKredit] = useState([]);
    const [refJenisAngsuran, setRefJenisAngsuran] = useState([]);
    const [refJenisPermohonan, setRefJenisPermohonan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [
                bidangUsahaResponse,
                sifatKreditResponse,
                jenisAngsuranResponse,
                jenisPermohonanResponse
            ] = await Promise.all([
                axios.get(API_ENDPOINTS.GETBIDANGUSAHA),
                axios.get(API_ENDPOINTS.GETSIFATKREDIT),
                axios.get(API_ENDPOINTS.GETJENISANGURAN),
                axios.get(API_ENDPOINTS.GETJENISPERMOHONAN)
            ]);
            setRefBidangUsaha(bidangUsahaResponse.data);
            setRefSifatKredit(sifatKreditResponse.data);
            setRefJenisAngsuran(jenisAngsuranResponse.data);
            setRefJenisPermohonan(jenisPermohonanResponse.data);
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
                        data={refBidangUsaha}
                        columns={[
                            { field: 'Keterangan', header: 'Bidang Usaha' },
                        ]}
                        onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHBIDANGUSAHA, { Keterangan }, setRefBidangUsaha, 'Bidang Usaha berhasil ditambahkan')}
                        onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATEBIDANGUSAHA, Kode, { Keterangan }, 'Bidang Usaha berhasil diupdate')}
                        onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETEBIDANGUSAHA, Kode, 'Bidang Usaha berhasil dihapus')}
                        idField="Kode"
                        nameField="Keterangan"
                        inputLabel="Bidang Usaha"
                    />
                    <DataTableWithCRUD
                        data={refSifatKredit}
                        columns={[
                            { field: 'Keterangan', header: 'Sifat Kredit' },
                        ]}
                        onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHSIFATKREDIT, { Keterangan }, setRefSifatKredit, 'Sifat Kredit berhasil ditambahkan')}
                        onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATESIFATKREDIT, Kode, { Keterangan }, 'Sifat Kredit berhasil diupdate')}
                        onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETESIFATKREDIT, Kode, 'Sifat Kredit berhasil dihapus')}
                        idField="Kode"
                        nameField="Keterangan"
                        inputLabel="Sifat Kredit"
                    />
                    <DataTableWithCRUD
                        data={refJenisAngsuran}
                        columns={[
                            { field: 'Keterangan', header: 'Jenis Angsuran' },
                        ]}
                        onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHJENISANGURAN, { Keterangan }, setRefJenisAngsuran, 'Jenis Angsuran berhasil ditambahkan')}
                        onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATEJENISANGURAN, Kode, { Keterangan }, 'Jenis Angsuran berhasil diupdate')}
                        onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETEJENISANGURAN, Kode, 'Jenis Angsuran berhasil dihapus')}
                        idField="Kode"
                        nameField="Keterangan"
                        inputLabel="Jenis Angsuran"
                    />
                    <DataTableWithCRUD
                        data={refJenisPermohonan}
                        columns={[
                            { field: 'Keterangan', header: 'Jenis Permohonan' },
                        ]}
                        onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHJENISPERMOHONAN, { Keterangan }, setRefJenisPermohonan, 'Jenis Permohonan berhasil ditambahkan')}
                        onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATEJENISPERMOHONAN, Kode, { Keterangan }, 'Jenis Permohonan berhasil diupdate')}
                        onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETEJENISPERMOHONAN, Kode, 'Jenis Permohonan berhasil dihapus')}
                        idField="Kode"
                        nameField="Keterangan"
                        inputLabel="Jenis Permohonan"
                    />
                </>
            )}
        </>
    );
};

export default TambahPengajuanPanel;