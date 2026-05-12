import SectionHeader from "@/common/button/SectionHeader";
import CommonCard from "@/common/CommonCard";
import { DollarSign, TrendingUp, UserCheck, Users } from "lucide-react";
import React from "react";
import { tableDesign } from "../programManagement/ProgramAnalytics";

interface Transaction {
  id: string;
  user: string;
  amount: string;
  plan: string;
  status: "Success" | "Failed";
  date: string;
}

const Payment: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: "$48,234",
      label: "Total Revenue",
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: DollarSign,
      value: "$12,456",
      label: "Monthly Revenue",
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: UserCheck,
      value: "456",
      label: "Active Subscriptions",
      color: "bg-cyan-50",
      iconColor: "text-cyan-600",
    },
    {
      icon: TrendingUp,
      value: "18.4%",
      label: "Conversion Rate",
      color: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  const transactions: Transaction[] = [
    {
      id: "TXN001",
      user: "Sarah Johnson",
      amount: "$29.99",
      plan: "Monthly Premium",
      status: "Success",
      date: "2026-01-22",
    },
    {
      id: "TXN001",
      user: "Sarah Johnson",
      amount: "$29.99",
      plan: "Monthly Premium",
      status: "Failed",
      date: "2026-01-22",
    },
    {
      id: "TXN001",
      user: "Sarah Johnson",
      amount: "$29.99",
      plan: "Monthly Premium",
      status: "Success",
      date: "2026-01-22",
    },
    {
      id: "TXN001",
      user: "Sarah Johnson",
      amount: "$29.99",
      plan: "Monthly Premium",
      status: "Success",
      date: "2026-01-22",
    },
  ];

  const tableHeaders = [
    { label: "Transaction ID", align: "text-center  hidden lg:table-cell" },
    { label: "User", align: "text-center" },
    { label: "Amount", align: "text-center" },
    { label: "Plan", align: "text-center" },
    { label: "Status", align: "text-center hidden md:table-cell" },
    { label: "Date", align: "text-center hidden lg:table-cell" },
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
                    {transaction.id}
                  </td>
                  <td className={` ${tableDesign.td}`}>{transaction.user}</td>
                  <td className={` ${tableDesign.td}`}>{transaction.amount}</td>
                  <td className={` ${tableDesign.td}`}>{transaction.plan}</td>
                  <td className={`hidden md:table-cell ${tableDesign.td}`}>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        transaction.status === "Success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className={`hidden lg:table-cell ${tableDesign.td}`}>
                    {transaction.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payment;
