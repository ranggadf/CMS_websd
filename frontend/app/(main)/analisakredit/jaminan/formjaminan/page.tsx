'use client';

import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import axios from 'axios';
import SearchRekening from '@/app/(full-page)/component/searchRekening/page';
import { Dialog } from 'primereact/dialog';
import KendaraanBermotorPage from '../jenis_agunan/Kendaraan Bermotor/page';
import SBIPage from '../jenis_agunan/SBI/page';
import TabunganDepositoKoperasiBankLainPage from '../jenis_agunan/Tabungan Deposito Koperasi Bank Lain/page';
import PersediaanBarangPage from '../jenis_agunan/Persediaan Barang/page';
import PerhiasanEmasDanLogamMuliaPage from '../jenis_agunan/Perhiasan Emas dan Logam Mulia/page';
import SertifikatHajiPage from '../jenis_agunan/Sertifikat Haji/page';
import TanahDanBangunanPage from '../jenis_agunan/Tanah dan Bangunan/page';
import TabunganDepositoKoperasiYBSPage from '../jenis_agunan/Tabungan Deposito Koperasi YBS/page';
import TanpaAgunanPage from '../jenis_agunan/Tanpa Agunan/page';


const FormJaminan = ({ pengajuan, onSubmitSuccess }: { pengajuan: any, onSubmitSuccess: () => void }) => {
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [jenisAgunan, setjenisAgunan] = useState<any>([]);
    // const [tipe, setTipe] = useState<any>([]);
    // const [hubunganPemilik, setHubunganPemilik] = useState<any>([]);
    // const [hakMilik, setHakMilik] = useState<any>([]);
    // const [jenisPengikatan, setJenisPengikatan] = useState<any>([]);
    const [formPengajuan] = useState<any>(pengajuan);

    const fetchPemohon = async () => {
        try {
            const response = await axios.get(API_ENDPOINTS.GETPEMOHONBYCIF(formPengajuan?.Cif));
            const pemohonData = response.data;
            // console.log(pemohonData)
            setformJaminan((prevState: any) => ({
                ...prevState,
                namaPemilikJaminan: pemohonData.Nama
            }));
        } catch (error) {
            console.error('Error mengambil data pemohon:', error);
        }
    };
    const [formJaminan, setformJaminan] = useState<any>({
        no_pengajuan: formPengajuan?.no_pengajuan || '',
        cif: formPengajuan?.Cif || '',
        tanggalPembuatan: '',
        jenisAgunan: '',
        nilaiPasar: '',
        nilaiYangDiagunkan: ''
    });
    // console.log(formJaminan)
    const resetForm = () => {
        setformJaminan({
            no_pengajuan: formPengajuan?.no_pengajuan || '',
            cif: formPengajuan?.Cif || '',
            tanggalPembuatan: '',
            jenisAgunan: '',
            nilaiPasar: '',
            nilaiYangDiagunkan: ''
        });
    };

    const [formJaminanList, setFormJaminanList] = useState<any[]>([
        {
            mainForm: {
                ...formJaminan,
                namaPemilikJaminan: ''
            },
            specificForm: {
                jenis: '',
                noRekening: '',
                noBilyet: '',
                nominal: '',
                atasNama: '',
                alamat: '',
                keterangan: ''
            }
        }
    ]);

    useEffect(() => {
        fetchPemohon();
    }, []);

    useEffect(() => {
        if (formJaminan.namaPemilikJaminan) {
            setFormJaminanList(prevList => prevList.map(item => ({
                ...item,
                mainForm: {
                    ...item.mainForm,
                    namaPemilikJaminan: formJaminan.namaPemilikJaminan
                }

            })));
        }
    }, [formJaminan.namaPemilikJaminan]);

    useEffect(() => {
        const fetchOptions = async (endpoint: any, setter: any) => {
            try {
                const response = await axios.get(endpoint);
                setter(response.data);
            } catch (error) {
                console.error(`There was an error fetching the ${endpoint}!`, error);
            }
        };
        fetchOptions(API_ENDPOINTS.GETJENISAGUNAN, setjenisAgunan);
        // fetchOptions(API_ENDPOINTS.GETTIPE, setTipe);
        // fetchOptions(API_ENDPOINTS.GETHAKMILIK, setHakMilik);
        // fetchOptions(API_ENDPOINTS.GETJENISPENGIKATAN, setJenisPengikatan);
        // fetchOptions(API_ENDPOINTS.GETHUBUNGANPEMILIK, setHubunganPemilik);
    },
        []);
    const options = (data: any) => data.map((item: any, index: any) => ({
        label: item.Keterangan,
        value: item.Kode
    }));
    const JenisAgunanOptions = options(jenisAgunan);
    // const TipeOptions = options(tipe);
    // const HakMilikOptions = options(hakMilik);
    // const HubunganPemilikOptions = options(hubunganPemilik);
    // const JenisPengikatanOptions = options(jenisPengikatan);


    const getEmptyForm = () => ({
        mainForm: {
            no_pengajuan: formPengajuan?.no_pengajuan || '',
            cif: formPengajuan?.Cif || '',
            namaPemilikJaminan: formJaminan?.namaPemilikJaminan || '',
            tanggalPembuatan: formJaminan?.tanggalPembuatan || '',
            jenisAgunan: '',
            nilaiPasar: '',
            nilaiYangDiagunkan: '',
        },
        specificForm: {
            jenis: '',
            noRekening: '',
            noBilyet: '',
            nominal: '',
            atasNama: '',
            alamat: '',
            keterangan: '',
            uraian: '',
            jumlah: '',
            berat: '',
            kadar: '',
            noMesin: '',
            jumlahRoda: '',
            merk: '',
            tipe: '',
            tahun: '',
            masaPajak: '',
            noRangka: '',
            noSTNK: '',
            noPolisi: '',
            noBPKB: '',
            noRegBPKB: '',
            silinder: '',
            warna: '',
            noSHM: '',
            noGS: '',
            noNIB: '',
            jenisHakMilik: '',
            jenisSurat: '',
            luas: '',
            tanggalGS: '',
            kota: '',
            provinsi: '',
            keadaanJaminan: '',
            batasUtara: '',
            batasTimur: '',
            batasSelatan: '',
            batasBarat: ''
        }
    });

    const handleDuplicateForm = () => {
        const newForm = getEmptyForm();
        setFormJaminanList([...formJaminanList, newForm]);
    };

    const handleDeleteForm = (index: number) => {
        if (formJaminanList.length > 1) {
            const updatedForms = formJaminanList.filter((_, i) => i !== index);
            setFormJaminanList(updatedForms);
        }
    };

    const handleInputChange = async (e: any, index: number) => {
        const { name, value } = e.target;
        const updatedForms = [...formJaminanList];
        updatedForms[index] = {
            ...updatedForms[index],
            mainForm: {
                ...updatedForms[index].mainForm,
                [name]: value,
            }
        };

        if (name === 'jenisAgunan') {
            updatedForms[index].specificForm = {
                jenis: '',
                noRekening: '',
                noBilyet: '',
                nominal: '',
                atasNama: '',
                alamat: '',
                keterangan: '',
                uraian: '',
                berat: '',
                jumlah: '',
                kadar: '',
                noMesin: '',
                jumlahRoda: '',
                merk: '',
                tipe: '',
                tahun: '',
                masaPajak: '',
                noRangka: '',
                noSTNK: '',
                noPolisi: '',
                noBPKB: '',
                noRegBPKB: '',
                silinder: '',
                warna: '',
                noSHM: '',
                noGS: '',
                noNIB: '',
                jenisHakMilik: '',
                jenisSurat: '',
                luas: '',
                tanggalGS: '',
                kota: '',
                provinsi: '',
                keadaanJaminan: '',
                batasUtara: '',
                batasTimur: '',
                batasSelatan: '',
                batasBarat: ''
            };
        }

        setFormJaminanList(updatedForms);
    };

    const handleSpecificFormChange = (index: number, specificFormData: any) => {
        const updatedForms = [...formJaminanList];
        updatedForms[index].specificForm = {
            ...updatedForms[index].specificForm,
            ...specificFormData
        };
        setFormJaminanList(updatedForms);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        // console.log(formJaminanList)
        try {
            const response = await axios.post(API_ENDPOINTS.ADDJAMINAN, formJaminanList);
            console.log('Response dari API:', response.data);
            setIsLoading(false);
            setVisible(true);
            onSubmitSuccess();
        } catch (error) {
            console.error('Error saat mengirim form:', error);
            setIsLoading(false);
        }
    };
    // console.log(formJaminanList)

    const jaminanFields = [
        { label: 'Cif', type: 'input', name: 'cif' },
        { label: 'Nama Pemilik Jaminan', type: 'input', name: 'namaPemilikJaminan' },
        { label: 'Tanggal Pembuatan', type: 'calendar', name: 'tanggalPembuatan' },
        { label: 'Jenis Agunan', type: 'dropdown', options: ['1', '2'], name: 'jenisAgunan' },
        { label: 'Nilai Pasar', type: 'input', name: 'nilaiPasar' },
        { label: 'Nilai Yang Diagunkan', type: 'input', name: 'nilaiYangDiagunkan' },
    ];

    // console.log(formJaminan)
    return (
        <div className="jaminan-page">
            <div className="surface-card p-4 border-round">
                <form onSubmit={handleSubmit}>
                    {formJaminanList.map((form, index) => (
                        <fieldset key={index} className="mb-4 p-4 border-round">
                            <legend className="text-xl font-bold">Jaminan {index + 1}</legend>
                            <div className="grid w-full mb-4">
                                <div className="flex flex-row justify-content-between w-full">
                                    {jaminanFields.slice(0, 3).map((field, fieldIndex) => (
                                        <div className="col-12 md:col-4" key={fieldIndex}>
                                            <label className="block text-900 font-medium mb-2">{field.label}</label>
                                            {field.type === 'input' && field.name === 'cif' && (<InputText required name={field.name} value={form.mainForm[field.name]} onChange={(e) => handleInputChange(e, index)} className="w-full" disabled />)}
                                            {field.type === 'input' && field.name === 'namaPemilikJaminan' && (<InputText required name={field.name} value={form.mainForm[field.name]} onChange={(e) => handleInputChange(e, index)} className="w-full" disabled />)}
                                            {field.type === 'calendar' && <InputText required type='date' name={field.name} onChange={(e) => handleInputChange(e, index)} className="w-full" />}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-row justify-content-between w-full">
                                    {jaminanFields.slice(3).map((field, fieldIndex) => (
                                        <div className="col-12 md:col-4" key={fieldIndex}>
                                            <label className="block text-900 font-medium mb-2">{field.label}</label>
                                            {field.type === 'dropdown' && field.name === 'jenisAgunan' && <Dropdown required name={field.name} value={form.mainForm[field.name]} onChange={(e) => handleInputChange(e, index)} options={JenisAgunanOptions} placeholder="Pilih Jenis Agunan" className="w-full md:w-full" />}
                                            {field.type === 'input' && <InputText required name={field.name} value={form.mainForm[field.name]} onChange={(e) => handleInputChange(e, index)} className="w-full" placeholder={`Isikan ${field.label}`} />}
                                        </div>
                                    ))}
                                </div>
                                {/* </div> */}
                            </div>
                            {/* Render specific agunan forms based on the selected jenisAgunan */}
                            {form.mainForm.jenisAgunan === 'AG0000001' && <SBIPage onChange={(data) => handleSpecificFormChange(index, data)} defaultValue={form.specificForm} />}
                            {form.mainForm.jenisAgunan === 'AG0000002' && <TabunganDepositoKoperasiYBSPage onChange={(data) => handleSpecificFormChange(index, data)} defaultValue={form.specificForm} />}
                            {form.mainForm.jenisAgunan === 'AG0000003' && <TabunganDepositoKoperasiBankLainPage onChange={(data) => handleSpecificFormChange(index, data)} defaultValue={form.specificForm} />}
                            {form.mainForm.jenisAgunan === 'AG0000004' && <PerhiasanEmasDanLogamMuliaPage onChange={(data) => handleSpecificFormChange(index, data)} defaultValue={form.specificForm} />}
                            {form.mainForm.jenisAgunan === 'AG0000005' && <KendaraanBermotorPage onChange={(data) => handleSpecificFormChange(index, data)} defaultValue={form.specificForm} />}
                            {form.mainForm.jenisAgunan === 'AG0000006' && <TanahDanBangunanPage onChange={(data) => handleSpecificFormChange(index, data)} defaultValue={form.specificForm} />}
                            {form.mainForm.jenisAgunan === 'AG0000007' && <TanpaAgunanPage onChange={(data) => handleSpecificFormChange(index, data)} defaultValue={form.specificForm} />}
                            {form.mainForm.jenisAgunan === 'AG0000008' && <PersediaanBarangPage onChange={(data) => handleSpecificFormChange(index, data)} defaultValue={form.specificForm} />}
                            {form.mainForm.jenisAgunan === 'AG0000009' && <SertifikatHajiPage onChange={(data) => handleSpecificFormChange(index, data)} defaultValue={form.specificForm} />}
                            <div className="flex justify-content-end align-items-center">
                                {formJaminanList.length > 1 && (
                                    <Button
                                        icon="pi pi-trash"
                                        className="p-button-danger "
                                        onClick={() => handleDeleteForm(index)}
                                        type="button"
                                    />
                                )}
                            </div>
                        </fieldset>
                    ))}

                    <div className='flex justify-content-between'>
                        <Button type="button" onClick={handleDuplicateForm} className='text-white bg-[#007bff]'>
                            Tambah Jaminan
                        </Button>
                        <div className='flex gap-4'>
                            <Button onClick={resetForm} className=''>Reset</Button>
                            <Button type="submit" className='text-white bg-[#61AB5B] w-auto' disabled={isLoading}>
                                {isLoading ? (
                                    <div className="flex align-items-center">
                                        <i className="pi pi-spin pi-spinner" style={{ fontSize: "1rem" }}></i>
                                        <label>Loading...</label>
                                    </div>
                                ) : (
                                    'Kirim'
                                )}
                            </Button>
                        </div>
                    </div>
                    <Dialog header="Success" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                        <p className="m-0">
                            Terima Kasih telah mengisi form
                        </p>
                    </Dialog>
                </form>
            </div>
        </div>
    );
};

export default FormJaminan;
