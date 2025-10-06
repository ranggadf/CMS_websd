'use client';

import React, { useEffect, useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { Panel } from 'primereact/panel';
import { Fieldset } from 'primereact/fieldset';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const EditFormSurvey = () => {
    const params = useParams();
    const no_pengajuan = params?.no_pengajuan;
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [survey, setSurvey] = useState<any[]>([]);
    const [formData, setFormData] = useState<any>({
        no_pengajuan: no_pengajuan || ''
    });

    const resetForm = () => {
        setFormData({
            no_pengajuan: no_pengajuan || '',
            ...survey.reduce((acc: any, question: any) => {
                acc[question.Keterangan] = '';
                return acc;
            }, {})
        });
    };

    useEffect(() => {
        const fetchSurvey = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.GETSURVEY);
                setSurvey(response.data);
            } catch (error) {
                console.error("There was an error fetching the survey!", error);
            }
        };

        fetchSurvey();

        if (no_pengajuan) {
            fetchSurveyData(no_pengajuan);
        }
    }, [no_pengajuan]);

    const fetchSurveyData = async (no_pengajuan: any) => {
        try {
            const response = await axios.get(`${API_ENDPOINTS.GETSURVEYBYNOPENGAJUAN(no_pengajuan)}`);
            const formattedData = response.data.reduce((acc: any, survey: any) => {
                acc[survey.Keterangan] = survey.Pilihan;
                return acc;
            }, {});
            setFormData({ ...formData, ...formattedData });
        } catch (error) {
            console.error('Error fetching Survey data:', error);
        }
    };

    const handleRadioChange = (e: any, fieldName: string) => {
        setFormData((prev: any) => ({ ...prev, [fieldName]: e.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let response;
            if (no_pengajuan) {
                response = await axios.put(API_ENDPOINTS.UPDATESURVEYBYID(no_pengajuan), formData);
            } else {
                response = await axios.post(API_ENDPOINTS.ADDSURVEY, formData);
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
        <div className="p-4">
            <Panel header="Survey Form">
                <form onSubmit={handleSubmit}>
                    {survey.map((question, index) => (
                        <Fieldset
                            legend={question.Keterangan}
                            key={index}
                            style={{ marginTop: "20px" }}
                        >
                            {question.pilihan_survey.map((pilihan: any, indexpilihan: number) => (
                                <div
                                    className="flex"
                                    style={{ marginBottom: "10px" }}
                                    key={indexpilihan}
                                >
                                    <RadioButton
                                        name={`question_${question.Keterangan}`}
                                        value={pilihan.pertanyaan}
                                        onChange={(e) =>
                                            handleRadioChange(e, `${question.Keterangan}`)
                                        }
                                        checked={
                                            formData[`${question.Keterangan}`] ===
                                            pilihan.pertanyaan
                                        }
                                    />
                                    <label
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginLeft: "10px"
                                        }}
                                    >
                                        {pilihan.pertanyaan}
                                    </label>
                                </div>
                            ))}
                        </Fieldset>
                    ))}
                    <div className='flex justify-content-end mt-4'>
                        <div className='flex gap-4'>
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
                    </div>
                </form>
            </Panel>
        </div>
    );
};

export default EditFormSurvey;
