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

const BedConfig: React.FC = () => {
  const { bed_id } = useParams<{ bed_id?: string }>();
  const bedStore = useBedStore();

  const [bed, setBed] = useState<Bed | undefined>();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [sensor, setSensor] = useState<Sensor[] | undefined>();

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/");
  };

  useEffect(() => {
    if (bed_id) {
      const bedIdNumber = parseInt(bed_id);
      const foundBed = bedStore.beds.find(
        (item) => item.bed_id === bedIdNumber
      );

      if (foundBed) {
        setPatient(foundBed.patient);
        setSensor(foundBed.sensors);
        setBed(foundBed);
      }
    }
  }, [bed_id, bedStore]);

  return (
    <div className="flex flex-col p-4">
      {/* Header */}
      <div className="flex justify-between p-4 rounded-lg">
        <h2 className="text-[#2E5361] text-4xl font-bold">
          โรงพยาบาลมหาวิทยาลัยบูรพา
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892]">
          <Icon path={mdiPlus} size={1} />
          <span>เพิ่มผู้ป่วย</span>
        </button>
      </div>
      {/* Content */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <div className="p-2">
            <BedWindow bed_config={bed ?? undefined} />
          </div>
          <div className="p-2">
            <PatientWindow patient_config={patient ?? undefined} />
          </div>
        </div>
        {/* Right Column: Sensors */}
        <div className="p-2">
          <SensorTableWindow sensors={sensor ?? undefined} />
        </div>
      </div>
      {/* Footer */}
      <div className="flex justify-end p-6 gap-4 ">
        <button className="px-6 py-2 bg-[#95BAC3] text-white rounded-xl hover:bg-[#5E8892]">
          ยืนยัน
        </button>
        <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400"
        onClick={handleCancel}>
          ยกเลิก
        </button>
      </div>
    </div>
  );
};

export default BedConfig;
