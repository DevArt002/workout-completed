import React, { Component } from "react";
import { Sine } from "gsap";
import ReactAudioPlayer from "react-audio-player";
import { domAnimate } from "../../../utils/animate-gsap";

import "./big-progressbar.css";

import progressSound from "../../../assets/sounds/progress.mp3";

class BigProgressbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playSound: false,
        };

        this.progressRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {}

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (
            prevProps.enableProgressAnimation !==
                this.props.enableProgressAnimation &&
            this.props.enableProgressAnimation
        ) {
            // Animate width of progressbar
            domAnimate({
                dom: this.progressRef.current,
                duration: this.props.progressbarPlayDuration, // duration
                startWidth: "0%", // startWidth
                endWidth: `${(this.props.value * 100) / this.props.maxValue}%`, // endWidth
                curve: Sine.easeOut, // animation curve
                callback: this.progressbarAnimationFinished,
            });

            this.setState({
                playSound: true,
            });

            return true;
        }

        return false;
    }

    progressbarAnimationFinished = () => {
        this.setState({
            playSound: false,
        });

        this.props.progressbarAnimationFinished();
    };

    render() {
        const { label, value, maxValue, maxValueHidden, subLabel } = this.props;
        const { playSound } = this.state;

        return (
            <div className="big-progressbar">
                <span className="label">{label}</span>
                <div className="value-content">
                    <span className="value">
                        {value}
                        {!maxValueHidden ? `/${maxValue}` : ``}
                    </span>
                    {subLabel && <span className="subLabel">{subLabel}</span>}
                </div>
                <div className="progress" ref={this.progressRef}></div>
                {playSound && (
                    <ReactAudioPlayer
                        src={progressSound}
                        autoPlay
                        controls={false}
                    />
                )}
            </div>
        );
    }
}

export default BigProgressbar;
