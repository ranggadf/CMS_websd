"use client"
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Paginator } from 'primereact/paginator';
import React, { useEffect, useState } from 'react'


const EditFormPengajuan = () => {
    const params = useParams();
    const no_pengajuan = params?.no_pengajuan;
    const [sifatKredit, setSifatKredit] = useState<any>([]);
    const [bidangUsaha, setBidangUsaha] = useState<any>([]);
    const [jenisPermohonan, setJenisPermohonan] = useState<any>([]);
    const [jenisAngsuran, setJenisAngsuran] = useState<any>([]);
    const [sektorEkonomi, setSektorEkonomi] = useState<any>([]);
    const [pengajuan, setPengajuan] = useState<any>([]);
    const [visiblesearch, setVisibleSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [cif, setCif] = useState<any>([]);
    const [filteredCif, setFilteredCif] = useState(cif);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [visible, setVisible] = useState(false);
    const [Isloading, setIsLoading] = useState(false);

    useEffect(() => {
        if (no_pengajuan) {
            fetchPengajuanData(no_pengajuan);
        }
    }, [no_pengajuan]);

    const fetchPengajuanData = async (no_pengajuan: any) => {
        try {
            const response = await axios.get(API_ENDPOINTS.GETPRODUKBYID(no_pengajuan));
            const formattedData = {
                ...response.data,
                tanggal_aplikasi: formatDate(response.data.tanggal_aplikasi),
                tanggal_permohonan: formatDate(response.data.tanggal_permohonan)
            };
            console.log(response.data);
            setFormData(formattedData);
        } catch (error) {
            console.error('Error fetching pengajuan data:', error);
        }
    };
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };
    const [formData, setFormData] = useState({
        Cif: '',
        pengajuan: '', sektor_ekonomi: '', bidang_usaha: '', NomorRekening: '', tanggal_aplikasi: '', tanggal_permohonan: '', plafon_kredit: '', suku_bunga: '', jangka_waktu: '', sifat_kredit: '', jenis_permohonan: '', jenis_angsuran: '', no_aplikasi_sebelumnya: '', tujuan_penggunaan: '', detail_tujuan_penggunaan: ''
    });
    const resetForm = () => {
        setFormData({
            Cif: '',
            pengajuan: '',sektor_ekonomi:'' , bidang_usaha: '', NomorRekening: '', tanggal_aplikasi: '', tanggal_permohonan: '', plafon_kredit: '', suku_bunga: '', jangka_waktu: '', sifat_kredit: '', jenis_permohonan: '', jenis_angsuran: '', no_aplikasi_sebelumnya: '', tujuan_penggunaan: '', detail_tujuan_penggunaan: ''
        });
    };

    const handleChange = async (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let response;
            if (no_pengajuan) {
                response = await axios.put(API_ENDPOINTS.UPDATEPRODUKBYID(no_pengajuan), formData);
            } else {
                response = await axios.post(API_ENDPOINTS.ADDPRODUK, formData);
            }
            console.log('Response from API:', response.data);
            setIsLoading(false);
            setVisible(true);
            if (!no_pengajuan) resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        const fetchOptions = async (endpoint: any, setter: any) => {
            try {
                const response = await axios.get(endpoint);
                setter(response.data);
            } catch (error) {
                console.error(`Error fetching ${endpoint}:`, error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOptions(API_ENDPOINTS.GETSIFATKREDIT, setSifatKredit);
        fetchOptions(API_ENDPOINTS.GETBIDANGUSAHA, setBidangUsaha);
        fetchOptions(API_ENDPOINTS.GETJENISPERMOHONAN, setJenisPermohonan);
        fetchOptions(API_ENDPOINTS.GETJENISANGURAN, setJenisAngsuran);
        fetchOptions(API_ENDPOINTS.GETSEKTOREKONOMI, setSektorEkonomi);
        fetchOptions(API_ENDPOINTS.GETGOLONGANKREDIT, setPengajuan);
        fetchOptions(API_ENDPOINTS.GETALLPEMOHON, setCif);
    }, []);
    useEffect(() => {
        setFilteredCif(
            cif.filter((item: any) =>
                item.Cif.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
                item.Nama.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.KTP.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.Alamat.toLowerCase().includes(searchValue.toLowerCase())
            )
        );
    }, [searchValue, cif]);

    const SifatKreditOptions = sifatKredit.map((item: any) => ({ label: item.Keterangan, value: item.Kode }));
    const BidangUsahaOptions = bidangUsaha.map((item: any) => ({ label: item.Keterangan, value: item.Kode }));
    const JenisPermohonanOptions = jenisPermohonan.map((item: any) => ({ label: item.Keterangan, value: item.Kode }));
    const JenisAngsuranOptions = jenisAngsuran.map((item: any) => ({ label: item.Keterangan, value: item.Kode }));
    const SektorEkonomiOptions = sektorEkonomi.map((item: any) => ({ label: item.Keterangan, value: item.Kode }));
    const PengajuanOptions = pengajuan.map((item: any) => ({ label: item.Keterangan, value: item.Keterangan }));
    console.log(PengajuanOptions);
    const onRowClick = (e: any) => {
        setFormData(prevData => ({
            ...prevData,
            Cif: e.data.Cif
        }));
        setVisibleSearch(false);
    };
    const onPageChange = (event: any) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    const paginatedCif = filteredCif.slice(first, first + rows);
    console.log(formData);
    return (
        <div className='surface-card shadow-2 p-5 border-round'>
            <div className='flex gap-2 mb-4 justify-content-end'>
                <InputText required name='Cif' type="text" placeholder='Enter account number' className="p-inputtext p-component w-3" value={formData.Cif} onChange={handleChange} />
                <Button icon="pi pi-search" onClick={() => setVisibleSearch(true)} style={{ backgroundColor: 'transparent', border: '1', color: '#333' }} />
            </div>
            <Dialog visible={visiblesearch} onHide={() => setVisibleSearch(false)} header="Search Cif" style={{ width: '70vw' }}>
                <div className="p-inputgroup mb-3">
                    <span className="p-inputgroup-addon"><i className="pi pi-search"></i></span>
                    <InputText placeholder="Search by account number or name" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="w-full" />
                </div>
                <DataTable
                    value={paginatedCif}
                    onRowClick={onRowClick}
                    className='cursor-pointer'>
                    <Column field="Cif" header="Cif" />
                    <Column field="Nama" header="Nama" />
                    <Column field="KTP" header="No Ktp" />
                    <Column field="Kelamin" header="Jenis Kelamin" />
                </DataTable>
                <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={cif.length}
                    rowsPerPageOptions={[5, 10, 20]}
                    onPageChange={onPageChange}
                />
            </Dialog>
            <form onSubmit={handleSubmit}>
                <fieldset className='grid md:justify-content-between border-round p-4 mb-4'> {/*Produk*/}
                    <legend className="text-xl font-bold">Pengajuan Kredit</legend>
                    <div className="col-12 md:col-4">
                        <div className="mb-2">
                            <label className="block text-900 font-medium mb-2">Pengajuan</label>
                            {/* <InputText required name='pengajuan' type="text" placeholder='Isikan dengan angka' className="p-inputtext p-component w-full" value={formData.pengajuan} onChange={handleChange} /> */}
                            <Dropdown name='pengajuan' value={formData.pengajuan} onChange={handleChange} options={PengajuanOptions} placeholder="Kredit UMKM Industri" className="w-full md:w-full" />
                        </div>
                    </div>
                    <div className="col-12 md:col-4">
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Sektor Ekonomi</label>
                                    <Dropdown name='sektor_ekonomi' value={formData.sektor_ekonomi || ''} onChange={handleChange} options={SektorEkonomiOptions} placeholder="Pilih Sektor Ekonomi" className="w-full md:w-full" />
                                </div>
                            </div>
                    <div className="col-12 md:col-4">
                        <div className="mb-2">
                            <label className="block text-900 font-medium mb-2">Bidang Usaha</label>
                            <Dropdown name='bidang_usaha' value={formData.bidang_usaha} onChange={handleChange} options={BidangUsahaOptions} placeholder="Pilih Bidang Usaha" className="w-full md:w-full" />
                        </div>
                    </div>
                    <div className="col-12 md:col-4">
                        <div className="mb-2">
                            <label className="block text-900 font-medium mb-2">Nomor Rekening</label>
                            <InputText required name='NomorRekening' type="text" placeholder='nomor akan terisi otomatis' className="p-inputtext p-component w-full" value={formData.NomorRekening} onChange={handleChange} />
                        </div>
                        <div className="mb-2">
                            <label className="block text-900 font-medium mb-2">Plafon Kredit</label>
                            <InputText required name='plafon_kredit' type="text" placeholder='Isikan dengan angka' className="p-inputtext p-component w-full" value={formData.plafon_kredit} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col-12 md:col-4">
                        <div className="mb-2">
                            <label className="block text-900 font-medium mb-2">Tanggal Aplikasi</label>
                            <InputText required name='tanggal_aplikasi' type="date" placeholder='' className="p-inputtext p-component w-full" value={formData.tanggal_aplikasi} onChange={handleChange} />
                        </div>
                        <div className="mb-2">
                            <label className="block text-900 font-medium mb-2">Suku Bunga</label>
                            <div className='flex gap-2 align-items-center'>
                                <InputText required name='suku_bunga' type="text" placeholder='Isikan dengan angka' className="p-inputtext p-component w-full" value={formData.suku_bunga} onChange={handleChange} />
                                <label htmlFor="" className='text-900 font-medium'>%p.a</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 md:col-4">
                        <div className="mb-2">
                            <label className="block text-900 font-medium mb-2">Tanggal Permohonan</label>
                            <InputText required name='tanggal_permohonan' type="date" placeholder='' className="p-inputtext p-component w-full" value={formData.tanggal_permohonan} onChange={handleChange} />
                        </div>
                        <div className="mb-2">
                            <label className="block text-900 font-medium mb-2">Jangka Waktu</label>
                            <div className='flex gap-2 align-items-center'>
                                <InputText required name='jangka_waktu' type="text" placeholder='Isikan dengan angka' className="p-inputtext p-component w-full" value={formData.jangka_waktu} onChange={handleChange} />
                                <label htmlFor="" className='text-900 font-medium'>Bulan</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 md:col-6">
                        <div className="mb-2">
                            <label className="block text-900 font-medium mb-2">Sifat Kredit</label>
                            <Dropdown name='sifat_kredit' value={formData.sifat_kredit} onChange={handleChange} options={SifatKreditOptions} placeholder="Pilih Sifat Kredit" className="w-full md:w-full" />
                        </div>
                        <div className="mb-2">
                            <label className="block text-900 font-medium mb-2">Jenis Permohonan</label>
                            <Dropdown name='jenis_permohonan' value={formData.jenis_permohonan} onChange={handleChange} options={JenisPermohonanOptions} placeholder="Pilih Jenis Permohonan" className="w-full md:w-full" />
                        </div>
                    </div>
                    <div className="col-12 md:col-6">
                        <div className="mb-2">
                            <label className="block text-900 font-medium mb-2">Jenis Angsuran</label>
                            <Dropdown name='jenis_angsuran' value={formData.jenis_angsuran} onChange={handleChange} options={JenisAngsuranOptions} placeholder="Pilih Jenis Angsuran" className="w-full md:w-full" />
                        </div>
                        <div className="mb-2">
                            <label className="block text-900 font-medium mb-2">No Aplikasi Sebelumnya</label>
                            <InputText required name='no_aplikasi_sebelumnya' type="text" placeholder='Kosongkan tidak perlu diisi' className="p-inputtext p-component w-full" value={formData.no_aplikasi_sebelumnya} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-2">
                            <label className="block text-900 font-medium mb-2">Tujuan Penggunaan</label>
                            <InputText required name='tujuan_penggunaan' type="text" placeholder='Pilih tujuan penggunaan' className="p-inputtext p-component w-full" value={formData.tujuan_penggunaan} onChange={handleChange} />
                        </div>
                        <div className="mb-2">
                            <label className="block text-900 font-medium mb-2">Detail Tujuan Penggunaan</label>
                            <InputTextarea name='detail_tujuan_penggunaan' placeholder='Deskripsikan secara singkat detail/tujuan penggunaan dari permohonan debitur' className="p-inputtext p-component w-full" value={formData.detail_tujuan_penggunaan} onChange={handleChange} />
                        </div>
                    </div>
                </fieldset>
                <div className='flex justify-content-end'>
                    <div className='flex gap-4 justify-content-end pt-4'>
                        <Button onClick={resetForm} type="button">Reset</Button>
                        <Button type="submit" className='text-white bg-[#61AB5B] w-auto' disabled={Isloading}>
                            {Isloading ? (
                                <div className="flex align-items-center">
                                    <i className="pi pi-spin pi-spinner" style={{ fontSize: "1rem" }}></i>
                                    <label>Loading...</label>
                                </div>
                            ) : (
                                no_pengajuan ? 'Perbarui' : 'Kirim'
                            )}
                        </Button>
                        <Link href="/pengajuan" passHref>
                            <Button type="button" className='p-button-secondary'>Kembali ke List</Button>
                        </Link>

                        <Dialog header="Success" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                            <p className="m-0">
                                {no_pengajuan ? 'Data berhasil diperbarui' : 'Terima Kasih telah mengisi form'}
                            </p>
                        </Dialog>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditFormPengajuan