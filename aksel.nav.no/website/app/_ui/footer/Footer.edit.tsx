"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { clientConfig } from "@/sanity/config";
import styles from "./Footer.module.css";

function FooterEdit() {
  const [user, setUser] = useState<boolean | null>(null);
  const pathName = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `https://${clientConfig.projectId}.api.sanity.io/v1/users/me`,
        {
          credentials: "include",
        },
      ).then((x) => x.text());
      try {
        setUser(!!JSON.parse(response)?.id);
        return;
      } catch {
        setUser(false);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <Link
      href={`/admin/presentation?preview=${pathName}`}
      className={styles.footerEdit}
      target="_blank"
      rel="noopener noreferrer"
      prefetch={false}
    >
      Rediger side
    </Link>
  );
}

export { FooterEdit };
