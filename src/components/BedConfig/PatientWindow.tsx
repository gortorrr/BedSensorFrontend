import React, { useEffect, useState } from "react";
import type { Patient } from "../../types/patient";
import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";
import { PlusCircle } from "lucide-react";
import AddPatientDialog from "./AddPatientDialog";
import { FaUser } from "react-icons/fa";
// import { useBedStore } from "../../store/bedStore";
import { usePatientStore } from "../../store/patientStore";

interface Props {
  patient_config: Patient | undefined;
  onPatientSelect: (patient: Patient) => void;
  bed_id: number; // เพิ่มฟังก์ชันรับค่าผู้ป่วย
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return ""; // ถ้าไม่มีค่าวันที่ ให้ return ค่าว่าง
  return new Date(dateString).toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const PatientWindow: React.FC<Props> = ({
  patient_config,
  onPatientSelect,
  bed_id,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>(
    patient_config
  );
  const patientStore = usePatientStore();

  useEffect(() => {
    // อัปเดต selectedPatient เมื่อ patient_config เปลี่ยนแปลง
    if (patient_config) {
      setSelectedPatient(patient_config);
    }
  }, [patient_config]); // ทำงานเมื่อ patient_config เปลี่ยนแปลง

  useEffect(() => {
    // โหลด patients แค่ครั้งเดียวตอนเริ่มต้น
    patientStore.loadPatientsWait();
  }, []); // ทำงานแค่ครั้งเดียวตอนเปิดหน้า

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    onPatientSelect(patient); // ส่งค่ากลับไป C
    closeDialog();
  };
  // console.log("🩺 Patient Config Data:", selectedPatient);

  const handleDeletePatient = () => {
    if (patient_config)
      patientStore.patients = [patient_config, ...patientStore.patients];
    console.log(patient_config?.patient_id);
    console.log(bed_id);
    setSelectedPatient(undefined);
  };

  if (!selectedPatient) {
    return (
      <div className="border-2 border-gray-300 rounded-md w-full bg-[#F0F0F0] p-3 mt-3 h-73 shadow-md">
        <div className="flex items-center p-3 text-xl font-semibold">
          <FaUser className="mr-2 text-2xl text-[#2E5361]" />{" "}
          {/* เพิ่มไอคอนผู้ป่วย */}
          รายละเอียดผู้ป่วย
        </div>{" "}
        <div className="flex justify-center items-center p-5">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892] mt-8 transition-transform duration-300 hover:scale-110"
            onClick={openDialog}
          >
            <PlusCircle size={24} />
            <span className="text-lg cursor-pointer">เพิ่มผู้ป่วย</span>
          </button>
          <AddPatientDialog
            isOpen={isDialogOpen}
            onClose={closeDialog}
            onSelectPatient={handleSelectPatient}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {selectedPatient !== undefined && (
        <div className="border-2 border-gray-300 rounded-md w-full bg-[#F0F0F0] p-3 mt-3 h-73 shadow-md">
          <div className="flex items-center p-3 text-xl font-semibold">
            <FaUser className="mr-2 text-2xl text-[#2E5361]" />{" "}
            {/* เพิ่มไอคอนผู้ป่วย */}
            รายละเอียดผู้ป่วย
          </div>
          <div className="grid grid-cols-2">
            {/* รหัสผู้ป่วย */}
            <div className="flex items-center p-3">
              <label
                htmlFor="patient_id"
                className="text-right pl-6 mr-8 font-medium"
              >
                รหัสผู้ป่วย:
              </label>
              <input
                id="patient_id"
                type="text"
                className="border border-gray-300 rounded-xl max-w-[250px] pl-3"
                value={selectedPatient?.patient_id || ""}
                placeholder="กรอกรหัสผู้ป่วย"
                readOnly
              />
            </div>

            {/* ชื่อ-นามสกุล */}
            <div className="flex items-center p-3">
              <label
                htmlFor="patient_name"
                className="text-right pl-6 mr-2 font-medium"
              >
                ชื่อ-นามสกุล:
              </label>
              <input
                id="patient_name"
                type="text"
                className="border border-gray-300 rounded-xl max-w-[250px] pl-3"
                value={selectedPatient?.patient_name || ""}
                placeholder="Enter patient name"
                readOnly
              />
            </div>

            {/* อายุ */}
            <div className="flex items-center p-3">
              <label htmlFor="patient_age" className="pl-6 mr-18 font-medium">
                อายุ:
              </label>
              <input
                id="patient_age"
                type="text"
                className="border border-gray-300 rounded-xl max-w-[250px] pl-3"
                value={selectedPatient?.patient_age || ""}
                placeholder="Enter patient age"
                readOnly
              />
            </div>

            {/* วันเกิด */}
            <div className="flex items-center p-3 pr-2">
              <label
                htmlFor="patient_birthdate"
                className="pl-6 mr-11 font-medium"
              >
                วันเกิด:
              </label>
              <input
                id="patient_birthdate"
                className="border border-gray-300 rounded-xl max-w-[250px] pl-3"
                value={formatDate(selectedPatient?.patient_dob)}
                readOnly
              />
            </div>

            {/* เพศ */}
            <div className="flex items-center p-3">
              <label
                htmlFor="patient_gender"
                className="pl-6 mr-18 font-medium"
              >
                เพศ:
              </label>
              <input
                id="patient_gender"
                className="border border-gray-300 rounded-xl max-w-[250px] pl-3"
                value={selectedPatient?.patient_gender || ""}
                readOnly
              >
                {/* <option value="">เลือกเพศ</option>
                <option value="male">ชาย</option>
                <option value="female">หญิง</option>
                <option value="other">อื่น ๆ</option> */}
              </input>
            </div>

            {/* หมู่เลือด */}
            <div className="flex items-center p-3 pr-2">
              <label htmlFor="patient_blood" className="pl-6 mr-8 font-medium">
                หมู่เลือด:
              </label>
              <input
                id="patient_blood"
                className="border border-gray-300 rounded-xl max-w-[250px] pl-3"
                value={selectedPatient?.patient_bloodtype || ""}
                readOnly
              >
                {/* <option value="">เลือกหมู่เลือด</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option> */}
              </input>
            </div>

            {/* การรักษา */}
            <div className="flex items-center p-3">
              <label
                htmlFor="patient_treatment"
                className="pl-6 mr-3 font-medium"
              >
                โรคประจำตัว:
              </label>
              <input
                id="patient_treatment"
                type="text"
                className="border border-gray-300 rounded-xl max-w-[250px] pl-3"
                value={selectedPatient?.patient_disease || ""}
                readOnly
              />
            </div>

            {/* ปุ่มแก้ไขและลบ */}
            <div className="flex justify-end mr-2 gap-3">
              {/* ปุ่มลบ */}
              <button
                type="button"
                title="Delete patient record"
                aria-label="Delete patient record"
                className="p-3 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={handleDeletePatient}
              >
                <Icon path={mdiDelete} size={1} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientWindow;
