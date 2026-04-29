"use client";

import CumulativeContent from "./CumulativeContent";
import ComputeCost from "./ComputeCost";
import NumberPanel from "./NumberPanel";
import UserCount from "./UserCount";
/**
 * 左侧面板容器
 */
export default function LeftPanel() {
  return (
    <div className="flex flex-col gap-3 h-full">
      <CumulativeContent />
      <NumberPanel className="-mt-2" />
      <ComputeCost />
      <UserCount />
    </div>
  );
}
