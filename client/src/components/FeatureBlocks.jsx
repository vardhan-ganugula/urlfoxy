import React from "react";
import { lazy, Suspense } from "react";
import { MdCampaign, MdMonitorHeart } from "react-icons/md";
import { TfiStatsUp } from "react-icons/tfi";
import StatsBlock from "./StatsBlock";

const FeatureBlocks = () => {
  const featureBlock = [
    {
      icon: TfiStatsUp,
      title: "Analytics",
      tagline: "Know what works, instantly.",
    },
    {
      icon: MdCampaign,
      title: "Create & Campaign",
      tagline: "Launch links that lead",
    },
    {
      tagline: "Stay in control, always.",
      title: "Monitor",
      icon: MdMonitorHeart,
    },
  ];

  return (
    <section className="flex justify-center gap-3 min-h-[500px] flex-col items-center">
        <h2 className="my-5 text-5xl text-amber-500 font-bold">
            What we offers
        </h2>
      <div className="flex md:flex-row flex-col gap-5">
        {featureBlock.map((block, idx) => (
          <StatsBlock
            key={idx}
            tagline={block.tagline}
            title={block.title}
            icon={block.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureBlocks;
