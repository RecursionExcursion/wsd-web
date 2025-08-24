"use client";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "", ...attributes } = props;
  
  const baseStyles = "font-semibold transition-all duration-300 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-starlight-yellow";
  
  const sizeStyles = {
    sm: "px-4 py-0 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  
  const variantStyles = {
    primary: "bg-starlight-yellow text-cosmic-black border-2 border-starlight-yellow rounded-lg hover:bg-yellow-400 hover:text-cosmic-black hover:shadow-cosmic-glow active:border-yellow-500 active:shadow-lg",
    secondary: "bg-transparent text-milky-white border-2 border-nebula-purple rounded-lg hover:bg-nebula-purple hover:text-milky-white active:bg-aurora-pink active:text-cosmic-black",
    ghost: "bg-transparent text-milky-white border-none rounded-lg underline decoration-transparent hover:text-aurora-pink hover:decoration-aurora-pink active:text-starlight-yellow",
  };

  return (
    <button
      {...attributes}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    />
  );
}
