"use client"

import SearchRekening from '@/app/(full-page)/component/searchRekening/page';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useState } from 'react';

const EditFormLimaC = () => {
    const params = useParams();
    const no_pengajuan = params?.no_pengajuan;
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formLimac, setformLimac] = useState({
        no_pengajuan: '',
        characters: '',
        capacity: '',
        capital: '',
        collateral: '',
        conditions: ''
    });

    const resetForm = () => {
        setformLimac({
            no_pengajuan: '',
            characters: '',
            capacity: '',
            capital: '',
            collateral: '',
            conditions: ''
        });
    };
    useEffect(() => {
        if (no_pengajuan) {
            fetchLimacData(no_pengajuan);
        }
    }, [no_pengajuan]);

    const fetchLimacData = async (no_pengajuan: any) => {
        try {
            const response = await axios.get(`${API_ENDPOINTS.GETLIMACBYNOPENGAJUAN(no_pengajuan)}`);
            setformLimac(response.data[0]);
        } catch (error) {
            console.error('Error fetching 5C data:', error);
        }
    };
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setformLimac((prevData) => ({
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
                response = await axios.put(API_ENDPOINTS.UPDATELIMACBYID(no_pengajuan), formLimac);
            } else {
                response = await axios.post(API_ENDPOINTS.LIMAC, formLimac);
            }
            console.log('Response from API:', response.data);
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

export default EditFormLimaC;