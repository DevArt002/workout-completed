import React, { Component } from "react";
import { Circ, Bounce, Linear } from "gsap";
import { isWebpSupported } from "react-image-webp/dist/utils";
import ReactAudioPlayer from "react-audio-player";
import { domAnimate } from "../../utils/animate-gsap";

import "./character-container.css";

import kidCheersSound from "../../assets/sounds/kids_cheers.mp3";

import wcImgWebp from "../../assets/img/wc.webp";
import characterImg1Webp from "../../assets/img/character1.webp";
import characterImg2Webp from "../../assets/img/character2.webp";
import characterImg3Webp from "../../assets/img/character3.webp";
import wcImgPng from "../../assets/img/wc.png";
import characterImg1Png from "../../assets/img/character1.png";
import characterImg2Png from "../../assets/img/character2.png";
import characterImg3Png from "../../assets/img/character3.png";

const wcImg = isWebpSupported() ? wcImgWebp : wcImgPng;
const characterImg1 = isWebpSupported() ? characterImg1Webp : characterImg1Png;
const characterImg2 = isWebpSupported() ? characterImg2Webp : characterImg2Png;
const characterImg3 = isWebpSupported() ? characterImg3Webp : characterImg3Png;

class CharacterContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playSound: false,
        };

        this.wcRef = React.createRef();
        this.character1Ref = React.createRef();
        this.character2Ref = React.createRef();
        this.character3Ref = React.createRef();

        this.wcShowDuration = props.wcShowDuration;
        this.wcHiddenDuration = props.wcHiddenDuration;
        this.characterPlayDuration = props.characterPlayDuration;
    }

    componentDidMount() {
        this.setState({
            playSound: true,
        });
        // Show workout completed text
        domAnimate({
            dom: this.wcRef.current,
            duration: this.wcShowDuration, // duration
            startScale: 0, // startScale
            endScale: 1, // endScale
            startY: 300, // startY
            endY: 0, // endY
            startWidth: "90%",
            endWidth: "90%",
            curve: Bounce.easeOut, // animation curve
        });
        // Show&Hiddeen character1
        domAnimate({
            dom: this.character1Ref.current,
            duration: this.characterPlayDuration, //duration
            startRotZ: -10, // startRotZ
            endRotZ: 45, // endRotZ
            startY: 800, // startY
            endY: 0, // endY
            startWidth: "40%",
            endWidth: "40%",
            curve: Circ.easeOut, // animation curve
            reverse: true,
        });
        // Show&Hiddeen character2
        domAnimate({
            dom: this.character2Ref.current,
            duration: this.characterPlayDuration, //duration
            startRotZ: -20, // startRotZ
            endRotZ: 30, // endRotZ
            startX: 90, // startX
            endX: 90, // endX
            startY: 1100, // startY
            endY: 150, // endY
            startWidth: "40%",
            endWidth: "40%",
            curve: Circ.easeOut, // animation curve
            reverse: true,
        });
        // Show&Hiddeen character3
        domAnimate({
            dom: this.character3Ref.current,
            duration: this.characterPlayDuration, //duration
            startRotZ: 10, // startRotZ
            startX: -90, // startX
            endX: -90, // endX
            endRotZ: -20, // endRotZ
            startY: 1250, // startY
            endY: 100, // endY
            startWidth: "40%",
            endWidth: "40%",
            curve: Circ.easeOut, // animation curve
            reverse: true,
        });
        // After disappearance of characters, hidden workout completed text as well
        setTimeout(() => {
            domAnimate({
                dom: this.wcRef.current,
                duration: this.wcShowDuration, //duration
                startY: 0, // startY
                endY: 2000, // endY
                startWidth: "90%",
                endWidth: "90%",
                curve: Linear.easeNone, // animation curve
                callback: this.characterAnimationFinished,
            });
        }, this.characterPlayDuration * 1000 * 2);
    }

    characterAnimationFinished = () => {
        this.setState({
            playSound: false,
        });
        this.props.characterAnimationFinished();
    };

    render() {
        const { playSound } = this.state;

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
                {playSound && (
                    <ReactAudioPlayer
                        src={kidCheersSound}
                        autoPlay
                        controls={false}
                    />
                )}
            </div>
        );
    }
}

export default CharacterContainer;
