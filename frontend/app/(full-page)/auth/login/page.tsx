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
        // <div className={containerClassName}>
        //     <div className="flex flex-column align-items-center justify-content-center">
        //         {/* <img src={`/demo/images/logo/logo-godong.png`} alt="Sakai logo" className="mb-5 w-10rem flex-shrink-0" /> */}
        //         <div
        //             style={{
        //                 borderRadius: '56px',
        //                 padding: '0.3rem',
        //                 background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
        //             }}
        //         >
        //             <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
        //                 <div className="text-center mb-5 animate__animated animate__fadeIn">
        //                     <img src="/demo/images/logo/logo-godong.png" alt="Logo Godong" height="80" className="mb-4 transition-transform hover:scale-110" />
        //                     {/* <p className="text-900 text-2xl font-bold mb-3 text-gradient">Silahkan Login</p> */}
        //                     {/* <p className="text-600 text-xl font-medium mb-4">Mari mulai perjalanan Anda bersama kami</p> */}
        //                     {/* <div className="inline-block bg-primary text-white text-lg font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
        //                         Silakan Login untuk Melanjutkan
        //                     </div> */}
        //                 </div>
        //                 <div>
        //                     <form onSubmit={handleSubmit}>
        //                         <label htmlFor="email" className="block text-900 text-xl font-medium mb-2">
        //                             Email
        //                         </label>
        //                         <InputText
        //                             id="email"
        //                             name='email'
        //                             type="email"
        //                             placeholder="Alamat email"
        //                             className="w-full md:w-30rem mb-3"
        //                             style={{ padding: '1rem' }}
        //                             value={email}
        //                             onChange={handleEmailChange}
        //                         />

        //                         <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">
        //                             Password
        //                         </label>
        //                         <Password
        //                             inputId="password"
        //                             name='password'
        //                             placeholder="Password"
        //                             toggleMask
        //                             className="w-full mb-2"
        //                             inputClassName="w-full p-3 md:w-30rem"
        //                             value={password}
        //                             onChange={handlePasswordChange}
        //                             promptLabel="Masukkan kata sandi"
        //                             weakLabel="Lemah"
        //                             mediumLabel="Sedang"
        //                             strongLabel="Kuat"
        //                         />

        //                         <div className="flex align-items-center justify-content-between mb-5 gap-5">
        //                             {/* <div className="flex align-items-center">
        //                             <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
        //                             <label htmlFor="rememberme1">Remember me</label>
        //                         </div>
        //                         <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
        //                             Forgot password?
        //                         </a> */}
        //                             <Link href={'/auth/signup'} >
        //                                 <label htmlFor="" className='cursor-pointer'>Belum Punya Akun?</label>
        //                             </Link>
        //                         </div>
        //                         <Button label="Sign In" className="w-full p-3 text-xl"></Button>
        //                     </form>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className="flex flex-row h-screen">
            <div className="h-full col-6 flex flex-column justify-content-center align-items-center p-8" style={{ background: 'linear-gradient(to right, #C3DCFC, #E6F2FF,#E6F2FF)' }}>
                <div className="col-11">
                    <h1 className="text-3xl mb-2">Selamat Datang di</h1>
                    <h2 className="text-5xl font-bold mb-6 w-7">Loan Origination System</h2>

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
            <div className="col-6 flex items-center justify-center" style={{ background: 'linear-gradient(to left, #C3DCFC, #E6F2FF)' }}>
                <img src="/demo/images/login/bg-login.png" alt="Login Illustration" className="max-w-md w-full" />
            </div>
        </div>
    );

};

export default LoginPage;
