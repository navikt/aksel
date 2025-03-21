import { Chips } from "@navikt/ds-react";
import { BreakpointRolesT, ColorRolesT, FontRolesT } from "./config";

const TokenRolesChips = ({
  roles,
  selectedRole,
  setSelectedRole,
}: {
  roles: ColorRolesT[] | FontRolesT[] | BreakpointRolesT[];
  selectedRole: string | null;
  setSelectedRole: React.Dispatch<React.SetStateAction<typeof selectedRole>>;
}) => {
  return (
    <Chips>
      {Object.entries(roles).map(([role, { title }]) => (
        <Chips.Toggle
          checkmark={false}
          key={role}
          selected={selectedRole === role}
          onClick={() =>
            selectedRole !== role
              ? setSelectedRole(role)
              : setSelectedRole(null)
          }
        >
          {title}
        </Chips.Toggle>
      ))}
    </Chips>
  );
};

export default TokenRolesChips;
