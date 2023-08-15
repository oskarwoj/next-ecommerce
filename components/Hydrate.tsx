"use client";

import { Loader } from "@/components/ui/loader";
import { useEffect, useState } from "react";

const Hydrate = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      {isHydrated ? (
        <>{children}</>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Hydrate;
