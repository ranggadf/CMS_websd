"use client"
import SearchRekening from '@/app/(full-page)/component/searchRekening/page';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Paginator } from 'primereact/paginator';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const FormLimaC = ({ pengajuan }: { pengajuan: any }) => {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const [formPengajuan] = useState<any>(pengajuan);
    const [Isloading, setIsLoading] = useState(false);
    const [formLimac, setformLimac] = useState({
        no_pengajuan: formPengajuan.no_pengajuan || '',
        characters: '',
        capacity: '',
        capital: '',
        collateral: '',
        conditions: ''
    });
    const resetForm = () => {
        setformLimac({
            no_pengajuan: formPengajuan.no_pengajuan || '',
            characters: '',
            capacity: '',
            capital: '',
            collateral: '',
            conditions: ''
        })
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setformLimac((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await axios.post(API_ENDPOINTS.LIMAC, formLimac);
            console.log('Response from API:', response.data);
            setIsLoading(false)
            setVisible(true)
            resetForm()
            router.push('/pengajuan')
        } catch (error) {
            console.error('Error submitting form:', error);
            setIsLoading(false)
            // Tampilkan pesan error ke pengguna di sini
        }
        console.log;
    };
    console.log(formLimac)
    return (
        <div className="surface-card border-round p-4">
            <form onSubmit={handleSubmit}>
                <fieldset className="p-6 border-round">
                    <legend className="text-xl font-bold">Analisa 5C</legend>
                    <div className='mb-2'>
                        <label className='block text-900 font-medium mb-2'>Character</label>
                        <InputTextarea required name='characters' onChange={handleChange} value={formLimac.characters} className='w-full' />
                    </div>
                    <div className='mb-2'>
                        <label className='block text-900 font-medium mb-2'>Capacity</label>
                        <InputTextarea required name='capacity' onChange={handleChange} value={formLimac.capacity} className='w-full' />
                    </div>
                    <div className='mb-2'>
                        <label className='block text-900 font-medium mb-2'>Capital</label>
                        <InputTextarea required name='capital' onChange={handleChange} value={formLimac.capital} className='w-full' />
                    </div>
                    <div className='mb-2'>
                        <label className='block text-900 font-medium mb-2'>Collateral</label>
                        <InputTextarea required name='collateral' onChange={handleChange} value={formLimac.collateral} className='w-full' />
                    </div>
                    <div className='mb-2'>
                        <label className='block text-900 font-medium mb-2'>Condition</label>
                        <InputTextarea required name='conditions' onChange={handleChange} value={formLimac.conditions} className='w-full' />
                    </div>
                </fieldset>
                <div className='flex gap-4 justify-content-end pt-4'> {/*Button*/}
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
    )
}

export default FormLimaC