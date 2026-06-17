"use client";

import { useSnapshot } from "@/lib/useSnapshot";
import { SECTORS, SIZES } from "@/lib/constants";
import { BackLink, PrimaryButton } from "@/components/PrimaryButton";
import { StepLabel, ScreenHeading } from "@/components/StepLabel";
import { FieldLabel, FieldHint, TextInput, Select } from "@/components/Field";

export function OrgDetails() {
  const { org, setOrgField, saveOrg, backFromOrg, orgValid, editReturn } = useSnapshot();

  const ctaLabel = editReturn === "review" ? "Save and return" : "Continue";

  return (
    <div className="animate-fade">
      <BackLink onClick={backFromOrg} />
      <StepLabel>Step 1 of 3 · About your organisation</StepLabel>
      <ScreenHeading>Tell us about your organisation</ScreenHeading>

      <div style={{ marginBottom: 24 }}>
        <FieldLabel htmlFor="orgName">Organisation name</FieldLabel>
        <TextInput
          id="orgName"
          value={org.name}
          onValueChange={(v) => setOrgField("name", v)}
          placeholder="e.g. McAllister Construction Ltd"
        />
      </div>

      <div style={{ marginBottom: 24 }}>
        <FieldLabel htmlFor="orgSector">Sector</FieldLabel>
        <FieldHint>
          Pick the closest fit — you can add roles from any area later.
        </FieldHint>
        <Select
          id="orgSector"
          value={org.sector}
          onValueChange={(v) => setOrgField("sector", v)}
        >
          <option value="">Select a sector</option>
          {SECTORS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </div>

      <div style={{ marginBottom: 24 }}>
        <FieldLabel htmlFor="orgSize">Organisation size</FieldLabel>
        <Select
          id="orgSize"
          value={org.size}
          onValueChange={(v) => setOrgField("size", v)}
        >
          <option value="">Select a size band</option>
          {SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </div>

      <div style={{ marginBottom: 34 }}>
        <FieldLabel htmlFor="orgLoc">Main location</FieldLabel>
        <FieldHint>Town, city or postcode where most of these roles are based.</FieldHint>
        <TextInput
          id="orgLoc"
          value={org.location}
          onValueChange={(v) => setOrgField("location", v)}
          placeholder="e.g. Belfast or BT1 5GS"
          style={{ maxWidth: 340 }}
        />
      </div>

      <PrimaryButton onClick={saveOrg} disabled={!orgValid}>
        {ctaLabel}
      </PrimaryButton>
    </div>
  );
}
