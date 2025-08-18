import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Button from "../../components/base/Button";
import CosmicLink from "../../components/base/Link";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-cosmic-black text-milky-white">
      <Header />
      
      <main className="flex-1 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Page Title */}
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-7xl font-bold text-milky-white mb-6">
              Cosmic Style Guide
            </h1>
            <p className="text-xl text-muted-lavender max-w-3xl mx-auto">
              Explore the complete design system for Quick Script, featuring cosmic colors, 
              interactive components, and space-inspired aesthetics.
            </p>
          </div>

          {/* Color Palette */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-starlight-yellow mb-8">Color Palette</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-cosmic-black border-2 border-cosmic-purple rounded-lg mx-auto mb-3"></div>
                <p className="text-milky-white font-semibold">Cosmic Black</p>
                <p className="text-muted-lavender text-sm">#0D0D0F</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-nebula-purple rounded-lg mx-auto mb-3"></div>
                <p className="text-milky-white font-semibold">Nebula Purple</p>
                <p className="text-muted-lavender text-sm">#5A2A82</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-starlight-yellow rounded-lg mx-auto mb-3"></div>
                <p className="text-milky-white font-semibold">Starlight Yellow</p>
                <p className="text-muted-lavender text-sm">#F4C542</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-aurora-pink rounded-lg mx-auto mb-3"></div>
                <p className="text-milky-white font-semibold">Aurora Pink</p>
                <p className="text-muted-lavender text-sm">#D154A0</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-milky-white rounded-lg mx-auto mb-3"></div>
                <p className="text-cosmic-black font-semibold">Milky White</p>
                <p className="text-muted-lavender text-sm">#F5F1E6</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-deep-purple rounded-lg mx-auto mb-3"></div>
                <p className="text-milky-white font-semibold">Deep Purple</p>
                <p className="text-muted-lavender text-sm">#2C1A40</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-muted-lavender rounded-lg mx-auto mb-3"></div>
                <p className="text-cosmic-black font-semibold">Muted Lavender</p>
                <p className="text-muted-lavender text-sm">#B3A9C9</p>
              </div>
            </div>
          </section>

          {/* Button Variants */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-starlight-yellow mb-8">Button Variants</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-milky-white mb-4">Primary Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-milky-white mb-4">Secondary Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="secondary" size="sm">Small</Button>
                  <Button variant="secondary" size="md">Medium</Button>
                  <Button variant="secondary" size="lg">Large</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-milky-white mb-4">Ghost Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="ghost" size="sm">Small</Button>
                  <Button variant="ghost" size="md">Medium</Button>
                  <Button variant="ghost" size="lg">Large</Button>
                </div>
              </div>
            </div>
          </section>

          {/* Link Variants */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-starlight-yellow mb-8">Link Variants</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-milky-white mb-4">Cosmic Links (Variant 1)</h3>
                <div className="flex flex-wrap gap-6">
                  <CosmicLink href="#" variant="cosmic">Default State</CosmicLink>
                  <CosmicLink href="#" variant="cosmic" external>External Link</CosmicLink>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-milky-white mb-4">Glow Links (Variant 2)</h3>
                <div className="flex flex-wrap gap-6">
                  <CosmicLink href="#" variant="glow">Default State</CosmicLink>
                  <CosmicLink href="#" variant="glow" external>External Link</CosmicLink>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-milky-white mb-4">Button Links (Variant 3)</h3>
                <div className="flex flex-wrap gap-6">
                  <CosmicLink href="#" variant="button">Default State</CosmicLink>
                  <CosmicLink href="#" variant="button" external>External Link</CosmicLink>
                </div>
              </div>
            </div>
          </section>

          {/* Typography */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-starlight-yellow mb-8">Typography</h2>
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-milky-white mb-2">Heading 1 - Milky White</h1>
                <p className="text-muted-lavender">Large, bold headings for main sections</p>
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-starlight-yellow mb-2">Heading 2 - Starlight Yellow</h2>
                <p className="text-muted-lavender">Medium headings for subsections</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-aurora-pink mb-2">Heading 3 - Aurora Pink</h3>
                <p className="text-muted-lavender">Smaller headings for content groups</p>
              </div>
              <div>
                <p className="text-lg text-milky-white mb-2">Body Text - Milky White</p>
                <p className="text-muted-lavender">Primary text color for main content</p>
              </div>
              <div>
                <p className="text-base text-muted-lavender">Secondary Text - Muted Lavender</p>
                <p className="text-muted-lavender">Used for descriptions, captions, and subtext</p>
              </div>
            </div>
          </section>

          {/* Interactive Elements */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-starlight-yellow mb-8">Interactive Elements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-nebula-purple/20 rounded-lg border border-nebula-purple/30">
                <h3 className="text-xl font-semibold text-milky-white mb-4">Hover Effects</h3>
                <p className="text-muted-lavender mb-4">
                  All interactive elements feature smooth transitions and cosmic hover effects.
                </p>
                <div className="space-y-3">
                  <Button variant="primary">Hover Me</Button>
                  <Button variant="secondary">Hover Me</Button>
                  <Button variant="ghost">Hover Me</Button>
                </div>
              </div>
              
              <div className="p-6 bg-aurora-pink/20 rounded-lg border border-aurora-pink/30">
                <h3 className="text-xl font-semibold text-milky-white mb-4">Focus States</h3>
                <p className="text-muted-lavender mb-4">
                  Accessible focus indicators with cosmic styling for keyboard navigation.
                </p>
                <div className="space-y-3">
                  <Button variant="primary">Focus Me</Button>
                  <Button variant="secondary">Focus Me</Button>
                  <Button variant="ghost">Focus Me</Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
