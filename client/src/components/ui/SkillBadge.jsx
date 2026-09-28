
function SkillBadge({ skill, variant = 'matched' }) {
    const variants = {
      matched: 'bg-[#E5EEE7] text-[#385743]',
      missing: 'bg-[#F7E9DF] text-[#925C3B]',
      neutral: 'bg-[#F0F1ED] text-[#59635B]',
    }
  
    return (
      <span
        className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${
          variants[variant] || variants.neutral
        }`}
      >
        {skill}
      </span>
    )
  }
  
  export default SkillBadge