import Image from "next/image";
import { BodyShort, HStack } from "@navikt/ds-react";
import styles from "./Avatar.module.css";
import { InteractiveAvatarStack } from "./InteractiveAvatarStack";

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

const AvatarCircle = ({ avatar }: { avatar: Avatar }) => {
  return (
    <Image
      className={styles.avatarImage}
      width="24"
      height="24"
      alt={`Avatar for ${avatar.name}`}
      src={avatar.imageSrc}
      priority
      loading="eager"
    />
  );
};

/**
 * When using `interactive`, the AvatarStack expects only a single avatar.
 * (it will use the first in the array)
 */
type AvatarStackProps =
  | {
      avatars: Avatar[];
      interactive?: false;
    }
  | {
      avatars: [Avatar];
      interactive?: true;
    };

export const AvatarStack = ({
  avatars,
  interactive = false,
}: AvatarStackProps) => {
  const isMultiple = avatars.length > 1;
  const suffix = isMultiple ? `+ ${avatars.length - 1}` : null;

  if (!Array.isArray(avatars) || avatars.length === 0) {
    return null;
  }

  const avatarStack = (
    <HStack gap="space-4" align="center">
      <ul className={styles.avatarList}>
        {avatars.map((avatar, idx) => {
          return (
            <li key={idx} className={styles.avatarItem}>
              <AvatarCircle avatar={avatar} />
            </li>
          );
        })}
      </ul>
      <BodyShort className={styles.avatarName} size="small">
        {`${avatars[0].name}`}
        {suffix && <span className={styles.avatarNameSuffix}>{suffix}</span>}
      </BodyShort>
    </HStack>
  );

  if (interactive) {
    return (
      <InteractiveAvatarStack popoverContent={avatars[0]}>
        {avatarStack}
      </InteractiveAvatarStack>
    );
  }
  return avatarStack;
};
