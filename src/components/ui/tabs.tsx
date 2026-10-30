"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full gap-1 p-0.5 rounded-full bg-neutral-100/90 border border-black/[0.1] shadow-xs",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => {
          const isSelected = active.value === tab.value;
          return (
            <button
              key={tab.title}
              onClick={() => {
                moveSelectedTabToTop(idx);
              }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className={cn(
                "relative px-4 py-2 rounded-full cursor-pointer transition-colors duration-200 select-none",
                tabClassName
              )}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {isSelected && (
                <motion.div
                  layoutId="clickedbutton"
                  transition={{ type: "spring", bounce: 0.22, duration: 0.45 }}
                  className={cn(
                    "absolute inset-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] rounded-full border border-black/[0.06]",
                    activeTabClassName
                  )}
                />
              )}

              <span
                className={cn(
                  "relative block font-semibold text-xs sm:text-sm tracking-tight transition-colors duration-150",
                  isSelected
                    ? "text-neutral-900 font-bold"
                    : "text-neutral-600 hover:text-neutral-900"
                )}
              >
                {tab.title}
              </span>
            </button>
          );
        })}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-6 md:mt-8", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isSelected = (tab: Tab) => tab.value === tabs[0].value;
  return (
    <div className="relative w-full h-full">
      {tabs.slice(0, 2).map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.05,
            top: hovering ? idx * -25 : 0,
            zIndex: -idx,
            opacity: idx < 2 ? 1 - idx * 0.15 : 0,
          }}
          animate={{
            y: isSelected(tab) ? [0, 20, 0] : 0,
          }}
          transition={{
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
