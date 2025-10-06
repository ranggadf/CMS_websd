"use client"
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Paginator } from 'primereact/paginator';
import React, { useEffect, useState } from 'react'
import { TabPanel, TabView } from 'primereact/tabview';
import FormJaminan from '../../analisakredit/jaminan/formjaminan/page';
import FormFinancial from '../../analisakredit/financial/formfinancial/page';
import FormAspek from '../../analisakredit/aspek/formaspek/page';
import FormSurvey from '../../analisakredit/survey/formsurvey/page';
import FormLimaC from '../../analisakredit/5c/form5c/page';
import { Search } from 'lucide-react';

const FormProduk = () => {
    const [pengajuan, setPengajuan] = useState<any>([]);
    const [sifatKredit, setSifatKredit] = useState<any>([]);
    const [bidangUsaha, setBidangUsaha] = useState<any>([]);
    const [sektorEkonomi, setSektorEkonomi] = useState<any>([]);
    const [jenisPermohonan, setJenisPermohonan] = useState<any>([]);
    const [jenisAngsuran, setJenisAngsuran] = useState<any>([]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [visiblesearch, setVisibleSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [cif, setCif] = useState<any>([]);
    const [filteredCif, setFilteredCif] = useState(cif);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [visible, setVisible] = useState(false);
    const [Isloading, setIsLoading] = useState(false);
    const [formPengajuan, setFormPengajuan] = useState<any>({
        tanggal_aplikasi: '', tanggal_permohonan: '',
    });
    const resetForm = () => { setFormPengajuan(null) };
    const handleChange = async (e: any) => {
        setFormPengajuan((prevData: any) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        const generateNoPengajuan = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.GETLASTPENGAJUAN);
                setFormPengajuan((prevData: any) => ({
                    ...prevData,
                    no_pengajuan: response.data
                }));
            } catch (error) {
                console.error('Error generating no pengajuan:', error);
            }
        };
        generateNoPengajuan();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setActiveIndex(1);
        setIsLoading(true);
        if (formPengajuan.NomorRekening === '') {
            alert('Nomor Rekening tidak boleh kosong')
            return
        }
        try {
            const response = await axios.post(API_ENDPOINTS.ADDPRODUK, formPengajuan);
            console.log('Response from API:', response.data);
            setIsLoading(false);
            // setVisible(true);
        } catch (error) {
            console.error('Error submitting form:', error);
            setIsLoading(false);
        }
    };
    // console.log(formPengajuan)

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
        fetchOptions(API_ENDPOINTS.GETSEKTOREKONOMI, setSektorEkonomi);
        fetchOptions(API_ENDPOINTS.GETJENISPERMOHONAN, setJenisPermohonan);
        fetchOptions(API_ENDPOINTS.GETJENISANGURAN, setJenisAngsuran);
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

    const mapOptions = (data: any[]) => data.map((item: any) => ({
        label: item.Keterangan,
        value: item.Kode
    }));
    const SifatKreditOptions = mapOptions(sifatKredit);
    const BidangUsahaOptions = mapOptions(bidangUsaha);
    const SektorEkonomiOptions = mapOptions(sektorEkonomi);
    const JenisPermohonanOptions = mapOptions(jenisPermohonan);
    const JenisAngsuranOptions = mapOptions(jenisAngsuran);
    const PengajuanOptions = pengajuan.map((item: any) => ({
        label: item.Keterangan,
        value: item.Keterangan
    }));

    const onRowClick = (e: any) => {
        setFormPengajuan((prevData: any) => ({
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

    const handleNextTab = () => {
        setActiveIndex(prevIndex => prevIndex + 1);
    };
    return (
        <div className='surface-card shadow-2 p-5 border-round'>
            <h4 className='text-2xl font-bold mb-4'>Tambah Pengajuan Kredit</h4>
            <span className='flex justify-content-end gap-2'><strong>No Pengajuan :</strong>{formPengajuan.no_pengajuan}</span>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="Pengajuan">
                    <div className='flex gap-2 mb-4 justify-content-end'>
                        <InputText required name='Cif' type="text" placeholder='Masukkan Nomor Cif Anda' className="p-inputtext p-component w-3" value={formPengajuan.Cif || ''} onChange={handleChange} />
                        <div className='flex align-items-center cursor-pointer border-1 border-gray-300 p-2 border-round' onClick={() => setVisibleSearch(true)}>
                            <Search style={{ backgroundColor: 'transparent', border: '1', color: '#333' }} />
                        </div>
                    </div>
                    <Dialog visible={visiblesearch} onHide={() => setVisibleSearch(false)} header="Cari Cif Pemohon" style={{ width: '70vw' }}>
                        <div className="p-inputgroup mb-3">
                            <span className="p-inputgroup-addon"><i className="pi pi-search"></i></span>
                            <InputText placeholder="Cari berdasarkan nomor no ktp atau nama" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="w-full" />
                        </div>
                        <DataTable
                            value={paginatedCif}
                            onRowClick={onRowClick}
                            className='cursor-pointer'
                            rowClassName={(data) => `hover:bg-gray-100`}>
                            <Column field="Cif" header="Cif" />
                            <Column field="Nama" header="Nama" />
                            <Column field="KTP" header="No Ktp" />
                            <Column field="Kelamin" header="Jenis Kelamin" />
                            <Column field="Alamat" header="Alamat" />
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
                                    <Dropdown name='pengajuan' value={formPengajuan.pengajuan || ''} onChange={handleChange} options={PengajuanOptions} placeholder="Kredit UMKM Industri" className="w-full md:w-full" />
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Sektor Ekonomi</label>
                                    <Dropdown name='sektor_ekonomi' value={formPengajuan.sektor_ekonomi || ''} onChange={handleChange} options={SektorEkonomiOptions} placeholder="Pilih Sektor Ekonomi" className="w-full md:w-full" />
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Bidang Usaha</label>
                                    <Dropdown name='bidang_usaha' value={formPengajuan.bidang_usaha || ''} onChange={handleChange} options={BidangUsahaOptions} placeholder="Pilih Bidang Usaha" className="w-full md:w-full" />
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Nomor Rekening</label>
                                    <InputText required name='NomorRekening' type="text" placeholder='nomor akan terisi otomatis' className="p-inputtext p-component w-full" value={formPengajuan.NomorRekening || ''} onChange={handleChange} />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Plafon Kredit</label>
                                    <InputText required name='plafon_kredit' type="text" placeholder='Isikan dengan angka' className="p-inputtext p-component w-full" value={formPengajuan.plafon_kredit || ''} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Tanggal Aplikasi</label>
                                    <InputText required name='tanggal_aplikasi' type="date" placeholder='' className="p-inputtext p-component w-full" value={formPengajuan.tanggal_aplikasi} onChange={handleChange} />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Suku Bunga</label>
                                    <div className='flex gap-2 align-items-center'>
                                        <InputText required name='suku_bunga' type="text" placeholder='Isikan dengan angka' className="p-inputtext p-component w-full" value={formPengajuan.suku_bunga || ''} onChange={handleChange} />
                                        <label htmlFor="" className='text-900 font-medium'>%p.a</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Tanggal Permohonan</label>
                                    <InputText required name='tanggal_permohonan' type="date" placeholder='' className="p-inputtext p-component w-full" value={formPengajuan.tanggal_permohonan} onChange={handleChange} />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Jangka Waktu</label>
                                    <div className='flex gap-2 align-items-center'>
                                        <InputText required name='jangka_waktu' type="text" placeholder='Isikan dengan angka' className="p-inputtext p-component w-full" value={formPengajuan.jangka_waktu || ''} onChange={handleChange} />
                                        <label htmlFor="" className='text-900 font-medium'>Bulan</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-6">
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Sifat Kredit</label>
                                    <Dropdown name='sifat_kredit' value={formPengajuan.sifat_kredit || ''} onChange={handleChange} options={SifatKreditOptions} placeholder="Pilih Sifat Kredit" className="w-full md:w-full" />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Jenis Permohonan</label>
                                    <Dropdown name='jenis_permohonan' value={formPengajuan.jenis_permohonan || ''} onChange={handleChange} options={JenisPermohonanOptions} placeholder="Pilih Jenis Permohonan" className="w-full md:w-full" />
                                </div>
                            </div>
                            <div className="col-12 md:col-6">
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Jenis Angsuran</label>
                                    <Dropdown name='jenis_angsuran' value={formPengajuan.jenis_angsuran || ''} onChange={handleChange} options={JenisAngsuranOptions} placeholder="Pilih Jenis Angsuran" className="w-full md:w-full" />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">No Aplikasi Sebelumnya</label>
                                    <InputText required name='no_aplikasi_sebelumnya' type="text" placeholder='Kosongkan tidak perlu diisi' className="p-inputtext p-component w-full" value={formPengajuan.no_aplikasi_sebelumnya || ''} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Tujuan Penggunaan</label>
                                    <InputText required name='tujuan_penggunaan' type="text" placeholder='Pilih tujuan penggunaan' className="p-inputtext p-component w-full" value={formPengajuan.tujuan_penggunaan || ''} onChange={handleChange} />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Detail Tujuan Penggunaan</label>
                                    <InputTextarea name='detail_tujuan_penggunaan' placeholder='Deskripsikan secara singkat detail/tujuan penggunaan dari permohonan debitur' className="p-inputtext p-component w-full" value={formPengajuan.detail_tujuan_penggunaan || ''} onChange={handleChange} />
                                </div>
                            </div>
                        </fieldset>
                        <div className='flex gap-4 justify-content-end'>
                            <Button onClick={resetForm} className=''>Reset</Button>
                            <Button type="submit" className='text-white bg-[#61AB5B] w-auto' disabled={Isloading}>
                                {Isloading ? (
                                    <div className="flex align-items-center">
                                        <i className="pi pi-spin pi-spinner" style={{ fontSize: "1rem" }}></i>
                                        <label>Loading...</label>
                                    </div>
                                ) : (
                                    'Kirim'
                                )}</Button>
                            {/* <Dialog header="Success" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                                <p className="m-0">
                                    Terima Kasih telah mengisi form
                                </p>
                            </Dialog> */}
                        </div>
                    </form>
                </TabPanel>
                <TabPanel header="Jaminan">
                    <FormJaminan pengajuan={formPengajuan} onSubmitSuccess={handleNextTab} />
                </TabPanel>
                <TabPanel header="Financial">
                    <FormFinancial pengajuan={formPengajuan} onSubmitSuccess={handleNextTab} />
                </TabPanel>
                <TabPanel header="Survey">
                    <FormSurvey pengajuan={formPengajuan} onSubmitSuccess={handleNextTab} />
                </TabPanel>
                <TabPanel header="Aspek Form">
                    <FormAspek pengajuan={formPengajuan} onSubmitSuccess={handleNextTab} />
                </TabPanel>
                <TabPanel header="5C">
                    <FormLimaC pengajuan={formPengajuan} />
                </TabPanel>
            </TabView>
        </div>
    )
}

export default FormProduk