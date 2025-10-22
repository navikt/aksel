import { stegaClean } from "next-sanity";
import Image from "next/image";
import { Children, ReactNode, isValidElement } from "react";
import { BodyShort, BoxNew, Detail, HStack, VStack } from "@navikt/ds-react";
import styles from "./Avatar.module.css";

const MAX_AVATAR_COUNT = 30;

export const avatarUrl = (avatar_id: string) => {
  let _avatar_id = stegaClean(avatar_id);
  if (!Number.isNaN(parseInt(_avatar_id))) {
    _avatar_id =
      `${parseInt(_avatar_id) % MAX_AVATAR_COUNT}`.padStart(3, "0") ?? "broken";
  }
  return `/avatars/${_avatar_id}.svg`;
};

export type Avatar = {
  imageSrc: string;
  name: string;
  type: string;
  description: string;
};

export const Avatar = ({
  imageSrc,
  name,
  type,
  showName = false,
}: {
  /** URL to image for the avatar graphic. */
  imageSrc: string;
  /** Avatar must always have a name, as it becomes the image alt attribute. */
  name: string;
  /** Avatar type, a name grouping. Shown in the eyebrow alongside the name */
  type: string;
  /** The name of what the avatar represents. */
  children?: ReactNode;
  /** Whether or not to show the name (and eyebrow) next to the avatar. */
  showName?: boolean;
}) => {
  return (
    <HStack gap="space-4" align="center">
      <Image
        className={styles.avatarImage}
        width="32"
        height="32"
        alt={`Avatar for ${name}`}
        src={imageSrc}
        priority
        loading="eager"
        aria-hidden={showName}
      />
      {showName && (
        <VStack align="start">
          <BoxNew asChild marginBlock="space-1 0" marginInline="space-2 0">
            <Detail as="span" textColor="subtle">
              {type}
            </Detail>
          </BoxNew>
          <BoxNew asChild marginBlock="space-1 0" marginInline="space-2 0">
            <BodyShort
              as="span"
              className={styles.avatarName}
            >{`${name}`}</BodyShort>
          </BoxNew>
        </VStack>
      )}
    </HStack>
  );
};

type AvatarStackProps = { children?: ReactNode; showNames?: boolean };

export const AvatarStack = ({
  children,
  showNames = false,
}: AvatarStackProps) => {
  // TODO: this creates the requirement that children _must_ be Avatar

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      if (child?.type !== Avatar) {
        console.info("Child of AvatarStack must be Avatar");
      }
    } else {
      console.info("Child of AvatarStack must be Avatar");
    }
  });

  const avatars = Children.toArray(children) as ReactNode[];
  if (avatars.length === 0) {
    return null;
  }
  const firstAvatar = avatars && isValidElement(avatars[0]) && avatars[0];
  if (!firstAvatar) {
    return null;
  }

  const isMultiple = avatars.length > 1;
  const suffix = isMultiple ? `+ ${avatars.length - 1}` : null;

  const avatarStack = (
    <HStack gap="space-4" align="center">
      <HStack as="ul" aria-hidden={showNames}>
        {avatars.map((avatar, idx) => {
          return (
            <li key={idx} className={styles.avatarItem}>
              {avatar}
            </li>
          );
        })}
      </HStack>

      {showNames && (
        <VStack>
          <BoxNew asChild marginBlock="space-1 0" marginInline="space-2 0">
            <Detail textColor="subtle">{firstAvatar.props.type}</Detail>
          </BoxNew>
          <BoxNew asChild marginBlock="space-1 0" marginInline="space-2 0">
            <BodyShort className={styles.avatarName}>
              {`${firstAvatar.props.name}`}
              {suffix && (
                <span className={styles.avatarNameSuffix}>{suffix}</span>
              )}
            </BodyShort>
          </BoxNew>
        </VStack>
      )}
    </HStack>
  );

  return avatarStack;
};
