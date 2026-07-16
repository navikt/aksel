"use client";

import { Events } from "@navikt/analytics-types";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";

type VideoPlayerProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  alt: string;
};

/**
 * We need a nested client-component for the video element to be able to track play/pause events with umami, without making the entire Video component a client component.
 * Reason: If whole component was a client-component and then used inside a nested PortableText it ends up crashing.
 * - Example: PortableText renders expansioncard -> video inside expansioncard -> crash
 */
function VideoPlayer({ alt, children, ...rest }: VideoPlayerProps) {
  return (
    <video
      {...rest}
      onPlay={() => umamiTrack(Events.VIDEO_START, { tittel: alt })}
      onPause={() => umamiTrack(Events.VIDEO_STOPP, { tittel: alt })}
    >
      {children}
    </video>
  );
}

export { VideoPlayer };
