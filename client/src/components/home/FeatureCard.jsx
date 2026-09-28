function FeatureCard({ number, title, description, icon, children }) {
  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_25px_60px_-30px_rgba(37,99,235,0.3)]">
      {/* Number */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-[0.16em] text-slate-300">
          {number}
        </span>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-lg text-blue-600 transition-transform duration-300 group-hover:scale-105">
          {icon}
        </div>
      </div>

      <h3 className="mt-8 text-xl font-bold tracking-tight text-slate-950">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {description}
      </p>

      {children && <div className="mt-7">{children}</div>}

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-7 right-7 h-px bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

export default FeatureCard;