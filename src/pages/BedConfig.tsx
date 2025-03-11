import { useNavigate, useParams } from "react-router-dom";
import PatientWindow from "../components/BedConfig/PatientWindow.tsx";
import BedWindow from "../components/BedConfig/BedWindow.tsx";
import SensorTableWindow from "../components/BedConfig/SensorTableWindow.tsx";
import { useBedStore } from "../store/bedStore";
import { useEffect, useState } from "react";
import { Patient } from "../types/patient";
import { Sensor } from "../types/sensor";
import { Bed } from "../types/bed";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import AddSensorDialog from "../components/BedConfig/AddSensorDialog.tsx";
import { bedService } from "../services/bedService.ts";

const BedConfig: React.FC = () => {
  const { bed_id } = useParams<{ bed_id?: string }>();
  const bedStore = useBedStore();

  const [bed, setBed] = useState<Bed | undefined>();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [sensor, setSensor] = useState<Sensor[] | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePatientSelect = (selectedPatient: Patient) => {
    setPatient(selectedPatient);
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/");
  };

  useEffect(() => {
    // console.log("🛏️ bed_id from URL:", bed_id);
    // console.log("📦 bedStore.beds:", bedStore.beds);

    if (bed_id) {
      const bedIdNumber = parseInt(bed_id);
      // console.log("🔍 Searching for bed with ID:", bedIdNumber);

      const foundBed = bedStore.beds.find(
        (item) => item.bed_id === bedIdNumber
      );

      if (foundBed) {
        // console.log("✅ Found bed:", foundBed);
        setPatient(foundBed.patient);
        setSensor(foundBed.sensors);
        setBed(foundBed);
      } else {
        // console.warn("⚠️ No bed found with ID:", bedIdNumber);
      }
    }
  }, [bed_id, bedStore]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirm = async () => {
    if (bed && sensor) {
      const updatedBed = { ...bed, sensors: sensor, patient: patient }; // อัปเดตค่าเซ็นเซอร์ในเตียง
      updatedBed.patient_id = patient?.patient_id;
      await bedStore.saveBedConfig(bed.bed_id, updatedBed); // เรียกใช้ฟังก์ชันบันทึก
      bedStore.loadBeds(); // โหลดข้อมูลใหม่เพื่อให้ UI อัปเดต
      navigate("/"); // กลับไปหน้าแรก
    } else {
      console.warn("⚠️ Bed or sensors are undefined!");
    }
  };

  const handleSelectSensor = (selectedSensor: Sensor) => {
    console.log("✅ Sensor Selected:", selectedSensor);
    setSensor((prevSensors) => [...(prevSensors || []), selectedSensor]);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col p-4 bg-[#e7f0f3] min-h-[874px]">
      {/* Header */}
      <div className="flex justify-between p-4 rounded-lg">
        <h2 className="text-[#2E5361] text-4xl font-bold">
          โรงพยาบาลมหาวิทยาลัยบูรพา
        </h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-[#5E8892] text-white rounded-xl hover:bg-[#95BAC3]"
          onClick={handleOpenDialog}
        >
          <Icon path={mdiPlus} size={1} />
          <span>เพิ่มเซ็นเซอร์ใหม่</span>
        </button>
      </div>
      {/* Content */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <div className="p-2">
            <BedWindow bed_config={bed ?? undefined} />
          </div>
          <div className="p-2">
            <PatientWindow
              patient_config={patient ?? undefined}
              onPatientSelect={handlePatientSelect}
            />
          </div>
        </div>
        {/* Right Column: Sensors */}
        <div className="p-2">
          <SensorTableWindow sensors={sensor ?? undefined} />
        </div>
      </div>
      {/* Footer */}
      <div className="flex justify-end p-6 gap-4 ">
        <button
          className="px-6 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892]"
          onClick={handleConfirm}
        >
          ยืนยัน
        </button>
        <button
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400"
          onClick={handleCancel}
        >
          ยกเลิก
        </button>
      </div>
      {/* ✅ AddSensorDialog */}
      {isDialogOpen && (
        <AddSensorDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onSelectSensor={handleSelectSensor}
        />
      )}
    </div>
  );
};

export default BedConfig;
