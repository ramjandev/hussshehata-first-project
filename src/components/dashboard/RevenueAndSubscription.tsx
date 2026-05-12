import SectionHeader from "@/common/button/SectionHeader";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const revenueData = [
  { month: "Jan", value: 1200 },
  { month: "Feb", value: 1500 },
  { month: "Mar", value: 1800 },
  { month: "Apr", value: 2200 },
  { month: "May", value: 2600 },
  { month: "Jun", value: 3000 },
];

// Data for User Growth chart
const userGrowthData = [
  { month: "Jan", free: 850, premium: 320 },
  { month: "Feb", free: 450, premium: 480 },
  { month: "Mar", free: 1100, premium: 520 },
  { month: "Apr", free: 1300, premium: 620 },
  { month: "May", free: 1550, premium: 820 },
  { month: "Jun", free: 2350, premium: 1050 },
];
const RevenueAndSubscription = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-white text-black rounded-2xl p-6">
        <SectionHeader
          title="Revenue & Subscriptions"
          description=" Monthly revenue and new subscriptions trend"
        />

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#86efac" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#86efac" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4ade80"
              strokeWidth={2}
              fill="url(#colorRevenue)"
              fillOpacity={1}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white text-black rounded-2xl p-6">
        <SectionHeader
          title="User Growth"
          description=" Premium vs Free user growth"
        />

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip />
            <Bar dataKey="free" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="premium" fill="#a855f7" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">free</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span className="text-sm text-gray-600">premium</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAndSubscription;
