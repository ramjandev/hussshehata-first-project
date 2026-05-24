import CommonButton from "@/common/button/CommonButton";
import DashboardCardSkeleton from "@/common/button/DashboardCardSkeleton";
import CommonHeader from "@/common/header/CommonHeader";
import {
  useDeleteExecutionNoteMutation,
  useGetExecutionNoteQuery,
} from "@/store/features/content/contentAPI";
import type { ExecutionNoteSingle } from "@/store/features/content/types/note";
import { Plus } from "lucide-react";
import { useState } from "react";
import ProgramCard from "../reuseable/ProgramCard";
import AddExecutionNoteModal from "./modal/AddExecutionNoteModal";

const Execution = () => {
  const [showNoteModal, setShowNoteModal] = useState(false);
  const { data, isLoading } = useGetExecutionNoteQuery();
  const list = new Array(5).fill(null);
  const executionNotes = data?.data || [];
  const [selectedNote, setSelectedNote] = useState<null | ExecutionNoteSingle>(
    null,
  );
  const [deleteNote] = useDeleteExecutionNoteMutation();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!id) return;

    try {
      setDeletingId(id);
      await deleteNote(id).unwrap();
    } finally {
      setDeletingId(null);
      setShowNoteModal(false);
      setSelectedNote(null);
    }
  };

  return (
    <div>
      <div className="space-y-4">
        <div className="flex justify-between pb-4">
          <div>
            <CommonHeader size="2xl" className="">
              Execution Notes
            </CommonHeader>
            <CommonHeader size="sm" className="">
              Create and manage comprehensive notes.
            </CommonHeader>
          </div>
          <CommonButton
            onClick={() => {
              setSelectedNote(null);
              setShowNoteModal(true);
            }}
          >
            <Plus />
            Add Execution Note
          </CommonButton>
        </div>
        {isLoading ? (
          list.map((_, index) => <DashboardCardSkeleton key={index} />)
        ) : executionNotes.length > 0 ? (
          executionNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <ProgramCard
                id={note.id}
                title={note.title}
                onEdit={() => {
                  setShowNoteModal(true);
                  setSelectedNote(note);
                }}
                onDelete={() => {
                  handleDelete(note.id);
                }}
                isLoading={deletingId === note.id}
                iconAction={() => {}}
              />
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">No execution notes found</p>
          </div>
        )}
      </div>
      {showNoteModal && (
        <AddExecutionNoteModal
          onClose={() => setShowNoteModal(false)}
          selectedNote={selectedNote}
        />
      )}
    </div>
  );
};

export default Execution;
