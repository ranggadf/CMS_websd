"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import SearchFilter from '@/app/(full-page)/component/search/page';
import { Plus } from 'lucide-react';



const pemohon = () => {
  const [allpemohon, setAllPemohon] = useState([]);
  // const [activeIndex, setActiveIndex] = useState(0);
  // const [visible, setVisible] = useState(false);
  // const [visibleadd, setVisibleadd] = useState(false);
  const [Isloading, setIsLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  //   // //form produk
  //   // produk: '', bidang_usaha: '', nomor_aplikasi: '', tanggal_aplikasi: '', tanggal_permohonan: '', plafon_kredit: '', suku_bunga: '', jangka_waktu: '', sifat_kredit: '', jenis_permohonan: '', jenis_angsuran: '', no_aplikasi_sebelumnya: '', tujuan_penggunaan: '', detail_tujuan_penggunaan: '',
  //   //form data pemohon
  //   cif: '', TempatLahir: '', Kelamin: '', StatusPerkawinan: '', KTP: '', profesi_sampingan: '', Nama: '', TglLahir: '', nama_ibu_kandung: '', jumlah_tanggungan: '', ktp_berlaku: '', no_hp: '',
  //   //form alamat pemohon
  //   Alamat: '', kode_pos: '', provinsi: '', kecamatan: '', telepon: '', status_tempat_tinggal: '', kota: '', kelurahan: '', fax: '', lama_tinggal: '',
  //   //form data usaha
  //   nama_usaha: '', tanggal_mulai_usaha: '', status_tempat_usaha: '', surat_keterangan_usaha: '', sektor_ekonomi: '', jumlah_karyawan: '', jarak_lokasi_usaha: '', masa_laku: '', alamat_usaha: '', kode_pos_usaha: '', provinsi_usaha: '', kecamatan_usaha: '', kota_usaha: '', kelurahan_usaha: ''
  // });
  // const resetForm = () => {
  //   setFormData({
  //     // //form produk
  //     // produk: '', bidang_usaha: '', nomor_aplikasi: '', tanggal_aplikasi: '', tanggal_permohonan: '', plafon_kredit: '', suku_bunga: '', jangka_waktu: '', sifat_kredit: '', jenis_permohonan: '', jenis_angsuran: '', no_aplikasi_sebelumnya: '', tujuan_penggunaan: '', detail_tujuan_penggunaan: '',
  //     //form data pemohon
  //     cif: '', TempatLahir: '', Kelamin: '', StatusPerkawinan: '', KTP: '', profesi_sampingan: '', Nama: '', TglLahir: '', nama_ibu_kandung: '', jumlah_tanggungan: '', ktp_berlaku: '', no_hp: '',
  //     //form alamat pemohon
  //     Alamat: '', kode_pos: '', provinsi: '', kecamatan: '', telepon: '', status_tempat_tinggal: '', kota: '', kelurahan: '', fax: '', lama_tinggal: '',
  //     //form data usaha
  //     nama_usaha: '', tanggal_mulai_usaha: '', status_tempat_usaha: '', surat_keterangan_usaha: '', sektor_ekonomi: '', jumlah_karyawan: '', jarak_lokasi_usaha: '', masa_laku: '', alamat_usaha: '', kode_pos_usaha: '', provinsi_usaha: '', kecamatan_usaha: '', kota_usaha: '', kelurahan_usaha: ''
  //   });
  // };

  // useEffect(() => {
  //   const fetchNasabah = async () => {
  //     try {
  //       const response = await axios.get(API_ENDPOINTS.GETNASABAH);
  //       setPemohon(response.data);
  //     } catch (error) {
  //       console.error('There was an error fetching the users!', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchNasabah();
  // }, []);

  //get semua data pemohon
  useEffect(() => {
    const fetchPemohonAll = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.GETALLPEMOHON);
        setAllPemohon(response.data)
      } catch (error) {
        console.error('There was an error fetching the users!', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPemohonAll();
  }, []);
  const handleDelete = async (Cif: string) => {
    try {
      await axios.delete(API_ENDPOINTS.DELETEPEMOHONBYID(Cif));
      setAllPemohon(allpemohon.filter((item: any) => item.Cif !== Cif));
      const response = await axios.get(API_ENDPOINTS.GETALLPEMOHON);
      setAllPemohon(response.data);

    } catch (error) {
      console.error('Error deleting form pemohon:', error);
    }
  };
  const filteredData = allpemohon.filter((item: any) => {
    return item.Nama.toLowerCase().includes(searchTerm.toLowerCase()) || item.KTP.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <div>
      <div className="card">
        <h2 className='text-2xl font-bold mb-4'>Data Pemohon</h2>
        <div className='flex align-items-center justify-content-end mb-2 '>
          <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Cari nama atau KTP..."/>
          <Link href={'/pemohon/formpemohon'} passHref style={{transition: 'transform 0.3s ease-in-out'}} className='ml-2 p-2 bg-blue-200 border-round hover:scale-110 ' onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <Plus size={20} style={{ color: '#333' }} />
          </Link>
        </div>
        <DataTable value={filteredData} tableStyle={{ minWidth: '50rem' }}
          paginator rows={5} rowsPerPageOptions={[5, 10, 20]}
          className='cursor-pointer mt-3'
          rowClassName={() => `hover:bg-gray-100`}
          onRowClick={(e) => { router.push(`/pemohon/detail/${e.data.Cif}`); }}>
          <Column field="id" header="ID" />
          <Column field="Cif" header="CIF" />
          <Column field="Nama" header="Nama Lengkap" />
          <Column field="Kelamin" header="Jenis Kelamin" body={(rowData) => rowData.Kelamin === 'L' ? 'Laki-laki' : 'Perempuan'} />
          <Column field="StatusPerkawinan" header="Status Perkawinan" />
          <Column field="KTP" header="No KTP" />
          <Column field="no_hp" header="No HP" />
          <Column field="Alamat" header="Alamat" />
          <Column field="nama_usaha" header="Nama Usaha" />
          <Column header="Edit" body={(rowData) => (
            <Link href={`/pemohon/formpemohon/${rowData.Cif}`} passHref>
              <Button icon="pi pi-pencil" style={{color: '#000000', transition: 'transform 0.3s ease-in-out' }} className='bg-blue-200 border-transparent hover:scale-110 ' onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}/>
            </Link>
          )} />
          <Column header="Delete" body={(rowData) => (
            <div className='flex justify-content-center'>
              <Button icon="pi pi-trash" style={{color: '#000000', transition: 'transform 0.3s ease-in-out' }} className='bg-red-200 border-transparent hover:scale-110 ' onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={() => {
                setSelectedRow(rowData);
                setVisible(true);
              }} />
            </div>
          )} />
        </DataTable>
        <Dialog header={`Hapus Data ${selectedRow.Nama}`} visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
          <label htmlFor="">Apakah anda yakin ingin menghapus data ini?</label>
          <div className='flex justify-content-end mt-3'>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" autoFocus onClick={() => { handleDelete(selectedRow.Cif); setVisible(false); }} />
          </div>
        </Dialog>
      </div>
    </div>
  )
}

export default pemohon