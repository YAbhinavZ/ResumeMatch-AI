const SectionHeading = ({
    eyebrow,
    title,
    description,
    align = "center",
  }) => {
    const alignmentClasses =
      align === "left"
        ? "items-start text-left"
        : "items-center text-center";
  
    return (
      <div className={`mx-auto flex max-w-2xl flex-col gap-3 ${alignmentClasses}`}>
        {eyebrow && (
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#64806D]">
            {eyebrow}
          </span>
        )}
  
        <h2 className="text-3xl font-semibold tracking-tight text-[#263D32] md:text-4xl">
          {title}
        </h2>
  
        {description && (
          <p className="text-base leading-7 text-[#68756D] md:text-lg">
            {description}
          </p>
        )}
      </div>
    );
  };
  
  export default SectionHeading;