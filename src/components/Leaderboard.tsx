import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Medal, 
  TrendingDown, 
  Droplets, 
  Users,
  Crown,
  Star,
  Zap
} from "lucide-react";

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  waterSaved: number;
  streak: number;
  efficiency: number;
  rank: number;
  change: "up" | "down" | "same";
  isYou?: boolean;
}

const weeklyLeaderboard: LeaderboardUser[] = [
  {
    id: "1",
    name: "EcoWarrior Sarah",
    avatar: "ES",
    waterSaved: 890,
    streak: 14,
    efficiency: 95,
    rank: 1,
    change: "up"
  },
  {
    id: "2", 
    name: "GreenThumb Mike",
    avatar: "GM",
    waterSaved: 756,
    streak: 21,
    efficiency: 92,
    rank: 2,
    change: "same"
  },
  {
    id: "3",
    name: "AquaSaver Lisa",
    avatar: "AL",
    waterSaved: 643,
    streak: 8,
    efficiency: 88,
    rank: 3,
    change: "down"
  },
  {
    id: "4",
    name: "You",
    avatar: "YO",
    waterSaved: 580,
    streak: 7,
    efficiency: 85,
    rank: 4,
    change: "up",
    isYou: true
  },
  {
    id: "5",
    name: "FlowMaster Tom",
    avatar: "FT",
    waterSaved: 512,
    streak: 12,
    efficiency: 82,
    rank: 5,
    change: "down"
  },
  {
    id: "6",
    name: "DropGuardian Amy",
    avatar: "DA",
    waterSaved: 467,
    streak: 5,
    efficiency: 78,
    rank: 6,
    change: "up"
  },
  {
    id: "7",
    name: "ConserveKing Joe",
    avatar: "CJ",
    waterSaved: 423,
    streak: 19,
    efficiency: 75,
    rank: 7,
    change: "same"
  },
  {
    id: "8",
    name: "BlueHero Nina",
    avatar: "BN",
    waterSaved: 389,
    streak: 3,
    efficiency: 73,
    rank: 8,
    change: "down"
  }
];

const monthlyChampions = [
  { name: "EcoWarrior Sarah", waterSaved: 3450, avatar: "ES" },
  { name: "GreenThumb Mike", waterSaved: 3200, avatar: "GM" },
  { name: "ConserveKing Joe", waterSaved: 2980, avatar: "CJ" }
];

export const Leaderboard = () => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-bold">{rank}</span>;
    }
  };

  const getChangeIcon = (change: "up" | "down" | "same") => {
    switch (change) {
      case "up":
        return <TrendingDown className="w-4 h-4 text-green-500 rotate-180" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  const LeaderboardItem = ({ user }: { user: LeaderboardUser }) => (
    <div className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
      user.isYou 
        ? "bg-primary/10 border-2 border-primary/30 shadow-lg" 
        : "bg-card hover:bg-muted/30"
    }`}>
      <div className="flex items-center gap-3 flex-1">
        <div className="flex items-center gap-2">
          {getRankIcon(user.rank)}
          {getChangeIcon(user.change)}
        </div>
        
        <Avatar className="w-10 h-10">
          <AvatarFallback className={user.isYou ? "bg-primary text-primary-foreground" : ""}>
            {user.avatar}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className={`font-medium ${user.isYou ? "text-primary font-bold" : ""}`}>
              {user.name}
            </h3>
            {user.isYou && <Badge variant="secondary">You</Badge>}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Droplets className="w-4 h-4" />
              {user.waterSaved}L saved
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              {user.streak} day streak
            </span>
          </div>
        </div>
      </div>
      
      <div className="text-right">
        <div className="text-lg font-bold">{user.efficiency}%</div>
        <div className="text-sm text-muted-foreground">efficiency</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Community Leaderboard</h2>
        <p className="text-muted-foreground">Compete with water conservation champions</p>
      </div>

      {/* Monthly Champions */}
      <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Trophy className="w-6 h-6" />
            Monthly Champions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {monthlyChampions.map((champion, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="relative">
                  <Avatar className="w-16 h-16 mx-auto">
                    <AvatarFallback className="text-lg font-bold">
                      {champion.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {index === 0 && (
                    <Crown className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 text-yellow-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-yellow-800">{champion.name}</h3>
                  <p className="text-sm text-yellow-600">{champion.waterSaved}L saved</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="weekly" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="global">Global</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Weekly Leaderboard
                </div>
                <Badge variant="outline" className="gap-2">
                  <Star className="w-4 h-4" />
                  125 participants
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {weeklyLeaderboard.map((user) => (
                  <LeaderboardItem key={user.id} user={user} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="friends">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Friends Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Connect with friends to see their water conservation progress!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="global">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Global Rankings
                </div>
                <Badge variant="outline" className="gap-2">
                  <Star className="w-4 h-4" />
                  8,742 users worldwide
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {weeklyLeaderboard.slice(0, 5).map((user) => (
                  <LeaderboardItem key={user.id} user={user} />
                ))}
              </div>
              <div className="text-center mt-6 p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Your global rank: <span className="font-bold">#1,247</span> out of 8,742 users
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};