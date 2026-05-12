// Training.tsx

import image from "@/assets/images/muscle.svg";
import ActionButton from "@/common/button/ActionButton";
import CommonButton from "@/common/button/CommonButton";
import DashboardCardSkeleton from "@/common/button/DashboardCardSkeleton";
import CommonHeader from "@/common/header/CommonHeader";
import {
  useDeleteMethodMutation,
  useGetMethodQuery,
} from "@/store/features/program/programAPI";
import type { TTrainingMethod } from "@/store/features/program/types/method";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import ShowMethodModal from "./modal/ShowMethodModal";

const Training = () => {
  const { data, isLoading } = useGetMethodQuery();

  const [deleteMethod] = useDeleteMethodMutation();

  const [showMethodModal, setShowMethodModal] = useState(false);

  const [selectMethod, setSelectMethod] = useState<TTrainingMethod | null>(
    null,
  );

  const [deleteId, setDeleteId] = useState("");

  const trainingMethods = data?.data?.data ?? [];

  const list = new Array(8).fill(null);

  const handleDelete = async (id: string) => {
    try {
      setDeleteId(id);

      await deleteMethod(id).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteId("");
    }
  };

  const handleEdit = (item: TTrainingMethod) => {
    setSelectMethod(item);
    setShowMethodModal(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Training Methods Library
        </h3>

        <CommonButton
          onClick={() => {
            setShowMethodModal(true);
            setSelectMethod(null);
          }}
        >
          <Plus className="w-5 h-5" />
          Add Method
        </CommonButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
        {isLoading ? (
          list.map((_, index) => <DashboardCardSkeleton key={index} />)
        ) : trainingMethods.length > 0 ? (
          trainingMethods.map((method) => (
            <div
              key={method.id}
              className="bg-white rounded-xl border border-gray-200 p-4"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center">
                    <img src={image} alt="training-method" />
                  </div>

                  <CommonHeader size="lg">{method.name}</CommonHeader>
                </div>

                <div className="flex items-center gap-1">
                  <ActionButton
                    variant="edit"
                    editClassName="!bg-white border border-blue"
                    onClick={() => handleEdit(method)}
                  >
                    <Edit className="w-5 h-5 text-blue" />
                  </ActionButton>

                  <ActionButton
                    onClick={() => handleDelete(method.id)}
                    variant="delete"
                    isDelete={deleteId === method.id}
                  >
                    <Trash2 className="w-5 h-5" />
                  </ActionButton>
                </div>
              </div>

              <CommonHeader size="sm" className="mb-4 text-[#4A5565]!">
                {method.shortDescription}
              </CommonHeader>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-[#F0FDF4] flex flex-col items-center justify-center p-1 sm:p-4 rounded-md">
                  <p className="text-xs text-gray-600 mb-1">Sets</p>

                  <p className="text-lg font-semibold text-green-600">
                    {method.defaultSet}
                  </p>
                </div>

                <div className="bg-[#FFF7ED] flex flex-col items-center justify-center p-4 rounded-md">
                  <p className="text-xs text-gray-600 mb-1">Reps</p>

                  <p className="text-lg font-semibold text-orange-600">
                    {method.defaultReps}
                  </p>
                </div>
              </div>

              <CommonHeader size="sm" className="!text-[#090818]">
                {method.relatedDescription}
              </CommonHeader>
            </div>
          ))
        ) : (
          <p className="text-center col-span-4">No Training Methods Found</p>
        )}
      </div>

      {showMethodModal && (
        <ShowMethodModal
          setShowMethodModal={setShowMethodModal}
          selectMethod={selectMethod}
        />
      )}
    </div>
  );
};

export default Training;
