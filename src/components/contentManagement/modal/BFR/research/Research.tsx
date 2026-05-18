import ActionButton from "@/common/button/ActionButton";
import DashboardCardSkeleton from "@/common/button/DashboardCardSkeleton";
import CommonHeader from "@/common/header/CommonHeader";
import SearchBar from "@/components/userManagement/UserSearchBar";
import {
  useDeleteResearchMutation,
  useGetResearchQuery,
} from "@/store/features/content/contentAPI";
import type { ResearchEducation } from "@/store/features/content/types/research";
import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import ResearchModal from "./ResearchModal";

interface ResearchProps {
  selectResearch?: ResearchEducation | null;
  setSelectResearch: React.Dispatch<
    React.SetStateAction<null | ResearchEducation>
  >;
  showAddModal: boolean;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const Research: React.FC<ResearchProps> = ({
  showAddModal,
  setShowAddModal,
  setSelectResearch,
  selectResearch,
}) => {
  const handleEdit = async (item: ResearchEducation) => {
    setSelectResearch(item);
    setShowAddModal(true);
  };

  const { data, isLoading } = useGetResearchQuery();

  const research = data?.data ?? [];
  const list = new Array(10).fill(null);
  const [deleteResearch] = useDeleteResearchMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteResearch(id).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };
  return (
    <div>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4 w-full pt-6">
        {isLoading ? (
          list.map((_, index) => <DashboardCardSkeleton key={index} />)
        ) : research.length > 0 ? (
          research.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <CommonHeader size="md" className="!font-bold !text-black">
                    {item.title}
                  </CommonHeader>
                  <span className="inline-block bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full ">
                    {item.researchCategory}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  {item.shortDescription}
                </p>

                <div
                  dangerouslySetInnerHTML={{ __html: item.richContent }}
                  className="prose prose-sm max-w-none text-sm text-gray-700 pb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1"
                />
              </div>

              <div className="flex  gap-2 pt-4">
                <ActionButton variant="edit" onClick={() => handleEdit(item)}>
                  <Edit2 size={16} />
                  Edit
                </ActionButton>
                <ActionButton
                  onClick={() => handleDelete(item.id)}
                  variant="delete"
                  isDelete={deletingId === item.id}
                >
                  <Trash2 size={16} />
                </ActionButton>
              </div>
            </div>
          ))
        ) : (
          <div className="">
            <p className="">No research found</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <ResearchModal
          onClose={() => setShowAddModal(false)}
          selectResearch={selectResearch}
        />
      )}
    </div>
  );
};

export default Research;
