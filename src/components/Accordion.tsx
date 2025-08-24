import Card from "./base/Card";

type DocumentationProps = {
  className?: string;
};

export default function Documentation({ className = "" }: DocumentationProps) {
  const docSections = [
    {
      title: "About WSD Web",
      description: `Our platform provides intuitive tools for creating, managing, and deploying 
        workspace scripts across different operating systems and environments. 
        Whether you're a solo developer or part of a large team, WSD Web scales with you.`,
      icon: "🚀",
      link: "#getting-started",
    },
    {
      title: "Script Creation",
      description:
        "Learn the basics of WSD Web and create your first workspace script.",
      icon: "⚡",
      link: "#script-creation",
    },
  ];

  return (
    <section>
      <div className="space-y-4 !max-w-7xl mx-auto pt-4 lg:pt-24 overflow-hidden w-full">
        {docSections.map((section, index) => (
          <details
            className="group [&_summary::-webkit-details-marker]:hidden"
            open={false}
          >
            <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-nebula-purple p-4 text-milky-white hover:bg-aurora-pink hover:cursor-pointer">
              <h2 className="text-lg font-medium">
                <span className="text-starlight-yellow mr-2">{section.icon}</span>
                {section.title}
              </h2>

              <svg
                className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>

            <p className="px-4 pt-4 text-white bg-cosmic-black">
              {section.description}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
