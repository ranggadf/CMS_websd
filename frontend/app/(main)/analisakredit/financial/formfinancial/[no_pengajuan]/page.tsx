'use client';
import SearchRekening from '@/app/(full-page)/component/searchRekening/page';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { TabView, TabPanel } from 'primereact/tabview';
import React, { useContext, useEffect, useRef, useState } from 'react';

const EditFormFinancial = () => {
    const params = useParams();
    const no_pengajuan = params?.no_pengajuan;

    const [activeIndex, setActiveIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    const [Isloading, setIsLoading] = useState(false);
    const [formFinancial, setFormFinancial] = useState<any>({
        no_pengajuan: '',
        // Info Keuangan
        oms_ramai: '',
        oms_normal: '',
        oms_sepi: '',
        // Komponen Biaya Usaha
        hrg_pokok_jual: '',
        btk_tdklangsung: '',
        ohc: '',
        b_usahalainnya: '',
        // // Komponen Biaya Hidup
        b_rumahtangga: '',
        b_sekolah: '',
        b_pln_pdam: '',
        b_transport_komunikasi: '',
        b_lain_lain: '',
        // Pendapatan dan Biaya Lainnya
        p_lainnya: '',
        b_Lainnya: '',
        bukti_pendapatan: '',
        bukti_biaya: '',
        // Kewajiban - Kewajiban
        bank_nonbank: '',
        koperasi: '',
        lainLain: '',
        angsuran_baru: '',
        // // Aktiva
        kas: '',
        bank: '',
        piutang: '',
        persediaan_barang: '',
        atv_lancar_lainnya: '',
        sub_atv_lancar: '',
        tanah_bangunan: '',
        peralatan_usaha: '',
        kendaraan: '',
        atv_tetap_lainnya: '',
        sub_atv_tetap: '',
        jumlah_atv: '',
        // // Passiva
        tot_bdp_jangka_pendek: '',
        idr_jangka_pendek: '',
        jangka_pendek: '',
        tot_bdp_jangka_panjang: '',
        idr_jangka_panjang: '',
        jangka_panjang: '',
        sub_jumlah_hutang: '',
        modal_sendiri: '',
        laba: '',
        sub_jumlah_modal: '',
        jumlah_passiva: ''
    });
    const resetForm = () => {
        setFormFinancial({
            no_pengajuan: '',
            // Info Keuangan
            oms_ramai: '', oms_normal: '', oms_sepi: '',
            // Komponen Biaya Usaha
            hrg_pokok_jual: '', btk_tdklangsung: '', ohc: '', b_usahalainnya: '',
            // Komponen Biaya Hidup
            b_rumahtangga: '', b_sekolah: '', b_pln_pdam: '', b_transport_komunikasi: '', b_lain_lain: '',
            // Pendapatan dan Biaya Lainnya
            p_lainnya: '', b_Lainnya: '', bukti_pendapatan: '', bukti_biaya: '',
            // Kewajiban - Kewajiban
            bank_nonbank: '', koperasi: '', lainLain: '', angsuran_baru: '',
            // Aktiva
            kas: '', bank: '', piutang: '', persediaan_barang: '', atv_lancar_lainnya: '', sub_atv_lancar: '', tanah_bangunan: '', peralatan_usaha: '', kendaraan: '', atv_tetap_lainnya: '', sub_atv_tetap: '', jumlah_atv: '',
            // Passiva
            tot_bdp_jangka_pendek: '', idr_jangka_pendek: '', jangka_pendek: '', tot_bdp_jangka_panjang: '', idr_jangka_panjang: '', jangka_panjang: '', sub_jumlah_hutang: '', modal_sendiri: '', laba: '', sub_jumlah_modal: '', jumlah_passiva: ''
        });
    };
    useEffect(() => {
        if (no_pengajuan) {
            fetchFinancialData(no_pengajuan);
        }
    }, [no_pengajuan]);

    const fetchFinancialData = async (no_pengajuan: any) => {
        try {
            const response = await axios.get(`${API_ENDPOINTS.GETFINANCIALBYNOPENGAJUAN(no_pengajuan)}`);
            setFormFinancial(response.data[0]);
            console.log(response.data[0]);
        } catch (error) {
            console.error('Error fetching financial data:', error);
        }
    };
   

    const handleNextTab = () => {
        if (activeIndex < 3) { // Asumsi Anda memiliki 4 tab panel
            setActiveIndex(activeIndex + 1);
        }
        console.log(formFinancial)
    };
    const handlePreviousTab = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormFinancial((prevData: any) => ({
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
                response = await axios.put(API_ENDPOINTS.UPDATEFINANCIALBYID(no_pengajuan), formFinancial);
            } else {
                response = await axios.post(API_ENDPOINTS.FINANCIAL, formFinancial);
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

    const infoKeuanganFields = [
        { label: "Penjualan/Omset (Ramai)", field: "oms_ramai", type: "number" },
        { label: "Penjualan/Omset (Normal)", field: "oms_normal", type: "number" },
        { label: "Penjualan/Omset (Sepi)", field: "oms_sepi", type: "number" }
    ];
    const komponenBiayaUsahaFields = [
        { label: "Harga Pokok Penjualan", field: "hrg_pokok_jual" },
        { label: "Biaya Tenaga Kerja Tidak Langsung", field: "btk_tdklangsung" },
        { label: "OHC (Over Head Cost)", field: "ohc" },
        { label: "Biaya Usaha Lainnya", field: "b_usahalainnya" }
    ];
    const komponenBiayaHidupFields = [
        { label: "Biaya Rumah Tangga", field: "b_rumahtangga" },
        { label: "Biaya Sekolah", field: "b_sekolah" },
        { label: "Biaya PLN dan PDAM", field: "b_pln_pdam" },
        { label: "Biaya Transportasi dan Komunikasi", field: "b_transport_komunikasi" },
        { label: "Biaya Lain-Lain", field: "b_lain_lain" }
    ];
    const aktivaLancarFields = [
        { label: "Kas", field: "kas" },
        { label: "Bank", field: "bank" },
        { label: "Piutang", field: "piutang" },
        { label: "Persediaan Barang Jadi / Dalam Proses", field: "persediaan_barang" },
        { label: "Aktiva Lancar Lainnya", field: "atv_lancar_lainnya" },
        { label: "Sub Jumlah", field: "sub_atv_lancar" },
    ];
    const aktivaTetapFields = [
        { label: "Tanah dan Bangunan", field: "tanah_bangunan" },
        { label: "Peralatan Usaha", field: "peralatan_usaha" },
        { label: "Kendaraan", field: "kendaraan" },
        { label: "Aktiva Tetap Lainnya", field: "atv_tetap_lainnya" },
        { label: "Sub Jumlah", field: "sub_atv_tetap" },
        { label: "Jumlah", field: "jumlah_atv" }
    ];
    const hutangFields = [
        { label: "Total Baki Debet Pinjaman (Jangka Pendek)", field: "tot_bdp_jangka_pendek" },
        { label: "IDR (Jangka Pendek)", field: "idr_jangka_pendek" },
        { label: "Jangka Pendek", field: "jangka_pendek" },
        { label: "Total Baki Debet Pinjaman (Jangka Panjang)", field: "tot_bdp_jangka_panjang" },
        { label: "IDR (Jangka Panjang)", field: "idr_jangka_panjang" },
        { label: "Jangka Panjang", field: "jangka_panjang" },
        { label: "Sub Jumlah Hutang", field: "sub_jumlah_hutang" },
    ];
    const modalFields = [
        { label: "Modal Sendiri", field: "modal_sendiri" },
        { label: "Laba", field: "laba" },
        { label: "Sub Jumlah Modal", field: "sub_jumlah_modal" },
        { label: "Jumlah Passiva", field: "jumlah_passiva" }
    ];
    return (
        <div className="surface-card p-4 shadow-2 border-round">
            <form onSubmit={handleSubmit}>
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="info keuangan">
                        <div className='col-12'>
                            <fieldset className="grid border-round mb-2 p-2"> {/*info keuangan*/}
                                <legend className="text-xl font-bold">Info Keuangan</legend>
                                {infoKeuanganFields.map((item, index) => (
                                    <div key={index} className="col-12 md:col-4">
                                        <label className="block text-900 font-medium mb-2">{item.label}</label>
                                        <InputText
                                            required name={item.field}
                                            type={item.type} placeholder='0'
                                            className="p-inputtext p-component w-full"
                                            value={formFinancial[item.field]}
                                            onChange={handleChange} />
                                    </div>
                                ))}
                            </fieldset>
                        </div>
                        <div className='flex justify-content-end'>
                            <Button onClick={handleNextTab}>Lanjut</Button>
                        </div>
                    </TabPanel>
                    <TabPanel header="komponen biaya">
                        <div className="grid md:justify-content-between">
                            <div className="col-12 md:col-6">
                                <fieldset className='border-round p-4'> {/*komponen biaya usaha*/}
                                    <legend className="text-xl font-bold">Komponen Biaya Usaha</legend>
                                    {komponenBiayaUsahaFields.map((item, index) => (
                                        <div key={index} className="mb-2">
                                            <label className="block text-900 font-medium mb-2">{item.label}</label>
                                            <InputText
                                                required
                                                name={item.field}
                                                type="number"
                                                placeholder='0'
                                                className="p-inputtext p-component w-full"
                                                value={formFinancial[item.field]}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    ))}
                                </fieldset>
                            </div>
                            <div className="col-12 md:col-6 mb-4">
                                <fieldset className='border-round p-4'> {/*komponen biaya hidup*/}
                                    <legend className="text-xl font-bold">Komponen Biaya Hidup</legend>
                                    {komponenBiayaHidupFields.map((item, index) => (
                                        <div key={index} className="mb-2">
                                            <label className="block text-900 font-medium mb-2">{item.label}</label>
                                            <InputText
                                                required
                                                name={item.field}
                                                type="number"
                                                placeholder='0'
                                                className="p-inputtext p-component w-full"
                                                value={formFinancial[item.field]}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    ))}
                                </fieldset>
                            </div>
                        </div>
                        <div className='flex justify-content-between'>
                            <Button onClick={handlePreviousTab} disabled={activeIndex === 0} className=''>Kembali</Button>
                            <Button onClick={handleNextTab}>Lanjut</Button>
                        </div>
                    </TabPanel>
                    <TabPanel header="pendapatan">
                        <div className="grid md:justify-content-between">
                            <div className="col-12 md:col-6">
                                <fieldset className='mb-4 p-4 border-round '> {/*pendapatan dan biaya lain*/}
                                    <legend className="text-xl font-bold">Pendapatan dan Biaya Lainnya</legend>
                                    <div className="mb-2">
                                        <label className="block text-900 font-medium mb-2">Pendapatan Lainnya</label>
                                        <InputText required name='p_lainnya' type="number" placeholder='0' className="p-inputtext p-component w-full" value={formFinancial.p_lainnya} onChange={handleChange} />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-900 font-medium mb-2">Biaya Lainnya</label>
                                        <InputText required name='b_Lainnya' type="number" placeholder='0' className="p-inputtext p-component w-full" value={formFinancial.b_Lainnya} onChange={handleChange} />
                                    </div>
                                    <label className="block text-900 font-medium mb-2">Bukti Kwitansi/Slip Pendapatan Lainnya</label>
                                    <div className='flex gap-3'>
                                        <div className='mb-2'>
                                            <RadioButton name="bukti_pendapatan" value="ada" onChange={handleChange} checked={formFinancial.bukti_pendapatan === 'ada'} />
                                            <label htmlFor="" className="ml-2">ada</label>
                                        </div>
                                        <div className='mb-2'>
                                            <RadioButton name="bukti_pendapatan" value="tidak ada" onChange={handleChange} checked={formFinancial.bukti_pendapatan === 'tidak ada'} />
                                            <label htmlFor="" className="ml-2">tidak ada</label>
                                        </div>
                                    </div>
                                    <label className="block text-900 font-medium mb-2">Bukti Kwitansi/Slip Biaya Lainnya</label>
                                    <div className='flex gap-3'>
                                        <div className='mb-2'>
                                            <RadioButton name="bukti_biaya" value="ada" onChange={handleChange} checked={formFinancial.bukti_biaya === 'ada'} />
                                            <label htmlFor="" className="ml-2">ada</label>
                                        </div>
                                        <div className='mb-2'>
                                            <RadioButton name="bukti_biaya" value="tidak ada" onChange={handleChange} checked={formFinancial.bukti_biaya === 'tidak ada'} />
                                            <label htmlFor="" className="ml-2">tidak ada</label>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>

                            <div className="col-12 md:col-6">
                                <fieldset className='mb-4 p-4 border-round'> {/*kewajiban-kewajiban*/}
                                    <legend className="text-xl font-bold">Kewajiban - Kewajiban</legend>
                                    <div className="mb-2">
                                        <label className="block text-900 font-medium mb-2">Bank dan Non Bank (Financial SLIK)</label>
                                        <InputText required name='bank_nonbank' type="text" className="p-inputtext p-component w-full" value={formFinancial.bank_nonbank} onChange={handleChange} />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-900 font-medium mb-2">Koperasi</label>
                                        <InputText required name='koperasi' type="number" placeholder='0' className="p-inputtext p-component w-full" value={formFinancial.koperasi} onChange={handleChange} />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-900 font-medium mb-2">Lain-Lain</label>
                                        <InputText required name='lainLain' type="number" placeholder='0' className="p-inputtext p-component w-full" value={formFinancial.lainLain} onChange={handleChange} />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-900 font-medium mb-2">Angsuran Baru</label>
                                        <InputText required name='angsuran_baru' type="text" className="p-inputtext p-component w-full" value={formFinancial.angsuran_baru} onChange={handleChange} />
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div className='flex justify-content-between'>
                            <Button onClick={handlePreviousTab} disabled={activeIndex === 0} className=''>Kembali</Button>
                            <Button onClick={handleNextTab}>Lanjut</Button>
                        </div>
                    </TabPanel>
                    <TabPanel header="aktiva dan passiva">
                        <div className="grid md:justify-content-between">
                            <div className="col-12 md:col-6">
                                <fieldset className='mb-4 p-4 border-round'> {/*aktiva*/}
                                    <legend className="text-xl font-bold">Aktiva</legend>
                                    <h5 className="text-xl font-bold mb-3">Aktiva Lancar</h5>
                                    {aktivaLancarFields.map((item, index) => (
                                        <div key={index} className="mb-2">
                                            <label className="block text-900 font-medium mb-2">{item.label}</label>
                                            <InputText
                                                required
                                                name={item.field}
                                                type="number"
                                                placeholder='0'
                                                className="p-inputtext p-component w-full"
                                                value={formFinancial[item.field]}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    ))}
                                    <h5 className="text-xl font-bold mb-3">Aktiva Tetap</h5>
                                    {aktivaTetapFields.map((item, index) => (
                                        <div key={index} className="mb-2">
                                            <label className="block text-900 font-medium mb-2">{item.label}</label>
                                            <InputText
                                                required
                                                name={item.field}
                                                type="number"
                                                placeholder='0'
                                                className="p-inputtext p-component w-full"
                                                value={formFinancial[item.field]}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    ))}
                                </fieldset>
                            </div>

                            <div className="col-12 md:col-6">
                                <fieldset className="mb-4 p-4 border-round"> {/*passiva*/}
                                    <legend className="text-xl font-bold text-in-border">Passiva</legend>
                                    <h5 className="text-xl font-bold mb-3">Hutang</h5>
                                    {hutangFields.map((item, index) => (
                                        <div key={index} className="mb-2">
                                            <label className="block text-900 font-medium mb-2">{item.label}</label>
                                            <InputText
                                                required
                                                name={item.field}
                                                type="number"
                                                placeholder='0'
                                                className="p-inputtext p-component w-full"
                                                value={formFinancial[item.field]}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    ))}
                                    <h5 className="text-xl font-bold mb-3">Modal</h5>
                                    {modalFields.map((item, index) => (
                                        <div key={index} className="mb-2">
                                            <label className="block text-900 font-medium mb-2">{item.label}</label>
                                            <InputText
                                                required
                                                name={item.field}
                                                type="number"
                                                placeholder='0'
                                                className="p-inputtext p-component w-full"
                                                value={formFinancial[item.field]}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    ))}
                                </fieldset>
                            </div>
                        </div>
                        <div className='flex justify-content-between '>
                            <div>
                                <Button onClick={handlePreviousTab} disabled={activeIndex === 0} className=''>Kembali</Button>
                            </div>
                            <div className='flex gap-4 justify-content-end pt-4'>
                                <Button onClick={resetForm} type="button">Reset</Button>
                                <Button type="submit" className='text-white bg-[#61AB5B] w-auto' disabled={Isloading}>
                                    {Isloading ? (
                                        <div className="flex align-items-center">
                                            <i className="pi pi-spin pi-spinner" style={{ fontSize: "1rem" }}></i>
                                            <label>Loading...</label>
                                        </div>
                                    ) : (
                                        no_pengajuan ? 'Update' : 'Kirim'
                                    )}
                                </Button>
                                <Link href="/admin/debitur" passHref>
                                    <Button type="button" className='p-button-secondary'>Back to List</Button>
                                </Link>

                                <Dialog header="Success" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                                    <p className="m-0">
                                        {no_pengajuan ? 'Data berhasil diperbarui' : 'Terima Kasih telah mengisi form'}
                                    </p>
                                </Dialog>
                            </div>
                        </div>
                    </TabPanel>
                </TabView>
            </form>
        </div >
    )
}

export default EditFormFinancial