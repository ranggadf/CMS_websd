/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';

import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import Link from 'next/link';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import { Card } from 'primereact/card';


interface User {
    email: string,
    password: string,
    status: 2
}
const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const { layoutConfig } = useContext(LayoutContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        // setEmailError(validateEmail(newEmail) ? "" : "Masukkan alamat email yang valid");
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        // setPasswordError(newPassword.length >= 8 ? "" : "Kata sandi harus minimal 8 karakter");
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(
                API_ENDPOINTS.LOGIN,
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "ngrok-skip-browser-warning": "true",
                    },
                }
            );

            // Set cookie untuk menyimpan user info
            document.cookie = `user-info=${JSON.stringify(response.data)}; path=/`;

            // Redirect berdasarkan status user
            if (response.data.status === 2 || response.data.status === 3) {
                router.push('/');
            } else if (response.data.status === 1) {
                router.push('/admin/');
            } else {
                router.push('/auth/error');
            }

        } catch (error: any) {
            console.error("Terjadi kesalahan!", error);
            setShowAlert(true);
            if(error.response?.status === 401) {
                setEmailError("Email atau password salah");
            }
        } finally {
            setIsLoading(false);
        }
    };
    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    return (
    

        <div className="flex flex-row h-screen">
            <div className="h-full col-6 flex flex-column justify-content-center align-items-center p-8" style={{ background: 'linear-gradient(to right,  #D32F2F, #F44336,#D32F2F)' }}>
                <div className="col-11">
                    <h1 className="text-3xl mb-2">Selamat Datang di</h1>
                    <h2 className="text-5xl font-bold mb-6 w-7">MANAJEMEN KONTEN WEB SDN 01 MANGUHARJO</h2>

                    <form onSubmit={handleSubmit} className="mt-8">
                        <div className='mb-4'>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <InputText
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Masukkan Email"
                                className="w-full p-3"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>

                        <div className='mb-6'>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <Password
                                inputId="password"
                                name="password"
                                placeholder="Masukkan Password"
                                toggleMask
                                className="w-full"
                                inputClassName="w-full p-3"
                                weakLabel='Lemah'
                                mediumLabel='Sedang'
                                strongLabel='Kuat'
                                promptLabel='Masukkan kata sandi'
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>

                        <Button label="Masuk" className="border-none w-full p-3 text-xl text-blue-500 transition-all duration-300 ease-in-out hover:bg-blue-200" style={{ backgroundColor: '#C3DCFC' }} />
                    </form>

                    <div className="mt-4 text-center">
                        <span className="text-sm">Belum Punya Akun? </span>
                        <Link href="/auth/signup" className="text-blue-500 hover:underline">
                            Daftar
                        </Link>
                    </div>
                </div>

                {/* <div className="mt-8 flex justify-content-center">
                    <img src="/demo/images/logo/logo-godong.png"  alt="Logo Godong" className="mb-4 transition-transform hover:scale-110" />
                </div> */}
            </div>
            <div
  className="col-6 flex items-center justify-center"
  style={{
    background: 'linear-gradient(to left, #D32F2F, #F44336,#D32F2F)',
  }}
>
  <img
    src="/demo/images/login/bg-login.png"
    alt="Login Illustration"
    className="max-w-md w-full drop-shadow-2xl transition-transform duration-500 hover:scale-105"
  />
</div>
                <img src="/demo/images/login/bg-login.png" alt="Login Illustration" className="max-w-md w-full" />
            </div>
      
    );

};

export default LoginPage;
