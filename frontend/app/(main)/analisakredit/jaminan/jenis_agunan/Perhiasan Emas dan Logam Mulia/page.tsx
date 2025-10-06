import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import React from 'react'

interface PerhiasanEmasDanLogamMuliaPageProps {
    onChange: (data: any) => void;
    defaultValue?: {
        uraian: string;
        berat: string;
        jumlah: string;
        kadar: string;
        atasNama: string;
        alamat: string;
    };
}

const PerhiasanEmasDanLogamMuliaPage: React.FC<PerhiasanEmasDanLogamMuliaPageProps> = ({ onChange, defaultValue }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({ [name]: value });
    };
    return (
        <form>
            <fieldset className="mb-4 p-4 border-round">
                <legend className="text-xl font-bold">Perhiasan Emas dan Logam Mulia</legend>
                <div className="grid">
                    <div className="col-12 md:col-6">
                        <div className="field">
                            <label htmlFor="uraian" className="block text-900 font-medium mb-2">Uraian</label>
                            <InputText id="uraian" name="uraian" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.uraian} />
                        </div>
                        <div className="field">
                            <label htmlFor="berat" className="block text-900 font-medium mb-2">Berat</label>
                            <InputText id="berat" name="berat" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.berat} />
                        </div>
                    </div>
                    <div className="col-12 md:col-6">
                        <div className="field">
                            <label htmlFor="jumlah" className="block text-900 font-medium mb-2">Jumlah</label>
                            <InputText id="jumlah" name="jumlah" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.jumlah} />
                        </div>
                        <div className="field">
                            <label htmlFor="kadar" className="block text-900 font-medium mb-2">Kadar</label>
                            <InputText id="kadar" name="kadar" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.kadar} />
                        </div>
                    </div>
                    <div className="col-12 md:col-6">
                        <div className="field">
                            <label htmlFor="atasNama" className="block text-900 font-medium mb-2">Atas Nama</label>
                            <InputText id="atasNama" name="atasNama" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.atasNama} />
                        </div>
                    </div>
                    <div className="col-12 md:col-6">
                        <div className="field">
                            <label htmlFor="alamat" className="block text-900 font-medium mb-2">Alamat</label>
                            <InputText id="alamat" name="alamat" onChange={handleInputChange} className="w-full" defaultValue={defaultValue?.alamat} />
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
    )
}

export default PerhiasanEmasDanLogamMuliaPage