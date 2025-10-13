'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import DataTableWithCRUD from '@/app/(full-page)/component/datatablelanding/page';
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
            const response = await axios.get(API_ENDPOINTS.GETSECTIONLanding);
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
            formData.append(`sections[${index}][section]`, section);
            formData.append(`sections[${index}][judul]`, judul);
            formData.append(`sections[${index}][deskripsi]`, deskripsi);
            formData.append(`sections[${index}][jumlah_siswa]`, item.jumlah_siswa);
            formData.append(`sections[${index}][jenis_kelamin]`, item.jenis_kelamin);

            if (item.image && item.image[0] instanceof File) {
                formData.append(`sections[${index}][Gambar]`, item.image[0]);
            }
        });

        try {
            setIsLoading(true);
            const response = await axios.post(API_ENDPOINTS.TAMBAHSECTIONLanding, formData, {
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

 const handleUpdate = async (
  id: string,
  section: string,
  judul: string,
  deskripsi: string,
  jumah_siswa: string,
  jenis_kelamin: string,
  Gambar: File | null
) => {
  try {
    setIsLoading(true);

    const formData = new FormData();

    // Kirim hanya jika tidak kosong (jangan kirim string kosong)
    if (section) formData.append('section', section);
    if (judul) formData.append('judul', judul);
    if (deskripsi) formData.append('deskripsi', deskripsi);
    if (jumah_siswa) formData.append('jumah_siswa', jumah_siswa);
    if (jenis_kelamin) formData.append('jenis_kelamin', jenis_kelamin);

    // Kirim gambar hanya jika File
    if (Gambar instanceof File) {
      formData.append('Gambar', Gambar);
    }

    // _method agar dikenali sebagai PUT
    formData.append('_method', 'PUT');
    console.log('Gambar:', Gambar);


    await axios.post(API_ENDPOINTS.UPDATESECTIONLanding(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    toast.current?.show({ severity: 'success', summary: 'Sukses', detail: 'Data berhasil diupdate', life: 3000 });
    fetchData(); // refresh
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
            await axios.delete(API_ENDPOINTS.DELETESECTIONLanding(id));
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
                        { field: 'section', header: 'Section' },
                        { field: 'judul', header: 'Judul' },
                        { field: 'deskripsi', header: 'Deskripsi' },
                        { field: 'jumlah_siswa', header: 'jumlah_siswa' },
                        { field: 'jenis_kelamin', header: 'jenis_kelamin' },
                        { field: 'Gambar', header: 'Gambar' },
                    ]}
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    nameField="section"
                    nameField2="judul"
                    nameField3="deskripsi"
                    nameField4="jumlah_siswa"
                    nameField5="jenis_kelamin"
                    nameField6="Gambar"
                    inputLabel="Section"
                    inputLabel2="Judul"
                    inputLabel3="Deskripsi"
                    inputLabel4="jumlah_siswa"
                    inputLabel5="jenis_kelamin"
                    inputLabel6="Gambar"
                />
            )}
        </>
    );
};

export default TambahSectionStory;
