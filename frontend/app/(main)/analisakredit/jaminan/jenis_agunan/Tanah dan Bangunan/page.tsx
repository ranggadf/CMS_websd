import { Calendar } from 'lucide-react'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton'
import React from 'react'

interface TanahDanBangunanPageProps {
    onChange: (data: any) => void;
    defaultValue?: {
        noSHM: string;
        noGS: string;
        noNIB: string;
        jenisHakMilik: string;
        jenisSurat: string;
        luas: string;
        tanggalGS: string;
        atasNama: string;
        alamat: string;
        kota: string;
        provinsi: string;
        keterangan: string;
        keadaanJaminan: string;
        batasUtara: string;
        batasTimur: string;
        batasSelatan: string;
        batasBarat: string;
    };
}

const TanahDanBangunanPage: React.FC<TanahDanBangunanPageProps> = ({ onChange, defaultValue }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onChange({ [name]: value });
    };

    const handleRadioChange = (e: RadioButtonChangeEvent) => {
        onChange({ [e.target.name]: e.value });
    };

    return (
        <form>
            <fieldset className="mb-4 p-4 border-round">
                <legend className="text-xl font-bold">Tanah dan Bangunan</legend>
                <div className="grid w-full">
                    <div className="flex flex-row w-full justify-content-between">
                        <div className="col-4">
                            <label htmlFor="noSHM" className="block text-900 font-medium mb-2">No. SHM</label>
                            <InputText id="noSHM" name="noSHM" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.noSHM} />
                        </div>
                        <div className="col-4">
                            <label htmlFor="noGS" className="block text-900 font-medium mb-2">No. GS / Surat Ukur</label>
                            <InputText id="noGS" name="noGS" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.noGS} />
                        </div>
                        <div className="col-4">
                            <label htmlFor="noNIB" className="block text-900 font-medium mb-2">No.NIB</label>
                            <InputText id="noNIB" name="noNIB" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.noNIB} />
                        </div>
                    </div>
                    <div className="flex flex-row w-full justify-content-between">
                        <div className="col-4">
                            <label htmlFor="jenis" className="block text-900 font-medium mb-2">Jenis</label>
                            <div className="flex align-items-center">
                                <RadioButton inputId="SHM" name="jenisHakMilik" value="SHM" className="mr-2" onChange={handleRadioChange} checked={defaultValue?.jenisHakMilik === 'SHM'} />
                                <label htmlFor="SHM" className="mr-4">SHM</label>
                                <RadioButton inputId="SHGB" name="jenisHakMilik" value="SHGB" className="mr-2" onChange={handleRadioChange} checked={defaultValue?.jenisHakMilik === 'SHGB'} />
                                <label htmlFor="SHGB">SHGB</label>
                            </div>
                        </div>
                        <div className="col-4">
                            <label htmlFor="jenisSurat" className="block text-900 font-medium mb-2">Jenis Surat</label>
                            <div className="flex align-items-center">
                                <RadioButton inputId="GS" name="jenisSurat" value="GS" className="mr-2" onChange={handleRadioChange} checked={defaultValue?.jenisSurat === 'GS'} />
                                <label htmlFor="GS" className="mr-4">GS</label>
                                <RadioButton inputId="SU" name="jenisSurat" value="SU" className="mr-2" onChange={handleRadioChange} checked={defaultValue?.jenisSurat === 'SU'} />
                                <label htmlFor="SU">SU</label>
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="luas" className="block text-900 font-medium mb-2">Luas</label>
                            <InputText id="luas" name="luas" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.luas} />
                        </div>
                    </div>
                    <div className="flex flex-row w-full justify-content-between">
                        <div className="col-6">
                            <label htmlFor="tanggalGS" className="block text-900 font-medium mb-2">Tgl. GS</label>
                            <InputText type='date' id="tanggalGS" name="tanggalGS" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.tanggalGS} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="atasNama" className="block text-900 font-medium mb-2">Atas Nama</label>
                            <InputText id="atasNama" name="atasNama" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.atasNama} />
                        </div>
                    </div>
                    <div className="flex flex-row w-full justify-content-between">
                        <div className="col-4">
                            <label htmlFor="alamat" className="block text-900 font-medium mb-2">Alamat</label>
                            <InputText id="alamat" name="alamat" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.alamat} />
                        </div>
                        <div className="col-4">
                            <label htmlFor="kota" className="block text-900 font-medium mb-2">Kab/Kota</label>
                            <InputText id="kota" name="kota" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.kota} />
                        </div>
                        <div className="col-4">
                            <label htmlFor="provinsi" className="block text-900 font-medium mb-2">Provinsi</label>
                            <InputText id="provinsi" name="provinsi" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.provinsi} />
                        </div>
                    </div>
                    <div className="col-12">
                        <label htmlFor="keterangan" className="block text-900 font-medium mb-2">Keterangan</label>
                        <InputTextarea id="keterangan" name="keterangan" rows={5} onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.keterangan} />
                    </div>
                    <div className="col-12">
                        <label htmlFor="keadaanJaminan" className="block text-900 font-medium mb-2">Keadaan Jaminan</label>
                        <InputTextarea id="keadaanJaminan" name="keadaanJaminan" rows={5} onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.keadaanJaminan} />
                    </div>
                    <div className="flex flex-row w-full justify-content-between">
                        <div className="col-3">
                            <label htmlFor="batasUtara" className="block text-900 font-medium mb-2">Batas Utara</label>
                            <InputText id="batasUtara" name="batasUtara" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.batasUtara} />
                        </div>
                        <div className="col-3">
                            <label htmlFor="batasTimur" className="block text-900 font-medium mb-2">Batas Timur</label>
                            <InputText id="batasTimur" name="batasTimur" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.batasTimur} />
                        </div>
                        <div className="col-3">
                            <label htmlFor="batasSelatan" className="block text-900 font-medium mb-2">Batas Selatan</label>
                            <InputText id="batasSelatan" name="batasSelatan" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.batasSelatan} />
                        </div>
                        <div className="col-3">
                            <label htmlFor="batasBarat" className="block text-900 font-medium mb-2">Batas Barat</label>
                            <InputText id="batasBarat" name="batasBarat" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.batasBarat} />
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
    )
}

export default TanahDanBangunanPage