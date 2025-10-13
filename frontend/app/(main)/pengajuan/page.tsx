"use client"
import SearchFilter from '@/app/(full-page)/component/search/page';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import axios from 'axios';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState } from 'react'

const produk = () => {
    const [allproduk, setAllProduk] = useState([]);
    const [selectedRow, setSelectedRow] = useState<any>({});
    const [visible, setVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    };
    useEffect(() => {
        const fetchAllProduk = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.GETALLPRODUK);
                const formattedData = response.data.map((item: any) => ({
                    ...item,
                    tanggal_aplikasi: formatDate(item.tanggal_aplikasi),
                    tanggal_permohonan: formatDate(item.tanggal_permohonan)
                }));
                setAllProduk(formattedData);
            } catch (error) {
                console.error('There was an error fetching the users!', error);
            } finally {
                // setIsLoading(false);
            }
        };
        fetchAllProduk();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(API_ENDPOINTS.DELETEPRODUKBYID(id));
            setAllProduk(allproduk.filter((item: any) => item.id !== id));
            const response = await axios.get(API_ENDPOINTS.GETALLPRODUK);
            setAllProduk(response.data);
        } catch (error) {
            console.error('Error deleting form pengajuan:', error);
        }
    };
    const handleUpdateStatus = async (status: number, no_pengajuan: string) => {
        try {
            await axios.put(API_ENDPOINTS.UPDATESTATUSPENGAJUANBYID(no_pengajuan), { status: status });
            const response = await axios.get(API_ENDPOINTS.GETALLPRODUK);
            setAllProduk(response.data);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const statusTemplate = (rowData: any) => {
        switch (rowData.status) {
            case 0:
                return <Button label='Ajukan' style={{ background: '#FDEBC5', color: '#000000', transition: 'transform 0.3s ease-in-out' }} className='p-2 border-round border-none hover:scale-110' onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={() => { handleUpdateStatus(1, rowData.no_pengajuan); }} />;
            case 1:
                return <span className='p-1 bg-green-200 border-round'>Diajukan</span>;
            case 2:
                return <span className='p-1 bg-blue-200 border-round'>Disetujui</span>;
            case 3:
                return <span className='p-1 bg-red-200 border-round'>Ditolak</span>;
            default:
                return <span className='p-1 bg-gray-200 border-round'>Tidak Diketahui</span>;
        }
    };

    const editTemplate = (rowData: any) => {
        if (rowData.status === 0) {
            return (
                <Link href={`/pengajuan/formpengajuan/${rowData.no_pengajuan}`} passHref>
                    <Button icon="pi pi-pencil" style={{ color: '#000000', transition: 'transform 0.3s ease-in-out' }} className='bg-blue-200 border-transparent hover:scale-110 ' onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
                </Link>
            );
        }
        return null;
    };

    
    const deleteTemplate = (rowData: any) => {
        if (rowData.status === 0) {
            return (
                <div className='flex justify-content-center'>
                    <Button icon="pi pi-trash" style={{ color: '#000000', transition: 'transform 0.3s ease-in-out' }} className='bg-red-200 border-transparent hover:scale-110 ' onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={() => {
                        setSelectedRow(rowData);
                        setVisible(true);
                    }} />
                    <Dialog header={`Hapus Data ${selectedRow.NomorRekening}`} visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                        <label htmlFor="">Apakah anda yakin ingin menghapus data ini?</label>
                        <div className='flex justify-content-end mt-3'>
                            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
                            <Button label="Yes" icon="pi pi-check" autoFocus onClick={() => { handleDelete(selectedRow.NomorRekening); setVisible(false); }} />
                        </div>
                    </Dialog>
                </div>
            );
        }
        return null;
    };

    const filteredData = allproduk.filter((item: any) => {
        return item.no_pengajuan.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div>
            <div className="card">
                <h2 className='text-2xl font-bold mb-4'>Data Pengajuan</h2>
                <div className='flex align-items-center justify-content-end mb-2'>
                    <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Cari no pengajuan..." />
                    <Link href={'/pengajuan/formpengajuan'} passHref style={{ transition: 'transform 0.3s ease-in-out' }} className='ml-2 p-2 bg-blue-200 border-round hover:scale-110 ' onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        <Plus size={20} style={{ color: '#333' }} />
                    </Link>
                </div>
                <DataTable value={filteredData} tableStyle={{ minWidth: '30rem' }}
                    paginator rows={5} rowsPerPageOptions={[5, 10, 20]}
                    className='cursor-pointer'
                    rowClassName={() => `hover:bg-gray-100`}
                    onRowClick={(e) => { router.push(`/pemohon/detail/${e.data.Cif}/analisakredit/${e.data.no_pengajuan}`); }}
                    >
                    <Column field="no_pengajuan" header="No Pengajuan" className='text-blue-600'/>
                    <Column field="Cif" header="CIF"/>
                    <Column field="pengajuan" header="Pengajuan" />
                    <Column field="ref_bidang_usaha.Keterangan" header="Bidang Usaha" />
                    <Column field="ref_sifat_kredit.Keterangan" header="Sifat Kredit" />
                    <Column field="ref_jenis_permohonan.Keterangan" header="Jenis Permohonan" />
                    <Column field="ref_jenis_angsuran.Keterangan" header="Jenis Angsuran" />
                    <Column field="status" header="Status Pengajuan" body={statusTemplate} />
                    <Column field="tujuan_penggunaan" header="Tujuan Penggunaan" />
                    {/* <Column field="detail_tujuan_penggunaan" header="Detail Tujuan Penggunaan" /> */}
                    {/* {allproduk.some((row: any) => row.status === 0) && (
                        <Column header="Edit" body={editTemplate} />
                    )} */}
                    {allproduk.some((row: any) => row.status === 0) && (
                        <Column header="Hapus" body={deleteTemplate} />
                    )}
                </DataTable>
            </div>
        </div>
    )
}

export default produk