import type { User } from "@/store/features/program/types/review";
import AllUsersTable from "./AllUsersTable";

interface UserProps {
  users: User[];
}
const AllUsers: React.FC<UserProps> = ({ users: allUsersData }) => {
  return (
    <div className="bg-white rounded-xl  overflow-hidden">
      <AllUsersTable users={allUsersData} />
    </div>
  );
};

export default AllUsers;
