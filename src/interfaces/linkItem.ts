import type { ReactNode } from "react";

export interface LinkItem {
    label: string;
    sublabel: string;
    icon: ReactNode;
    href: string;
    color: string;
}