import type { User } from "@/store/features/program/types/review";
import AllUsersTable from "./AllUsersTable";

interface UserProps {
  users: User[];
}
const AllClients: React.FC<UserProps> = ({ users: clientsData }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <AllUsersTable users={clientsData} />
      </div>
    </div>
  );
};

export default AllClients;
