"use client";

import { useEffect, useState } from "react";

import { Loader } from "lucide-react";

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
        <div>
          <Loader />
        </div>
      )}
    </>
  );
};

export default Hydrate;
