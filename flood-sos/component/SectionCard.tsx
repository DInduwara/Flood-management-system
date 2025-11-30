// components/SectionCard.tsx
import React from "react";
import clsx from "clsx";

type SectionCardProps = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  icon,
  children,
  className,
}) => {
  return (
    <section
      className={clsx(
        "rounded-2xl p-6 shadow-sm border border-slate-100",
        className
      )}
    >
      <header className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      </header>
      {children}
    </section>
  );
};
