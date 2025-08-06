import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Play, 
  Pause, 
  Square, 
  Droplets, 
  Clock, 
  DollarSign,
  Leaf
} from "lucide-react";

interface WaterTimerProps {
  selectedDevice: string;
}

const deviceFlowRates: Record<string, number> = {
  shower: 9.5,
  "low-flow-shower": 6.5,
  bath: 15,
  dishwasher: 6,
  "car-wash": 150,
  "washing-machine": 45
};

const deviceNames: Record<string, string> = {
  shower: "Shower",
  "low-flow-shower": "Low-Flow Shower", 
  bath: "Bath",
  dishwasher: "Dishwasher",
  "car-wash": "Car Wash",
  "washing-machine": "Washing Machine"
};

export const WaterTimer = ({ selectedDevice }: WaterTimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [waterUsed, setWaterUsed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  const flowRate = selectedDevice ? deviceFlowRates[selectedDevice] || 0 : 0;
  const costPerLiter = 0.003; // $0.003 per liter (average US water cost)

  useEffect(() => {
    if (isRunning && flowRate > 0) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 1);
        setWaterUsed(prev => prev + (flowRate / 60)); // flow rate per second
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, flowRate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!selectedDevice) {
      toast({
        title: "Select a device first",
        description: "Please choose a device to start tracking water usage.",
        variant: "destructive"
      });
      return;
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    
    if (time > 0) {
      toast({
        title: "Session saved!",
        description: `Tracked ${waterUsed.toFixed(1)}L of water usage for ${formatTime(time)}.`,
      });
    }
    
    setTime(0);
    setWaterUsed(0);
  };

  const estimatedCost = waterUsed * costPerLiter;
  const co2Equivalent = waterUsed * 0.4; // kg CO2 per liter (rough estimate)

  return (
    <div className="space-y-6">
      {!selectedDevice ? (
        <div className="text-center text-muted-foreground py-8">
          <Droplets className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Select a device to start tracking</p>
        </div>
      ) : (
        <>
          {/* Timer Display */}
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">
                Tracking: {deviceNames[selectedDevice]}
              </h3>
              <div className="text-4xl font-bold font-mono bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {formatTime(time)}
              </div>
            </div>

            {/* Real-time Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Droplets className="w-4 h-4" />
                  <span className="text-sm font-medium">Water Used</span>
                </div>
                <div className="text-2xl font-bold">{waterUsed.toFixed(1)}L</div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm font-medium">Cost</span>
                </div>
                <div className="text-2xl font-bold">${estimatedCost.toFixed(3)}</div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 text-orange-600 mb-2">
                  <Leaf className="w-4 h-4" />
                  <span className="text-sm font-medium">CO₂ Impact</span>
                </div>
                <div className="text-2xl font-bold">{co2Equivalent.toFixed(2)}kg</div>
              </Card>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            {!isRunning ? (
              <Button
                onClick={handleStart}
                size="lg"
                className="gap-2"
              >
                <Play className="w-5 h-5" />
                Start
              </Button>
            ) : (
              <Button
                onClick={handlePause}
                variant="secondary"
                size="lg"
                className="gap-2"
              >
                <Pause className="w-5 h-5" />
                Pause
              </Button>
            )}

            <Button
              onClick={handleStop}
              variant="outline"
              size="lg"
              className="gap-2"
              disabled={time === 0}
            >
              <Square className="w-5 h-5" />
              Stop & Save
            </Button>
          </div>

          {/* Flow Rate Info */}
          <div className="text-center">
            <Badge variant="outline" className="gap-2">
              <Clock className="w-4 h-4" />
              {flowRate} L/min flow rate
            </Badge>
          </div>
        </>
      )}
    </div>
  );
};