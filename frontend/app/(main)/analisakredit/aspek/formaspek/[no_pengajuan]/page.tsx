'use client';

import React, { useEffect, useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const EditFormAspek = () => {
    const params = useParams();
    const no_pengajuan = params?.no_pengajuan;
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [titleAspek, setTitleAspek] = useState<any>([]);
    const [formAspek, setFormAspek] = useState<any>({
        no_pengajuan: '',
    });

    const resetForm = () => {
        setFormAspek({
            no_pengajuan: '',
            ...titleAspek.reduce((acc: any, aspect: any) => {
                acc[aspect.Keterangan] = '';
                return acc;
            }, {}),
            risiko: '',
            mitigasi: ''
        });
    };

    useEffect(() => {
        const fetchTitleAspek = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.GETTITLEASPEK);
                setTitleAspek(response.data);
            } catch (error) {
                console.error("Error fetching title aspek:", error);
            }
        };

        fetchTitleAspek();

        if (no_pengajuan) {
            fetchAspekData(no_pengajuan);
        }
    }, [no_pengajuan]);

    const fetchAspekData = async (no_pengajuan: any) => {
        try {
            const response = await axios.get(`${API_ENDPOINTS.GETASPEKBYNOPENGAJUAN(no_pengajuan)}`);
            const formattedData = response.data.reduce((acc: any, aspect: any) => {
                acc[aspect.Keterangan] = aspect.jawaban;
                return acc;
            }, {});
            setFormAspek(formattedData);
        } catch (error) {
            console.error('Error fetching Aspek data:', error);
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormAspek((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let response;
            if (no_pengajuan) {
                response = await axios.put(API_ENDPOINTS.UPDATEASPEKBYID(no_pengajuan), formAspek);
                console.log(formAspek)
            } else {
                response = await axios.post(API_ENDPOINTS.ASPEKFORM, formAspek);
            }
            setIsLoading(false);
            setVisible(true);
            if (!no_pengajuan) resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
            setIsLoading(false);
        }
    };
    return (
        <div className="surface-card border-round p-4">
            <form onSubmit={handleSubmit}>
            <fieldset className="border-round mb-4 p-6">
                        <legend className="text-xl font-bold">Formulir Aspek</legend>
                        {titleAspek.map((aspect: any, index: any) => (
                            <div>
                                {
                                    aspect.Keterangan !== 'Resiko' && aspect.Keterangan !== 'Mitigasi' ? (
                                        <div key={index} className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">{aspect.Keterangan}</label>
                                            <InputTextarea name={aspect.Keterangan} required rows={3} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={formAspek[aspect.Keterangan]} onChange={handleChange} />
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
                                                <InputTextarea name={aspect.Keterangan} required rows={3} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={formAspek[aspect.Keterangan]} onChange={handleChange} />
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
                <div className='flex gap-4 justify-content-end pt-4'>
                    <Button onClick={resetForm} type="button">Reset</Button>
                    <Button type="submit" className='text-white bg-[#61AB5B] w-auto' disabled={isLoading}>
                        {isLoading ? (
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
            </form>
        </div>
    );
};

export default EditFormAspek;