import type { User } from "@/store/features/program/types/review";
import AllUsersTable from "./AllUsersTable";

interface UserProps {
  users: User[];
}

const AllCoached: React.FC<UserProps> = ({ users: coachesData }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <AllUsersTable users={coachesData} />
    </div>
  );
};

export default AllCoached;
