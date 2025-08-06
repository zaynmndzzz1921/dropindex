import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, 
  Calendar, 
  TrendingDown, 
  Award, 
  Droplets,
  Edit3,
  Check,
  X
} from "lucide-react";

interface Goal {
  id: string;
  type: "daily" | "weekly" | "monthly";
  target: number;
  current: number;
  unit: "liters" | "minutes" | "percentage";
  title: string;
  description: string;
}

export const GoalTracker = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      type: "daily",
      target: 300,
      current: 180,
      unit: "liters",
      title: "Daily Water Limit",
      description: "Keep water usage under 300L per day"
    },
    {
      id: "2", 
      type: "weekly",
      target: 25,
      current: 32,
      unit: "percentage",
      title: "Weekly Reduction",
      description: "Reduce water usage by 25% compared to last week"
    },
    {
      id: "3",
      type: "monthly",
      target: 8000,
      current: 5420,
      unit: "liters",
      title: "Monthly Conservation",
      description: "Keep monthly usage under 8000L"
    }
  ]);

  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const getProgressPercentage = (goal: Goal) => {
    if (goal.unit === "percentage") {
      return goal.current;
    }
    return Math.min((goal.current / goal.target) * 100, 100);
  };

  const getProgressColor = (goal: Goal) => {
    const percentage = getProgressPercentage(goal);
    if (goal.unit === "percentage") {
      return percentage >= goal.target ? "bg-green-500" : "bg-red-500";
    }
    if (percentage <= 70) return "bg-green-500";
    if (percentage <= 90) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusBadge = (goal: Goal) => {
    const percentage = getProgressPercentage(goal);
    if (goal.unit === "percentage") {
      if (goal.current >= goal.target) {
        return <Badge className="bg-green-100 text-green-800 border-green-200">Achieved</Badge>;
      }
      return <Badge variant="secondary">In Progress</Badge>;
    }
    
    if (percentage <= 70) {
      return <Badge className="bg-green-100 text-green-800 border-green-200">On Track</Badge>;
    }
    if (percentage <= 90) {
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Warning</Badge>;
    }
    if (percentage >= 100) {
      return <Badge className="bg-red-100 text-red-800 border-red-200">Exceeded</Badge>;
    }
    return <Badge variant="secondary">In Progress</Badge>;
  };

  const handleEditGoal = (goalId: string, currentTarget: number) => {
    setEditingGoal(goalId);
    setEditValue(currentTarget.toString());
  };

  const handleSaveEdit = (goalId: string) => {
    const newTarget = parseFloat(editValue);
    if (newTarget > 0) {
      setGoals(goals.map(goal => 
        goal.id === goalId ? { ...goal, target: newTarget } : goal
      ));
    }
    setEditingGoal(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditingGoal(null);
    setEditValue("");
  };

  const filterGoalsByType = (type: "daily" | "weekly" | "monthly") => {
    return goals.filter(goal => goal.type === type);
  };

  const GoalCard = ({ goal }: { goal: Goal }) => (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              {goal.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{goal.description}</p>
          </div>
          {getStatusBadge(goal)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">
              {goal.unit === "percentage" 
                ? `${goal.current}%` 
                : `${goal.current.toLocaleString()} / ${goal.target.toLocaleString()} ${goal.unit}`
              }
            </span>
          </div>
          <Progress 
            value={getProgressPercentage(goal)} 
            className="h-2"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span className="capitalize">{goal.type} Goal</span>
          </div>
          
          {editingGoal === goal.id ? (
            <div className="flex items-center gap-2">
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-20 h-8 text-sm"
                type="number"
              />
              <Button
                size="sm"
                onClick={() => handleSaveEdit(goal.id)}
                className="h-8 w-8 p-0"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancelEdit}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleEditGoal(goal.id, goal.target)}
              className="h-8 gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Water Conservation Goals</h2>
        <p className="text-muted-foreground">Track your progress and stay motivated</p>
      </div>

      <Tabs defaultValue="daily" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          {filterGoalsByType("daily").map(goal => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          {filterGoalsByType("weekly").map(goal => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          {filterGoalsByType("monthly").map(goal => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card className="p-4 text-center">
          <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">12</div>
          <div className="text-sm text-muted-foreground">Goals Achieved</div>
        </Card>
        
        <Card className="p-4 text-center">
          <TrendingDown className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">23%</div>
          <div className="text-sm text-muted-foreground">Average Reduction</div>
        </Card>
        
        <Card className="p-4 text-center">
          <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">2,450L</div>
          <div className="text-sm text-muted-foreground">Water Saved</div>
        </Card>
      </div>
    </div>
  );
};