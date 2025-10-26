'use client';
import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import { useRouter } from 'next/navigation';

interface User {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    status: number;
}

const SignupPage = () => {
    const [formData, setFormData] = useState<User>({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        status: 2
    });

    const toast = useRef<Toast>(null);
    const router = useRouter();

    const handleInputChange = (e: any) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handlePasswordChange = (e: any) => {
        setFormData(prevData => ({
            ...prevData,
            password: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post(API_ENDPOINTS.REGISTER, formData);
            toast.current?.show({
                severity: 'success',
                summary: 'Berhasil',
                detail: 'Pendaftaran berhasil!',
                life: 3000
            });
            setTimeout(() => router.push('/SuperAdmin'), 1000);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Gagal',
                detail: 'Terjadi kesalahan saat mendaftar.',
                life: 3000
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Toast ref={toast} position="top-right" />
            <form onSubmit={handleSubmit} className="p-6 shadow-md rounded-lg bg-white w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Daftar Akun</h2>

                <div className="mb-4">
                    <label htmlFor="name" className="block mb-1 font-medium">Nama</label>
                    <InputText
                        id="name"
                        type="text"
                        placeholder="Nama lengkap"
                        className="w-full p-3"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                    <InputText
                        id="email"
                        type="email"
                        placeholder="Alamat email"
                        className="w-full p-3"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block mb-1 font-medium">Password</label>
                    <Password
                        inputId="password"
                        placeholder="Password"
                        toggleMask
                        className="w-full"
                        inputClassName="w-full p-3"
                        value={formData.password}
                        weakLabel="Lemah"
                        mediumLabel="Sedang"
                        strongLabel="Kuat"
                        promptLabel="Masukkan kata sandi"
                        onChange={handlePasswordChange}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="phone" className="block mb-1 font-medium">No. HP</label>
                    <InputText
                        id="phone"
                        type="number"
                        placeholder="Nomor telepon"
                        className="w-full p-3"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="address" className="block mb-1 font-medium">Alamat</label>
                    <InputText
                        id="address"
                        type="text"
                        placeholder="Alamat lengkap"
                        className="w-full p-3"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </div>

                <Button type="submit" label="Daftar" className="w-full p-3 text-xl" />
            </form>
        </div>
    );
};

export default SignupPage;
