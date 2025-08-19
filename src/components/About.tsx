import Button from "./base/Button";

type AboutProps = {
  className?: string;
};

export default function About({ className = "" }: AboutProps) {
  return (
    <div className={`${className}`}>
      <h2 className="text-3xl lg:text-4xl font-bold text-milky-white mb-6">
        About
        <span className="text-starlight-yellow block">WSD Web</span>
      </h2>
      <p className="text-lg text-muted-lavender mb-6">
        WSD Web is a powerful platform designed to streamline your
        development workflow. We believe in the power of automation and
        reusable scripts to make development faster, more reliable, and
        more enjoyable.
      </p>
      <p className="text-lg text-muted-lavender mb-8">
        Our platform provides intuitive tools for creating, managing, and deploying 
        workspace scripts across different operating systems and environments. 
        Whether you're a solo developer or part of a large team, WSD Web scales with you.
      </p>
    </div>
  );
}