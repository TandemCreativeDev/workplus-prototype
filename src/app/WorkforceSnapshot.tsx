"use client";

import { SnapshotProvider, useSnapshot } from "@/lib/useSnapshot";
import { MatchProvider } from "@/lib/matchStore";
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
        <div
          style={{
            minHeight: "100vh",
            background: "#e7e7f7",
            padding: "30px 22px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div style={{ width: "100%", maxWidth: 1040 }}>
            <div
              style={{
                background: "#fff",
                border: "1px solid #dfdff2",
                borderRadius: 18,
                overflow: "hidden",
                boxShadow: "0 24px 60px -28px rgba(20,20,70,.32)",
              }}
            >
              <AppHeader />
              <main style={{ padding: "54px 30px 70px" }}>
                <div style={{ maxWidth: 780, margin: "0 auto" }}>
                  <ScreenSwitch />
                </div>
              </main>
            </div>
            <p
              style={{
                textAlign: "center",
                fontSize: 13,
                color: "#9494b6",
                margin: "18px 0 0",
              }}
            >
              Workplus · Workforce Needs Snapshot · Proof of concept
            </p>
          </div>
        </div>
      </MatchProvider>
    </SnapshotProvider>
  );
}
