import React, { Component, createRef } from "react";
import { TweenMax, Circ, Bounce, Linear } from "gsap";

import "./completed-container.css";

import workoutCompletedImg from "../../assets/img/wc.png";
import characterImg1 from "../../assets/img/character1.png";
import characterImg2 from "../../assets/img/character2.png";
import characterImg3 from "../../assets/img/character3.png";

class CompletedContainer extends Component {
    constructor(props) {
        super(props);

        this.workoutCompletedRef = new createRef();
        this.character1Ref = new createRef();
        this.character2Ref = new createRef();
        this.character3Ref = new createRef();
    }

    componentDidMount() {
        this.scaleUp(this.workoutCompletedRef.current);
        this.popOver(
            this.character1Ref.current,
            1.4, //duration
            -10, //startRot
            45, //endRot
            0, //startX
            800, //startY
            0, //endX
            0 //endY
        );
        this.popOver(
            this.character2Ref.current,
            1.3, //duration
            -20, //startRot
            30, //endRot
            90, //startX
            900, //startY
            90, //endX
            150 //endY
        );
        this.popOver(
            this.character3Ref.current,
            1.3, //duration
            10, //startRot
            -20, //endRot
            -90, //startX
            850, //startY
            -90, //endX
            100 //endY
        );
    }

    scaleUp = (dom) => {
        TweenMax.fromTo(
            dom,
            0.9,
            {
                x: 0,
                y: 300,
                scale: 0,
            },
            {
                x: 0,
                y: 0,
                scale: 1,
                ease: Bounce.easeOut,
            }
        );

        setTimeout(() => {
            TweenMax.fromTo(
                dom,
                0.6,
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: 0,
                    y: 800,
                    ease: Linear.easeNone,
                }
            );
        }, 2400);
    };

    popOver = (dom, duration, startRot, endRot, startX, startY, endX, endY) => {
        const popOver = TweenMax.fromTo(
            dom,
            duration,
            {
                x: startX,
                y: startY,
                rotationZ: startRot,
            },
            {
                x: endX,
                y: endY,
                rotationZ: endRot,
                ease: Circ.easeOut,
            }
        );

        popOver.then(() => popOver.reverse());
    };

    render() {
        return (
            <div className="completed-container">
                <img
                    src={workoutCompletedImg}
                    className="workout-completed"
                    ref={this.workoutCompletedRef}
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

export default CompletedContainer;
