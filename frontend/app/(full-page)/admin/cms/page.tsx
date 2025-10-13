"use client"
import React, { useState, useEffect, useRef } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import DataTableWithCRUD from '@/app/(full-page)/component/datatable/page'; // Pastikan path ini benar
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import TambahAspekPanel from './cmsaspek/page';
import TambahJaminanPanel from './cmsjaminan/page';
import TambahSurveyPanel from './cmssurvey/page';
import TambahPengajuanPanel from './cmspengajuan/page';
import TambahDataDebiturPanel from './cmsdatadebitur/page';

const TambahanAnalisaKredit = () => {
    // const [refTitleAspek, setRefTitleAspek] = useState([]);

    // const [refJenisAgunan, setRefJenisAgunan] = useState([]);
    // const [refHakMilik, setRefHakMilik] = useState([]);
    // const [refTipe, setRefTipe] = useState([]);
    // const [refJenisPengikatan, setRefJenisPengikatan] = useState([]);
    // const [refHubunganPemilik, setRefHubunganPemilik] = useState([]);

    // const [refSurvey, setRefSurvey] = useState([]);
    // const [visibleAddSurvey, setVisibleAddSurvey] = useState(false);
    // const [visibleUpdateSurvey, setVisibleUpdateSurvey] = useState(false);
    // const [judulSurvey, setJudulSurvey] = useState('');
    // const [judulSurveyUpdate, setJudulSurveyUpdate] = useState('');
    // const [pilihanSurvey, setPilihanSurvey] = useState(['']);
    // const [pilihanSurveyUpdate, setPilihanSurveyUpdate] = useState(['']);
    // const [selectedSurveyKode, setSelectedSurveyKode] = useState(null);

    // const [refBidangUsaha, setRefBidangUsaha] = useState([]);
    // const [refSifatKredit, setRefSifatKredit] = useState([]);
    // const [refJenisAngsuran, setRefJenisAngsuran] = useState([]);
    // const [refJenisPermohonan, setRefJenisPermohonan] = useState([]);

    // const [refSektorEkonomi, setRefSektorEkonomi] = useState([]);
    // const [refStatusUsaha, setRefStatusUsaha] = useState([]);
    // const [refStatusTempatTinggal, setRefStatusTempatTinggal] = useState([]);
    // const [refProfesiSampingan, setRefProfesiSampingan] = useState([]);
    const toast = useRef<Toast>(null);

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const [isLoading, setIsLoading] = useState(false);

    // const fetchData = async () => {
    //     setIsLoading(true);
    //     try {
    //         const [
    //             // aspekResponse,
    //             // agunanResponse,
    //             // hakMilikResponse,
    //             // tipeResponse,
    //             // pengikatanResponse,
    //             // hubunganPemilikResponse,
    //             // surveyResponse,
    //             // bidangUsahaResponse,
    //             // sifatKreditResponse,
    //             // jenisAngsuranResponse,
    //             // jenisPermohonanResponse,
    //             // sektorEkonomiResponse,
    //             // statusUsahaResponse,
    //             // statusTempatTinggalResponse,
    //             // profesiSampinganResponse
    //         ] = await Promise.all([
    //                 // axios.get(API_ENDPOINTS.GETTITLEASPEK),
    //                 // axios.get(API_ENDPOINTS.GETJENISAGUNAN),
    //                 // axios.get(API_ENDPOINTS.GETHAKMILIK),
    //                 // axios.get(API_ENDPOINTS.GETTIPE),
    //                 // axios.get(API_ENDPOINTS.GETJENISPENGIKATAN),
    //                 // axios.get(API_ENDPOINTS.GETHUBUNGANPEMILIK),
    //                 // axios.get(API_ENDPOINTS.GETSURVEY),
    //                 // axios.get(API_ENDPOINTS.GETBIDANGUSAHA),
    //                 // axios.get(API_ENDPOINTS.GETSIFATKREDIT),
    //                 // axios.get(API_ENDPOINTS.GETJENISANGURAN),
    //                 // axios.get(API_ENDPOINTS.GETJENISPERMOHONAN),
    //                 // axios.get(API_ENDPOINTS.GETSEKTORPEMOHON),
    //                 // axios.get(API_ENDPOINTS.GETSTATUSUSAHA),
    //                 // axios.get(API_ENDPOINTS.GETSTATUSTEMPATTINGGAL),
    //                 // axios.get(API_ENDPOINTS.GETPROFESISAMPAINGAN)
    //             ]);
    //         // setRefTitleAspek(aspekResponse.data);
    //         // setRefJenisAgunan(agunanResponse.data);
    //         // setRefHakMilik(hakMilikResponse.data);
    //         // setRefTipe(tipeResponse.data);
    //         // setRefJenisPengikatan(pengikatanResponse.data);
    //         // setRefHubunganPemilik(hubunganPemilikResponse.data);
    //         // setRefSurvey(surveyResponse.data);
    //         // setRefBidangUsaha(bidangUsahaResponse.data);
    //         // setRefSifatKredit(sifatKreditResponse.data);
    //         // setRefJenisAngsuran(jenisAngsuranResponse.data);
    //         // setRefJenisPermohonan(jenisPermohonanResponse.data);
    //         // setRefSektorEkonomi(sektorEkonomiResponse.data);
    //         // setRefStatusUsaha(statusUsahaResponse.data);
    //         // setRefStatusTempatTinggal(statusTempatTinggalResponse.data);
    //         // setRefProfesiSampingan(profesiSampinganResponse.data);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //         toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengambil data', life: 3000 });
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // const handleUpdateSurvey = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     if (!selectedSurveyKode) return;

    //     try {
    //         const response = await axios.put(API_ENDPOINTS.UPDATETITLESURVEYBYID(selectedSurveyKode), {
    //             Keterangan: judulSurveyUpdate,
    //             pilihan_survey: pilihanSurveyUpdate.map(pilihan => ({ pertanyaan: pilihan }))
    //         });
    //         toast.current?.show({ severity: 'success', summary: 'Sukses', detail: 'Survey berhasil diupdate', life: 3000 });
    //         setVisibleUpdateSurvey(false);
    //         setJudulSurveyUpdate('');
    //         setPilihanSurveyUpdate(['']);
    //         setSelectedSurveyKode(null);
    //         fetchData();
    //     } catch (error) {
    //         console.error('Error mengupdate survey:', error);
    //         toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengupdate survey', life: 3000 });
    //     }
    // };

    // const handleSubmitSurvey = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post(API_ENDPOINTS.ADDTITLESURVEY, {
    //             Keterangan: judulSurvey,
    //             pilihan_survey: pilihanSurvey.map(pilihan => ({ pertanyaan: pilihan }))
    //         });
    //         toast.current?.show({ severity: 'success', summary: 'Sukses', detail: 'Judul Survey berhasil ditambahkan', life: 3000 });
    //         setVisibleAddSurvey(false);
    //         setJudulSurvey('');
    //         setPilihanSurvey(['']);
    //         fetchData();
    //     } catch (error) {
    //         console.error('Error menambahkan survey:', error);
    //         toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal menambahkan survey', life: 3000 });
    //     }
    // };

    // const handleAdd = async (endpoint: string, data: any, setterFunction: any, successMessage: string) => {
    //     try {
    //         await axios.post(endpoint, data);
    //         toast.current?.show({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
    //         fetchData();
    //         console.log(data);
    //     } catch (error) {
    //         console.error('Error adding data:', error);
    //         toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal menambahkan data', life: 3000 });
    //     }
    // };

    // const handleUpdate = async (endpoint: (id: string) => string, Kode: string, data: any, successMessage: string) => {
    //     try {
    //         await axios.put(endpoint(Kode), data);
    //         toast.current?.show({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
    //         fetchData();
    //     } catch (error) {
    //         console.error('Error updating data:', error);
    //         toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengupdate data', life: 3000 });
    //     }
    // };

    // const handleDelete = async (endpoint: (id: string) => string, Kode: string, successMessage: string) => {
    //     try {
    //         await axios.delete(endpoint(Kode));
    //         toast.current?.show({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
    //         fetchData();
    //     } catch (error) {
    //         console.error('Error deleting data:', error);
    //         toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal menghapus data', life: 3000 });
    //     }
    // };

    // const addPilihanSurvey = () => {
    //     setPilihanSurvey([...pilihanSurvey, '']);
    // };

    // const handlePilihanSurveyChange = (index: number, value: string) => {
    //     const newPilihanSurvey = [...pilihanSurvey];
    //     newPilihanSurvey[index] = value;
    //     setPilihanSurvey(newPilihanSurvey);
    // };

    // const addPilihanSurveyUpdate = () => {
    //     setPilihanSurveyUpdate([...pilihanSurveyUpdate, '']);
    // };
    // const handlePilihanSurveyUpdateChange = (index: number, value: string) => {
    //     const newPilihanSurveyUpdate = [...pilihanSurveyUpdate];
    //     newPilihanSurveyUpdate[index] = value;
    //     setPilihanSurveyUpdate(newPilihanSurveyUpdate);
    // };
    // const handleEditSurvey = (Kode: any) => {
    //     const survey: any = refSurvey.find((s: any) => s.Kode === Kode);
    //     if (survey) {
    //         setSelectedSurveyKode(Kode);
    //         setJudulSurveyUpdate(survey.Keterangan);
    //         setPilihanSurveyUpdate(survey.pilihan_survey.map((p: any) => p.pertanyaan));
    //         setVisibleUpdateSurvey(true);
    //     }
    // };
    // const handleDeleteSurvey = async (Kode: string) => {
    //     try {
    //         await axios.delete(API_ENDPOINTS.DELETEREFSURVEYBYID(Kode));
    //         toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Survey berhasil dihapus', life: 3000 });
    //         fetchData();
    //     } catch (error) {
    //         console.error('Error deleting survey:', error);
    //         toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal menghapus survey', life: 3000 });
    //     }
    // };

    return (
        <div className="card">
            <h2 className='text-2xl font-bold mb-4'>CMS Data</h2>
            <TabView activeIndex={1}>
                <Toast ref={toast} />
                <TabPanel header="Tambah Aspek">
                    {/* {isLoading ? (
                    <div className="flex justify-content-center align-items-center">
                        <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="7" fill="var(--surface-ground)" animationDuration=".5s" />
                    </div>
                ) : (
                    <DataTableWithCRUD
                        data={refTitleAspek}
                        loading={isLoading}
                        columns={[
                            // { field: 'id', header: 'Id' },
                            { field: 'Keterangan', header: 'Judul Aspek' }
                        ]}
                        onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHTITLEASPEK, { Keterangan }, setRefTitleAspek, 'Aspek berhasil ditambahkan')}
                        onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATETITLEASPEKBYID, Kode, { Keterangan }, 'Aspek berhasil diupdate')}
                        onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETETITLEASPEKBYID, Kode, 'Aspek berhasil dihapus')}
                        nameField="Keterangan"
                        inputLabel="Judul Aspek"
                    />
                )} */}
                    <TambahAspekPanel />
                </TabPanel>
                <TabPanel header="Tambah Jaminan">
                    {/* {isLoading ? (
                    <div className="flex justify-content-center align-items-center">
                        <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="7" fill="var(--surface-ground)" animationDuration=".5s" />
                    </div>
                ) : (
                    <>
                        <DataTableWithCRUD
                            data={refJenisAgunan}
                            columns={[
                                // { field: 'Kode', header: 'Kode' },
                                { field: 'Keterangan', header: 'Jenis Agunan' }
                            ]}
                            onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHJENISAGUNAN, { Keterangan }, setRefJenisAgunan, 'Jenis Agunan berhasil ditambahkan')}
                            onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATEJENISAGUNANBYID, Kode, { Keterangan }, 'Jenis Agunan berhasil diupdate')}
                            onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETEJENISAGUNANBYID, Kode, 'Jenis Agunan berhasil dihapus')}
                            idField="Kode"
                            nameField="Keterangan"
                            inputLabel="Jenis Agunan"
                        />
                        <DataTableWithCRUD
                            data={refHakMilik}
                            columns={[
                                // { field: 'Kode', header: 'Kode' },
                                { field: 'Keterangan', header: 'Hak Milik' }
                            ]}
                            onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHHAKMILIK, { Keterangan }, setRefHakMilik, 'Hak Milik berhasil ditambahkan')}
                            onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATEHAKMILIKBYID, Kode, { Keterangan }, 'Hak Milik berhasil diupdate')}
                            onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETEHAKMILIKBYID, Kode, 'Hak Milik berhasil dihapus')}
                            idField="Kode"
                            nameField="Keterangan"
                            inputLabel="Hak Milik"
                        />
                        <DataTableWithCRUD
                            data={refTipe}
                            columns={[
                                // { field: 'Kode', header: 'Kode' },
                                { field: 'Keterangan', header: 'Tipe' }
                            ]}
                            onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHTIPE, { Keterangan }, setRefTipe, 'Tipe berhasil ditambahkan')}
                            onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATETIPEBYID, Kode, { Keterangan }, 'Tipe berhasil diupdate')}
                            onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETETIPEBYID, Kode, 'Tipe berhasil dihapus')}
                            idField="Kode"
                            nameField="Keterangan"
                            inputLabel="Tipe"
                        />
                        <DataTableWithCRUD
                            data={refJenisPengikatan}
                            columns={[
                                // { field: 'Kode', header: 'Kode' },
                                { field: 'Keterangan', header: 'Jenis Pengikatan' }
                            ]}
                            onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHJENISPENGIKATAN, { Keterangan }, setRefJenisPengikatan, 'Jenis Pengikatan berhasil ditambahkan')}
                            onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATEJENISPENGIKATANBYID, Kode, { Keterangan }, 'Jenis Pengikatan berhasil diupdate')}
                            onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETEJENISPENGIKATANBYID, Kode, 'Jenis Pengikatan berhasil dihapus')}
                            idField="Kode"
                            nameField="Keterangan"
                            inputLabel="Jenis Pengikatan"
                        />
                        <DataTableWithCRUD
                            data={refHubunganPemilik}
                            columns={[
                                // { field: 'Kode', header: 'Kode' },
                                { field: 'Keterangan', header: 'Hubungan Pemilik' }
                            ]}
                            onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHHUBUNGANPEMILIK, { Keterangan }, setRefHubunganPemilik, 'Hubungan Pemilik berhasil ditambahkan')}
                            onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATEHUBUNGANPEMILIKBYID, Kode, { Keterangan }, 'Hubungan Pemilik berhasil diupdate')}
                            onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETEHUBUNGANPEMILIKBYID, Kode, 'Hubungan Pemilik berhasil dihapus')}
                            idField="Kode"
                            nameField="Keterangan"
                            inputLabel="Jenis Pengikatan"
                        />
                    </>
                )} */}
                    <TambahJaminanPanel />
                </TabPanel>
                <TabPanel header="Tambah Survey">
                    {/* {isLoading ? (
                    <div className="flex justify-content-center align-items-center">
                        <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="7" fill="var(--surface-ground)" animationDuration=".5s" />
                    </div>
                ) : (
                    <div>
                        <div className='mb-5'>
                            <div className='mb-2 flex justify-content-end'>
                                <Button label="Tambah" icon="pi pi-plus" style={{ border: '1', color: '#333' }} className='bg-blue-200 w-2' onClick={() => setVisibleAddSurvey(true)} />
                            </div>
                            <DataTable value={refSurvey} style={{ minWidth: '50rem' }} paginator rows={15} rowsPerPageOptions={[5, 10, 15]}>
                                <Column key="Kode" field="Kode" header="Kode" className='w-2' />
                                <Column key="Keterangan" field="Keterangan" header="Judul Survey" className='w-3' />
                                <Column key="pilihan_survey" field="pilihan_survey" header="Pilihan Survey" body={(rowData) => (
                                    <ul>
                                        {rowData.pilihan_survey.map((pilihan: any, index: any) => (
                                            <li key={index}>{pilihan.pertanyaan}</li>
                                        ))}
                                    </ul>
                                )} />
                                <Column key="Update" field="Update" header="Update" body={(rowData) => (
                                    <Button icon="pi pi-pencil" style={{ border: '1', color: '#333' }} className='bg-blue-200' onClick={() => handleEditSurvey(rowData.Kode)} />
                                )} />
                                <Column key="Delete" field="Delete" header="Delete" body={(rowData) => (
                                    <Button icon="pi pi-trash" style={{ border: '1', color: '#333' }} className='bg-red-200' onClick={() => handleDeleteSurvey(rowData.Kode)} />
                                )} />
                            </DataTable>
                            <Dialog header="Update" visible={visibleUpdateSurvey} style={{ width: '50vw' }} onHide={() => setVisibleUpdateSurvey(false)}>
                                <div className="p-fluid mb-5">
                                    <form onSubmit={handleUpdateSurvey}>
                                        <div className="field">
                                            <label htmlFor="judulSurveyUpdate" className='font-bold'>Judul Survey</label>
                                            <div className='flex flex-column gap-5'>
                                                <div className='flex gap-3 align-items-center'>
                                                    <InputText id="judulSurveyUpdate" value={judulSurveyUpdate} onChange={(e) => setJudulSurveyUpdate(e.target.value)} required />
                                                </div>
                                                <div className='flex flex-column gap-2'>
                                                    <label htmlFor="pertanyaanUpdate" className='font-bold'>Pilihan Survey</label>
                                                    {pilihanSurveyUpdate.map((pilihan, index) => (
                                                        <div key={index} className='flex gap-2'>
                                                            <InputText
                                                                id={`pilihanSurveyUpdate-${index}`}
                                                                value={pilihan}
                                                                onChange={(e) => handlePilihanSurveyUpdateChange(index, e.target.value)}
                                                                required
                                                            />
                                                            {index === pilihanSurveyUpdate.length - 1 && (
                                                                <Button icon="pi pi-plus" onClick={addPilihanSurveyUpdate} />
                                                            )}
                                                        </div>
                                                    ))}
                                                    <Button className='w-3 mt-2' type="submit" label="Simpan" icon="pi pi-check" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </Dialog>
                            <Dialog header="Tambah" visible={visibleAddSurvey} style={{ width: '50vw' }} onHide={() => setVisibleAddSurvey(false)}>
                                <div className="p-fluid mb-5">
                                    <form onSubmit={handleSubmitSurvey}>
                                        <div className="field">
                                            <label htmlFor="judulSurvey" className='font-bold'>Judul Survey</label>
                                            <div className='flex flex-column gap-5'>
                                                <div className='flex gap-3 align-items-center'>
                                                    <InputText id="judulSurvey" value={judulSurvey} onChange={(e) => setJudulSurvey(e.target.value)} required />
                                                </div>
                                                <div className='flex flex-column gap-2'>
                                                    <label htmlFor="pertanyaan" className='font-bold'>Pilihan Survey</label>
                                                    {pilihanSurvey.map((pilihan, index) => (
                                                        <div key={index} className='flex gap-2'>
                                                            <InputText
                                                                id={`pilihanSurvey-${index}`}
                                                                value={pilihan}
                                                                onChange={(e) => handlePilihanSurveyChange(index, e.target.value)}
                                                                required
                                                            />
                                                            {index === pilihanSurvey.length - 1 && (
                                                                <Button icon="pi pi-plus" onClick={addPilihanSurvey} />
                                                            )}
                                                        </div>
                                                    ))}
                                                    <Button className='w-3 mt-2' type="submit" label="Simpan" icon="pi pi-check" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </Dialog>
                        </div>
                    </div>
                )} */}
                    <TambahSurveyPanel />
                </TabPanel>
                <TabPanel header="Tambah Pengajuan">
                    {/* {isLoading ? (
                    <div className="flex justify-content-center align-items-center">
                        <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="7" fill="var(--surface-ground)" animationDuration=".5s" />
                    </div>
                ) : (
                    <>
                        <DataTableWithCRUD
                            data={refBidangUsaha}
                            columns={[
                                { field: 'Keterangan', header: 'Bidang Usaha' },
                            ]}
                            onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHBIDANGUSAHA, { Keterangan }, setRefBidangUsaha, 'Bidang Usaha berhasil ditambahkan')}
                            onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATEBIDANGUSAHA, Kode, { Keterangan }, 'Bidang Usaha berhasil diupdate')}
                            onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETEBIDANGUSAHA, Kode, 'Bidang Usaha berhasil dihapus')}
                            idField="Kode"
                            nameField="Keterangan"
                            inputLabel="Bidang Usaha"
                        />
                        <DataTableWithCRUD
                            data={refSifatKredit}
                            columns={[
                                { field: 'Keterangan', header: 'Sifat Kredit' },
                            ]}
                            onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHSIFATKREDIT, { Keterangan }, setRefSifatKredit, 'Sifat Kredit berhasil ditambahkan')}
                            onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATESIFATKREDIT, Kode, { Keterangan }, 'Sifat Kredit berhasil diupdate')}
                            onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETESIFATKREDIT, Kode, 'Sifat Kredit berhasil dihapus')}
                            idField="Kode"
                            nameField="Keterangan"
                            inputLabel="Sifat Kredit"
                        />
                        <DataTableWithCRUD
                            data={refJenisAngsuran}
                            columns={[
                                { field: 'Keterangan', header: 'Jenis Angsuran' },
                            ]}
                            onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHJENISANGURAN, { Keterangan }, setRefJenisAngsuran, 'Jenis Angsuran berhasil ditambahkan')}
                            onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATEJENISANGURAN, Kode, { Keterangan }, 'Jenis Angsuran berhasil diupdate')}
                            onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETEJENISANGURAN, Kode, 'Jenis Angsuran berhasil dihapus')}
                            idField="Kode"
                            nameField="Keterangan"
                            inputLabel="Jenis Angsuran"
                        />
                        <DataTableWithCRUD
                            data={refJenisPermohonan}
                            columns={[
                                { field: 'Keterangan', header: 'Jenis Permohonan' },
                            ]}
                            onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHJENISPERMOHONAN, { Keterangan }, setRefJenisPermohonan, 'Jenis Permohonan berhasil ditambahkan')}
                            onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATEJENISPERMOHONAN, Kode, { Keterangan }, 'Jenis Permohonan berhasil diupdate')}
                            onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETEJENISPERMOHONAN, Kode, 'Jenis Permohonan berhasil dihapus')}
                            idField="Kode"
                            nameField="Keterangan"
                            inputLabel="Jenis Permohonan"
                        />
                    </>
                )} */}
                    <TambahPengajuanPanel />
                </TabPanel>
                <TabPanel header="Tambah Data Debitur">
                    {/* {isLoading ? (
                    <div className="flex justify-content-center align-items-center">
                        <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="7" fill="var(--surface-ground)" animationDuration=".5s" />
                    </div>
                ) : (
                    <>
                        <DataTableWithCRUD
                            data={refSektorEkonomi}
                            columns={[
                                { field: 'Keterangan', header: 'Sektor Ekonomi' },
                            ]}
                            onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHSEKTORPEMOHON, { Keterangan }, setRefSektorEkonomi, 'Sektor Ekonomi berhasil ditambahkan')}
                            onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATESEKTORPERMOHON, Kode, { Keterangan }, 'Sektor Ekonomi berhasil diupdate')}
                            onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETESEKTORPERMOHON, Kode, 'Sektor Ekonomi berhasil dihapus')}  
                            idField="Kode"
                            nameField="Keterangan"
                            inputLabel="Sektor Ekonomi"
                        />
                        <DataTableWithCRUD
                            data={refStatusUsaha}
                            columns={[
                                { field: 'Keterangan', header: 'Status Usaha' },
                            ]}
                            onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHSTATUSUSAHA, { Keterangan }, setRefStatusUsaha, 'Status Usaha berhasil ditambahkan')}
                            onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATESTATUSUSAHA, Kode, { Keterangan }, 'Status Usaha berhasil diupdate')}
                            onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETESTATUSUSAHA, Kode, 'Status Usaha berhasil dihapus')}  
                            idField="Kode"
                            nameField="Keterangan"
                            inputLabel="Status Usaha"
                        />
                        <DataTableWithCRUD
                            data={refStatusTempatTinggal}
                            columns={[
                                { field: 'Keterangan', header: 'Status Tempat Tinggal' },
                            ]}
                            onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHSTATUSTEMPATTINGGAL, { Keterangan }, setRefStatusTempatTinggal, 'Status Tempat Tinggal berhasil ditambahkan')}
                            onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATESTATUSTEMPATTINGGAL, Kode, { Keterangan }, 'Status Tempat Tinggal berhasil diupdate')}
                            onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETESTATUSTEMPATTINGGAL, Kode, 'Status Tempat Tinggal berhasil dihapus')}  
                            idField="Kode"
                            nameField="Keterangan"
                            inputLabel="Status Tempat Tinggal"
                        />
                        <DataTableWithCRUD
                            data={refProfesiSampingan}
                            columns={[
                                { field: 'Keterangan', header: 'Profesi Sampingan' },
                            ]}
                            onAdd={(Keterangan: any) => handleAdd(API_ENDPOINTS.TAMBAHPROFESISAMPAINGAN, { Keterangan }, setRefProfesiSampingan, 'Profesi Sampingan berhasil ditambahkan')}
                            onUpdate={(Kode: string, Keterangan: string) => handleUpdate(API_ENDPOINTS.UPDATEPROFESISAMPAINGAN, Kode, { Keterangan }, 'Profesi Sampingan berhasil diupdate')}
                            onDelete={(Kode: string) => handleDelete(API_ENDPOINTS.DELETEPROFESISAMPAINGAN, Kode, 'Profesi Sampingan berhasil dihapus')}  
                            idField="Kode"
                            nameField="Keterangan"
                            inputLabel="Profesi Sampingan"
                        />
                    </>
                )} */}
                    <TambahDataDebiturPanel />
                </TabPanel>
            </TabView>
        </div>
    );
};

export default TambahanAnalisaKredit;