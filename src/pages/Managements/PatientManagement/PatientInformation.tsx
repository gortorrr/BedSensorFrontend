import React, { useEffect, useState } from "react";
import { Patient } from "../../../types/patient";
import { useParams } from "react-router-dom";
import { usePatientStore } from "../../../store/patientStore";
import PersonalBehavior from "../../../components/Managements/Patient/PersonalBehavior";

const PatientInformation: React.FC = () => {
  const { patient_id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [imgPath, setImgPath] = useState<string>();
  const patientStore = usePatientStore();
  const [activeTab, setActiveTab] = useState<
    "history" | "medical" | "behavior"
  >("behavior");

  const fetchPatientData = async (patient_id: number) => {
    const data = await patientStore.getPatientWithDetail(patient_id);
    setPatient(data);
  };

  useEffect(() => {
    if (patient_id) {
      fetchPatientData(Number(patient_id));
    }
  }, [patient_id]);

  useEffect(() => {
    if (patient) setImgPath(`http://localhost:8000${patient.image_path}`);
    console.log(patient);
  }, [patient]);

  useEffect(() => {});
  return (
    // <div className="p-6 bg-[#e7f0f3] min-h-screen">
    <div className="p-6 bg-[#e7f0f3] h-screen overflow-hidden">
      {/* หัวข้อ */}
      <h1 className="text-3xl font-bold text-[#2E5361] mb-6">
        รายละเอียดข้อมูลผู้ป่วย
      </h1>

      {/* ข้อมูลผู้ป่วย */}
      <div className="bg-white rounded-xl shadow-md p-6 grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="flex-shrink-0">
            <label className="cursor-pointer relative w-32 h-32 rounded-md border border-gray-300 flex items-center justify-center overflow-hidden shadow-md hover:shadow-lg transition">
              (
              <img
                src={imgPath}
                alt="preview"
                className="object-cover w-full h-full"
              />
              )
            </label>
          </div>
          <p>
            <strong>รหัสผู้ป่วย:</strong> P
            {patient?.patient_id?.toString().padStart(5, "0")}
          </p>
          <p>
            <strong>อายุ:</strong> {patient?.patient_age}
          </p>
          <p>
            <strong>เพศ:</strong> {patient?.patient_gender}
          </p>
          <p>
            <strong>โรคประจำตัว:</strong> {patient?.patient_disease}
          </p>
        </div>
        <div>
          <p>
            <strong>ชื่อ-นามสกุล:</strong> {patient?.patient_name}
          </p>
          <p>
            <strong>วันเกิด:</strong> {patient?.patient_dob}
          </p>
          <p>
            <strong>หมู่เลือด:</strong> {patient?.patient_bloodtype}
          </p>
          <p>
            <strong>อาคาร/เตียง:</strong>{" "}
            {[
              patient?.bed?.room?.floor?.building?.building_name,
              patient?.bed?.room?.floor?.floor_name,
              patient?.bed?.room?.room_name,
              patient?.bed?.bed_name,
            ]
              .filter(Boolean)
              .join(" ") || "-"}
          </p>
        </div>
      </div>

      {/* ปุ่มเมนู */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`${
            activeTab === "history"
              ? "bg-[#87A8A4] text-white"
              : "bg-[#D9D9D9] text-black"
          } px-4 py-2 rounded shadow`}
          onClick={() => setActiveTab("history")}
        >
          ประวัติการรักษา
        </button>

        <button
          className={`${
            activeTab === "medical"
              ? "bg-[#87A8A4] text-white"
              : "bg-[#D9D9D9] text-black"
          } px-4 py-2 rounded shadow`}
          onClick={() => setActiveTab("medical")}
        >
          ข้อมูลทางการแพทย์
        </button>

        <button
          className={`${
            activeTab === "behavior"
              ? "bg-[#87A8A4] text-white"
              : "bg-[#D9D9D9] text-black"
          } px-4 py-2 rounded shadow`}
          onClick={() => setActiveTab("behavior")}
        >
          พฤติกรรมส่วนบุคคล
        </button>

        <button className="ml-auto bg-[#B3B3B3] px-4 py-2 rounded shadow flex items-center">
          <span className="text-xl mr-2">➕</span> เพิ่มบันทึกใหม่
        </button>
      </div>

      <div>
        {activeTab === "history" && <div>history</div>}
        {activeTab === "medical" && <div>medical</div>}

        {activeTab === "behavior" && <PersonalBehavior />}
      </div>
      {/* <button
        onClick={() => window.history.back()}
        className="bg-[#B3B3B3] px-4 py-2 rounded shadow flex items-center"
      >
        <span className="text-xl mr-2">⬅</span> ย้อนกลับ
      </button> */}
    </div>
  );
};

export default PatientInformation;
