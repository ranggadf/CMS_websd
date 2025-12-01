'use client';
import React, { useState, useRef, useEffect } from 'react'; // Tambahkan useEffect
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

interface HubungiKami {
    id: string;
    judul: string;
    no_telp: string;
    email: string;
    alamat: string;
}

// Hapus onAdd dan onDelete dari props, karena kita hanya fokus pada Update
export default function DataTableHubungiKami({
    data,
    loading,
    columns,
    onUpdate
}: {
    data: HubungiKami[]; // Tentukan tipe data yang lebih spesifik
    loading: boolean;
    columns: any[];
    onUpdate: (id: string, form: Omit<HubungiKami, 'id'>) => Promise<void>;
}) {
    // const [showDialog, setShowDialog] = useState(false); // Hapus state Tambah
    const [showEditDialog, setShowEditDialog] = useState(false);
    // const [deleteDialogVisible, setDeleteDialogVisible] = useState(false); // Hapus state Hapus
    // const [deleteId, setDeleteId] = useState<string | null>(null); // Hapus state Hapus
    const [selected, setSelected] = useState<HubungiKami | null>(null);

    const [judul, setJudul] = useState('');
    const [noTelp, setNoTelp] = useState('');
    const [email, setEmail] = useState('');
    const [alamat, setAlamat] = useState('');

    const toast = useRef<Toast>(null);

    // Gunakan useEffect untuk mengisi state saat data pertama kali dimuat
    useEffect(() => {
        if (data && data.length > 0) {
            setSelected(data[0]);
            setJudul(data[0].judul);
            setNoTelp(data[0].no_telp);
            setEmail(data[0].email);
            setAlamat(data[0].alamat);
        }
    }, [data]);

    // === Edit ===
    // Ganti openAddDialog menjadi openEditDialog untuk data yang sudah ada (data[0])
    const openEditDialog = () => {
        if (data.length === 0) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Perhatian',
                detail: 'Data Hubungi Kami belum tersedia.'
            });
            return;
        }
        const rowData = data[0]; // Hanya edit data pertama
        setSelected(rowData);
        setJudul(rowData.judul);
        setNoTelp(rowData.no_telp);
        setEmail(rowData.email);
        setAlamat(rowData.alamat);
        setShowEditDialog(true);
    };

    const handleUpdateData = () => {
        if (!selected?.id) return;

        if (!judul || !noTelp || !email || !alamat) {
            // Tambahkan validasi sederhana untuk semua field
            toast.current?.show({
                severity: 'warn',
                summary: 'Peringatan',
                detail: 'Semua kolom wajib diisi!',
                life: 3000
            });
            return;
        }

        onUpdate(selected.id, { judul, no_telp: noTelp, email, alamat });
        setShowEditDialog(false);
    };

    // Hapus: === Tambah === dan handleAddData

    // Hapus: === Hapus === dan confirmDelete/handleDeleteConfirm

    // Ubah actionBodyTemplate untuk hanya menampilkan tombol Edit
    const actionBodyTemplate = (rowData: HubungiKami) => (
        <div className="flex gap-2">
            <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-info"
                onClick={openEditDialog} // Sekarang tombol edit pada row memanggil openEditDialog
            />
            {/* Hapus tombol Hapus */}
        </div>
    );

    const dialogFooter = () => (
        <div className="flex justify-end gap-2">
            <Button label="Batal" icon="pi pi-times" onClick={() => setShowEditDialog(false)} className="p-button-text" />
            <Button label={'Update'} icon="pi pi-check" onClick={handleUpdateData} />
        </div>
    );

    // Batasi tabel untuk menampilkan hanya satu baris data (jika ada)
    const displayData = data.slice(0, 1);

    return (
        <>
            <Toast ref={toast} />

            <div className="card">
                <div className="flex justify-end mb-3">
                    <Button
                        label="Edit Data" // Ganti label dari "Tambah Data"
                        icon="pi pi-pencil" // Ganti ikon
                        className="p-button-primary"
                        onClick={openEditDialog} // Panggil openEditDialog
                    />
                </div>

                {/* Gunakan displayData untuk hanya menampilkan baris pertama */}
                <DataTable value={displayData} loading={loading} responsiveLayout="scroll">
                    {columns
                        .filter((col: any) => col.field !== 'id')
                        .map((col: any, i: number) => (
                            <Column key={i} field={col.field} header={col.header} sortable={false} />
                        ))}
                    <Column header="Aksi" body={actionBodyTemplate} />
                </DataTable>
            </div>

            {/* Hapus: === Dialog Tambah === */}

            {/* === Dialog Edit === */}
            <Dialog
                header="Edit Data Hubungi Kami"
                visible={showEditDialog}
                style={{ width: '35rem' }}
                modal
                onHide={() => setShowEditDialog(false)}
                footer={dialogFooter()} // Gunakan dialogFooter yang telah dimodifikasi
            >
                {/* Isi form Edit tetap sama */}
                <div className="field mb-3">
                    <label htmlFor="judul">Judul</label>
                    <InputText id="judul" value={judul} onChange={(e) => setJudul(e.target.value)} className="w-full" />
                </div>

                <div className="field mb-3">
                    <label htmlFor="no_telp">Nomor Telepon</label>
                    <InputText id="no_telp" value={noTelp} onChange={(e) => setNoTelp(e.target.value)} className="w-full" />
                </div>

                <div className="field mb-3">
                    <label htmlFor="email">Email</label>
                    <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
                </div>

                <div className="field mb-3">
                    <label htmlFor="alamat">Alamat</label>
                    <InputTextarea id="alamat" rows={3} value={alamat} onChange={(e) => setAlamat(e.target.value)} className="w-full" />
                </div>
            </Dialog>

            {/* Hapus: === Dialog Konfirmasi Hapus === */}
        </>
    );
}
