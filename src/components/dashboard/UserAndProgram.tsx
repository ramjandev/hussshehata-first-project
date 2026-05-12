import SectionHeader from "@/common/button/SectionHeader";

const programs = [
  {
    name: "10-Week Monster Confusion (Classic)",
    enrolled: 456,
    completion: 75,
  },
  {
    name: "10-Week Monster Confusion (Modernized)",
    enrolled: 456,
    completion: 75,
  },
  { name: "HUSS 8-Week Beast", enrolled: 456, completion: 75 },
  { name: "2-2-2 Method", enrolled: 456, completion: 75 },
];
const UserAndProgram = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white text-black rounded-2xl p-6">
        <SectionHeader
          title="User Distribution"
          description="By subscription type"
        />

        <div className="flex justify-center mb-6">
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="20"
                strokeDasharray="157 251"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#a855f7"
                strokeWidth="20"
                strokeDasharray="66 251"
                strokeDashoffset="-157"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#10b981"
                strokeWidth="20"
                strokeDasharray="19 251"
                strokeDashoffset="-223"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#f97316"
                strokeWidth="20"
                strokeDasharray="12 251"
                strokeDashoffset="-242"
              />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Premium Users</span>
            </div>
            <p className="text-2xl font-bold ml-5">1050</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Free Users</span>
            </div>
            <p className="text-2xl font-bold ml-5">2370</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Trial Users</span>
            </div>
            <p className="text-2xl font-bold ml-5">245</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Expired</span>
            </div>
            <p className="text-2xl font-bold ml-5">156</p>
          </div>
        </div>
      </div>

      <div className="bg-white text-black rounded-2xl p-6 lg:col-span-2">
        <SectionHeader
          title="Top Performing Programs"
          description="By enrollments and completion rate"
        />

        <div className="space-y-4">
          {programs.map((program, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">{program.name}</span>
                <div className="text-right">
                  <span className="text-sm text-gray-600">
                    {program.enrolled} enrolled
                  </span>
                  <span className="text-sm text-gray-400 ml-4">
                    {program.completion}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                  style={{ width: `${program.completion}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserAndProgram;
