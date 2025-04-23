import { Chips } from "@navikt/ds-react";
import { RoleT } from "./config";

const TokenRolesChips = ({
  roles,
  selectedRole,
  setSelectedRole,
}: {
  roles: RoleT[];
  selectedRole: string | null;
  setSelectedRole: React.Dispatch<React.SetStateAction<typeof selectedRole>>;
}) => {
  return (
    <Chips>
      {roles.map(({ title }) => (
        <Chips.Toggle
          checkmark={false}
          key={title}
          selected={selectedRole === title.toLowerCase()}
          onClick={() =>
            selectedRole !== title.toLowerCase()
              ? setSelectedRole(title.toLowerCase())
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
