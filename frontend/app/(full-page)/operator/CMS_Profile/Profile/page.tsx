'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import DataTableHubungiKami from '@/app/(full-page)/component/datatablehubkami/page';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';

const CMSHubungiKami = () => {
    const [dataList, setDataList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(API_ENDPOINTS.GETHubungiKami);
            setDataList(res.data);
        } catch (err) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Gagal mengambil data Hubungi Kami',
            });
        } finally {
            setIsLoading(false);
        }
    };

    // === Tambah ===
    const handleAdd = async (judul: string, no_telp: string, email: string, alamat: string) => {
        try {
            setIsLoading(true);
            await axios.post(API_ENDPOINTS.TAMBAHHubungiKami, {
                judul,
                no_telp,
                email,
                alamat,
            });
            toast.current?.show({
                severity: 'success',
                summary: 'Sukses',
                detail: 'Data berhasil ditambahkan',
            });
            fetchData();
        } catch {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Gagal menambah data',
            });
        } finally {
            setIsLoading(false);
        }
    };

    // === Update ===
    const handleUpdate = async (id: string, judul: string, no_telp: string, email: string, alamat: string) => {
        try {
            setIsLoading(true);
            await axios.put(API_ENDPOINTS.UPDATEHubungiKami(id), {
                judul,
                no_telp,
                email,
                alamat,
            });
            toast.current?.show({
                severity: 'success',
                summary: 'Sukses',
                detail: 'Data berhasil diperbarui',
            });
            fetchData();
        } catch {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Gagal memperbarui data',
            });
        } finally {
            setIsLoading(false);
        }
    };

    // === Hapus ===
    const handleDelete = async (id: string) => {
        try {
            setIsLoading(true);
            await axios.delete(API_ENDPOINTS.DELETEHubungiKami(id));
            toast.current?.show({
                severity: 'success',
                summary: 'Sukses',
                detail: 'Data berhasil dihapus',
            });
            fetchData();
        } catch {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Gagal menghapus data',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Toast ref={toast} />
            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <ProgressSpinner style={{ width: '40px', height: '40px' }} />
                </div>
            ) : (
                <DataTableHubungiKami
                    data={dataList}
                    loading={isLoading}
                    columns={[
                        { field: 'judul', header: 'Judul' },
                        { field: 'no_telp', header: 'No. Telepon' },
                        { field: 'email', header: 'Email' },
                        { field: 'alamat', header: 'Alamat' },
                    ]}
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            )}
        </>
    );
};

export default CMSHubungiKami;
