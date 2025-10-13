import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import React from 'react'

interface TabunganDepositoKoperasiYBSPageProps {
    onChange: (data: any) => void;
    defaultValue?: {
        jenis: string;
        noBilyet: string;
        atasNama: string;
        noRekening: string;
        nominal: string;
        alamat: string;
        keterangan: string;
    };
}

const TabunganDepositoKoperasiYBSPage: React.FC<TabunganDepositoKoperasiYBSPageProps> = ({ onChange, defaultValue }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onChange({ [name]: value });
    };

    const handleRadioChange = (e: RadioButtonChangeEvent) => {
        const value = e.value;
        onChange({ jenis: value });
    };

    return (
        <form>
            <fieldset className="mb-4 p-4 border-round">
                <legend className="text-xl font-bold">Tabungan Deposito Koperasi YBS</legend>
                <div className="grid">
                    <div className="col-12 md:col-6">
                        <div className="field">
                            <label htmlFor="jenis" className="block text-900 font-medium mb-2">Jenis</label>
                            <div className="flex align-items-center">
                                <RadioButton inputId="tabungan" name="jenis" value="tabungan" onChange={handleRadioChange} className="mr-2" checked={defaultValue?.jenis === 'tabungan'} />
                                <label htmlFor="tabungan" className="mr-4">Tabungan</label>
                                <RadioButton inputId="deposito" name="jenis" value="deposito" onChange={handleRadioChange} className="mr-2" checked={defaultValue?.jenis === 'deposito'} />
                                <label htmlFor="deposito">Deposito</label>
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="noBilyet" className="block text-900 font-medium mb-2">No. Bilyet</label>
                            <InputText id="noBilyet" name="noBilyet" onChange={handleInputChange} className="w-full" value={defaultValue?.noBilyet} />
                        </div>
                        <div className="field">
                            <label htmlFor="atasNama" className="block text-900 font-medium mb-2">Atas Nama</label>
                            <InputText id="atasNama" name="atasNama" onChange={handleInputChange} className="w-full" value={defaultValue?.atasNama} />
                        </div>
                    </div>
                    <div className="col-12 md:col-6">
                        <div className="field">
                            <label htmlFor="noRekening" className="block text-900 font-medium mb-2">No. Rekening</label>
                            <InputText id="noRekening" name="noRekening" onChange={handleInputChange} className="w-full" value={defaultValue?.noRekening} />
                        </div>
                        <div className="field">
                            <label htmlFor="nominal" className="block text-900 font-medium mb-2">Nominal</label>
                            <InputText id="nominal" name="nominal" onChange={handleInputChange} className="w-full" value={defaultValue?.nominal} />
                        </div>
                        <div className="field">
                            <label htmlFor="alamat" className="block text-900 font-medium mb-2">Alamat</label>
                            <InputText id="alamat" name="alamat" onChange={handleInputChange} className="w-full" value={defaultValue?.alamat} />
                        </div>
                    </div>
                    <div className="col-12">
                        <label htmlFor="keterangan" className="block text-900 font-medium mb-2">Keterangan</label>
                        <InputTextarea id="keterangan" name="keterangan" rows={5} onChange={handleInputChange} className="w-full" value={defaultValue?.keterangan} />
                    </div>
                </div>
            </fieldset>
        </form>
    )
}

export default TabunganDepositoKoperasiYBSPage