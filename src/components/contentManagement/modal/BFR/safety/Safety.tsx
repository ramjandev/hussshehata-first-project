import ActionButton from "@/common/button/ActionButton";
import DashboardCardSkeleton from "@/common/button/DashboardCardSkeleton";
import { useDebounce } from "@/common/custom/useDebounce";
import CommonHeader from "@/common/header/CommonHeader";
import SearchBar from "@/components/userManagement/UserSearchBar";
import {
  useDeleteSafetyMutation,
  useGetSafetyDisclaimerQuery,
} from "@/store/features/content/contentAPI";
import type { SafetyContentItem } from "@/store/features/content/types/saftey";
import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import SafetyDisClaimerModal from "./SafetyModal";

interface SafetyProps {
  showAddModal: boolean;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Safety: React.FC<SafetyProps> = ({
  showAddModal,
  setShowAddModal,
}) => {
  const [search, setSearch] = useState<string>("");
  const debounceSearch = useDebounce(search, 500);
  const { data: safety, isLoading } = useGetSafetyDisclaimerQuery({
    search: debounceSearch,
  });
  const [deleteSafety] = useDeleteSafetyMutation();
  const [selectSafety, setSelectSafety] = useState<null | SafetyContentItem>(
    null,
  );

  const safetyData = safety?.data?.data ?? [];

  const handleEdit = (item: SafetyContentItem) => {
    setSelectSafety(item);
    setShowAddModal(true);
  };

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const list = new Array(10).fill(null);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteSafety(id).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };
  return (
    <div>
      <SearchBar
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4 pt-6 ">
        {isLoading ? (
          list.map((_, index) => <DashboardCardSkeleton key={index} />)
        ) : safetyData && safetyData.length > 0 ? (
          safetyData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <CommonHeader size="md" className="!font-bold !text-black">
                {item.title}
              </CommonHeader>
              <CommonHeader size="sm" className="">
                {item.description}
              </CommonHeader>

              <div className=" p-4 rounded-lg mb-4">
                <CommonHeader size="md" className="!font-bold !text-black">
                  A IMPORTANT SAFETY INFORMATION:
                </CommonHeader>

                <div
                  dangerouslySetInnerHTML={{ __html: item.content }}
                  className="prose prose-sm max-w-none text-sm text-gray-700"
                />
              </div>

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
          <p className="text-center w-full col-span-full">
            No safety disclaimer data
          </p>
        )}
      </div>

      {showAddModal && (
        <SafetyDisClaimerModal
          onClose={() => setShowAddModal(false)}
          selectSafety={selectSafety}
        />
      )}
    </div>
  );
};
