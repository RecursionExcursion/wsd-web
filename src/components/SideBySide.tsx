import { ReactNode } from "react";

type SideBySideProps = {
  leftChild: ReactNode;
  rightChild: ReactNode;
  className?: string;
};

export default function SideBySide({ leftChild, rightChild, className = "" }: SideBySideProps) {
  return (
    <section
      className={`relative overflow-hidden w-full ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-24 overflow-hidden w-full">
        <div className="w-full py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="flex items-start w-full">
              {leftChild}
            </div>
            <div className="flex items-start w-full">
              {rightChild}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
