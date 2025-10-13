import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import axios from 'axios';

const DataTableWithCRUD = ({
    data,
    data2,
    data3,
    data4,
    data5,
    data6,
    onAdd,
    onUpdate,
    onDelete,
    columns,
    singleInput = false,
    imageInput = false,
    idField = 'id',
    nameField = 'section',
    nameField2 = 'judul',
    nameField3 = 'deskripsi',
    nameField4 = 'jumlah_siswa',
    nameField5 = 'jenis_kelamin',
    nameField6 = 'Gambar',
    addButtonLabel = 'Tambah',
    editButtonLabel = 'Perbarui',
    deleteButtonLabel = 'Hapus',
    addDialogHeader = 'Tambah Data',
    editDialogHeader = 'Edit Data',
    deleteDialogHeader = 'Hapus Data',
    inputLabel = 'Data',
    inputLabel2 = 'Data',
    inputLabel3 = 'Data',
    inputLabel4 = 'Data',
    inputLabel5 = 'Data',
    inputLabel6 = 'Data'

}: any) => {
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState<any>(null);
    const [inputValue3, setInputValue3] = useState('');
    const [inputValue4, setInputValue4] = useState('');
    const [inputValue5, setInputValue5] = useState('');
    const [inputValue6, setInputValue6] = useState('');
    const [editValue, setEditValue] = useState('');
    const [editValue2, setEditValue2] = useState('');
    const [editValue3, setEditValue3] = useState('');
    const [editValue4, setEditValue4] = useState<any>('');
    const [editValue5, setEditValue5] = useState('');
    const [editValue6, setEditValue6] = useState('');
    
    const [selectedImage, setSelectedImage] = useState<string | null>(null); // untuk preview gambar
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null); // untuk upload
    
    const [isUploading, setIsUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<{ Gambar: File[] }>({
        Gambar: [],
    });
    //const [sectionContents, setSectionContents] = useState<{ [key: string]: { id: number }[] }>({});
    const [sectionContents, setSectionContents] = useState<{
        [key: string]: { id: number; section: string, judul: string, deskripsi: string, jumlah_siswa: string, jenis_kelamin: string }[];
    }>({});



    const handleDropdownChange = (e: any) => {
        const value = e.value;
        setInputValue(value);

        // Tambahkan konten default dengan field kosong jika belum ada
        if (!sectionContents[value]) {
            setSectionContents(prev => ({
                ...prev,
                [value]: [{ id: Date.now(), section: "", judul: "", deskripsi: "", jumlah_siswa: "", jenis_kelamin: "" }] // Tambahkan field baru sesuai kebutuhan
            }));
        }
    };

    const handleContentChange = (
        sectionKey: string,
        contentId: number,
        fieldName: 'section' | 'judul' | 'deskripsi' | 'jumlah_siswa' | 'jenis_kelamin',
        newText: string
    ) => {
        console.log('sectionKey:', sectionKey);
        console.log('contentId:', contentId);
        console.log('fieldName:', fieldName);
        console.log('newText:', newText);
        console.log('Sebelum:', sectionContents[sectionKey]);
        setSectionContents(prev => ({
            ...prev,
            [sectionKey]: prev[sectionKey].map(content =>
                content.id === contentId
                    ? { ...content, [fieldName]: newText }
                    : content
            )

        }));

    };

    const handleAddContent = () => {
        if (!inputValue) return;
        setSectionContents(prev => ({
            ...prev,
            [inputValue]: [
                ...(prev[inputValue] || []),
                {
                    id: Date.now(),
                    section: "",
                    judul: "",
                    deskripsi: "",
                    jumlah_siswa: "",
                    jenis_kelamin: "",

                }
            ]
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const contentList = sectionContents[inputValue];
        if (!contentList || contentList.length === 0) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Peringatan',
                detail: 'Belum ada konten yang ditambahkan',
                life: 3000
            });
            return;
        }
        console.log("Data sebelum dikirim:", contentList);

        if (singleInput) {
            onAdd(inputValue);
        } else {
            onAdd(inputValue, inputValue3, inputValue4, contentList);
        }
        setInputValue('');
        setInputValue2('');
        setInputValue3('');
        setInputValue4('');
        setInputValue5('');
        setInputValue6('');
        setVisibleAdd(false);
    };

    const toast = useRef<Toast>(null);

       const handleUpdate = () => {
        console.log("Data sebelum diupdate:", selectedRow);
        if (singleInput) {
            onUpdate(selectedRow[idField], editValue);// Send only inputValue
        } else {
            onUpdate(selectedRow[idField], editValue, editValue2, editValue3, editValue4, editValue5, selectedImageFile);
        }
        setEditValue('');
        setEditValue2('');
        setEditValue3('');
        setEditValue4('');
        setEditValue5('');
        setEditValue6('');
        setSelectedImageFile(null);
        setVisibleEdit(false);
    };

  const handleImageChange = (itemId: number, event: any) => {
        const selectedFiles = event.files || [];

        if (selectedFiles.length > 0) {
            const file = selectedFiles[0];
            const objectURL = URL.createObjectURL(file);

            setSectionContents(prev => ({
                ...prev,
                [inputValue]: prev[inputValue].map(item =>
                    item.id === itemId
                        ? { ...item, image: [file], preview: objectURL }
                        : item
                )
            }));
        }
    };

     const handleImageUpload = (event: any) => {
        const selectedFiles = event.files;
        if (!selectedFiles || selectedFiles.length === 0) return;
        console.log('Uploading...');
        setInputValue6(selectedFiles);

        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(selectedFiles[0]);

        try {
            console.log('Success!')
        } catch (error) {
            console.error('Error uploading', error);
            console.log('Error')
        }
    };

    return (

        <div className='mb-5'>
            <Toast ref={toast} />
            <div className='mb-2 flex justify-content-end'>
                <Button label={addButtonLabel} icon="pi pi-plus" style={{ border: 'none', color: '#333', transition: 'transform 0.3s ease-in-out' }} className='bg-blue-200 w-full sm:w-auto hover:scale-110' onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={() => setVisibleAdd(true)} />
            </div>
            <DataTable value={data} responsiveLayout="stack" breakpoint="960px" paginator rows={5} rowsPerPageOptions={[5, 10]}>
                {/* <Column key="Kode" field="Kode" header="Kode" className='w-full sm:w-2' /> */}
                {columns.map((col: any) => (
                    <Column key={col.field} field={col.field} header={col.header} className={columns.length === 1 ? 'w-full sm:w-7' : 'w-full sm:w-4'} />
                ))}
                <Column header="Perbarui" body={(rowData) => (
                    <Button icon="pi pi-pencil" style={{ color: '#000000', transition: 'transform 0.3s ease-in-out' }} className='bg-blue-200 border-transparent hover:scale-110' onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={() => {
                        setSelectedRow(rowData);
                        setEditValue(rowData[nameField]);
                        //mengambil kode dari row dipilih dan mencari kode yang sesuai dalam data
                        if (Array.isArray(data2) && data2.length > 0 && rowData?.[nameField4]) {
                            const matchedValue = data2.find(item => item.id === rowData?.[nameField4]) || null;
                            //set nilai awal edit
                            setEditValue4(matchedValue);
                        }
                        setVisibleEdit(true);
                    }} />
                )} />
                <Column header="Hapus" body={(rowData) => (
                    <Button icon="pi pi-trash" style={{ color: '#000000', transition: 'transform 0.3s ease-in-out' }} className='bg-red-200 border-transparent hover:scale-110' onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={() => {
                        setSelectedRow(rowData);
                        setVisibleDelete(true);
                        console.log(rowData);
                    }} />
                )} />
            </DataTable>
            <Dialog header={`${deleteDialogHeader} ${selectedRow?.[nameField]}`} visible={visibleDelete} style={{ width: '90vw', maxWidth: '500px' }} onHide={() => setVisibleDelete(false)}>
                <label htmlFor="">Apakah anda yakin ingin menghapus data ini?</label>
                <div className='flex flex-column sm:flex-row justify-content-end mt-3'>
                    <Button label="No" icon="pi pi-times" onClick={() => setVisibleDelete(false)} className="p-button-text mb-2 sm:mb-0 sm:mr-2" />
                    <Button label="Yes" icon="pi pi-check" autoFocus onClick={() => { onDelete(selectedRow[idField]); setVisibleDelete(false); }} />
                </div>
            </Dialog>
            <Dialog header={addDialogHeader} visible={visibleAdd} style={{ width: '90vw', maxWidth: '500px' }} onHide={() => setVisibleAdd(false)}>
                <div className="p-fluid mb-5">
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label htmlFor="dropdown" className='font-bold'>{inputLabel}</label>
                            <Dropdown
                                id="dropdown"
                                value={inputValue}
                                options={[...Array(3)].map((_, i) => ({ id_section: (i + 1).toString() }))}
                                // onChange={(e) => {
                                //     setInputValue(e.value);
                                //     console.log("Yang dipilih:", e.value)
                                // }}
                                onChange={handleDropdownChange}
                                optionLabel='id_section'
                                optionValue='id_section'
                                placeholder="Pilih Opsi"
                                className="w-full"
                            />

                        </div>
                        <div className="field">
                            <label htmlFor="inputValue3" className='font-bold'>{inputLabel2}</label>
                            <InputText
                                id="inputValue3"
                                value={inputValue3}
                                onChange={(e) => setInputValue3(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="inputValue4" className='font-bold'>{inputLabel3}</label>
                            <InputText
                                id="inputValue4"
                                value={inputValue4}
                                onChange={(e) => setInputValue4(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        {/* SECTION 1 */}
                        {inputValue === "1" && (sectionContents[inputValue] || []).map((item) => (
                            <fieldset key={item.id} className="mb-4 p-4 border-round">
                                <legend className='text-xl font-bold'>Content Section 1</legend>
                                <div className='justify-content-between w-full'>
                                    <div className='field'>
                                        <label htmlFor="icon" className='font-bold'>{inputLabel6}</label>
                                        <div className="mb-4">
                                            <FileUpload
                                                name="media"
                                                multiple
                                                accept="image/*"
                                                maxFileSize={1000000}
                                                onSelect={(e) => handleImageChange(item.id, e)}
                                                emptyTemplate={<p className="m-0">Seret dan lepas file di sini atau klik untuk memilih.</p>}
                                                chooseLabel="Pilih File"
                                                cancelLabel="Batal"
                                                customUpload
                                                className="w-full"
                                                uploadHandler={handleImageUpload}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        ))}

                        {/* SECTION 2 */}
                      {inputValue === "3" && (sectionContents[inputValue] || []).map((item) => (
        <fieldset key={item.id} className="mb-4 p-4 border-round">
          <legend className='text-xl font-bold'>Content Section 2</legend>
          <div className='justify-content-between w-full'>
            <div className='field'>
              <label htmlFor="icon" className='font-bold'>{inputLabel6}</label>
              <div className="mb-4">
                <FileUpload
                  name="media"
                  multiple
                  accept="image/*"
                  maxFileSize={1000000}
                  onSelect={(e) => handleImageChange(item.id, e)}
                  emptyTemplate={<p className="m-0">Seret dan lepas file di sini atau klik untuk memilih.</p>}
                  chooseLabel="Pilih File"
                  cancelLabel="Batal"
                  customUpload
                  className="w-full"
                  uploadHandler={handleImageUpload}
                />
              </div>
            </div>
          </div>
        </fieldset>
      ))}

                         {/* SECTION 3 */}
                         {inputValue === "2" && (sectionContents[inputValue] || []).map((item, index) => (
                            <fieldset key={item.id} className="mb-4 p-4 border-round">
                                <legend className='text-xl font-bold'>Content Section 3</legend>
                                <div className='justify-content-between w-full'>
                                <div className="mb-4">
                                            <FileUpload
                                                name="media"
                                                multiple
                                                accept="image/*"
                                                maxFileSize={1000000}
                                                onSelect={(e) => handleImageChange(item.id, e)}
                                                emptyTemplate={<p className="m-0">Seret dan lepas file di sini atau klik untuk memilih.</p>}
                                                chooseLabel="Pilih File"
                                                cancelLabel="Batal"
                                                customUpload
                                                className="w-full"
                                                uploadHandler={handleImageUpload}
                                            />
                                        </div>
                                    <div className='field'>
                                        <label htmlFor={`jumlah_siswa-${item.id}`} className='font-bold'>{inputLabel4}</label>
                                        <InputText
                                            id={`jumlah_siswa-${item.id}`}
                                            value={item.jumlah_siswa}
                                            onChange={(e) =>
                                                handleContentChange(inputValue, item.id, 'jumlah_siswa', e.target.value)
                                            }
                                           
                                        />
                                    </div>
                                    <div className='field'>
                                        <label htmlFor={`jenis_kelamin-${item.id}`} className='font-bold'>{inputLabel5}</label>
                                        <InputText
                                            id={`jenis_kelamin-${item.id}`}
                                            value={item.jenis_kelamin}
                                            onChange={(e) =>
                                                handleContentChange(inputValue, item.id, 'jenis_kelamin', e.target.value)
                                            }
                                            
                                        />
                                    </div>
                                </div>
                            </fieldset>
                        ))}

                        <div className='flex flex-column sm:flex-row justify-content-between mt-3'>
                            <Button label={addButtonLabel} onClick={handleAddContent} icon="pi pi-plus" style={{ border: 'none', color: '#fff' }} className='bg-[#6366f1] w-full sm:w-auto' type='button' />
                            <Button className='w-full sm:w-4' type="submit" label="Simpan" icon="pi pi-check" />
                        </div>

                    </form>
                </div>
            </Dialog>
            <Dialog header={`${editDialogHeader}: ${[nameField, nameField2, nameField3, nameField4, nameField5, nameField6]
                .map(field => selectedRow?.[field])
                .filter(value => value)
                .join(", ")}`} visible={visibleEdit} style={{ width: '90vw', maxWidth: '500px' }} onHide={() => setVisibleEdit(false)}>
                <div className="p-fluid">
                    <div className="field">
                        <label htmlFor="inputValue" className='font-bold'>{inputLabel}</label>
                        <InputText
                            id="inputValue"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            required className="w-full"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="editValue2" className='font-bold'>{inputLabel2}</label>
                        <InputText
                            id="editValue2"
                            value={editValue2}
                            onChange={(e) => setEditValue2(e.target.value)}
                            required className="w-full"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="editValue3" className='font-bold'>{inputLabel3}</label>
                        <InputText
                            id="editValue3"
                            value={editValue3}
                            onChange={(e) => setEditValue3(e.target.value)}
                            required className="w-full"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="editValue4" className='font-bold'>{inputLabel4}</label>
                        <InputText
                            id="editValue4"
                            value={editValue4}
                            onChange={(e) => setEditValue4(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="editValue5" className='font-bold'>{inputLabel5}</label>
                        <InputText
                            id="editValue5"
                            value={editValue5}
                            onChange={(e) => setEditValue5(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="fileUpload" className='font-bold'>Gambar</label>
                        <FileUpload
                            name="media"
                            multiple={false}
                            accept="image/*"
                            maxFileSize={1000000}
                            onSelect={(e) => {
                                const selectedFiles = e.files || [];
                                if (selectedFiles.length > 0) {
                                    const file = selectedFiles[0];
                                    const objectURL = URL.createObjectURL(file);
                                    setSelectedImage(objectURL);
                                    setSelectedImageFile(file); // <- SIMPAN FILE NYA
                                }
                            }}
                            emptyTemplate={<p className="m-0">Seret dan lepas file di sini atau klik untuk memilih.</p>}
                            chooseLabel="Pilih File"
                            cancelLabel="Batal"
                            customUpload
                            className="w-full"
                        />
                        {selectedImage && <img src={selectedImage} alt="Preview" style={{ maxWidth: '100%' }} />}
                    </div>
                
                </div>
                <div className='flex flex-column sm:flex-row justify-content-end mt-3'>
                    <Button label="Batal" icon="pi pi-times" onClick={() => setVisibleEdit(false)} className="p-button-text w-full sm:w-3 mb-2 sm:mb-0 sm:mr-2 " />
                    <Button label={editButtonLabel} icon="pi pi-check" onClick={handleUpdate} autoFocus className="w-full sm:w-3" />
                </div>

            </Dialog>
        </div>
    );
};

export default DataTableWithCRUD;

function fetchData() {
    throw new Error('Function not implemented.');
}
