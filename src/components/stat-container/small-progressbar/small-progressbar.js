import React, { Component } from "react";
import { Linear } from "gsap";
import ReactAudioPlayer from "react-audio-player";
import { domAnimate } from "../../../utils/animate-gsap";

import "./small-progressbar.css";

import progressSound from "../../../assets/sounds/progress.mp3";

class SmallProgressbar extends Component {
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
                curve: Linear.easeNone, // animation curve
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
        const { value, maxValue } = this.props;
        const { playSound } = this.state;

        return (
            <div className="small-progressbar">
                <span className="value">
                    {value}
                    {maxValue ? `/${maxValue}` : ``}
                </span>
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

export default SmallProgressbar;
