import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function EnquiryTrend({ current = 0, previous = 0 }) {
  const currentValue = Number(current) || 0;
  const previousValue = Number(previous) || 0;
  const difference = currentValue - previousValue;

  const percentage =
    previousValue > 0
      ? ((difference / previousValue) * 100).toFixed(1)
      : null;

  const TrendIcon =
    difference > 0
      ? TrendingUp
      : difference < 0
        ? TrendingDown
        : Minus;

  const trendColor =
    difference > 0
      ? "text-emerald-700"
      : difference < 0
        ? "text-rose-700"
        : "text-gray-500";

  return (
    <section className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-changa text-xs uppercase tracking-wide text-gray-500">
            Enquiry Trend
          </p>

          <h3 className="mt-3 font-anta text-3xl text-gray-900">
            {currentValue.toLocaleString("en-IN")}
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Current period enquiries
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-800">
          <TrendIcon size={20} />
        </div>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-4">
        {previousValue === 0 ? (
          <p className="text-sm leading-relaxed text-gray-500">
            {currentValue === 0
              ? "No enquiry activity recorded for the selected periods."
              : "No previous-period enquiries available for comparison."}
          </p>
        ) : (
          <div className={`flex flex-wrap items-center gap-2 ${trendColor}`}>
            <TrendIcon size={17} />

            <span className="font-anta text-sm">
              {Math.abs(Number(percentage))}%
            </span>

            <span className="text-xs text-gray-500">
              {difference > 0
                ? "increase"
                : difference < 0
                  ? "decrease"
                  : "no change"}{" "}
              vs previous period
            </span>
          </div>
        )}

        <p className="mt-3 text-xs text-gray-500">
          Previous period: {previousValue.toLocaleString("en-IN")} enquiries
        </p>
      </div>
    </section>
  );
}

