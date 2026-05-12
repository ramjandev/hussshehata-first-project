import CommonButton from "@/common/button/CommonButton";
import TabButton from "@/common/custom/TabButton";
import type { BfrSession } from "@/store/features/content/types/bfr";
import type { ResearchEducation } from "@/store/features/content/types/research";
import { Plus } from "lucide-react";
import { useState } from "react";
import Research from "./modal/BFR/research/Research";
import { Safety } from "./modal/BFR/safety/Safety";
import Session from "./modal/BFR/session/Session";
type ContentType = "safety" | "sessions" | "research";

const BFRSessionsGuidelines = () => {
  const [activeContentType, setActiveContentType] =
    useState<ContentType>("safety");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectBfr, setSelectBfr] = useState<null | BfrSession>(null);
  const [selectResearch, setSelectResearch] =
    useState<null | ResearchEducation>(null);

  const handleAddContent = async () => {
    setShowAddModal(true);
    setSelectBfr(null);
    setSelectResearch(null);
  };

  return (
    <div>
      <>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex flex-wrap  gap-3 ">
            <TabButton
              label="Safety Disclaimer"
              value="safety"
              activeValue={activeContentType}
              onChange={setActiveContentType}
            />
            <TabButton
              label="BFR Sessions"
              value="sessions"
              activeValue={activeContentType}
              onChange={setActiveContentType}
            />

            <TabButton
              label="Research & Educations"
              value="research"
              activeValue={activeContentType}
              onChange={setActiveContentType}
            />
          </div>
          <CommonButton onClick={() => handleAddContent()}>
            <Plus size={16} /> Add Content
          </CommonButton>
        </div>

        <div className="">
          {activeContentType === "safety" && (
            <Safety
              showAddModal={showAddModal}
              setShowAddModal={setShowAddModal}
            />
          )}
          {activeContentType === "sessions" && (
            <Session
              selectBfr={selectBfr}
              setSelectBfr={setSelectBfr}
              showAddModal={showAddModal}
              setShowAddModal={setShowAddModal}
            />
          )}
          {activeContentType === "research" && (
            <Research
              selectResearch={selectResearch}
              setSelectResearch={setSelectResearch}
              showAddModal={showAddModal}
              setShowAddModal={setShowAddModal}
            />
          )}
        </div>
      </>
    </div>
  );
};

export default BFRSessionsGuidelines;
