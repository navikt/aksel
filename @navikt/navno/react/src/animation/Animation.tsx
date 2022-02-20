import React, { useEffect, useState, useRef } from "react";
import lottie, { AnimationItem } from "lottie-web";

interface LottieAnimationProps {
  hoverAnimation: any;
  isHovering: boolean;
  className?: string;
}

const Animation = ({
  hoverAnimation,
  isHovering,
  className,
}: LottieAnimationProps) => {
  const [direction, setDirection] = useState<number>(1);
  const lottieContainerRef = useRef<HTMLDivElement | null>(null);
  const lottiePlayerRef = useRef<AnimationItem | null>(null);

  const updateLottieContainer = (lottieData: any) => {
    const lottieContainer: HTMLElement | null = lottieContainerRef.current;
    if (!lottieContainer || !lottieContainerRef.current) {
      return;
    }

    if (lottieContainerRef && lottieContainerRef.current) {
      lottieContainerRef.current.innerHTML = "";
    }

    const player = lottie.loadAnimation({
      container: lottieContainer,
      animationData: lottieData,
      autoplay: false,
      loop: false,
    });

    lottiePlayerRef.current = player;

    return player;
  };

  useEffect(() => {
    const newDirection = isHovering ? 1 : -1;
    if (lottiePlayerRef.current) {
      setDirection(newDirection);
      lottiePlayerRef.current.setDirection(newDirection);
      lottiePlayerRef.current.play();
    }
  }, [isHovering, direction]);

  useEffect(() => {
    updateLottieContainer(hoverAnimation);
    /* eslint-disable-next-line */
  }, [hoverAnimation]);

  return (
    <div className={className}>
      <div ref={lottieContainerRef} />
    </div>
  );
};

export default Animation;
