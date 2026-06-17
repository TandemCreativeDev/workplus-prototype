"use client";

import { SnapshotProvider, useSnapshot } from "@/lib/useSnapshot";
import { MatchProvider } from "@/lib/matchStore";
import { BrowserFrame } from "@/components/BrowserFrame";
import { AppHeader } from "@/components/AppHeader";
import { Welcome } from "@/components/screens/Welcome";
import { OrgDetails } from "@/components/screens/OrgDetails";
import { RolesEmpty } from "@/components/screens/RolesEmpty";
import { RoleTitle } from "@/components/screens/RoleTitle";
import { RoleMatch } from "@/components/screens/RoleMatch";
import { RoleNoMatch } from "@/components/screens/RoleNoMatch";
import { RoleDemand } from "@/components/screens/RoleDemand";
import { RolesList } from "@/components/screens/RolesList";
import { Review } from "@/components/screens/Review";
import { Done } from "@/components/screens/Done";

function ScreenSwitch() {
  const { screen } = useSnapshot();
  switch (screen) {
    case "welcome":
      return <Welcome />;
    case "org":
      return <OrgDetails />;
    case "roles-empty":
      return <RolesEmpty />;
    case "role-title":
      return <RoleTitle />;
    case "role-match":
      return <RoleMatch />;
    case "role-nomatch":
      return <RoleNoMatch />;
    case "role-demand":
      return <RoleDemand />;
    case "roles-list":
      return <RolesList />;
    case "review":
      return <Review />;
    case "done":
      return <Done />;
  }
}

export default function WorkforceSnapshot() {
  return (
    <SnapshotProvider>
      <MatchProvider>
        <BrowserFrame>
          <AppHeader />
          <main style={{ padding: "54px 30px 70px" }}>
            <div style={{ maxWidth: 660, margin: "0 auto" }}>
              <ScreenSwitch />
            </div>
          </main>
        </BrowserFrame>
      </MatchProvider>
    </SnapshotProvider>
  );
}
