import SectionHeader from "@/common/button/SectionHeader";
import CommonCard from "@/common/CommonCard";
import LoadingStatus from "@/common/custom/LoadingStatus";
import Pagination from "@/common/custom/Pagination";
import { timeAgo } from "@/help/help";
import {
  useGetSubscriptionStartQuery,
  useRecentTransactionsQuery,
} from "@/store/features/premium/premiumFeature";
import { DollarSign, TrendingUp, UserCheck, Users } from "lucide-react";
import React, { useState } from "react";
import { tableDesign } from "../programManagement/ProgramAnalytics";

const Payment: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data } = useGetSubscriptionStartQuery();
  const { data: recentTransactions, isLoading } = useRecentTransactionsQuery({
    page,
  });

  const transactions = recentTransactions?.data?.items ?? [];

  const tableHeaders = [
    { label: "Email", align: "text-center  hidden lg:table-cell" },
    { label: "User", align: "text-center" },
    { label: "Amount", align: "text-center" },
    { label: "Plan", align: "text-center" },
    { label: "Status", align: "text-center hidden md:table-cell" },
    { label: "Date", align: "text-center hidden lg:table-cell" },
  ];

  const stats = [
    {
      icon: Users,
      value: `$${data?.data?.monthlyRevenue || 0}`,
      label: "Total Revenue",
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: DollarSign,
      value: `$${data?.data?.monthlyRevenue || 0}`,
      label: "Monthly Revenue",
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: UserCheck,
      value: `${data?.data?.activeSubscriptions || 0}`,
      label: "Active Subscriptions",
      color: "bg-cyan-50",
      iconColor: "text-cyan-600",
    },
    {
      icon: TrendingUp,
      value: `${data?.data?.conversionRate || 0}%`,
      label: "Conversion Rate",
      color: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <CommonCard
            key={index}
            icon={stat.icon}
            value={stat.value}
            title={stat.label}
            iconBgColor={stat.color}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <SectionHeader
          title="Recent Transactions"
          description="Detailed metrics for each program"
        />
        <LoadingStatus
          items={transactions}
          itemName="transactions"
          isLoading={isLoading}
        />
        {!isLoading && transactions.length > 0 && (
          <div className="overflow-x-auto">
            <table className={tableDesign.table}>
              <thead className={tableDesign.thead}>
                <tr className={tableDesign.tr}>
                  {tableHeaders.map((item, index) => (
                    <th
                      key={index}
                      className={` ${tableDesign.th}  ${item.align}`}
                    >
                      {item.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={tableDesign.tbody}>
                {transactions.map((transaction, index) => (
                  <tr key={index} className={` ${tableDesign.tr}`}>
                    <td className={`hidden lg:table-cell ${tableDesign.td}`}>
                      {transaction.userEmail}
                    </td>
                    <td className={` ${tableDesign.td}`}>
                      {transaction.userName}
                    </td>
                    <td className={` ${tableDesign.td}`}>
                      ${transaction.amount}
                    </td>
                    <td className={` ${tableDesign.td}`}>{transaction.plan}</td>
                    <td className={`hidden md:table-cell ${tableDesign.td}`}>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          transaction.status === "SUCCEEDED"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className={`hidden lg:table-cell ${tableDesign.td}`}>
                      {timeAgo(transaction.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="pt-6">
          {transactions.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={recentTransactions?.data?.meta?.totalPages || 1}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
