"use client";

import { Loader } from "@/components/ui/loader";
import { useThemeStore } from "@/hooks/store";
import { useEffect, useState } from "react";

const Hydrate = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  const themeStore = useThemeStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      {isHydrated ? (
        <body
          className="mx-4 lg:px-48 font-roboto"
          data-theme={themeStore.mode}
        >
          {children}
        </body>
      ) : (
        <body className="flex h-full w-full items-center justify-center">
          <Loader />
        </body>
      )}
    </>
  );
};

export default Hydrate;
