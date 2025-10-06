'use client'
import { API_ENDPOINTS } from '@/app/api/losbackend/api'
import axios from 'axios'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import { ProgressSpinner } from 'primereact/progressspinner'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import React, { useEffect, useState } from 'react'

const PengajuanApprovel = () => {
    const [allproduk, setAllproduk] = useState([]);
    const [loading, setLoading] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [tempStatusChange, setTempStatusChange] = useState(null);
    const [tempRowData, setTempRowData] = useState<any>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmError, setConfirmError] = useState('');

    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        const fetchAllProduk = async () => {
            setLoading(true);
            try {
                const response = await axios.get(API_ENDPOINTS.GETALLPRODUK);
                const formattedData = response.data.map((item: any) => ({
                    ...item,
                    tanggal_aplikasi: formatDate(item.tanggal_aplikasi),
                    tanggal_permohonan: formatDate(item.tanggal_permohonan)
                }));
                setAllproduk(formattedData);
            } catch (error) {
                console.error('There was an error fetching the users!', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllProduk();
    }, []);

    const statusTemplate = (rowData: any) => {
        const statusOptions = [
            { label: 'Belum Diajukan', value: 0, className: 'p-1 bg-yellow-200 border-round border-none', style: { background: '#FDEBC5', color: '#000000' } },
            { label: 'Diajukan', value: 1, className: 'p-1 bg-green-200 border-round border-none', style: { background: '#CDFDC5', color: '#000000' } },
            { label: 'Disetujui', value: 2, className: 'p-1 bg-blue-200 border-round border-none', style: { background: '#C5E9FD', color: '#000000' } },
            { label: 'Ditolak', value: 3, className: 'p-1 bg-red-200 border-round border-none', style: { background: '#FFC8D4', color: '#000000' } },
            { label: 'Tidak Diketahui', value: 4, className: 'p-1 bg-gray-200 border-round border-none', style: { background: '#D9D9D9', color: '#000000' } }
        ];

        const handleChange = async (e: any) => {
            e.stopPropagation();
            setTempStatusChange(e.target.value);
            setTempRowData(rowData);
            setShowConfirmDialog(true);
            setConfirmError('');
        };

        return (
            <select
                value={rowData.status}
                onChange={handleChange}
                className={statusOptions.find(option => option.value === rowData.status)?.className}
                onClick={(e) => e.stopPropagation()}
            >
                {statusOptions.map(option => (
                    <option key={option.value} value={option.value} className={option.className} style={option.style}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    };

    const handleUpdateStatus = async (status: any, no_pengajuan: any) => {
        try {
            const verifyResponse = await axios.post(API_ENDPOINTS.VERIFY_USER, {
                email: email,
                password: password
            });

            if (verifyResponse.data.success) {
                await axios.put(API_ENDPOINTS.UPDATESTATUSPENGAJUANBYID(no_pengajuan), { status: status });
                const response = await axios.get(API_ENDPOINTS.GETALLPRODUK);
                setAllproduk(response.data);
                setShowConfirmDialog(false);
                setEmail('');
                setPassword('');
            } else {
                setConfirmError('Email atau password salah');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            setConfirmError('User tidak ditemukan atau tidak memiliki akses approval');
        }
    };

    const [filteredProduk, setFilteredProduk] = useState(allproduk);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const statusOptions = [
        { label: 'Semua', value: null },
        { label: 'Belum Diajukan', value: 0 },
        { label: 'Diajukan', value: 1 },
        { label: 'Disetujui', value: 2 },
        { label: 'Ditolak', value: 3 },
        { label: 'Tidak Diketahui', value: 4 }
    ];

    useEffect(() => {
        const filterProduk = allproduk.filter((item: any) => {
            if (selectedStatus === null) return true;
            return item.status === selectedStatus;
        }).filter((item: any) => {
            if (!globalFilter) return true;
            return item.no_pengajuan.toLowerCase().includes(globalFilter.toLowerCase()) ||
                item.Cif.toString().toLowerCase().includes(globalFilter.toLowerCase());
        });
        setFilteredProduk(filterProduk);
    }, [selectedStatus, allproduk, globalFilter]);

    return (
        <div>
            <div className="card">
                <h2 className='text-xl md:text-2xl font-bold mb-4 md:mb-6'>Persetujuan Pengajuan</h2>
                <div className="flex flex-col md:flex-row justify-content-between mb-3 gap-3">
                    <div className="p-input-icon-left w-full md:w-auto">
                        <i className="pi pi-search" />
                        <InputText
                            className="w-full"
                            placeholder="Cari No Pengajuan atau CIF"
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                        />
                    </div>
                    <div className="block w-3 md:w-auto">
                        <Dropdown
                            className="w-full"
                            value={selectedStatus}
                            options={statusOptions}
                            onChange={(e) => setSelectedStatus(e.value)}
                            placeholder="Filter by Status"
                        />
                    </div>
                </div>

                <DataTable
                    value={filteredProduk}
                    tableStyle={{ minWidth: '30rem' }}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    className='cursor-pointer'
                    rowClassName={() => `hover:bg-gray-100`}
                    onRowClick={(e) => { window.location.href = `/approvel/pengajuan/${e.data.no_pengajuan}`; }}
                >
                    <Column field="no_pengajuan" header="No Pengajuan" />
                    <Column field="Cif" header="CIF" />
                    <Column field="pengajuan" header="Pengajuan" />
                    <Column field="ref_bidang_usaha.Keterangan" header="Bidang Usaha" />
                    <Column field="ref_sifat_kredit.Keterangan" header="Sifat Kredit" />
                    <Column field="ref_jenis_permohonan.Keterangan" header="Jenis Permohonan" />
                    <Column field="ref_jenis_angsuran.Keterangan" header="Jenis Angsuran" />
                    <Column field="tujuan_penggunaan" header="Tujuan Penggunaan" />
                    <Column field="status" header="Status Pengajuan" body={statusTemplate} />
                </DataTable>
                {loading &&
                    <div className='flex align-items-center justify-content-center'>
                        <ProgressSpinner style={{ width: '4rem', height: '4rem' }} />
                    </div>
                }
            </div>

            <Dialog
                visible={showConfirmDialog}
                onHide={() => setShowConfirmDialog(false)}
                header="Konfirmasi Perubahan Status"
                footer={
                    <div>
                        <Button label="Batal" icon="pi pi-times" onClick={() => setShowConfirmDialog(false)} className="p-button-text" />
                        <Button label="Konfirmasi" icon="pi pi-check" onClick={() => {
                            if (tempStatusChange !== null && tempRowData !== null) {
                                handleUpdateStatus(tempStatusChange, tempRowData?.no_pengajuan);
                            }
                        }} autoFocus />
                    </div>
                }
            >
                <div className="flex flex-column gap-2">
                    <label htmlFor="email">Email</label>
                    <InputText
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full"
                    />

                    <label htmlFor="password">Password</label>
                    <InputText
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full"
                    />

                    {confirmError && <small className="p-error">{confirmError}</small>}
                </div>
            </Dialog>
        </div>
    )
}

export default PengajuanApprovel