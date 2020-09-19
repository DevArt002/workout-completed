import React, { Component } from "react";
import { Sine } from "gsap";
import { domAnimate, countUp } from "../../../utils/animate-gsap";

import "./big-progressbar.css";

import progressSound from "../../../assets/sounds/progress.mp3";

class BigProgressbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };

        this.progressRef = React.createRef();
        this.soundRef = React.createRef();

        this.totalLoad = 1; // Count of components to load external assets
        this.currentLoad = 0; // Count of assets loaded
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
            // Count up
            countUp({
                duration: this.props.progressbarPlayDuration,
                val: this.props.value,
                step: this.props.step,
                curve: Sine.easeOut, // animation curve
                updateFunc: this.updateValue,
            });
            // Play sound
            this.soundRef.current.play();

            return true;
        }

        return false;
    }

    assetLoaded = () => {
        this.currentLoad++;

        if (this.currentLoad !== this.totalLoad) return;

        this.props.assetLoaded();
    };

    updateValue = (value) => {
        this.setState({
            value: value,
        });
    };

    progressbarAnimationFinished = () => {
        this.soundRef.current.pause();

        this.props.progressbarAnimationFinished();
    };

    render() {
        const { label, maxValue, maxValueHidden, subLabel } = this.props;
        const { value } = this.state;

        return (
            <div className="big-progressbar">
                <span className="label">{label}</span>
                <div className="value-content">
                    <span className="value">
                        <span>{value}</span>
                        {!maxValueHidden ? `/${maxValue}` : ``}
                    </span>
                    {subLabel && <span className="subLabel">{subLabel}</span>}
                </div>
                <div className="progress" ref={this.progressRef}></div>
                <audio
                    src={progressSound}
                    onCanPlayThrough={this.assetLoaded}
                    ref={this.soundRef}
                />
            </div>
        );
    }
}

export default BigProgressbar;
