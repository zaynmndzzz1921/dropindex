import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Droplets, 
  Zap, 
  Calendar, 
  Target, 
  Leaf,
  Award,
  Star,
  Shield,
  Crown
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
  category: "conservation" | "consistency" | "efficiency" | "social";
}

const achievements: Achievement[] = [
  {
    id: "1",
    title: "First Drop",
    description: "Complete your first water tracking session",
    icon: Droplets,
    progress: 1,
    maxProgress: 1,
    isUnlocked: true,
    rarity: "common",
    category: "conservation"
  },
  {
    id: "2", 
    title: "Week Warrior",
    description: "Track water usage for 7 consecutive days",
    icon: Calendar,
    progress: 7,
    maxProgress: 7,
    isUnlocked: true,
    rarity: "common",
    category: "consistency"
  },
  {
    id: "3",
    title: "Water Saver",
    description: "Save 100 liters of water",
    icon: Shield,
    progress: 150,
    maxProgress: 100,
    isUnlocked: true,
    rarity: "rare",
    category: "conservation"
  },
  {
    id: "4",
    title: "Efficiency Expert",
    description: "Achieve 90% efficiency for 5 days",
    icon: Zap,
    progress: 3,
    maxProgress: 5,
    isUnlocked: false,
    rarity: "epic",
    category: "efficiency"
  },
  {
    id: "5",
    title: "Goal Crusher",
    description: "Meet all daily goals for a month",
    icon: Target,
    progress: 18,
    maxProgress: 30,
    isUnlocked: false,
    rarity: "epic",
    category: "consistency"
  },
  {
    id: "6",
    title: "Eco Champion",
    description: "Save 1000 liters of water",
    icon: Leaf,
    progress: 450,
    maxProgress: 1000,
    isUnlocked: false,
    rarity: "legendary",
    category: "conservation"
  },
  {
    id: "7",
    title: "Community Leader",
    description: "Reach top 10 on weekly leaderboard",
    icon: Crown,
    progress: 0,
    maxProgress: 1,
    isUnlocked: false,
    rarity: "rare",
    category: "social"
  },
  {
    id: "8",
    title: "Perfect Week",
    description: "Achieve 100% efficiency for a week",
    icon: Star,
    progress: 0,
    maxProgress: 7,
    isUnlocked: false,
    rarity: "legendary",
    category: "efficiency"
  }
];

export const Achievements = () => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "border-gray-300 bg-gray-50";
      case "rare": return "border-blue-300 bg-blue-50";
      case "epic": return "border-purple-300 bg-purple-50";
      case "legendary": return "border-yellow-300 bg-yellow-50";
      default: return "border-gray-300 bg-gray-50";
    }
  };

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-gray-100 text-gray-800 border-gray-200";
      case "rare": return "bg-blue-100 text-blue-800 border-blue-200";
      case "epic": return "bg-purple-100 text-purple-800 border-purple-200";
      case "legendary": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "conservation": return <Droplets className="w-4 h-4" />;
      case "consistency": return <Calendar className="w-4 h-4" />;
      case "efficiency": return <Zap className="w-4 h-4" />;
      case "social": return <Trophy className="w-4 h-4" />;
      default: return <Award className="w-4 h-4" />;
    }
  };

  const unlockedAchievements = achievements.filter(a => a.isUnlocked);
  const totalAchievements = achievements.length;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Achievements
          </CardTitle>
          <Badge variant="outline" className="gap-2">
            <Award className="w-4 h-4" />
            {unlockedAchievements.length}/{totalAchievements}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            const progressPercentage = Math.min((achievement.progress / achievement.maxProgress) * 100, 100);
            
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.isUnlocked 
                    ? `${getRarityColor(achievement.rarity)} opacity-100` 
                    : "border-muted bg-muted/20 opacity-60"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    achievement.isUnlocked 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium ${
                        achievement.isUnlocked ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {achievement.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getRarityBadgeColor(achievement.rarity)}`}
                        >
                          {achievement.rarity}
                        </Badge>
                        <Badge variant="secondary" className="text-xs gap-1">
                          {getCategoryIcon(achievement.category)}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className={`text-sm ${
                      achievement.isUnlocked ? "text-muted-foreground" : "text-muted-foreground/70"
                    }`}>
                      {achievement.description}
                    </p>
                    
                    {!achievement.isUnlocked && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                      </div>
                    )}
                    
                    {achievement.isUnlocked && (
                      <div className="flex items-center gap-2 text-green-600">
                        <Award className="w-4 h-4" />
                        <span className="text-sm font-medium">Unlocked!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
              {unlockedAchievements.length}/{totalAchievements} completed
            </span>
          </div>
          <Progress 
            value={(unlockedAchievements.length / totalAchievements) * 100} 
            className="h-2"
          />
        </div>
      </CardContent>
    </Card>
  );
};