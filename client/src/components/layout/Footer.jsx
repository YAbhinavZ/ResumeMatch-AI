const Footer = () => {
    return (
      <footer className="border-t border-[#E1E5DE] bg-[#FCFBF8]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-[#68756D] md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="font-semibold text-[#263D32]">ResumeMatch AI</p>
            <p className="mt-1">
              Build a stronger resume. Find better opportunities.
            </p>
          </div>
  
          <div className="flex flex-wrap gap-5">
            <a
              href="#features"
              className="transition-colors hover:text-[#263D32]"
            >
              Features
            </a>
  
            <a
              href="#analyzer"
              className="transition-colors hover:text-[#263D32]"
            >
              Analyzer
            </a>
  
            <a
              href="#top"
              className="transition-colors hover:text-[#263D32]"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;