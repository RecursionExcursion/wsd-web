import Card from "./base/Card";

type DocumentationProps = {
  className?: string;
};

export default function Documentation({ className = "" }: DocumentationProps) {
  const docSections = [
    {
      title: "Getting Started",
      description:
        "Learn the basics of WSD Web and create your first workspace script",
      icon: "🚀",
      link: "#getting-started",
    },
    {
      title: "Script Creation",
      description:
        "Master the art of building powerful, reusable automation scripts",
      icon: "⚡",
      link: "#script-creation",
    },
    {
      title: "Deployment",
      description:
        "Deploy your scripts across different environments and operating systems",
      icon: "🌍",
      link: "#deployment",
    },
    {
      title: "API Reference",
      description:
        "Comprehensive documentation of all available functions and methods",
      icon: "📚",
      link: "#api-reference",
    },
  ];

  return (
    <div className="space-y-4">
      {docSections.map((section, index) => (
        <details
          className="group [&_summary::-webkit-details-marker]:hidden"
          open
        >
          <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900">
            <h2 className="text-lg font-medium">{section.title}</h2>

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

          <p className="px-4 pt-4 text-white bg-cosmic-black">{section.description}</p>
        </details>
      ))}
    </div>
  );
}
