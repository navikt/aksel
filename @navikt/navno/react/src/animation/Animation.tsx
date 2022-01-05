import React, { useEffect, useState, useRef } from "react";
import lottie, { AnimationItem } from "lottie-web";

interface LottieAnimationProps {
  hoverAnimation: any;
  activeAnimation: any;
  isHovering: boolean;
  isActive: boolean;
  className?: string;
}

const Animation = ({
  hoverAnimation,
  activeAnimation,
  isHovering,
  isActive,
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

  const getLottieDataByState = () => {
    return isActive ? activeAnimation : hoverAnimation;
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
    const lottieData = getLottieDataByState();
    updateLottieContainer(lottieData);
  }, [hoverAnimation, activeAnimation]);

  useEffect(() => {
    const lottieData = getLottieDataByState();
    const player = updateLottieContainer(lottieData);
    if (isActive && player) {
      player.play();
    }
  }, [isActive]);

  return (
    <div className={className}>
      <div ref={lottieContainerRef} />
    </div>
  );
};

export default Animation;
