"use client"
import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { TabPanel, TabView } from 'primereact/tabview';
import { Dialog } from 'primereact/dialog';
import { Copy, Search } from 'lucide-react';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FileUpload } from 'primereact/fileupload';

const EditFormPemohon = () => {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);
    const [pemohon, setPemohon] = useState<any>([]);
    const [statusTempatUsaha, setStatusTempatUsaha] = useState<any>([]);
    const [statusTempatTinggal, setStatusTempatTinggal] = useState<any>([]);
    const [profesiSampingan, setProfesiSampingan] = useState<any>([]);
    const [visible, setVisible] = useState(false);
    const [Isloading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filteredPemohon, setFilteredPemohon] = useState(pemohon);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);
    const [provincesUsaha, setProvincesUsaha] = useState([]);
    const [regenciesUsaha, setRegenciesUsaha] = useState([]);
    const [districtsUsaha, setDistrictsUsaha] = useState([]);
    const [villagesUsaha, setVillagesUsaha] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState<any>(null);
    const [selectedProvinceUsaha, setSelectedProvinceUsaha] = useState<any>(null);
    const [selectedRegency, setSelectedRegency] = useState<any>(null);
    const [selectedRegencyUsaha, setSelectedRegencyUsaha] = useState<any>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
    const [selectedDistrictUsaha, setSelectedDistrictUsaha] = useState<any>(null);
    const [selectedVillage, setSelectedVillage] = useState<any>(null);
    const [selectedVillageUsaha, setSelectedVillageUsaha] = useState<any>(null);
    // const [provinsiId, setProvinsiId] = useState<any>(null);
    // const [provinsiIdUsaha, setProvinsiIdUsaha] = useState<any>(null);
    // const [regencyId, setRegencyId] = useState<any>(null);
    // const [regencyIdUsaha, setRegencyIdUsaha] = useState<any>(null);
    // const [districtId, setDistrictId] = useState<any>(null);
    // const [districtIdUsaha, setDistrictIdUsaha] = useState<any>(null);

    const params = useParams();
    const Cif = params?.Cif;
    useEffect(() => {
        if (Cif) {
            fetchPemohon(Cif);
        }
    }, [Cif]);

    const fetchPemohon = async (Cif: any) => {
        try {
            const response = await axios.get(API_ENDPOINTS.GETPEMOHONBYCIF(Cif));
            setFormData(response.data);
            console.log(response.data);

            if (response.data.provinsi) await fetchProvinces(response.data.provinsi);
            if (response.data.kota) await fetchRegencies(response.data.provinsi, response.data.kota);
            if (response.data.kecamatan) await fetchDistricts(response.data.kota, response.data.kecamatan);
            if (response.data.kelurahan) await fetchVillages(response.data.kecamatan, response.data.kelurahan);

            if (response.data.provinsi_usaha) await fetchProvincesUsaha(response.data.provinsi_usaha);
            if (response.data.kota_usaha) await fetchRegenciesUsaha(response.data.provinsi_usaha, response.data.kota_usaha);
            if (response.data.kecamatan_usaha) await fetchDistrictsUsaha(response.data.kota_usaha, response.data.kecamatan_usaha);
            if (response.data.kelurahan_usaha) await fetchVillagesUsaha(response.data.kecamatan_usaha, response.data.kelurahan_usaha);
        } catch (error) {
            console.error('Error fetching pemohon data:', error);
        }
    };

    const [formData, setFormData] = useState({
        //form data pemohon
        Cif: '', TempatLahir: '', Kelamin: '', StatusPerkawinan: '', KTP: '', profesi_sampingan: '', Nama: '', TglLahir: '', nama_ibu_kandung: '', jumlah_tanggungan: '', ktp_berlaku: '', no_hp: '',
        //form alamat pemohon
        Alamat: '', kode_pos: '', provinsi: '', kecamatan: '', telepon: '', status_tempat_tinggal: '', kota: '', kelurahan: '', fax: '', lama_tinggal: '',
        //form data usaha
        nama_usaha: '', tanggal_mulai_usaha: '', status_tempat_usaha: '', surat_keterangan_usaha: '', jumlah_karyawan: '', jarak_lokasi_usaha: '', masa_laku: '', alamat_usaha: '', kode_pos_usaha: '', provinsi_usaha: '', kecamatan_usaha: '', kota_usaha: '', kelurahan_usaha: ''
    });
    const resetForm = () => {
        setFormData({
            //form data pemohon
            Cif: '', TempatLahir: '', Kelamin: '', StatusPerkawinan: '', KTP: '', profesi_sampingan: '', Nama: '', TglLahir: '', nama_ibu_kandung: '', jumlah_tanggungan: '', ktp_berlaku: '', no_hp: '',
            //form alamat pemohon
            Alamat: '', kode_pos: '', provinsi: '', kecamatan: '', telepon: '', status_tempat_tinggal: '', kota: '', kelurahan: '', fax: '', lama_tinggal: '',
            //form data usaha
            nama_usaha: '', tanggal_mulai_usaha: '', status_tempat_usaha: '', surat_keterangan_usaha: '', jumlah_karyawan: '', jarak_lokasi_usaha: '', masa_laku: '', alamat_usaha: '', kode_pos_usaha: '', provinsi_usaha: '', kecamatan_usaha: '', kota_usaha: '', kelurahan_usaha: ''
        });
    };

    const fetchProvinces = async (selectedProvinceId = null) => {
        try {
            const response = await fetch('https://andhikaaw.github.io/api-wilayah-indonesia/api/provinces.json');
            const provinces = await response.json();
            setProvinces(provinces);
            if (selectedProvinceId) {
                const selectedProvince = provinces.find((province: any) => province.id === selectedProvinceId);
                setSelectedProvince(selectedProvince);
            }
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    };

    const fetchRegencies = async (provinceId: any, selectedRegencyId = null) => {
        try {
            const response = await fetch(`https://andhikaaw.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
            const regencies = await response.json();
            setRegencies(regencies);
            if (selectedRegencyId) {
                const selectedRegency = regencies.find((regency: any) => regency.id === selectedRegencyId);
                setSelectedRegency(selectedRegency);
            }
        } catch (error) {
            console.error('Error fetching regencies:', error);
        }
    };

    const fetchDistricts = async (regencyId: any, selectedDistrictId = null) => {
        try {
            const response = await fetch(`https://andhikaaw.github.io/api-wilayah-indonesia/api/districts/${regencyId}.json`);
            const districts = await response.json();
            setDistricts(districts);
            if (selectedDistrictId) {
                const selectedDistrict = districts.find((district: any) => district.id === selectedDistrictId);
                setSelectedDistrict(selectedDistrict);
            }
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    const fetchVillages = async (districtId: any, selectedVillageId = null) => {
        try {
            const response = await fetch(`https://andhikaaw.github.io/api-wilayah-indonesia/api/villages/${districtId}.json`);
            const villages = await response.json();
            setVillages(villages);
            if (selectedVillageId) {
                const selectedVillage = villages.find((village: any) => village.id === selectedVillageId);
                setSelectedVillage(selectedVillage);
            }
        } catch (error) {
            console.error('Error fetching villages:', error);
        }
    };
    useEffect(() => {
        const fetchInitialData = async () => {
            if (formData.provinsi_usaha) {
                await fetchProvincesUsaha(formData.provinsi_usaha);
            }
            if (formData.kota_usaha) {
                await fetchRegenciesUsaha(formData.provinsi_usaha, formData.kota_usaha);
            }
            if (formData.kecamatan_usaha) {
                await fetchDistrictsUsaha(formData.kota_usaha, formData.kecamatan_usaha);
            }
            if (formData.kelurahan_usaha) {
                await fetchVillagesUsaha(formData.kecamatan_usaha, formData.kelurahan_usaha);
            }
        };

        fetchInitialData();
    }, [formData]);

    const fetchProvincesUsaha = async (selectedProvinceId: any) => {
        try {
            const response = await fetch('https://andhikaaw.github.io/api-wilayah-indonesia/api/provinces.json');
            const provincesusaha = await response.json();
            setProvincesUsaha(provincesusaha);
            if (selectedProvinceId) {
                const selectedProvince = provincesusaha.find((province: any) => province.id === selectedProvinceId);
                setSelectedProvinceUsaha(selectedProvince);
            }
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    };

    const fetchRegenciesUsaha = async (provinceId: any, selectedRegencyId: any) => {
        try {
            const response = await fetch(`https://andhikaaw.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
            const regenciesusaha = await response.json();
            setRegenciesUsaha(regenciesusaha);
            if (selectedRegencyId) {
                const selectedRegency = regenciesusaha.find((regency: any) => regency.id === selectedRegencyId);
                setSelectedRegencyUsaha(selectedRegency);
            }
        } catch (error) {
            console.error('Error fetching regencies:', error);
        }
    };

    const fetchDistrictsUsaha = async (regencyId: any, selectedDistrictId: any) => {
        try {
            const response = await fetch(`https://andhikaaw.github.io/api-wilayah-indonesia/api/districts/${regencyId}.json`);
            const districtsusaha = await response.json();
            setDistrictsUsaha(districtsusaha);
            if (selectedDistrictId) {
                const selectedDistrict = districtsusaha.find((district: any) => district.id === selectedDistrictId);
                setSelectedDistrictUsaha(selectedDistrict);
            }
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    const fetchVillagesUsaha = async (districtId: any, selectedVillageId: any) => {
        try {
            const response = await fetch(`https://andhikaaw.github.io/api-wilayah-indonesia/api/villages/${districtId}.json`);
            const villagesusaha = await response.json();
            setVillagesUsaha(villagesusaha);
            if (selectedVillageId) {
                const selectedVillage = villagesusaha.find((village: any) => village.id === selectedVillageId);
                setSelectedVillageUsaha(selectedVillage);
            }
        } catch (error) {
            console.error('Error fetching villages:', error);
        }
    };


    useEffect(() => {
        const fetchNasabah = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.GETNASABAH);
                const filteredData = response.data.map((item: any) => ({
                    ID: item.ID,
                    Cif: item.Kode,
                    Nama: item.Nama,
                    TempatLahir: item.TempatLahir,
                    Kelamin: item.Kelamin,
                    StatusPerkawinan: item.StatusPerkawinan,
                    KTP: item.KTP,
                    Alamat: item.Alamat
                }))
                setPemohon(filteredData);
            } catch (error) {
                console.error('There was an error fetching the users!', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNasabah();
    }, []);
    useEffect(() => {
        const fetchData = async (url: any, setter: any) => {
            try {
                const response = await axios.get(url);
                setter(response.data);
            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData(API_ENDPOINTS.GETSTATUSUSAHA, setStatusTempatUsaha);
        fetchData(API_ENDPOINTS.GETPROFESISAMPAINGAN, setProfesiSampingan);
        fetchData(API_ENDPOINTS.GETSTATUSTEMPATTINGGAL, setStatusTempatTinggal);
    }, []);

    const handleChange = async (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'Cif' && value) {
            try {
                const response = await axios.get(API_ENDPOINTS.GETNASABAHID(value));
                const nasabahData = response.data;
                setFormData((prevData) => ({
                    ...prevData,
                    ...nasabahData,
                }));

                if (nasabahData.provinsi) await fetchProvinces(nasabahData.provinsi);
                if (nasabahData.kota) await fetchRegencies(nasabahData.provinsi, nasabahData.kota);
                if (nasabahData.kecamatan) await fetchDistricts(nasabahData.kota, nasabahData.kecamatan);
                if (nasabahData.kelurahan) await fetchVillages(nasabahData.kecamatan, nasabahData.kelurahan);

                if (nasabahData.provinsi_usaha) await fetchProvincesUsaha(nasabahData.provinsi_usaha);
                if (nasabahData.kota_usaha) await fetchRegenciesUsaha(nasabahData.provinsi_usaha, nasabahData.kota_usaha);
                if (nasabahData.kecamatan_usaha) await fetchDistrictsUsaha(nasabahData.kota_usaha, nasabahData.kecamatan_usaha);
                if (nasabahData.kelurahan_usaha) await fetchVillagesUsaha(nasabahData.kecamatan_usaha, nasabahData.kelurahan_usaha);
            } catch (error) {
                console.error('Error fetching nasabah data:', error);
            }
        }
    };


    const copyAddress = () => {
        setFormData((prevData) => ({
            ...prevData,
            alamat_usaha: prevData.Alamat, kode_pos_usaha: prevData.kode_pos, provinsi_usaha: prevData.provinsi, kecamatan_usaha: prevData.kecamatan, kota_usaha: prevData.kota, kelurahan_usaha: prevData.kelurahan,
        }));
    };

    const handleNextTab = () => {
        if (activeIndex < 3) { // Asumsi Anda memiliki 4 tab panel
            setActiveIndex(activeIndex + 1);
        }
        // console.log(formData)
    };
    const handlePreviousTab = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let response;
            if (Cif) {
                response = await axios.put(API_ENDPOINTS.UPDATEPEMOHONBYID(Cif), formData);
            } else {
                response = await axios.post(API_ENDPOINTS.PEMOHON, formData);
            }
            console.log('Response from API:', response.data);
            setIsLoading(false);
            // setVisible(true);
            if (!Cif) resetForm();
            router.push('/pemohon');
        } catch (error) {
            console.error('Error submitting form:', error);
            setIsLoading(false);
        }
    };

    const template = (option: any, props: any, placeholder: string) => {
        return option ? <div className="flex align-items-center"><div>{option.name}</div></div> : <span>{placeholder}</span>;
    };
    const selectedProvinceTemplate = (option: any, props: any) => template(option, props, props.placeholder);
    const provinceOptionTemplate = (option: any) => template(option, {}, '');
    const selectedRegencyTemplate = (option: any, props: any) => template(option, props, props.placeholder);
    const regencyOptionTemplate = (option: any) => template(option, {}, '');
    const selectedDistrictTemplate = (option: any, props: any) => template(option, props, props.placeholder);
    const districtOptionTemplate = (option: any) => template(option, {}, '');
    const selectedVillageTemplate = (option: any, props: any) => template(option, props, props.placeholder);
    const villageOptionTemplate = (option: any) => template(option, {}, '');



    const statusTempatUsahaOptions = statusTempatUsaha.map((item: any) => ({ label: item.Keterangan, value: item.Kode }));
    const profesiSampinganOptions = profesiSampingan.map((item: any) => ({ label: item.Keterangan, value: item.Kode }));
    const statusTempatTinggalOptions = statusTempatTinggal.map((item: any) => ({ label: item.Keterangan, value: item.Kode }));

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">Data Pemohon</span>
        </div>
    );

    const onRowClick = (e: any) => {
        setFormData(prevData => ({
            ...prevData,
            ...e.data
        }));
        setVisible(false)
    };

    useEffect(() => {
        setFilteredPemohon(
            pemohon.filter((item: any) =>
                item.Cif.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
                item.Nama.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.KTP.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.Alamat.toLowerCase().includes(searchValue.toLowerCase())
            )
        );
    }, [searchValue, pemohon]);

    const onPageChange = (event: { first: number; rows: number }) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const paginatedPemohon = filteredPemohon.slice(first, first + rows);

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageChange = (event: any) => {
        const file = event.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setSelectedImage(base64String);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleUpload = async () => {
        if (!selectedImage) {
            return;
        }

        setIsUploading(true);

        try {
            setFormData(prevData => ({
                ...prevData,
                foto_ktp: selectedImage
            }));
            // const response = await fetch('/api/upload-foto-ktp', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ image: selectedImage }),
            // });

            // if (response.ok) {
            //     const result = await response.json();
                
            //     // toast.current?.show({ severity: 'success', summary: 'Sukses', detail: 'Foto KTP berhasil diunggah', life: 3000 });
            // } else {
            //     throw new Error('Gagal mengunggah foto');
            // }
        } catch (error) {
            console.error('Error uploading image:', error);
            // toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengunggah foto KTP', life: 3000 });
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        if (selectedImage) {
            handleUpload();
        }
    }, [selectedImage]);
    console.log(formData)
    console.log(visible)
    return (
        <div className="surface-card shadow-2 p-4 border-round">
            <form onSubmit={handleSubmit}>
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="Data Pemohon">
                        <fieldset className='grid md:justify-content-between border-round p-4 mb-4'>{/*data pemohon*/}
                            <legend className="text-xl font-bold">Data Pemohon</legend>
                            <div className="col-12 md:col-6">
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">CIF Debitur</label>
                                    <div className='flex gap-2'>
                                        <InputText required name='Cif' type="text" placeholder='Isikan dengan nomor cif anda' className="p-inputtext p-component w-full" value={formData.Cif} onChange={handleChange} />
                                        <div className='flex align-items-center cursor-pointer border-1 border-gray-300 p-2 border-round' onClick={() => setVisible(true)}>
                                            <Search style={{ backgroundColor: 'transparent', border: '1', color: '#333' }} />
                                        </div>
                                    </div>
                                    <Dialog visible={visible} modal header={headerElement} style={{ width: '70rem' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                                        <div className='flex'>
                                            <div>
                                                <div className="p-inputgroup mb-3 w-4">
                                                    <span className="p-inputgroup-addon"><i className="pi pi-search"></i></span>
                                                    <InputText placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="w-full" />
                                                </div>
                                                <DataTable value={paginatedPemohon} tableStyle={{ minWidth: '50rem' }} onRowClick={onRowClick} className='cursor-pointer' rowClassName={(data) => `hover:bg-gray-100`}>
                                                    <Column field="ID" header="ID" />
                                                    <Column field="Cif" header="CIF" />
                                                    <Column field="Nama" header="Nama Lengkap" />
                                                    <Column field="Kelamin" header="Jenis Kelamin" />
                                                    <Column field="StatusPerkawinan" header="Status Perkawinan" />
                                                    <Column field="KTP" header="No KTP" />
                                                    <Column field="Alamat" header="Alamat" />
                                                </DataTable>
                                                <Paginator
                                                    first={first}
                                                    rows={rows}
                                                    totalRecords={filteredPemohon.length}
                                                    rowsPerPageOptions={[5, 10, 20]}
                                                    onPageChange={onPageChange}
                                                />
                                            </div>
                                        </div>
                                    </Dialog>
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Tempat Lahir</label>
                                    <InputText required name='TempatLahir' type="text" placeholder='Isikan kota/Kabupaten tempat lahir debitur' className="p-inputtext p-component w-full" value={formData.TempatLahir} onChange={handleChange} />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-3">Jenis Kelamin</label>
                                    <div className='flex gap-3'>
                                        <div className='mb-2'>
                                            <RadioButton name="Kelamin" value="L" onChange={handleChange} checked={formData.Kelamin === 'L'} />
                                            <label htmlFor="" className="ml-2">laki-laki</label>
                                        </div>
                                        <div className='mb-2'>
                                            <RadioButton name="Kelamin" value="P" onChange={handleChange} checked={formData.Kelamin === 'P'} />
                                            <label htmlFor="" className="ml-2">perempuan</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Status Perkawinan</label>
                                    <Dropdown
                                        name='StatusPerkawinan'
                                        value={formData.StatusPerkawinan}
                                        onChange={handleChange}
                                        options={['Belum Kawin', 'Kawin']}
                                        placeholder="Status Perkawinan"
                                        className="w-full md:w-full"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">No. KTP</label>
                                    <InputText required name='KTP' type="text" placeholder='Isikan Nomor KTP/NIK anda' className="p-inputtext p-component w-full" value={formData.KTP} onChange={handleChange} />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Profesi Sampingan</label>
                                    {/* <InputText required name='profesi_sampingan' type="text" placeholder='Pilih profesi sampingan' className="p-inputtext p-component w-full" value={formData.profesi_sampingan} onChange={handleChange} /> */}
                                    <Dropdown name='profesi_sampingan' value={formData.profesi_sampingan} onChange={handleChange} options={profesiSampinganOptions} placeholder="Pilih profesi sampingan" className="w-full md:w-full" />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Foto KTP</label>
                                    <FileUpload
                                        name="foto_ktp"
                                        accept="image/*"
                                        maxFileSize={1000000}
                                        onSelect={handleImageChange}
                                        emptyTemplate={<p className="m-0">Seret dan lepas file KTP di sini atau klik untuk memilih.</p>}
                                        chooseLabel="Pilih"
                                        uploadLabel="Unggah"
                                        cancelLabel="Batal"
                                        customUpload
                                        uploadHandler={handleUpload}
                                    />
                                </div>
                            </div>
                            <div className="col-12 md:col-6">
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Nama Lengkap</label>
                                    <InputText required name='Nama' type="text" placeholder='Isikan nama lengkap debitur' className="p-inputtext p-component w-full" value={formData.Nama} onChange={handleChange} />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Tanggal Lahir</label>
                                    <InputText required name='TglLahir' type="date" placeholder='Format Tanggal DD-MM-YY, contoh 17-08-1980' className="p-inputtext p-component w-full" value={formData.TglLahir} onChange={handleChange} />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Nama Gadis Ibu Kandung</label>
                                    <InputText required name='nama_ibu_kandung' type="text" placeholder='Isikan nama gadis ibu kandung debitur' className="p-inputtext p-component w-full" value={formData.nama_ibu_kandung} onChange={handleChange} />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Jumlah Tanggungan</label>
                                    <div className='flex gap-2 align-items-center'>
                                        <InputText required name='jumlah_tanggungan' type="number" placeholder='Isikan dengan angka untuk jumlah tanggungan' className="p-inputtext p-component w-full" value={formData.jumlah_tanggungan} onChange={handleChange} />
                                        <label htmlFor="" className='text-900 font-medium'>Orang</label>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">KTP Berlaku</label>
                                    <InputText required name='ktp_berlaku' type="date" placeholder='Isikan mas akhir KTP, contoh 12-01-1980' className="p-inputtext p-component w-full" value={formData.ktp_berlaku} onChange={handleChange} />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">No. Telp / HP</label>
                                    <InputText required name='no_hp' type="number" placeholder='Isikan nomor telepon yang bisa dihubungi, tanpa kode negara, misal 0812345678' className="p-inputtext p-component w-full" value={formData.no_hp} onChange={handleChange} />
                                </div>
                            </div>
                        </fieldset>
                        <div className='flex justify-content-end'>
                            <Button onClick={handleNextTab}>Lanjut</Button>
                        </div>
                    </TabPanel>
                    <TabPanel header="Alamat Pemohon">
                        <fieldset className='grid md:justify-content-between border-round p-4 mb-4'> {/*Alamat pemohon*/}
                            <legend className="text-xl font-bold">Alamat Pemohon</legend>
                            <div className="col-12 grid md:justify-content-between ">
                                <div className=" col-12 md:col-10">
                                    <label className="block text-900 font-medium mb-2">Alamat</label>
                                    <InputText required name='Alamat' type="text" placeholder='Isikan alamat rumah/lokasi tempat usaha/kantor debitur' className="p-inputtext p-component w-full" value={formData.Alamat} onChange={handleChange} />
                                </div>
                                <div className=" col-12 md:col-2">
                                    <label className="block text-900 font-medium mb-2">Kode Pos</label>
                                    <InputText required name='kode_pos' type="number" placeholder='contoh 61254' className="p-inputtext p-component w-full" value={formData.kode_pos} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-12 md:col-6">
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Provinsi</label>
                                    <Dropdown
                                        value={selectedProvince}
                                        onChange={(e) => {
                                            setSelectedProvince(e.value);
                                            setFormData((prevData) => ({
                                                ...prevData,
                                                provinsi: e.value.id,
                                            }));
                                            fetchRegencies(e.value.id);
                                        }}
                                        options={provinces}
                                        optionLabel="name"
                                        placeholder="Pilih Provinsi"
                                        filter
                                        className="w-full md:w-full"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Kecamatan</label>
                                    <Dropdown
                                        value={selectedDistrict}
                                        onChange={(e) => {
                                            setSelectedDistrict(e.value);
                                            setFormData((prevData) => ({
                                                ...prevData,
                                                kecamatan: e.value.id,
                                            }));
                                            fetchVillages(e.value.id);
                                        }}
                                        options={districts}
                                        optionLabel="name"
                                        placeholder="Pilih Kecamatan"
                                        filter
                                        className="w-full md:w-full"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Telepon</label>
                                    <InputText required name='telepon' type="number" placeholder='Isikan no telepon' className="p-inputtext p-component w-full" value={formData.telepon} onChange={handleChange} />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Status Tempat Tinggal</label>
                                    <Dropdown name='status_tempat_tinggal' value={formData.status_tempat_tinggal} onChange={handleChange} options={statusTempatTinggalOptions} placeholder="Pilih status tempat tinggal" className="w-full md:w-full" />
                                </div>
                            </div>
                            <div className="col-12 md:col-6 mb-4">
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Kota/Kabupaten</label>
                                    <Dropdown
                                        value={selectedRegency}
                                        onChange={(e) => {
                                            setSelectedRegency(e.value);
                                            setFormData((prevData) => ({
                                                ...prevData,
                                                kota: e.value.id,
                                            }));
                                            fetchDistricts(e.value.id);
                                        }}
                                        options={regencies}
                                        optionLabel="name"
                                        placeholder="Pilih Kota/Kabupaten"
                                        filter
                                        className="w-full md:w-full"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Kelurahan</label>
                                    <Dropdown value={selectedVillage} onChange={(e) => {
                                        setSelectedVillage(e.value);
                                        setFormData((prevData) => ({
                                            ...prevData,
                                            kelurahan: e.value.id,
                                        }));
                                    }} options={villages} optionLabel="name" placeholder="Pilih Kelurahan/Desa dari alamat tinggal/tempat usaha debitur" filter valueTemplate={selectedVillageTemplate} itemTemplate={villageOptionTemplate} className="w-full md:w-full" />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Fax</label>
                                    <InputText required name='fax' type="text" placeholder='Isikan no fax jika ada' className="p-inputtext p-component w-full" value={formData.fax} onChange={handleChange} />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Lama Tinggal</label>
                                    <div className='flex gap-2 align-items-center'>
                                        <InputText required name='lama_tinggal' type="number" placeholder='Isikan dengan angka, lama tinggal' className="p-inputtext p-component w-full" value={formData.lama_tinggal} onChange={handleChange} />
                                        <label htmlFor="" className='text-900 font-medium'>Tahun</label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div className='flex justify-content-between'>
                            <Button onClick={handlePreviousTab} disabled={activeIndex === 0} className=''>Kembali</Button>
                            <Button onClick={handleNextTab}>Lanjut</Button>
                        </div>
                    </TabPanel>
                    <TabPanel header="Data Usaha">
                        <fieldset className='grid md:justify-content-between border-round p-4 mb-4'> {/*Data Usaha*/}
                            <legend className="text-xl font-bold">Data Usaha</legend>
                            <div className="col-12 md:col-6">
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Nama Usaha</label>
                                    <InputText name='nama_usaha' type="text" placeholder='Misal: UD Barokah, Toko Jaya, CV Mapan' className="p-inputtext p-component w-full" value={formData.nama_usaha} onChange={handleChange} />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Tanggal Mulai Usaha</label>
                                    <InputText name='tanggal_mulai_usaha' type="date" placeholder='Isikan Tanggal Mulai Usaha' className="p-inputtext p-component w-full" value={formData.tanggal_mulai_usaha} onChange={handleChange} />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Status Tempat Usaha</label>
                                    <Dropdown name='status_tempat_usaha' value={formData.status_tempat_usaha} onChange={handleChange} options={statusTempatUsahaOptions} placeholder="Pilih Status Tempat Usaha" className="w-full md:w-full" />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Surat Keterangan Usaha/SIUP No</label>
                                    <InputText name='surat_keterangan_usaha' type="text" placeholder='Isikan no SIUP jika ada, jika tidak isi dengan : -' className="p-inputtext p-component w-full" value={formData.surat_keterangan_usaha} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-12 md:col-6 mb-4">
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Jumlah Karyawan</label>
                                    <div className='flex gap-2 align-items-center'>
                                        <InputText name='jumlah_karyawan' type="number" placeholder='Isikan jumlah karyawan(orang) dalam angka' className="p-inputtext p-component w-full" value={formData.jumlah_karyawan} onChange={handleChange} />
                                        <label htmlFor="" className='text-900 font-medium'>Orang</label>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Jarak Lokasi Usaha</label>
                                    <div className='flex gap-2 align-items-center'>
                                        <InputText name='jarak_lokasi_usaha' type="number" placeholder='Jarak rumah/tempat usaha/kantor debitur ke kantor BPR' className="p-inputtext p-component w-full" value={formData.jarak_lokasi_usaha} onChange={handleChange} />
                                        <label htmlFor="" className='text-900 font-medium'>km</label>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Masalaku/Tanggal</label>
                                    <InputText name='masa_laku' type="date" placeholder='Isikan masa akhir, contohnya 12-91-2020' className="p-inputtext p-component w-full" value={formData.masa_laku} onChange={handleChange} />
                                </div>
                            </div>
                            <div className='flex gap-3 align-items-center mb-2' >
                                <div className='flex gap-2 align-items-center bg-gray-300 p-2 border-round cursor-pointer' onClick={copyAddress}>
                                    <Copy />
                                    Tempel
                                </div>
                                <label htmlFor="">Klik tombol disamping untuk menempel data dari alamat pemohon ke alamat usaha, jika kedua alamat sama </label>
                            </div>
                            <div className="col-12 grid md:justify-content-between ">
                                <div className=" col-12 md:col-10">
                                    <label className="block text-900 font-medium mb-2">Alamat</label>
                                    <InputText name='alamat_usaha' type="text" placeholder='Isikan alamat rumah/lokasi tempat usaha/kantor debitur' className="p-inputtext p-component w-full" value={formData.alamat_usaha} onChange={handleChange} />
                                </div>
                                <div className=" col-12 md:col-2">
                                    <label className="block text-900 font-medium mb-2">Kode Pos</label>
                                    <InputText name='kode_pos_usaha' type="number" placeholder='contoh 61254' className="p-inputtext p-component w-full" value={formData.kode_pos_usaha} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-12 md:col-6">
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Provinsi</label>
                                    {/* <InputText name='provinsi_usaha' type="text" placeholder='Pilih Provinsi dari alamat tinggal/tempat usaha debitur' className="p-inputtext p-component w-full" value={formData.provinsi_usaha} onChange={handleChange} /> */}
                                    <Dropdown
                                        value={selectedProvinceUsaha}
                                        onChange={(e) => {
                                            setSelectedProvinceUsaha(e.value);
                                            setFormData((prevData) => ({
                                                ...prevData,
                                                provinsi_usaha: e.value.id,
                                            }));
                                            fetchRegenciesUsaha(e.value.id, '');
                                        }}
                                        options={provincesUsaha}
                                        optionLabel="name"
                                        placeholder="Pilih Provinsi Usaha"
                                        filter
                                        className="w-full md:w-full"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Kecamatan</label>
                                    {/* <InputText name='kecamatan_usaha' type="text" placeholder='Pilih Kecamatan dari alamat tinggal/tempat usaha debitur' className="p-inputtext p-component w-full" value={formData.kecamatan_usaha} onChange={handleChange} /> */}
                                    <Dropdown
                                        value={selectedDistrictUsaha}
                                        onChange={(e) => {
                                            setSelectedDistrictUsaha(e.value);
                                            // console.log(e.value)
                                            setFormData((prevData) => ({
                                                ...prevData,
                                                kecamatan_usaha: e.value.id,
                                            }));
                                            fetchVillagesUsaha(e.value.id, '');
                                        }}
                                        options={districtsUsaha}
                                        optionLabel="name"
                                        placeholder="Pilih Kecamatan Usaha"
                                        filter
                                        className="w-full md:w-full"
                                    />
                                </div>
                            </div>
                            <div className="col-12 md:col-6 mb-4">
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Kota/Kabupaten</label>
                                    {/* <InputText name='kota_usaha' type="text" placeholder='Pilih Kota/Kabupaten dari alamat tinggal/tempat usaha debitur' className="p-inputtext p-component w-full" value={formData.kota_usaha} onChange={handleChange} /> */}
                                    <Dropdown
                                        value={selectedRegencyUsaha}
                                        onChange={(e) => {
                                            setSelectedRegencyUsaha(e.value);
                                            // console.log(e.value)
                                            setFormData((prevData) => ({
                                                ...prevData,
                                                kota_usaha: e.value.id,
                                            }));
                                        }}
                                        options={regenciesUsaha}
                                        optionLabel="name"
                                        placeholder="Pilih Kota/Kabupaten Usaha"
                                        filter
                                        className="w-full md:w-full"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-900 font-medium mb-2">Kelurahan</label>
                                    {/* <InputText name='kelurahan_usaha' type="text" placeholder='Pilih Kelurahan/Desa dari alamat tinggal/tempat usaha debitur' className="p-inputtext p-component w-full" value={formData.kelurahan_usaha} onChange={handleChange} /> */}
                                    <Dropdown
                                        value={selectedVillageUsaha}
                                        onChange={(e) => {
                                            setSelectedVillageUsaha(e.value);
                                            // console.log(e.value)
                                            setFormData((prevData) => ({
                                                ...prevData,
                                                kelurahan_usaha: e.value.id,
                                            }));
                                        }}
                                        options={villagesUsaha}
                                        optionLabel="name"
                                        placeholder="Pilih Kelurahan Usaha"
                                        filter
                                        className="w-full md:w-full"
                                    />
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
                    </TabPanel>
                </TabView>
            </form>
        </div>
    )
}

export default EditFormPemohon