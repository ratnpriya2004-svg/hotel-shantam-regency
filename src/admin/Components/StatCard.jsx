import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

export default function StatCard({
  title,
  value = 0,
  change,
  subtitle = "Compared with previous period",
  icon: Icon,
}) {
  const numericChange = Number(change);
  const hasChange = change !== undefined && change !== null && change !== "";
  const isPositive = hasChange && numericChange > 0;
  const isNegative = hasChange && numericChange < 0;

  return (
    <article className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-changa text-xs uppercase tracking-wide text-gray-500">
            {title}
          </p>

          <h3 className="mt-3 font-anta text-3xl text-gray-900">
            {Number(value).toLocaleString("en-IN")}
          </h3>
        </div>

        {Icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-800">
            <Icon size={20} strokeWidth={1.7} />
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3">
        {hasChange && (
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 font-changa text-xs ${
              isPositive
                ? "bg-emerald-50 text-emerald-700"
                : isNegative
                  ? "bg-rose-50 text-rose-700"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight size={14} />
            ) : isNegative ? (
              <ArrowDownRight size={14} />
            ) : (
              <Minus size={14} />
            )}
            {Math.abs(numericChange)}%
          </span>
        )}

        <p className="text-xs leading-relaxed text-gray-500">{subtitle}</p>
      </div>
    </article>
  );
}

