import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShowerHead, 
  Bath, 
  Utensils, 
  Car, 
  Shirt, 
  Droplets, 
  Timer,
  Zap
} from "lucide-react";

interface Device {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  avgFlow: number; // L/min
  description: string;
  efficiency: "high" | "medium" | "low";
}

const devices: Device[] = [
  {
    id: "shower",
    name: "Shower",
    icon: ShowerHead,
    avgFlow: 9.5,
    description: "Standard showerhead",
    efficiency: "medium"
  },
  {
    id: "low-flow-shower",
    name: "Low-Flow Shower",
    icon: Droplets,
    avgFlow: 6.5,
    description: "Water-efficient showerhead",
    efficiency: "high"
  },
  {
    id: "bath",
    name: "Bath",
    icon: Bath,
    avgFlow: 15,
    description: "Standard bathtub",
    efficiency: "low"
  },
  {
    id: "dishwasher",
    name: "Dishwasher",
    icon: Utensils,
    avgFlow: 6,
    description: "Energy Star rated",
    efficiency: "high"
  },
  {
    id: "car-wash",
    name: "Car Wash",
    icon: Car,
    avgFlow: 150,
    description: "Garden hose",
    efficiency: "low"
  },
  {
    id: "washing-machine",
    name: "Washing Machine",
    icon: Shirt,
    avgFlow: 45,
    description: "Front-loading",
    efficiency: "medium"
  }
];

interface DeviceSelectorProps {
  selectedDevice: string;
  onDeviceSelect: (deviceId: string) => void;
}

export const DeviceSelector = ({ selectedDevice, onDeviceSelect }: DeviceSelectorProps) => {
  const getEfficiencyColor = (efficiency: string) => {
    switch (efficiency) {
      case "high": return "bg-green-100 text-green-800 border-green-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getEfficiencyIcon = (efficiency: string) => {
    switch (efficiency) {
      case "high": return <Zap className="w-3 h-3" />;
      case "medium": return <Timer className="w-3 h-3" />;
      case "low": return <Droplets className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Choose the device or activity you're tracking to get accurate water usage estimates.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {devices.map((device) => {
          const Icon = device.icon;
          const isSelected = selectedDevice === device.id;
          
          return (
            <Card
              key={device.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected 
                  ? "ring-2 ring-primary bg-primary/5 border-primary/30" 
                  : "hover:border-primary/20"
              }`}
              onClick={() => onDeviceSelect(device.id)}
            >
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{device.name}</h3>
                      <p className="text-sm text-muted-foreground">{device.description}</p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`gap-1 ${getEfficiencyColor(device.efficiency)}`}
                  >
                    {getEfficiencyIcon(device.efficiency)}
                    {device.efficiency}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Flow rate:</span>
                  <span className="font-medium">{device.avgFlow} L/min</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};