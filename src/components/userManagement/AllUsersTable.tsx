import { formatDate } from "@/lib/help";
import type { User } from "@/store/features/program/types/review";
import { Crown, MoreVertical } from "lucide-react";
import img from "../../assets/images/man.png";
import { tableDesign } from "../programManagement/ProgramAnalytics";
const tableHeaders = [
  { label: "Program Name", align: "text-left" },
  { label: "Type", align: "text-left hidden md:table-cell" },
  { label: "Status", align: "text-left hidden sm:table-cell" },
  { label: "Subscription", align: "text-left" },
  { label: "Registration", align: "text-left hidden lg:table-cell" },
  { label: "Last Login", align: "text-left hidden lg:table-cell" },
  { label: "Action", align: "text-left" },
];

export interface AllUsersTableProps {
  users: User[];
  emptyMessage?: string;
  onActionClick?: (user: User) => void;
}

export const getTypeColor = (type: string): string => {
  switch (type) {
    case "USER":
      return "bg-purple-100 text-purple-700";
    case "COACH":
      return "bg-blue-100 text-blue-700";
    case "Coached Client":
      return "bg-cyan-100 text-cyan-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-700";
    case "Need Clearance":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const AllUsersTable: React.FC<AllUsersTableProps> = ({
  users,
  emptyMessage = "No users found.",
  onActionClick,
}) => {
  return (
    <>
      <div className=" bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="block w-full overflow-x-auto">
          <table className={tableDesign.table}>
            <thead className={tableDesign.thead}>
              <tr className={tableDesign.tr}>
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className={` ${header.align} ${tableDesign.th} ${index === 0 ? "text-left!" : ""}`}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className={tableDesign.tbody}>
              {users.length === 0 ? (
                <tr className={tableDesign.tr}>
                  <td colSpan={7} className={`text-center ${tableDesign.td}`}>
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className={tableDesign.tr}>
                    <td className={` ${tableDesign.td} `}>
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar || img}
                          alt={user.name}
                          className="w-10 h-10 rounded-full hidden sm:block"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className={` hidden md:table-cell ${tableDesign.td} `}>
                      <span
                        className={`px-3 py-1 w-fit mx-auto rounded-full text-xs font-medium hidden md:block ${getTypeColor(
                          user.role,
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className={` hidden sm:table-cell ${tableDesign.td} `}>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          user.isActive ? "Active" : "Inactive",
                        )}`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className={` ${tableDesign.td} `}>
                      <span
                        className={`text-sm flex items-center justify-center gap-1 ${
                          user.isPremium ? "text-orange-600" : "text-blue-600"
                        }`}
                      >
                        {user.isPremium && <Crown className="w-4 h-4" />}
                        {user.isPremium ? "Premium" : "Free"}
                      </span>
                    </td>

                    <td className={` ${tableDesign.td} hidden lg:table-cell `}>
                      {formatDate(user.createdAt)}
                    </td>

                    <td className={` ${tableDesign.td} hidden lg:table-cell  `}>
                      {formatDate(user.lastLoginAt)}
                    </td>

                    <td className={` ${tableDesign.td} `}>
                      <button
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={() => onActionClick?.(user)}
                        aria-label={`Actions for ${user.name}`}
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default AllUsersTable;
