
import React from 'react';
import { cn } from '@/lib/utils';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

const PageTitle = ({ title, subtitle, icon, className }: PageTitleProps) => {
  return (
    <div className={cn("mb-6", className)}>
      <div className="flex items-center gap-2">
        {icon && <div className="text-news-accent">{icon}</div>}
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      
      {subtitle && (
        <p className="text-news-secondary mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default PageTitle;
