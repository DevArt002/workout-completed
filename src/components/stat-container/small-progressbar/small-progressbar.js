import React, { Component } from "react";
import { Linear } from "gsap";
import { domAnimate } from "../../../utils/animate-gsap";

import "./small-progressbar.css";

class SmallProgressbar extends Component {
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
                curve: Linear.easeNone, // animation curve
                callback: this.props.progressbarAnimationFinished,
            });

            return true;
        }

        return false;
    }

    render() {
        const { value, maxValue } = this.props;
        return (
            <div className="small-progressbar">
                <span className="value">
                    {value}
                    {maxValue ? `/${maxValue}` : ``}
                </span>
                <div className="progress" ref={this.progressRef}></div>
            </div>
        );
    }
}

export default SmallProgressbar;
