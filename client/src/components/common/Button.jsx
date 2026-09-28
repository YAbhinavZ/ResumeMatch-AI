function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#64806D] focus:ring-offset-2";

  const variants = {
    primary: "bg-[#263D32] text-white hover:bg-[#344F41]",
    secondary:
      "border border-[#D9DED7] bg-white text-[#263D32] hover:bg-[#F1F3EE]",
    outline:
      "border border-[#263D32] text-[#263D32] hover:bg-[#263D32] hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
