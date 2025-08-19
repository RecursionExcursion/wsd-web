"use client";

import LogoTitle from "../LogoTitle";
import CosmicLink from "../base/Link";

type FooterProps = {
  className?: string;
};

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer
      className={`footer-cosmic px-4 py-12 lg:px-8 lg:py-16 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-start">
            <LogoTitle text="Quick Script" />
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-milky-white font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4">
              <CosmicLink href="/features" variant="glow">
                Features
              </CosmicLink>
              <CosmicLink href="/docs" variant="glow">
                Documentation
              </CosmicLink>
              <CosmicLink href="/examples" variant="glow">
                Terms of Use
              </CosmicLink>
              <CosmicLink href="/support" variant="glow">
                Privacy Policy
              </CosmicLink>
            </div>
          </div>
        </div>
        <div className="border-t border-cosmic-purple/20 mt-8 pt-8 text-center">
          <p className="text-muted-lavender text-sm">© 2025 Quick Script.</p>
        </div>
      </div>
    </footer>
  );
}
