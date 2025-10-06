

'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import { Card } from 'primereact/card';
import { TabPanel, TabView } from 'primereact/tabview';
import { Briefcase, FileText, Home, User } from 'lucide-react';
import Link from 'next/link';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import formatToRupiah from '@/app/(full-page)/component/formatRupiah/page';
import { Dialog } from 'primereact/dialog';

interface Location {
    id: string;
    name: string;
}

const DetailPengajuan = () => {
    const [pengajuan, setPengajuan] = useState<any>(null);
    const [userStatus, setUserStatus] = useState<number>();
    useEffect(() => {
        const cookies = document.cookie.split(';');
        const userInfoCookie = cookies.find(cookie => cookie.trim().startsWith('user-info='));
        if (userInfoCookie) {
            const userInfo = userInfoCookie.split('=')[1];
            const user = JSON.parse(userInfo);
            setUserStatus(user.status);
        }
    }, []);
    // const [visible, setVisible] = useState(false);
    // const [selectedRow, setSelectedRow] = useState<any>({});
    const params = useParams();
    const no_pengajuan = params?.no_pengajuan;

    useEffect(() => {
        if (no_pengajuan) {
            fetchPengajuan(no_pengajuan);
        }
    }, [no_pengajuan]);

    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    };

    const fetchPengajuan = async (no_pengajuan: string) => {
        try {
            const response = await axios.get(API_ENDPOINTS.GETPRODUKBYID(no_pengajuan));
            const formattedData = {
                ...response.data,
                tanggal_aplikasi: formatDate(response.data.tanggal_aplikasi),
                tanggal_permohonan: formatDate(response.data.tanggal_permohonan),
                jaminan: response.data.jaminan ?
                    Object.keys(response.data.jaminan).reduce((acc: any, key: any) => {
                        if (key !== 'tanggalPembuatan') {
                            acc[key] = {
                                ...response.data.jaminan[key],
                                tanggalPembuatan: formatDate(response.data.jaminan[key].tanggalPembuatan)
                            };
                        }
                        return acc;
                    }, {})
                    : null
            };
            setPengajuan(formattedData);
            console.log(response.data);
        } catch (error) {
            console.error('Error mengambil data pemohon:', error);
        }
    };

    // const handleDelete = async (no_pengajuan: string) => {
    //     try {
    //         await axios.delete(API_ENDPOINTS.DELETEASPEKBYID(no_pengajuan));
    //         setPengajuan(null);
    //     } catch (error) {
    //         console.error('Kesalahan saat menghapus formulir pemohon:', error);
    //     }
    // };


    if (!pengajuan) {
        return <div>Memuat...</div>;
    }

    // const InfoItem = ({ label, value }: { label: string; value: string }) => (
    //     <div className="flex justify-between py-2">
    //         <span className="text-gray-600 flex flex-column">
    //             <span className='text-gray-800 font-bold'>{label}:</span>
    //             <br />
    //             {value}
    //         </span>
    //     </div>
    // );

    // console.log(selectedRow);
    const header = (icon: React.ReactNode, title: string, path: string) => (
        <div className='flex justify-content-between w-full bg-gray-100 p-3 border-gray-200 border-top-1 border-left-1 border-right-1'>
            <div className="flex align-items-center">
                {icon}
                <span className="ml-2 font-bold">{title}</span>
            </div>
            <div className='flex justify-content-end'>
                {(userStatus === 1 || userStatus === 3) && pengajuan.status === 0 ? (
                    <div className='flex'>
                        <Link href={`/analisakredit/${path}/form${path}/${pengajuan.no_pengajuan}`}>
                            <Button icon="pi pi-pencil" style={{ border: '1', color: '#000000', borderColor: '#000000', transition: 'transform 0.3s ease-in-out' }} className='bg-transparent hover:scale-110 ' onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
                        </Link>

                    </div>
                ) : (
                    <span></span>
                )}
            </div>
        </div>
    );
    const InfoPengajuan = ({ label, value }: { label: string; value: string }) => (
        <div className="flex justify-content-between items-center">
            <div className='flex-column col-7 text-left '>
                <span className="text-gray-800 font-bold">{label}</span>
            </div>
            <div className='flex-column col-1 text-left'>
                <span>:</span>
            </div>
            <div className='flex-column col-7 text-left'>
                <span>{value}</span>
            </div>
        </div>
    );

    const InfoItem = ({ label, value }: { label: string; value: string }) => (
        <div className="flex justify-content-between items-center">
            <div className='flex-column col-5 text-left'>
                <span className="text-gray-800 font-bold">{label}</span>
            </div>
            <div className='flex-column col-1 text-right'>
                <span>:</span>
            </div>
            <div className='flex-column col-7 text-left'>
                <span>{value}</span>
            </div>
        </div>
    );
    const InfoItemSurvey = ({ label, value }: { label: string; value: string }) => (
        <div className="flex justify-content-between items-center">
            <div className='flex-column col-3 text-left'>
                <span className="text-gray-800 font-bold">{label}</span>
            </div>
            <div className='flex-column col-1 text-right'>
                <span>:</span>
            </div>
            <div className='flex-column col-8 text-left'>
                <span>{value}</span>
            </div>
        </div>
    );
    const InfoItemAspek = ({ label, value }: { label: string; value: string }) => (
        <div className="flex justify-content-between items-center">
            <div className='flex-column col-2 text-left '>
                <span className="text-gray-800 font-bold">{label}</span>
            </div>
            <div className='flex-column col-1 text-right'>
                <span>:</span>
            </div>
            <div className='flex-column col-9 text-left'>
                <span>{value}</span>
            </div>
        </div>
    );


    console.log(pengajuan);
    return (
        <div className="surface-card shadow-2 border-round p-4">
            <h2 className="text-2xl mb-5 ml-2">Detail Pengajuan {pengajuan?.no_pengajuan}</h2>
            <div key={pengajuan.id}>
                <div className="p-4 bg-gray-100 border-round-lg flex flex-column md:flex-row justify-content-between">
                    <div className="flex flex-column md:flex-row gap-0 md:gap-6">
                        <div className="mb-4 md:mb-0">
                            <InfoPengajuan label="CIF" value={pengajuan.Cif} />
                            <InfoPengajuan label="No Pengajuan" value={pengajuan.no_pengajuan} />
                            <InfoPengajuan label="Pengajuan" value={pengajuan.pengajuan} />
                            <InfoPengajuan label="Tanggal Permohonan" value={pengajuan.tanggal_permohonan} />
                            <InfoPengajuan label="Nomor Rekening" value={pengajuan.NomorRekening} />
                            <InfoPengajuan label="Sektor Ekonomi" value={pengajuan.ref_sektor_ekonomi?.Keterangan} />
                            <InfoPengajuan label="Bidang Usaha" value={pengajuan.ref_bidang_usaha?.Keterangan} />
                            <InfoPengajuan label="Sifat Kredit" value={pengajuan.ref_sifat_kredit?.Keterangan} />
                            <InfoPengajuan label="Plafon Kredit" value={pengajuan.plafon_kredit} />
                        </div>
                        <div className='ml-8'>
                            <InfoPengajuan label="Tanggal Aplikasi" value={pengajuan.tanggal_aplikasi} />
                            <InfoPengajuan label="Suku Bunga" value={pengajuan.suku_bunga} />
                            <InfoPengajuan label="Jangka Waktu" value={pengajuan.jangka_waktu} />
                            <InfoPengajuan label="No Aplikasi Sebelumnya" value={pengajuan.no_aplikasi_sebelumnya} />
                            <InfoPengajuan label="Jenis Permohonan" value={pengajuan.ref_jenis_permohonan?.Keterangan} />
                            <InfoPengajuan label="Jenis Angsuran" value={pengajuan.ref_jenis_angsuran?.Keterangan} />
                            <InfoPengajuan label="Tujuan Penggunaan" value={pengajuan.tujuan_penggunaan} />
                            <InfoPengajuan label="Detail Tujuan Penggunaan" value={pengajuan.detail_tujuan_penggunaan} />
                        </div>
                    </div>
                    <div className='flex justify-content-end mt-4 md:mt-0'>
                        {(userStatus === 1 || userStatus === 3) && pengajuan.status === 0 ? (
                            <Link href={`/pengajuan/formpengajuan/${pengajuan.no_pengajuan}`}>
                                <Button icon="pi pi-pencil" style={{ border: '1', color: '#000000', borderColor: '#000000', transition: 'transform 0.3s ease-in-out' }} className='bg-transparent hover:scale-110' onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
                            </Link>
                        ) : (
                            <span></span>
                        )}
                    </div>
                </div>
                <TabView>
                    <TabPanel header="Jaminan">
                        {pengajuan?.jaminan ? (
                            <Panel headerTemplate={header(<FileText />, "Jaminan", 'jaminan')}>
                                {Object.values(pengajuan.jaminan).map((jaminan: any, index: number) => (
                                    jaminan.id && (
                                        <div key={index} className='flex flex-column mb-4'>
                                            <p className='col-12 text-xl font-bold'>Jaminan {index + 1}</p>
                                            <div className='flex flex-column md:flex-row'>
                                                <div className='col-6 mb-4 md:mb-0'>
                                                    <InfoItem label="Nama Pemilik Jaminan" value={jaminan.namaPemilikJaminan} />
                                                    <InfoItem label="Tanggal Pembuatan" value={jaminan.tanggalPembuatan} />
                                                    <InfoItem label="Jenis Agunan" value={jaminan.ref_jenis_agunan?.Keterangan} />
                                                    <InfoItem label="Nilai Pasar" value={formatToRupiah(jaminan.nilaiPasar)} />
                                                    <InfoItem label="Nilai Yang Diagunkan" value={formatToRupiah(jaminan.nilaiTransaksi)} />
                                                </div>
                                                <div className='col-6 mb-4 md:mb-0 '>
                                                    {jaminan.keterangan && <InfoItem label="Keterangan" value={jaminan.keterangan} />}
                                                    {jaminan.jenis && <InfoItem label="Jenis" value={jaminan.jenis} />}
                                                    {jaminan.noRekening && <InfoItem label="No Rekening" value={jaminan.noRekening} />}
                                                    {jaminan.noBilyet && <InfoItem label="No Bilyet" value={jaminan.noBilyet} />}
                                                    {jaminan.nominal && <InfoItem label="Nominal" value={jaminan.nominal} />}
                                                    {jaminan.atasNama && <InfoItem label="Atas Nama" value={jaminan.atasNama} />}
                                                    {jaminan.alamat && <InfoItem label="Alamat" value={jaminan.alamat} />}
                                                    {jaminan.uraian && <InfoItem label="Uraian" value={jaminan.uraian} />}
                                                    {jaminan.berat && <InfoItem label="Berat" value={jaminan.berat} />}
                                                    {jaminan.jumlah && <InfoItem label="Jumlah" value={jaminan.jumlah} />}
                                                    {jaminan.kadar && <InfoItem label="Kadar" value={jaminan.kadar} />}
                                                    {jaminan.noMesin && <InfoItem label="No Mesin" value={jaminan.noMesin} />}
                                                    {jaminan.merk && <InfoItem label="Merk" value={jaminan.merk} />}
                                                    {jaminan.tipe && <InfoItem label="Tipe" value={jaminan.tipe} />}
                                                    {jaminan.tahun && <InfoItem label="Tahun" value={jaminan.tahun} />}
                                                    {jaminan.masaPajak && <InfoItem label="Masa Pajak" value={jaminan.masaPajak} />}
                                                    {jaminan.noRangka && <InfoItem label="No Rangka" value={jaminan.noRangka} />}
                                                    {jaminan.jumlahRoda && <InfoItem label="Jumlah Roda" value={jaminan.jumlahRoda} />}
                                                    {jaminan.noSTNK && <InfoItem label="No STNK" value={jaminan.noSTNK} />}
                                                    {jaminan.noPolisi && <InfoItem label="No Polisi" value={jaminan.noPolisi} />}
                                                    {jaminan.noBPKB && <InfoItem label="No BPKB" value={jaminan.noBPKB} />}
                                                    {jaminan.noRegBPKB && <InfoItem label="No Reg BPKB" value={jaminan.noRegBPKB} />}
                                                    {jaminan.silinder && <InfoItem label="Silinder" value={jaminan.silinder} />}
                                                    {jaminan.warna && <InfoItem label="Warna" value={jaminan.warna} />}
                                                    {jaminan.noSHM && <InfoItem label="No SHM" value={jaminan.noSHM} />}
                                                    {jaminan.noGS && <InfoItem label="No GS" value={jaminan.noGS} />}
                                                    {jaminan.noNIB && <InfoItem label="No NIB" value={jaminan.noNIB} />}
                                                    {jaminan.jenisHakMilik && <InfoItem label="Jenis Hak Milik" value={jaminan.jenisHakMilik} />}
                                                    {jaminan.jenisSurat && <InfoItem label="Jenis Surat" value={jaminan.jenisSurat} />}
                                                    {jaminan.luas && <InfoItem label="Luas" value={jaminan.luas} />}
                                                    {jaminan.tanggalGS && <InfoItem label="Tanggal GS" value={jaminan.tanggalGS} />}
                                                    {jaminan.kota && <InfoItem label="Kota" value={jaminan.kota} />}
                                                    {jaminan.provinsi && <InfoItem label="Provinsi" value={jaminan.provinsi} />}
                                                    {jaminan.keadaanJaminan && <InfoItem label="Keadaan Jaminan" value={jaminan.keadaanJaminan} />}
                                                    {jaminan.batasUtara && <InfoItem label="Batas Utara" value={jaminan.batasUtara} />}
                                                    {jaminan.batasTimur && <InfoItem label="Batas Timur" value={jaminan.batasTimur} />}
                                                    {jaminan.batasSelatan && <InfoItem label="Batas Selatan" value={jaminan.batasSelatan} />}
                                                    {jaminan.batasBarat && <InfoItem label="Batas Barat" value={jaminan.batasBarat} />}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </Panel>
                        ) : (
                            <p>Tidak ada data Jaminan.</p>
                        )}
                    </TabPanel>
                    <TabPanel header="Financial">
                        {pengajuan?.financial ? (
                            <Panel headerTemplate={header(<FileText />, "Financial", 'financial')}>
                                <div className='flex flex-column md:flex-row'>
                                    <div className='w-full md:w-4 mb-4 md:mb-0'>
                                        <InfoItem label="Omset Ramai" value={formatToRupiah(pengajuan.financial.oms_ramai)} />
                                        <InfoItem label="Omset Normal" value={formatToRupiah(pengajuan.financial.oms_normal)} />
                                        <InfoItem label="Omset Sepi" value={formatToRupiah(pengajuan.financial.oms_sepi)} />
                                        <InfoItem label="Harga Pokok Jual" value={formatToRupiah(pengajuan.financial.hrg_pokok_jual)} />
                                        <InfoItem label="BTK Tidak Langsung" value={formatToRupiah(pengajuan.financial.btk_tdklangsung)} />
                                        <InfoItem label="OHC" value={formatToRupiah(pengajuan.financial.ohc)} />
                                        <InfoItem label="Biaya Usaha lainnya" value={formatToRupiah(pengajuan.financial.b_usahalainnya)} />
                                        <InfoItem label="Biaya Rumahtangga" value={formatToRupiah(pengajuan.financial.b_rumahtangga)} />
                                        <InfoItem label="Biaya Sekolah" value={formatToRupiah(pengajuan.financial.b_sekolah)} />
                                        <InfoItem label="Biaya PLN PDAM" value={formatToRupiah(pengajuan.financial.b_pln_pdam)} />
                                        <InfoItem label="Biaya Transport Komunikasi" value={formatToRupiah(pengajuan.financial.b_transport_komunikasi)} />
                                        <InfoItem label="Biaya Lain Lain" value={formatToRupiah(pengajuan.financial.b_lain_lain)} />
                                        <InfoItem label="Pendapatan Lainnya" value={formatToRupiah(pengajuan.financial.p_lainnya)} />
                                        <InfoItem label="Biaya Lainnya" value={formatToRupiah(pengajuan.financial.b_Lainnya)} />
                                        <InfoItem label="Bukti Pendapatan" value={pengajuan.financial.bukti_pendapatan} />
                                    </div>
                                    <div className='w-full md:w-4 mb-4 ml-4 md:mb-0'>
                                        <InfoItem label="Bukti Biaya" value={pengajuan.financial.bukti_biaya} />
                                        <InfoItem label="Bank Non-Bank" value={formatToRupiah(pengajuan.financial.bank_nonbank)} />
                                        <InfoItem label="Koperasi" value={formatToRupiah(pengajuan.financial.koperasi)} />
                                        <InfoItem label="Lain-Lain" value={formatToRupiah(pengajuan.financial.lainLain)} />
                                        <InfoItem label="Angsuran Baru" value={formatToRupiah(pengajuan.financial.angsuran_baru)} />
                                        <InfoItem label="Kas" value={formatToRupiah(pengajuan.financial.kas)} />
                                        <InfoItem label="Bank" value={formatToRupiah(pengajuan.financial.bank)} />
                                        <InfoItem label="Piutang" value={formatToRupiah(pengajuan.financial.piutang)} />
                                        <InfoItem label="Persediaan Barang" value={formatToRupiah(pengajuan.financial.persediaan_barang)} />
                                        <InfoItem label="Aktiva Lancar Lainnya" value={formatToRupiah(pengajuan.financial.atv_lancar_lainnya)} />
                                        <InfoItem label="Sub Aktiva Lancar" value={formatToRupiah(pengajuan.financial.sub_atv_lancar)} />
                                        <InfoItem label="Tanah Bangunan" value={formatToRupiah(pengajuan.financial.tanah_bangunan)} />
                                        <InfoItem label="Peralatan Usaha" value={formatToRupiah(pengajuan.financial.peralatan_usaha)} />
                                        <InfoItem label="Kendaraan" value={formatToRupiah(pengajuan.financial.kendaraan)} />
                                        <InfoItem label="Aktiva Tetap Lainnya" value={formatToRupiah(pengajuan.financial.atv_tetap_lainnya)} />
                                    </div>
                                    <div className='w-full md:w-4 mb-4 ml-4 md:mb-0'>
                                        <InfoItem label="Sub Aktiva Tetap" value={formatToRupiah(pengajuan.financial.sub_atv_tetap)} />
                                        <InfoItem label="Jumlah Aktiva" value={formatToRupiah(pengajuan.financial.jumlah_atv)} />
                                        <InfoItem label="Total BDP Jangka Pendek" value={formatToRupiah(pengajuan.financial.tot_bdp_jangka_pendek)} />
                                        <InfoItem label="IDR Jangka Pendek" value={formatToRupiah(pengajuan.financial.idr_jangka_pendek)} />
                                        <InfoItem label="Jangka Pendek" value={formatToRupiah(pengajuan.financial.jangka_pendek)} />
                                        <InfoItem label="Total BDP Jangka Panjang" value={formatToRupiah(pengajuan.financial.tot_bdp_jangka_panjang)} />
                                        <InfoItem label="IDR Jangka Panjang" value={formatToRupiah(pengajuan.financial.idr_jangka_panjang)} />
                                        <InfoItem label="Jangka Panjang" value={formatToRupiah(pengajuan.financial.jangka_panjang)} />
                                        <InfoItem label="Sub Jumlah Hutang" value={formatToRupiah(pengajuan.financial.sub_jumlah_hutang)} />
                                        <InfoItem label="Modal Sendiri" value={formatToRupiah(pengajuan.financial.modal_sendiri)} />
                                        <InfoItem label="Laba" value={formatToRupiah(pengajuan.financial.laba)} />
                                        <InfoItem label="Sub Jumlah Modal" value={formatToRupiah(pengajuan.financial.sub_jumlah_modal)} />
                                        <InfoItem label="Jumlah Passiva" value={formatToRupiah(pengajuan.financial.jumlah_passiva)} />
                                    </div>
                                </div>
                            </Panel>
                        ) : (
                            <p>Tidak ada data Financial.</p>
                        )}
                    </TabPanel>
                    <TabPanel header="Survey">
                        {pengajuan?.survey.length > 0 ? (
                            <Panel headerTemplate={header(<FileText />, "Survey", 'survey')}>
                                {pengajuan.survey.map((survey: any, index: any) => (
                                    <InfoItemSurvey key={index} label={survey.Keterangan} value={survey.Pilihan} />
                                ))}
                            </Panel>
                        ) : (
                            <p>Tidak ada data Survey.</p>
                        )}
                    </TabPanel>
                    <TabPanel header="Aspek Form">
                        {pengajuan?.aspek_form.length > 0 ? (
                            <Panel headerTemplate={header(<FileText />, "Aspek Form", 'aspek')}>
                                {pengajuan.aspek_form.map((aspekForm: any, index: any) => (
                                    <InfoItemAspek key={index} label={aspekForm.Keterangan} value={aspekForm.jawaban} />
                                ))}
                            </Panel>
                        ) : (
                            <p>Tidak ada data Aspek Form.</p>
                        )}
                    </TabPanel>
                    <TabPanel header="Lima C">
                        {pengajuan?.lima_c ? (
                            <Panel headerTemplate={header(<FileText />, "Lima C", '5c')}>
                                <InfoItemAspek label="Characters" value={pengajuan.lima_c.characters} />
                                <InfoItemAspek label="Capacity" value={pengajuan.lima_c.capacity} />
                                <InfoItemAspek label="Capital" value={pengajuan.lima_c.capital} />
                                <InfoItemAspek label="Collateral" value={pengajuan.lima_c.collateral} />
                                <InfoItemAspek label="Conditions" value={pengajuan.lima_c.conditions} />
                            </Panel>
                        ) : (
                            <p>Tidak ada data Lima C.</p>
                        )}
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default DetailPengajuan;

