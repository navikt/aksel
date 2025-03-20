import { Chips } from "@navikt/ds-react";

const TokenRolesChips = ({
  roles,
  selectedRole,
  setSelectedRole,
}: {
  roles: string[];
  selectedRole: string | null;
  setSelectedRole: React.Dispatch<React.SetStateAction<typeof selectedRole>>;
}) => {
  return (
    <Chips>
      {roles.map((role) => (
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
          {role
            .split("-")
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" ")}
        </Chips.Toggle>
      ))}
    </Chips>
  );
};

export default TokenRolesChips;
