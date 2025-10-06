"use client"
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react'
import SearchFilter from '../../component/search/page';

const Debiturpage = () => {
  const [data, setData] = useState([])
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCif = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.GETALLPEMOHON);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching CIF data:", error);
      }
    };
    fetchCif();
  }, []);

  const handleDelete = async (Cif: string) => {
    try {
      await axios.delete(API_ENDPOINTS.DELETEPEMOHONBYID(Cif));
      setData(data.filter((item: any) => item.Cif !== Cif));
      const response = await axios.get(API_ENDPOINTS.GETALLPEMOHON);
      setData(response.data);
    } catch (error) {
      console.error('Error deleting form pemohon:', error);
    }
  };

  const filteredData = data.filter((item: any) => {
    return item.Nama.toLowerCase().includes(searchTerm.toLowerCase()) || item.KTP.toLowerCase().includes(searchTerm.toLowerCase());
  });

  console.log(filteredData)
  return (
    <div>
      <div className="card ">
        <div className='flex justify-content-end'>
          <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Cari nama atau KTP..." />
        </div>
        <DataTable value={filteredData}
          paginator={true}
          rows={5}
          rowsPerPageOptions={[5, 10, 20]}
          className='cursor-pointer mt-3'
          rowClassName={() => `hover:bg-gray-100`}
          onRowClick={(e) => { router.push(`/pemohon/detail/${e.data.Cif}`); }}
          responsiveLayout="stack"
          breakpoint="960px">
          <Column field="Cif" header="CIF" className='text-blue-600' />
          <Column field="Nama" header="Nama Lengkap" />
          <Column field="Kelamin" header="Jenis Kelamin" body={(rowData) => rowData.Kelamin === 'P' ? 'Perempuan' : 'Laki-Laki'} />
          <Column field="KTP" header="No KTP" />
          <Column field="no_hp" header="No HP" />
          <Column field="Alamat" header="Alamat" />
          <Column field="nama_usaha" header="Nama Usaha" />
          <Column header="Pengajuan" body={(rowData) => (
            <Link href={`/admin/debitur/pengajuandebitur/${rowData.Cif}`} passHref>
              <Button icon="pi pi-eye"
                style={{
                  background: "#FFBB62",
                  color: '#000000',
                  transition: 'transform 0.3s ease-in-out'
                }}
                className='border-transparent hover:scale-110'
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </Link>
          )} />
        </DataTable>
        {/* <Dialog header={`Hapus Data ${selectedRow.Nama}`} 
          visible={visible} 
          style={{ width: '90vw', maxWidth: '500px' }}  // Menggunakan lebar relatif dengan batas maksimum
          onHide={() => { if (!visible) return; setVisible(false); }}>
          <label htmlFor="">Apakah anda yakin ingin menghapus data ini?</label>
          <div className='flex justify-content-end mt-3'>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text mr-2" />
            <Button label="Yes" icon="pi pi-check" autoFocus onClick={() => { handleDelete(selectedRow.Cif); setVisible(false); }} />
          </div>
        </Dialog> */}
      </div>
    </div>
  )
}

export default Debiturpage