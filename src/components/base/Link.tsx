"use client";

import Link from "next/link";

type CosmicLinkProps = React.ComponentPropsWithoutRef<typeof Link> & {
  variant?: "cosmic" | "glow" | "button_primary" | "button_secondary";
  size?: "sm" | "md" | "lg";
  external?: boolean;
};

export default function CosmicLink(props: CosmicLinkProps) {
  const { variant = "cosmic", size = "md", external = false, className = "", children, ...attributes } = props;
  
  const baseStyles = "transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-starlight-yellow";
  
  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const buttonBaseStyles= "inline-block  px-4 py-2 rounded-full "
  
  const variantStyles = {
    cosmic: "text-aurora-pink hover:text-starlight-yellow hover:underline hover:underline-offset-4 active:font-bold active:text-milky-white",
    glow: "text-milky-white hover:text-shadow-lg hover:shadow-nebula-purple active:text-starlight-yellow",
    button_primary: buttonBaseStyles + " bg-starlight-yellow text-cosmic-black border-2 border-starlight-yellow rounded-lg hover:bg-yellow-400 hover:text-cosmic-black hover:shadow-cosmic-glow active:border-yellow-500 active:shadow-lg",
    button_secondary: buttonBaseStyles + " bg-transparent text-milky-white border-2 border-nebula-purple rounded-lg hover:bg-nebula-purple hover:text-milky-white active:bg-aurora-pink active:text-cosmic-black",
  };

  const linkContent = (
    <>
      {children}
      {external && (
        <svg className="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </>
  );

  if (external && typeof attributes.href === "string" && attributes.href.startsWith("http")) {
    return (
      <a
        href={attributes.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      >
        {linkContent}
      </a>
    );
  }

  return (
    <Link
      {...attributes}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {linkContent}
    </Link>
  );
}
