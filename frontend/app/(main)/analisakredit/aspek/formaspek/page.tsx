'use client';
import React, { useEffect, useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import { Dialog } from 'primereact/dialog';

const FormAspek = ({ pengajuan, onSubmitSuccess }: { pengajuan: any, onSubmitSuccess: () => void }) => {
    const [formPengajuan] = useState<any>(pengajuan);
    const [titleAspek, settitleAspek] = useState<any>([])
    const [visible, setVisible] = useState(false);
    const [Isloading, setIsLoading] = useState(false);

    const [formAspek, setformAspek] = useState<any>({
        no_pengajuan: formPengajuan.no_pengajuan || ''
    });

    const resetForm = () => {
        setformAspek({
            no_pengajuan: formPengajuan.no_pengajuan || '',
            ...titleAspek.reduce((acc: any, aspect: any) => {
                acc[aspect.Keterangan] = '';
                return acc;
            }, {}),
            risiko: '',
            mitigasi: ''
        })
    }

    useEffect(() => {
        const fetchAspekForm = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.GETTITLEASPEK)
                settitleAspek(response.data)
                // console.log(response.data)
            } catch (error) {
                console.error("There was an error fetching the survey!", error)
            }
        }
        fetchAspekForm()
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        setformAspek({ ...formAspek, [field]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        if (formAspek.no_pengajuan === '') {
            alert('Nomor Pengajuan tidak tersedia')
            return
        }
        try {
            const response = await axios.post(API_ENDPOINTS.ASPEKFORM, formAspek);
            console.log('Response from API:', response.data);
            console.log(formAspek)
            setIsLoading(false);
            setVisible(true);
            resetForm();
            onSubmitSuccess();
        } catch (error) {
            console.error('Error submitting form:', error);
            setIsLoading(false);
        }
    };
    return (
        <div className="surface-card max-w-4xl mx-auto shadow-lg border-round">
            <div className="p-4">
                <form onSubmit={handleSubmit}>
                    <fieldset className="border-round mb-4 p-6">
                        <legend className="text-xl font-bold">Formulir Aspek</legend>
                        {titleAspek.map((aspect: any, index: any) => (
                            <div>
                                {
                                    aspect.Keterangan !== 'Resiko' && aspect.Keterangan !== 'Mitigasi' ? (
                                        <div key={index} className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">{aspect.Keterangan}</label>
                                            <InputTextarea required rows={3} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={formAspek[aspect.Keterangan]} onChange={(e) => handleInputChange(e, aspect.Keterangan)} />
                                        </div>
                                    ) : (
                                        null
                                    )
                                }
                            </div>
                        ))}
                        <div className="mtext-sm text-red-700 mb-10 italic bg-red-100 p-4 border-round" >
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">Aspek Resiko dan Mitigasi</h3>
                            {titleAspek.map((aspect: any, index: any) => (
                                <div>
                                    {
                                        aspect.Keterangan === 'Resiko' || aspect.Keterangan === 'Mitigasi' ? (

                                            <div className="mb-2" key={index}>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Aspek {aspect.Keterangan}</label>
                                                <InputTextarea required rows={3} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" name={aspect.Keterangan} value={formAspek[aspect.Keterangan]} onChange={(e) => handleInputChange(e, aspect.Keterangan)} />
                                            </div>
                                        ) : (
                                            null
                                        )
                                    }
                                </div>
                            ))}
                        </div>
                        <div className="text-sm text-black-700 italic pt-3 rounded-lg text-center">Catatan: Kolom di atas berisi hasil-hasil yang didapat</div>
                    </fieldset>
                    <div className='flex gap-4 justify-content-end'> {/*Button*/}
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
                        <Dialog header="Success" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                            <p className="m-0">
                                Terima Kasih telah mengisi form
                            </p>
                        </Dialog>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormAspek