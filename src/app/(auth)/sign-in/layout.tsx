import { TITLE_PREFIX } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
 title: `${TITLE_PREFIX} Sign in`,
};

const Layout = ({ children }: { children: React.ReactNode }) => {
 return children;
};

export default Layout;
