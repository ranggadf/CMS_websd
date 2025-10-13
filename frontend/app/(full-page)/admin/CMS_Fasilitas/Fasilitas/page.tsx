'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import DataTableWithCRUD from '@/app/(full-page)/component/datablefasilitas/page';
import { ProgressSpinner } from 'primereact/progressspinner';

const TambahSectionStory = () => {
    const [storySections, setStorySections] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(API_ENDPOINTS.GETFasilitas);
            setStorySections(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengambil data', life: 3000 });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = async (section: string, judul: string, deskripsi: string, contentList: any[]) => {
        const formData = new FormData();

        contentList.forEach((item, index) => {
    
            formData.append(`sections[${index}][judul]`, judul);
            formData.append(`sections[${index}][deskripsi]`, deskripsi);
         

            if (item.image && item.image[0] instanceof File) {
                formData.append(`sections[${index}][Gambar]`, item.image[0]);
            }
        });

        try {
            setIsLoading(true);
            const response = await axios.post(API_ENDPOINTS.TAMBAHFasilitas, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.message) {
                toast.current?.show({ severity: 'success', summary: 'Sukses', detail: 'Data berhasil ditambahkan', life: 3000 });
            }
            fetchData();
        } catch (error) {
            console.error('Gagal menambah data:', error);
            toast.current?.show({ severity: 'error', summary: 'Gagal', detail: 'Gagal menambah data', life: 3000 });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (id: string, judul: string, deskripsi: string) => {
        try {
            setIsLoading(true);
            await axios.put(API_ENDPOINTS.UPDATEFasilitas(id), { judul, deskripsi });
            toast.current?.show({ severity: 'success', summary: 'Sukses', detail: 'Data berhasil diupdate', life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error updating data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal update data', life: 3000 });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            setIsLoading(true);
            await axios.delete(API_ENDPOINTS.DELETEFasilitas(id));
            toast.current?.show({ severity: 'success', summary: 'Sukses', detail: 'Data berhasil dihapus', life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal hapus data', life: 3000 });
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
                    data={storySections}
                    loading={isLoading}
                    singleInput={false}
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
                    inputLabel="judul"
                    inputLabel2="deskripsi"
                    inputLabel3="Gambar"
                    
                />
            )}
        </>
    );
};

export default TambahSectionStory;
