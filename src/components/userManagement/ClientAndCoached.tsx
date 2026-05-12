import { formatDate } from "@/lib/help";
import type { User } from "@/store/features/program/types/review";
import { Crown, MoreVertical } from "lucide-react";
import img from "../../assets/images/man.png";
import { tableDesign } from "../programManagement/ProgramAnalytics";
import { getStatusColor, getTypeColor } from "./AllUsersTable";

const tableHeaders = [
  { label: "Coached clients", align: "text-left" },
  { label: "Coach", align: "text-left md:table-cell hidden" },
  { label: "Type", align: "text-left lg:table-cell hidden" },
  { label: "Status", align: "text-left" },
  { label: "Subscription", align: "text-left xl:table-cell hidden" },
  { label: "Registration", align: "text-left xl:table-cell hidden" },
  { label: "Action", align: "text-left" },
];

interface UserProps {
  users: User[];
}
const ClientAndCoached: React.FC<UserProps> = ({ users }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="block w-full overflow-x-auto">
        <table className={tableDesign.table}>
          <thead className={tableDesign.thead}>
            <tr className={tableDesign.tr}>
              {tableHeaders.map((header, index) => (
                <th
                  key={index}
                  className={` ${header.align} ${tableDesign.th} ${index === 0 || index === 1 ? "text-left!" : ""}`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={tableDesign.tbody}>
            {users.map((client) => (
              <tr key={client.id} className={tableDesign.tr}>
                <td className={` ${tableDesign.td}`}>
                  <div className="flex items-center gap-3">
                    <img
                      src={client.avatar || img}
                      alt={client.name || ""}
                      className="w-10 h-10 rounded-full  hidden sm:block"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {client.name}
                      </p>
                      <p className="text-xs text-gray-500">{client.email}</p>
                    </div>
                  </div>
                </td>
                <td className={` md:table-cell hidden ${tableDesign.td} `}>
                  <div className="flex items-center gap-3">
                    <img
                      src={client.coachProfile?.profilePhoto || img}
                      alt={client.coachProfile?.gymName || ""}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {client.coachProfile?.gymName || "No Coach"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {client.coachProfile?.phoneNumber}
                      </p>
                    </div>
                  </div>
                </td>
                <td
                  className={`truncate hidden lg:table-cell ${tableDesign.td} `}
                >
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(client.role)}`}
                  >
                    {client.role}
                  </span>
                </td>
                <td className={` truncate ${tableDesign.td} `}>
                  <span
                    className={` px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(client.isPremium ? "Premium" : "Free")}`}
                  >
                    {client.isPremium ? "Premium" : "Free"}
                  </span>
                </td>
                <td className={` hidden xl:table-cell ${tableDesign.td} `}>
                  <span
                    className={`text-sm flex items-center justify-center ${client.isPremium ? "text-orange-600  gap-1" : "text-blue-600"}`}
                  >
                    {client.isPremium && <Crown className="w-4 h-4" />}
                    {client.coachProfile?.totalClients}
                  </span>
                </td>
                <td className={`  hidden xl:table-cell  ${tableDesign.td} `}>
                  {formatDate(client.createdAt)}
                </td>
                <td className={` ${tableDesign.td} `}>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientAndCoached;
