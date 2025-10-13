import React from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

interface KendaraanBermotorPageProps {
  onChange: (data: any) => void;
  defaultValue?: {
    noMesin: string;
    merk: string;
    tipe: string;
    tahun: string;
    masaPajak: string;
    noRangka: string;
    warna: string;
    noSTNK: string;
    silinder: string;
    noPolisi: string;
    noBPKB: string;
    noRegBPKB: string;
    atasNama: string;
    alamat: string;
    keterangan: string;
    jumlahRoda: string;
  };
}

const KendaraanBermotorPage: React.FC<KendaraanBermotorPageProps> = ({ onChange, defaultValue }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleRadioChange = (e: RadioButtonChangeEvent) => {
    onChange({ jumlahRoda: e.value });
  };

  return (
    <form>
      <fieldset className="mb-4 p-4 border-round">
        <legend className="text-xl font-bold">Kendaraan Bermotor</legend>
        <div className="grid w-full">
          <div className="flex flex-row w-full justify-content-between ">
            <div className="col-6">
              <label htmlFor="noMesin" className="block text-900 font-medium mb-2">No. Mesin</label>
              <InputText id="noMesin" name="noMesin" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.noMesin} />
            </div>
            <div className="col-6">
              <label htmlFor="jumlahRoda" className="block text-900 font-medium mb-2">Jumlah Roda</label>
              <div className="flex align-items-center">
                <RadioButton inputId="2Roda" name="jumlahRoda" value="2 Roda" className="mr-2" onChange={handleRadioChange} checked={defaultValue?.jumlahRoda === '2 Roda'} />
                <label htmlFor="2Roda" className="mr-4">2 Roda</label>
                <RadioButton inputId="4Roda" name="jumlahRoda" value="4 Roda" className="mr-2" onChange={handleRadioChange} checked={defaultValue?.jumlahRoda === '4 Roda'} />
                <label htmlFor="4Roda">4 Roda</label>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full justify-content-between">
            <div className="col-6">
              <label htmlFor="masaTahun" className="block text-900 font-medium mb-2">Merk, Tipe, Tahun</label>
              <div className="p-inputgroup">
                <InputText id="merk" name="merk" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.merk} />
                <span className="p-inputgroup-addon">/</span>
                <InputText id="tipe" name="tipe" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.tipe} />
                <span className="p-inputgroup-addon">/</span>
                <InputText id="tahun" name="tahun" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.tahun} />
              </div>
            </div>
            <div className="col-6">
              <label htmlFor="masaPajak" className="block text-900 font-medium mb-2">Masa Pajak</label>
              <InputText type='date' id="masaPajak" name="masaPajak" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.masaPajak} />
            </div>
          </div>
          <div className="flex flex-row w-full justify-content-between">
            <div className="field col-6">
              <label htmlFor="noRangka" className="block text-900 font-medium mb-2">No. Rangka</label>
              <InputText id="noRangka" name="noRangka" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.noRangka} />
            </div>
            <div className="field col-6">
              <label htmlFor="warna" className="block text-900 font-medium mb-2">Warna</label>
              <InputText id="warna" name="warna" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.warna} />
            </div>
          </div>
          <div className="flex flex-row w-full justify-content-between">
            <div className="field col-6">
              <label htmlFor="noSTNK" className="block text-900 font-medium mb-2">No. STNK</label>
              <InputText id="noSTNK" name="noSTNK" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.noSTNK} />
            </div>
            <div className="field col-6">
              <label htmlFor="silinder" className="block text-900 font-medium mb-2">Silinder</label>
              <InputText id="silinder" name="silinder" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.silinder} />
            </div>
          </div>
          <div className="flex flex-row w-full justify-content-between">
            <div className="field col-4">
              <label htmlFor="noPolisi" className="block text-900 font-medium mb-2">No. Polisi</label>
              <InputText id="noPolisi" name="noPolisi" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.noPolisi} />
            </div>
            <div className="field col-4">
              <label htmlFor="noBPKB" className="block text-900 font-medium mb-2">No. BPKB</label>
              <InputText id="noBPKB" name="noBPKB" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.noBPKB} />
            </div>
            <div className="field col-4">
              <label htmlFor="noRegBPKB" className="block text-900 font-medium mb-2">No. Reg BPKB</label>
              <InputText id="noRegBPKB" name="noRegBPKB" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.noRegBPKB} />
            </div>

          </div>
          <div className="flex flex-row w-full justify-content-between">
            <div className="field col-6">
              <label htmlFor="atasNama" className="block text-900 font-medium mb-2">Atas Nama</label>
              <InputText id="atasNama" name="atasNama" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.atasNama} />
            </div>
            <div className="field col-6">
              <label htmlFor="alamat" className="block text-900 font-medium mb-2">Alamat</label>
              <InputText id="alamat" name="alamat" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.alamat} />
            </div>
          </div>
          <div className="flex flex-row w-full">
            <div className="field col-12">
              <label htmlFor="keterangan" className="block text-900 font-medium mb-2">Keterangan</label>
              <InputTextarea id="keterangan" name="keterangan" rows={4} onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.keterangan} />
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default KendaraanBermotorPage;

