import Card from "./base/Card";

type DocumentationProps = {
  className?: string;
};

export default function Documentation({ className = "" }: DocumentationProps) {
  const docSections = [
    {
      title: "Getting Started",
      description: "Learn the basics of WSD Web and create your first workspace script",
      icon: "🚀",
      link: "#getting-started"
    },
    {
      title: "Script Creation",
      description: "Master the art of building powerful, reusable automation scripts",
      icon: "⚡",
      link: "#script-creation"
    },
    {
      title: "Deployment",
      description: "Deploy your scripts across different environments and operating systems",
      icon: "🌍",
      link: "#deployment"
    },
    {
      title: "API Reference",
      description: "Comprehensive documentation of all available functions and methods",
      icon: "📚",
      link: "#api-reference"
    }
  ];

  return (
    <div className={`${className}`}>      
      {/* Documentation Cards - 2x2 Grid */}
      <div className="grid grid-cols-2 gap-4">
        {docSections.map((section, index) => (
          <Card key={index}>
            <div className="text-center">
              <div className="text-3xl mb-3">{section.icon}</div>
              <h3 className="text-lg font-semibold text-milky-white mb-2">
                {section.title}
              </h3>
              <p className="text-muted-lavender text-sm mb-3">
                {section.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
