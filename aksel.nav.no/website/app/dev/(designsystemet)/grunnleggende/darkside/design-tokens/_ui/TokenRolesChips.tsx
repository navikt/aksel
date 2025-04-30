import { Chips } from "@navikt/ds-react";
import { BreakpointRoleT, ColorRoleT, FontRoleT, RoleT } from "./config";

const TokenRolesChips = ({
  roles,
  selectedRole,
  setSelectedRole,
}: {
  roles: RoleT<ColorRoleT["id"] | FontRoleT["id"] | BreakpointRoleT["id"]>[];
  selectedRole: string | null;
  setSelectedRole: React.Dispatch<React.SetStateAction<typeof selectedRole>>;
}) => {
  return (
    <Chips>
      {roles.map(({ id, title }) => (
        <Chips.Toggle
          checkmark={false}
          key={title}
          selected={selectedRole === id}
          onClick={() =>
            selectedRole !== id ? setSelectedRole(id) : setSelectedRole(null)
          }
          variant="neutral"
        >
          {title}
        </Chips.Toggle>
      ))}
    </Chips>
  );
};

export default TokenRolesChips;
