import React, { Component } from "react";
import { Sine } from "gsap";
import { domAnimate } from "../../../utils/animate-gsap";

import "./big-progressbar.css";

class BigProgressbar extends Component {
    constructor(props) {
        super(props);

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
                callback: this.props.progressbarAnimationFinished,
            });

            return true;
        }

        return false;
    }

    render() {
        const { label, value, maxValue, maxValueHidden, subLabel } = this.props;

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
            </div>
        );
    }
}

export default BigProgressbar;
