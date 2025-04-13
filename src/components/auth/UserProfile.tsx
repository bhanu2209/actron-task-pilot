
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export const UserProfile: React.FC = () => {
  const { user, userDetails, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-3 w-[150px]" />
        </div>
      </div>
    );
  }

  if (!user || !userDetails) {
    return null;
  }

  const avatarUrl = userDetails.avatar_url || user.user_metadata?.avatar_url;
  const name = userDetails.full_name || user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User';
  const email = userDetails.email || user.email;

  return (
    <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-800/40">
      <Avatar>
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium text-terminal-text">{name}</p>
        <p className="text-xs text-gray-400">{email}</p>
      </div>
    </div>
  );
};
