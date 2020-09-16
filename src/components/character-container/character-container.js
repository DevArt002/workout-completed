import React, { Component, createRef } from "react";
import { TweenMax, Circ, Bounce, Linear } from "gsap";

import "./character-container.css";

import wcImg from "../../assets/img/wc.png";
import characterImg1 from "../../assets/img/character1.png";
import characterImg2 from "../../assets/img/character2.png";
import characterImg3 from "../../assets/img/character3.png";

class CharacterContainer extends Component {
    constructor(props) {
        super(props);

        this.wcRef = new createRef();
        this.character1Ref = new createRef();
        this.character2Ref = new createRef();
        this.character3Ref = new createRef();

        this.wcShowDuration = props.wcShowDuration;
        this.wcHiddenDuration = props.wcHiddenDuration;
        this.characterPlayDuration = props.characterPlayDuration;
    }

    componentDidMount() {
        // Show workout completed text
        this.domAnimate(
            this.wcRef.current,
            this.wcShowDuration, // duration
            0, // startScale
            1, // endScale
            0, // startRotZ
            0, // endRotZ
            0, // startX
            300, // startY
            0, // endX
            0, // endY
            Bounce.easeOut, // animation curve
            false
        );
        // Show&Hiddeen character1
        this.domAnimate(
            this.character1Ref.current,
            this.characterPlayDuration, //duration
            1, // startScale
            1, // endScale
            -10, // startRotZ
            45, // endRotZ
            0, // startX
            800, // startY
            0, // endX
            0, // endY
            Circ.easeOut, // animation curve
            true
        );
        // Show&Hiddeen character2
        this.domAnimate(
            this.character2Ref.current,
            this.characterPlayDuration, //duration
            1, // startScale
            1, // endScale
            -20, // startRotZ
            30, // endRotZ
            90, // startX
            1100, // startY
            90, // endX
            150, // endY
            Circ.easeOut, // animation curve
            true
        );
        // Show&Hiddeen character3
        this.domAnimate(
            this.character3Ref.current,
            this.characterPlayDuration, //duration
            1, // startScale
            1, // endScale
            10, // startRotZ
            -20, // endRotZ
            -90, // startX
            1250, // startY
            -90, // endX
            100, // endY
            Circ.easeOut, // animation curve
            true
        );
        // After disappearance of characters, hidden workout completed text as well
        setTimeout(() => {
            this.domAnimate(
                this.wcRef.current,
                this.wcShowDuration, // duration
                1, // startScale
                1, // endScale
                0, // startRotZ
                0, // endRotZ
                0, // startX
                0, // startY
                0, // endX
                2000, // endY
                Linear.easeNone, // animation curve
                false,
                this.props.characterAnimationFinished
            );
        }, this.characterPlayDuration * 1000 * 2);
    }

    domAnimate = (
        dom,
        duration,
        startScale,
        endScale,
        startRotZ,
        endRotZ,
        startX,
        startY,
        endX,
        endY,
        curve,
        reverse,
        callback = null
    ) => {
        const animateAction = TweenMax.fromTo(
            dom,
            duration,
            {
                x: startX,
                y: startY,
                scale: startScale,
                rotateZ: startRotZ,
            },
            {
                x: endX,
                y: endY,
                scale: endScale,
                rotateZ: endRotZ,
                ease: curve,
            }
        );

        if (reverse) animateAction.then(() => animateAction.reverse());

        if (callback) animateAction.then(() => callback());
    };

    render() {
        return (
            <div className="character-container">
                <img
                    src={wcImg}
                    className="workout-completed"
                    ref={this.wcRef}
                    alt="workout-completed"
                />
                <img
                    src={characterImg1}
                    className="character"
                    id="character1"
                    ref={this.character1Ref}
                    alt="character1"
                />
                <img
                    src={characterImg2}
                    className="character"
                    id="character2"
                    ref={this.character2Ref}
                    alt="character2"
                />
                <img
                    src={characterImg3}
                    className="character"
                    id="character3"
                    ref={this.character3Ref}
                    alt="character3"
                />
            </div>
        );
    }
}

export default CharacterContainer;
