import ActionButton from "@/common/button/ActionButton";
import DashboardCardSkeleton from "@/common/button/DashboardCardSkeleton";
import CommonHeader from "@/common/header/CommonHeader";
import SearchBar from "@/components/userManagement/UserSearchBar";
import {
  useDeleteBFRMutation,
  useGetBFRQuery,
} from "@/store/features/content/contentAPI";
import type { BfrSession } from "@/store/features/content/types/bfr";
import { Clock, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import BFRSessionModal from "./BFRSessionModal";

interface SessionProps {
  selectBfr?: BfrSession | null;
  setSelectBfr: React.Dispatch<React.SetStateAction<null | BfrSession>>;
  showAddModal: boolean;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const Session: React.FC<SessionProps> = ({
  showAddModal,
  setShowAddModal,
  setSelectBfr,
  selectBfr,
}) => {
  const { data: bfrData, isLoading } = useGetBFRQuery({});
  const bfrSessions = bfrData?.data?.data ?? [];
  const list = new Array(10).fill(null);

  const [deleteBFR] = useDeleteBFRMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteBFR(id).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };
  const handleEdit = async (item: BfrSession) => {
    setSelectBfr(item);
    setShowAddModal(true);
  };

  return (
    <div>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4 pt-6">
        {isLoading ? (
          list.map((_, index) => <DashboardCardSkeleton key={index} />)
        ) : bfrSessions.length > 0 ? (
          bfrSessions.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <CommonHeader size="md" className="!font-bold !text-black">
                    {item.title}
                  </CommonHeader>
                </div>{" "}
                <span className="inline-block bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full ">
                  {item.sessionCategory}
                </span>
              </div>
              <div className="flex gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <span className="font-semibold">Upper</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {item.durationMinutes}
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-semibold">
                    {item.exerciseCount} exercises
                  </span>
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                {item.shortDescription}
              </p>

              <div
                dangerouslySetInnerHTML={{ __html: item.richContent }}
                className="prose prose-sm max-w-none text-sm text-gray-700 pb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1"
              />
              <div className="flex gap-2">
                <ActionButton onClick={() => handleEdit(item)} variant="edit">
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
          <p>No bfr data</p>
        )}
      </div>
      {showAddModal && (
        <BFRSessionModal
          selectBfr={selectBfr}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};

export default Session;
