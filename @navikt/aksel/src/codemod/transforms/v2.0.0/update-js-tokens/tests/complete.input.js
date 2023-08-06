import styled from "styled-components";
import {
  NavdsGlobalColorBlue400 as abc132,
  NavdsGlobalColorGray100,
  NavdsGlobalColorGray400,
  NavdsSemanticColorLink,
} from "@navikt/ds-tokens/dist/tokens";
import { BodyShort } from "@navikt/ds-react";

const StyledNavLink = styled(NavLink)`
  border-bottom: 5px solid white;
  color: inherit;
  text-align: center;
  text-decoration: none;
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-left: 5px;
  padding-right: 5px;
  :hover {
    border-bottom: 5px solid ${abc132};
    p {
      color: ${NavdsSemanticColorLink};
    }
  }
  &.active {
    background-color: ${NavdsGlobalColorGray100};
    border-bottom: 5px solid ${NavdsSemanticColorLink};

    .typo-normal {
      font-weight: bold;
    }
  }
`;

const StyledLenketekst = styled(BodyShort)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const StyledTekst = styled(BodyShort)`
  border-bottom: 5px solid white;
  color: ${NavdsGlobalColorGray400};
  text-align: center;
  text-decoration: none;
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-left: 5px;
  padding-right: 5px;
`;

const Fane = ({ side, behandlingId, index, deaktivert }) => {
  const { gåTilUrl } = useApp();
  const fanenavn = side.navn;
  return (
    <>
      {deaktivert && (
        <StyledTekst size={"small"}>
          {index + 1}. {fanenavn}
        </StyledTekst>
      )}
      {!deaktivert && (
        <StyledNavLink
          key={side.navn}
          to={`/behandling/${behandlingId}/${side.href}`}
          onClick={(e) => {
            e.preventDefault();
            gåTilUrl(`/behandling/${behandlingId}/${side.href}`);
          }}
        >
          <StyledLenketekst size={"small"}>
            {index + 1}. {fanenavn}
          </StyledLenketekst>
        </StyledNavLink>
      )}
    </>
  );
};

export default Fane;
