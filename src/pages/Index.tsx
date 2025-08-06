import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeviceSelector } from "@/components/DeviceSelector";
import { WaterTimer } from "@/components/WaterTimer";
import { GoalTracker } from "@/components/GoalTracker";
import { WaterChart } from "@/components/WaterChart";
import { Leaderboard } from "@/components/Leaderboard";
import { Achievements } from "@/components/Achievements";
import { Droplets, Trophy, Target, Calendar } from "lucide-react";

const Index = () => {
  const [selectedDevice, setSelectedDevice] = useState("");
  const [currentStreak, setCurrentStreak] = useState(7);
  const [totalWaterSaved, setTotalWaterSaved] = useState(2450);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <Droplets className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  DropIndex
                </h1>
                <p className="text-sm text-muted-foreground">Water Conservation Tracker</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="gap-2">
                <Trophy className="w-4 h-4" />
                {currentStreak} day streak
              </Badge>
              <Badge variant="outline" className="gap-2">
                <Droplets className="w-4 h-4" />
                {totalWaterSaved}L saved
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="track" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto">
            <TabsTrigger value="track" className="gap-2">
              <Droplets className="w-4 h-4" />
              Track
            </TabsTrigger>
            <TabsTrigger value="goals" className="gap-2">
              <Target className="w-4 h-4" />
              Goals
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <Calendar className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="social" className="gap-2">
              <Trophy className="w-4 h-4" />
              Social
            </TabsTrigger>
          </TabsList>

          {/* Tracking Tab */}
          <TabsContent value="track" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-primary" />
                    Select Device
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DeviceSelector 
                    selectedDevice={selectedDevice}
                    onDeviceSelect={setSelectedDevice}
                  />
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Water Usage Timer</CardTitle>
                </CardHeader>
                <CardContent>
                  <WaterTimer selectedDevice={selectedDevice} />
                </CardContent>
              </Card>
            </div>

            <Achievements />
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals">
            <GoalTracker />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <WaterChart />
          </TabsContent>

          {/* Social Tab */}
          <TabsContent value="social">
            <Leaderboard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;