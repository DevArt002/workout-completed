import { TweenMax, Linear } from "gsap";

export const domAnimate = ({
    dom,
    duration,
    startScale = 1,
    endScale = 1,
    startRotZ = 0,
    endRotZ = 0,
    startX = 0,
    startY = 0,
    endX = 0,
    endY = 0,
    startWidth = "initial",
    endWidth = "initial",
    curve = Linear.easeNone,
    reverse = false,
    callback = null,
}) => {
    const animateAction = TweenMax.fromTo(
        dom,
        duration,
        {
            x: startX,
            y: startY,
            scale: startScale,
            rotateZ: startRotZ,
            width: startWidth,
        },
        {
            x: endX,
            y: endY,
            scale: endScale,
            rotateZ: endRotZ,
            width: endWidth,
            ease: curve,
        }
    );

    if (reverse) animateAction.then(() => animateAction.reverse());

    if (callback) animateAction.then(() => callback());

    return animateAction;
};
