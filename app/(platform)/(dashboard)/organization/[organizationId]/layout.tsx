import { startCase } from "lodash";
import { auth } from "@clerk/nextjs/server";

import { OrgControl } from "./_components/org-control";
import { title } from "process";

export async function generateMetadata() {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || "organization"),
  };
}

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
