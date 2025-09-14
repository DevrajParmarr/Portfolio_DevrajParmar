import React from 'react';
import { cn } from '@/lib/utils';

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("animate-pulse", className)}>
    <div className="bg-muted/50 rounded-lg h-48 mb-4"></div>
    <div className="space-y-2">
      <div className="bg-muted/50 h-4 rounded w-3/4"></div>
      <div className="bg-muted/50 h-4 rounded w-1/2"></div>
      <div className="flex gap-2 mt-4">
        <div className="bg-muted/50 h-6 rounded-full w-16"></div>
        <div className="bg-muted/50 h-6 rounded-full w-20"></div>
      </div>
    </div>
  </div>
);

export const SkeletonProjectCard: React.FC = () => (
  <div className="animate-pulse bg-card/95 backdrop-blur-sm border border-border/40 rounded-lg overflow-hidden">
    <div className="bg-muted/50 h-52"></div>
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="bg-muted/50 h-6 rounded w-20"></div>
        <div className="bg-muted/50 h-5 rounded-full w-16"></div>
      </div>
      <div className="bg-muted/50 h-7 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="bg-muted/50 h-4 rounded w-full"></div>
        <div className="bg-muted/50 h-4 rounded w-4/5"></div>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-muted/50 h-6 rounded-full w-16"></div>
        ))}
      </div>
      <div className="bg-muted/50 h-10 rounded w-full"></div>
    </div>
  </div>
);

export const SkeletonHero: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center px-4 py-20">
    <div className="max-w-4xl mx-auto text-center animate-pulse space-y-8">
      <div className="bg-muted/50 h-12 rounded w-64 mx-auto"></div>
      <div className="bg-muted/50 h-20 rounded w-96 mx-auto"></div>
      <div className="bg-muted/50 h-8 rounded w-80 mx-auto"></div>
      <div className="space-y-2">
        <div className="bg-muted/50 h-6 rounded w-full max-w-2xl mx-auto"></div>
        <div className="bg-muted/50 h-6 rounded w-3/4 mx-auto"></div>
      </div>
      <div className="flex gap-4 justify-center">
        <div className="bg-muted/50 h-12 rounded w-32"></div>
        <div className="bg-muted/50 h-12 rounded w-24"></div>
      </div>
    </div>
  </div>
);

export const SkeletonSection: React.FC<{ items?: number }> = ({ items = 3 }) => (
  <section className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16 animate-pulse">
        <div className="bg-muted/50 h-8 rounded w-32 mx-auto mb-4"></div>
        <div className="bg-muted/50 h-12 rounded w-64 mx-auto mb-6"></div>
        <div className="bg-muted/50 h-6 rounded w-96 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: items }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  </section>
);