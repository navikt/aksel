import Image from "next/image";
import { Children, ReactNode } from "react";
import { BodyShort, HStack } from "@navikt/ds-react";
import styles from "./Avatar.module.css";

const MAX_AVATAR_COUNT = 30;

export const avatarUrl = (avatar_id: string) => {
  let _avatar_id = avatar_id;
  if (!isNaN(parseInt(avatar_id))) {
    _avatar_id =
      `${parseInt(avatar_id) % MAX_AVATAR_COUNT}`.padStart(3, "0") ?? "broken";
  }
  return `/avatars/${_avatar_id}.svg`;
};

export type Avatar = {
  imageSrc: string;
  name: string;
  description: string;
};

export const Avatar = ({
  imageSrc,
  name,
  showName = false,
}: {
  /** URL to image for the avatar graphic. */
  imageSrc: string;
  /** Avatar must always have a name, as it becomes the image alt attribute. */
  name: string;
  /** The name of what the avatar represents. */
  children?: ReactNode;
  /** Whether or not to show the name next to the avatar. */
  showName?: boolean;
}) => {
  return (
    <HStack gap="space-4" align="center">
      <Image
        className={styles.avatarImage}
        width="24"
        height="24"
        alt={`Avatar for ${name}`}
        src={imageSrc}
        priority
        loading="eager"
      />
      {showName && (
        <BodyShort className={styles.avatarName} size="small">
          {name}
        </BodyShort>
      )}
    </HStack>
  );
};

/**
 * When using `interactive`, the AvatarStack expects only a single avatar.
 * (it will use the first in the array)
 */
type AvatarStackProps = { children?: ReactNode; showNames?: boolean };

export const AvatarStack = ({
  children,
  showNames = false,
}: AvatarStackProps) => {
  // TODO: this creates the requirement that children _must_ be Avatar
  const avatars = Children.toArray(children) as ReactNode[];
  if (avatars.length === 0) {
    return null;
  }

  const isMultiple = avatars.length > 1;
  const suffix = isMultiple ? `+ ${avatars.length - 1}` : null;

  const avatarStack = (
    <HStack gap="space-4" align="center">
      <ul className={styles.avatarList}>
        {avatars.map((avatar, idx) => {
          return (
            <li key={idx} className={styles.avatarItem}>
              {avatar}
            </li>
          );
        })}
      </ul>
      {showNames && (
        <BodyShort className={styles.avatarName} size="small">
          {`${avatars && avatars[0]?.props.name}`}
          {suffix && <span className={styles.avatarNameSuffix}>{suffix}</span>}
        </BodyShort>
      )}
    </HStack>
  );

  return avatarStack;
};
