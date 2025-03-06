import React from "react";
import LeftSide from "../../assets/LeftSide.png";
import RightSide from "../../assets/RightSide.png";
import Straight from "../../assets/Straight.png";
import Sit from "../../assets/Sit.png";
import NotHere from "../../assets/NotHere.png";
import Default from "../../assets/default.png";

interface BedSensor {
  sensor_type: string;
  history_value_sensor: {
    history_value_sensor_value: string;
  }[];
}

interface BedIconProps {
  bedsensors: BedSensor[];
}

const BedIcon: React.FC<BedIconProps> = ({ bedsensors }) => {
  const iconMap: { [key: string]: string } = {
    นอนตะแคงซ้าย: LeftSide,
    นอนตะแคงขวา: RightSide,
    นอนตรง: Straight,
    นั่ง: Sit,
    ไม่อยู่ที่เตียง: NotHere,
  };

  return bedsensors?.map((bedsensor, index) => {
    const sensorValue =
      bedsensor.history_value_sensor.slice(-1)[0]?.history_value_sensor_value ??
      "";

    const iconPath = iconMap[sensorValue] || Default;

    return (
      <div key={index} className="flex items-center">
        <img src={iconPath} alt={sensorValue} className="w-40 h-40" />
      </div>
    );
  });
};

export default BedIcon;
