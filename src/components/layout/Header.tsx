"use client";

import LogoTitle from "../LogoTitle";
import CosmicLink from "../base/Link";

type HeaderProps = {
  className?: string;
};

export default function Header({ className = "" }: HeaderProps) {
  return (
    <header className={`header-cosmic py-6 lg:py-8 ${className}`}>
      <div className="max-w-7xl px-4 lg:px-24 mx-auto flex justify-between items-center">
        {/* Logo/Title */}
        <div className="flex items-center">
          <LogoTitle text="Quick Script" />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <CosmicLink href="/features" variant="cosmic">
            Features
          </CosmicLink>
          <CosmicLink href="/docs" variant="cosmic">
            Documentation
          </CosmicLink>
          <CosmicLink href="/about" variant="button">
            About
          </CosmicLink>
        </nav>
      </div>
    </header>
  );
}
