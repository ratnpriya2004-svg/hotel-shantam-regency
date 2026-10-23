import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function EnquiryChart({ data = [] }) {
  return (
    <section className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="mb-5">
        <h2 className="font-anta text-lg text-gray-900">
          Enquiry Analytics
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Enquiry activity over time
        </p>
      </div>

      {data.length === 0 ? (
        <div className="flex min-h-[240px] flex-col items-center justify-center px-4 text-center">
          <p className="text-sm text-gray-700">
            No enquiry data available yet
          </p>
          <p className="mt-2 text-xs text-gray-500">
            The graph will appear when actual enquiries are recorded.
          </p>
        </div>
      ) : (
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 8, left: -18, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="enquiryGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#B7791F" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#B7791F" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#E5E7EB"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="label"
                tick={{ fill: "#6B7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />

              <YAxis
                allowDecimals={false}
                tick={{ fill: "#6B7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  color: "#111827",
                  fontSize: "12px",
                }}
                formatter={(value) => [value, "Enquiries"]}
              />

              <Area
                type="monotone"
                dataKey="enquiries"
                name="Enquiries"
                stroke="#B7791F"
                strokeWidth={2}
                fill="url(#enquiryGradient)"
                activeDot={{ r: 4, fill: "#B7791F" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}

