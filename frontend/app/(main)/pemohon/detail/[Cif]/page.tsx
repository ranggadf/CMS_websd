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

const DetailPemohon = () => {
    const [pemohon, setPemohon] = useState<any>(null);
    const [provinces, setProvinces] = useState<Location[]>([]);
    const [regencies, setRegencies] = useState<Location[]>([]);
    const [districts, setDistricts] = useState<Location[]>([]);
    const [villages, setVillages] = useState<Location[]>([]);
    const [provincesUsaha, setProvincesUsaha] = useState<Location[]>([]);
    const [regenciesUsaha, setRegenciesUsaha] = useState<Location[]>([]);
    const [districtsUsaha, setDistrictsUsaha] = useState<Location[]>([]);
    const [villagesUsaha, setVillagesUsaha] = useState<Location[]>([]);
    const [showFotoKTPDialog, setShowFotoKTPDialog] = useState(false);

    const userStatus = JSON.parse(localStorage.getItem('user-info') || '{}').status;
    const params = useParams();
    const Cif = params?.Cif;

    useEffect(() => {
        if (Cif) {
            fetchPemohon(Cif);
        }
    }, [Cif]);

    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    };

    const fetchPemohon = async (Cif: string) => {
        try {
            const response = await axios.get(API_ENDPOINTS.GETPEMOHONBYCIF(Cif));
            const formattedData = {
                ...response.data,
                TglLahir: formatDate(response.data.TglLahir),
                ktp_berlaku: formatDate(response.data.ktp_berlaku),
                tanggal_mulai_usaha: formatDate(response.data.tanggal_mulai_usaha),
                masa_laku: formatDate(response.data.masa_laku),
                produk: response.data.produk.map((item: any) => ({
                    ...item,
                    tanggal_aplikasi: formatDate(item.tanggal_aplikasi),
                    tanggal_permohonan: formatDate(item.tanggal_permohonan),
                    jaminan: item.jaminan ? {
                        ...item.jaminan,
                        tahunPembuatan: formatDate(item.jaminan.tahunPembuatan)
                    } : null
                }))
            };
            setPemohon(formattedData);
            console.log(formattedData);
        } catch (error) {
            console.error('Error mengambil data pemohon:', error);
        }
    };

    const fetchProvinces = async () => {
        try {
            const response = await fetch('https://andhikaaw.github.io/api-wilayah-indonesia/api/provinces.json');
            const data = await response.json();
            setProvinces(data);
            setProvincesUsaha(data);
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    };

    const fetchRegencies = async (provinceId: string) => {
        try {
            const response = await fetch(`https://andhikaaw.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
            const data = await response.json();
            setRegencies(data);
        } catch (error) {
            console.error('Error fetching regencies:', error);
        }
    };

    const fetchRegenciesUsaha = async (provinceId: string) => {
        try {
            const response = await fetch(`https://andhikaaw.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
            const data = await response.json();
            setRegenciesUsaha(data);
        } catch (error) {
            console.error('Error fetching regencies usaha:', error);
        }
    };

    const fetchDistricts = async (regencyId: string) => {
        try {
            const response = await fetch(`https://andhikaaw.github.io/api-wilayah-indonesia/api/districts/${regencyId}.json`);
            const data = await response.json();
            setDistricts(data);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    const fetchDistrictsUsaha = async (regencyId: string) => {
        try {
            const response = await fetch(`https://andhikaaw.github.io/api-wilayah-indonesia/api/districts/${regencyId}.json`);
            const data = await response.json();
            setDistrictsUsaha(data);
        } catch (error) {
            console.error('Error fetching districts usaha:', error);
        }
    };

    const fetchVillages = async (districtId: string) => {
        try {
            const response = await fetch(`https://andhikaaw.github.io/api-wilayah-indonesia/api/villages/${districtId}.json`);
            const data = await response.json();
            setVillages(data);
        } catch (error) {
            console.error('Error fetching villages:', error);
        }
    };

    const fetchVillagesUsaha = async (districtId: string) => {
        try {
            const response = await fetch(`https://andhikaaw.github.io/api-wilayah-indonesia/api/villages/${districtId}.json`);
            const data = await response.json();
            setVillagesUsaha(data);
        } catch (error) {
            console.error('Error fetching villages usaha:', error);
        }
    };

    useEffect(() => {
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (pemohon) {
            fetchRegencies(pemohon.provinsi);
            fetchRegenciesUsaha(pemohon.provinsi_usaha);
        }
    }, [pemohon]);

    useEffect(() => {
        if (pemohon && regencies.length > 0) {
            fetchDistricts(pemohon.kota);
        }
    }, [pemohon, regencies]);

    useEffect(() => {
        if (pemohon && regenciesUsaha.length > 0) {
            fetchDistrictsUsaha(pemohon.kota_usaha);
        }
    }, [pemohon, regenciesUsaha]);

    useEffect(() => {
        if (pemohon && districts.length > 0) {
            fetchVillages(pemohon.kecamatan);
        }
    }, [pemohon, districts]);

    useEffect(() => {
        if (pemohon && districtsUsaha.length > 0) {
            fetchVillagesUsaha(pemohon.kecamatan_usaha);
        }
    }, [pemohon, districtsUsaha]);


    const getLocationName = (id: string, locations: Location[]) => {
        const location = locations.find(loc => loc.id === id);
        return location ? location.name : 'Data tidak ditemukan';
    };

    if (!pemohon) {
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

    const header = (icon: React.ReactNode, title: string) => (
        <div className="flex align-items-center">
            {icon}
            <span className="ml-2 font-bold">{title}</span>
        </div>
    );

    const InfoItem = ({ label, value }: { label: string; value: any }) => (
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

    console.log(pemohon);
    return (
        <div className="surface-card shadow-2 border-round p-4">
            <h2 className="text-2xl font-bold mb-4">Detail Debitur</h2>
            <div className="grid p-4">
                <div className="col-12 md:col-4">
                    <div>
                        <Panel header={header(<User />, "Data Diri Pemohon")}>
                            <InfoItem label="CIF" value={pemohon.Cif} />
                            <InfoItem label="Nama" value={pemohon.Nama} />
                            <InfoItem label="Tempat Lahir" value={pemohon.TempatLahir} />
                            <InfoItem label="Tanggal Lahir" value={pemohon.TglLahir} />
                            <InfoItem label="Jenis Kelamin" value={pemohon.Kelamin === 'L' ? 'Laki-laki' : 'Perempuan'} />
                            <InfoItem label="Status Perkawinan" value={pemohon.StatusPerkawinan} />
                            <InfoItem label="KTP" value={pemohon.KTP} />
                            <InfoItem label="Nama Ibu Kandung" value={pemohon.nama_ibu_kandung} />
                            <InfoItem label="Jumlah Tanggungan" value={pemohon.jumlah_tanggungan + ' Orang'} />
                            <InfoItem label="KTP Berlaku" value={pemohon.ktp_berlaku} />
                            <InfoItem label="No HP" value={pemohon.no_hp} />
                            <InfoItem label="Profesi Sampingan" value={pemohon.ref_profesi_sampingan.Keterangan} />
                            <InfoItem label="Foto KTP" value={<a href="#" onClick={() => setShowFotoKTPDialog(true)}>Lihat Foto KTP</a>} />
                            <Dialog visible={showFotoKTPDialog} onHide={() => setShowFotoKTPDialog(false)} header="Foto KTP">
                                <div style={{ width: '600px', height: '400px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #ccc', marginTop: '20px', background: '#ccc' }}>
                                    {pemohon.foto_ktp ? (
                                        <img
                                            src={`${pemohon.foto_ktp}`}
                                            alt="foto_ktp"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div className="avatar-fallback">img</div>
                                    )}
                                </div>
                            </Dialog>
                            
                        </Panel>
                    </div>
                </div>
                <div className="col-12 md:col-4">
                    <div>
                        <Panel header={header(<Home />, "Alamat Pemohon")}>
                            <InfoItem label="Alamat" value={pemohon.Alamat} />
                            <InfoItem label="Kode Pos" value={pemohon.kode_pos} />
                            <InfoItem label="Provinsi" value={getLocationName(pemohon.provinsi, provinces)} />
                            <InfoItem label="Kota/Kabupaten" value={getLocationName(pemohon.kota, regencies)} />
                            <InfoItem label="Kecamatan" value={getLocationName(pemohon.kecamatan, districts)} />
                            <InfoItem label="Kelurahan/Desa" value={getLocationName(pemohon.kelurahan, villages)} />
                            <InfoItem label="Telepon" value={pemohon.telepon} />
                            <InfoItem label="Fax" value={pemohon.fax} />
                            <InfoItem label="Status Tempat Tinggal" value={pemohon.ref_status_tempat_tinggal.Keterangan} />
                            <InfoItem label="Lama Tinggal" value={pemohon.lama_tinggal + ' Tahun'} />
                        </Panel>
                    </div>
                </div>

                <div className="col-12 md:col-4">
                    <div>
                        <Panel header={header(<Briefcase />, "Data Usaha")}>
                            <InfoItem label="Nama Usaha" value={pemohon.nama_usaha} />
                            <InfoItem label="Tanggal Mulai Usaha" value={pemohon.tanggal_mulai_usaha} />
                            <InfoItem label="Status Tempat Usaha" value={pemohon.ref_status_usaha.Keterangan} />
                            <InfoItem label="Surat Keterangan Usaha" value={pemohon.surat_keterangan_usaha} />
                            <InfoItem label="Jumlah Karyawan" value={pemohon.jumlah_karyawan + ' Orang'} />
                            <InfoItem label="Jarak Lokasi Usaha" value={pemohon.jarak_lokasi_usaha + ' Km'} />
                            <InfoItem label="Masa Laku" value={pemohon.masa_laku} />
                            <InfoItem label="Alamat Usaha" value={pemohon.alamat_usaha} />
                            <InfoItem label="Kode Pos Usaha" value={pemohon.kode_pos_usaha} />
                            <InfoItem label="Provinsi Usaha" value={getLocationName(pemohon.provinsi_usaha, provincesUsaha)} />
                            <InfoItem label="Kota Usaha" value={getLocationName(pemohon.kota_usaha, regenciesUsaha)} />
                            <InfoItem label="Kecamatan Usaha" value={getLocationName(pemohon.kecamatan_usaha, districtsUsaha)} />
                            <InfoItem label="Kelurahan Usaha" value={getLocationName(pemohon.kelurahan_usaha, villagesUsaha)} />
                            {/* <InfoItem label="Foto KTP" value={fotoKtpUrl} /> */}
                        </Panel>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DetailPemohon;

