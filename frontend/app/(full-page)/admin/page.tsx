"use client"
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import Debiturpage from './debitur/page';

const Adminpage = () => {
    const [allproduk, setAllProduk] = useState([]);
    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    };
    useEffect(() => {
        const fetchAllProduk = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.GETALLPRODUK);
                const formattedData = response.data.map((item: any) => ({
                    ...item,
                    tanggal_aplikasi: formatDate(item.tanggal_aplikasi),
                    tanggal_permohonan: formatDate(item.tanggal_permohonan)
                }));
                setAllProduk(formattedData);
            } catch (error) {
                console.error('There was an error fetching the users!', error);
            } finally {
                // setIsLoading(false);
            }
        };
        fetchAllProduk();
    }, []);
    const statusCount = allproduk.reduce((acc: any, curr: any) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
    }, {});
    return (
        <div>
            <h4><strong>Overview</strong></h4>
            <div className='grid justify-content-between'>
                <div className="col-4 lg:col-6 xl:col-4 ">
                    <div className="border-round w-12 mb-0 bg-white border-1 border-blue-300">
                        <span className="block border-round-top p-3 bg-blue-100 text-500 font-medium mb-3">Diajukan</span>
                        <div className="mb-3 p-2">
                            <div className="text-900 font-medium text-xl flex justify-content-between align-items-center">
                                <div className='ml-4'>
                                    {statusCount[1] || 0}
                                </div>
                                <div className="hidden md:flex align-items-center justify-content-center bg-blue-100 border-round mr-2" style={{ width: '3rem', height: '3rem' }}>
                                    <img src="/demo/images/approvel/diajukan.png" alt="diajukan" width={30} height={30} />
                                </div>
                            </div>
                        </div>
                        {/* <span className="text-green-500 font-medium">24 new </span>
                        <span className="text-500">since last visit</span> */}
                    </div>
                </div>

                <div className="col-4 lg:col-6 xl:col-4">
                    <div className="border-round w-12 mb-0 bg-white border-1 border-green-300">
                        <span className="block border-round-top p-3 bg-green-100 text-500 font-medium mb-3">Disetujui</span>
                        <div className="mb-3 p-2">
                            <div className="text-900 font-medium text-xl flex justify-content-between align-items-center">
                                <div className='ml-4'>
                                    {statusCount[2] || 0}
                                </div>
                                <div className="hidden md:flex align-items-center justify-content-center bg-green-100 border-round mr-2" style={{ width: '3rem', height: '3rem' }}>
                                    <img src="/demo/images/approvel/disetujui.png" alt="disetujui" width={30} height={30} />
                                </div>
                            </div>
                        </div>
                        {/* <span className="text-green-500 font-medium">%52+ </span>
                        <span className="text-500">since last week</span> */}
                    </div>
                </div>
                <div className="col-4 lg:col-6 xl:col-4">
                <div className="border-round w-12 mb-0 bg-white border-1 border-red-300">
                        <span className="block border-round-top p-3 bg-red-100 text-500 font-medium mb-3">Ditolak</span>
                        <div className="mb-3 p-2">
                            <div className="text-900 font-medium text-xl flex justify-content-between align-items-center">
                                <div className='ml-4'>
                                    {statusCount[3] || 0}
                                </div>
                                <div className="hidden md:flex align-items-center justify-content-center bg-red-100 border-round mr-2" style={{ width: '3rem', height: '3rem' }}>
                                    <img src="/demo/images/approvel/ditolak.png" alt="ditolak" width={30} height={30} />
                                </div>
                            </div>
                        </div>
                        {/* <span className="text-green-500 font-medium">520 </span>
                        <span className="text-500">newly registered</span> */}
                    </div>
                </div>
            </div>
            <h5>Details</h5>
            <Debiturpage />
        </div>
    );
}

export default Adminpage;