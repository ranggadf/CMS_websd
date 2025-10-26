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
            formData.append(`sections[${index}][jml_siswa_laki]`, item.jml_siswa_laki);
            formData.append(`sections[${index}][jml_siswa_perempuan]`, item.jml_siswa_perempuan);
            formData.append(`sections[${index}][nama]`, item.nama);
             formData.append(`sections[${index}][total_siswa]`, item.total_siswa);

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
  jml_siswa_laki: string,
  jml_siswa_perempuan: string,
  Gambar: File | null,
   nama: string,
   total_siswa: string
) => {
  try {
    setIsLoading(true);

    const formData = new FormData();

    // Kirim hanya jika tidak kosong (jangan kirim string kosong)
    if (section) formData.append('section', section);
    if (judul) formData.append('judul', judul);
    if (deskripsi) formData.append('deskripsi', deskripsi);
    if (jml_siswa_laki) formData.append('jml_siswa_laki', jml_siswa_laki);
    if (jml_siswa_perempuan) formData.append('jml_siswa_perempuan', jml_siswa_perempuan);
    if (nama) formData.append('nama', nama);
    if (total_siswa) formData.append('total_siswa', total_siswa);

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
                        { field: 'jml_siswa_laki', header: 'jml_siswa_laki' },
                        { field: 'jml_siswa_perempuan', header: 'jml_siswa_perempuan' },
                        { field: 'Gambar', header: 'Gambar' },
                        { field: 'nama', header: 'nama' },
                        { field: 'total_siswa', header: 'total_siswa' },
                    ]}
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    nameField="section"
                    nameField2="judul"
                    nameField3="deskripsi"
                    nameField4="jml_siswa_laki"
                    nameField5="jml_siswa_perempuan"
                    nameField6="Gambar"
                        nameField7="nama"
                        nameField8="total_siswa"
                    inputLabel="Section"
                    inputLabel2="Judul"
                    inputLabel3="Deskripsi"
                    inputLabel4="jml_siswa_laki"
                    inputLabel5="jml_siswa_perempuan"
                    inputLabel6="Gambar"
                       inputLabel7="nama"
                       inputLabel8="total_siswa"
                />
            )}
        </>
    );
};

export default TambahSectionStory;
