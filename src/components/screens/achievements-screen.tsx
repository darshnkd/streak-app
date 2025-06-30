'use client';
import type { Achievement } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AchievementsScreenProps {
  achievements: Achievement[];
}

export default function AchievementsScreen({ achievements }: AchievementsScreenProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">
        Achievements
      </h1>

      <div className="grid gap-4">
        {achievements.map(achievement => (
          <Card key={achievement.id} className={cn('shadow-lg border-card/10', !achievement.unlocked && 'opacity-60')}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className={cn('w-12 h-12 rounded-full flex items-center justify-center shrink-0', achievement.unlocked ? 'bg-yellow-400/20' : 'bg-muted')}>
                  <span className="text-2xl">{achievement.unlocked ? achievement.icon : '🔒'}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">
                    {achievement.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {achievement.description}
                  </p>
                  {achievement.unlocked && achievement.date && (
                    <p className="text-sm text-yellow-500 mt-1">
                      Unlocked on {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {achievement.unlocked && <Trophy className="w-6 h-6 text-yellow-500" />}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
