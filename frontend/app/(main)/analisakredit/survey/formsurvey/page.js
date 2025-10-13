"use client"
import React, { useEffect, useState } from "react"
import { RadioButton } from "primereact/radiobutton"
import { Panel } from "primereact/panel"
import { Fieldset } from "primereact/fieldset"
import { Button } from "primereact/button"
import axios from "axios"
import { API_ENDPOINTS } from "@/app/api/losbackend/api"
import SearchRekening from "@/app/(full-page)/component/searchRekening/page"
import { Dialog } from "primereact/dialog"

const FormSurvey = ({ pengajuan, onSubmitSuccess }) => {
  const [formPengajuan] = useState(pengajuan);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [survey, setSurvey] = useState([])
  const [formData, setFormData] = useState({
    no_pengajuan: formPengajuan.no_pengajuan || ''

  })
  const resetForm = () => {
    setFormData({
      no_pengajuan: formPengajuan.no_pengajuan || ''
    })
  }

  const handleRadioChange = (e, fieldName) => {
    setFormData(prev => ({ ...prev, [fieldName]: e.value }))
  }


  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.GETSURVEY)
        setSurvey(response.data)
      } catch (error) {
        console.error("There was an error fetching the survey!", error)
      }
    }
    fetchSurvey()
  }, [])

  const handleSave = async () => {
    if(formData.no_pengajuan===''){
      alert('Nomor Pengajuan tidak tersedia')
      return
    }
    const response = await axios.post(API_ENDPOINTS.ADDSURVEY, formData);
    console.log('Response from API:', response.data);
    setIsLoading(false)
    setVisible(true)
    resetForm()
    onSubmitSuccess();
  }
  return (
    <div className="p-4">
      <Panel header="Survey Form">
        {survey.map((question, index) => (
          <Fieldset
            legend={question.Keterangan}
            key={index}
            style={{ marginTop: "20px" }}
          >
            {question.pilihan_survey.map((pilihan, indexpilihan) => (
              <div
                className="flex"
                style={{ marginBottom: "10px" }}
                key={indexpilihan}
              >
                <RadioButton
                  name={`question_${question.Keterangan}`}
                  value={pilihan.pertanyaan}
                  onChange={e =>
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
        {/* <Button label="Save" icon="pi pi-check" onClick={handleSave} /> */}
        <div className='flex justify-content-end mt-4'>
          <div className='flex gap-4'> {/*Button*/}
            <Button onClick={resetForm} className=''>Reset</Button>
            <Button onClick={handleSave} className='text-white bg-[#61AB5B] w-auto' disabled={isLoading}>
              {isLoading ? (
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
        </div>
      </Panel>
    </div>
  )
}

export default FormSurvey
