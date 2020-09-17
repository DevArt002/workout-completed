import React, { Component } from "react";
import { Bounce } from "gsap";
import { isWebpSupported } from "react-image-webp/dist/utils";
import ReactAudioPlayer from "react-audio-player";
import { domAnimate } from "../../utils/animate-gsap";
import Star from "./star/star";
import BigProgressbar from "./big-progressbar/big-progressbar";
import WeeklyGoal from "./weekly-goal/weekly-goal";
import { Sparkle } from "../../utils/fireworks";

import "./stat-container.css";

import awardSound from "../../assets/sounds/award.mp3";

import statBoardWebp from "../../assets/img/stat_board.webp";
import statBoardPng from "../../assets/img/stat_board.png";

const statBoard = isWebpSupported() ? statBoardWebp : statBoardPng;

class StatContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stars: [
                {
                    marginTop: 15,
                    rotateDeg: 0,
                },
                {
                    marginTop: 0,
                    rotateDeg: 0,
                },
                {
                    marginTop: 15,
                    rotateDeg: 0,
                },
            ],
            enableStarShowAnimation: false,
            enableStarLightAnimation: false,
            enableScoreProgressAnimation: false,
            enableSpeedProgressAnimation: false,
            enableGoalProgressAnimation: false,
            playSound: false,
        };

        this.statContainerRef = React.createRef();
        this.particleRef = React.createRef();

        this.statContainerShowDuration = this.props.statContainerShowDuration;
        this.starShowDuration = this.props.starShowDuration;
        this.starLightDuration = this.props.starLightDuration;
        this.bigProgressbarPlayDuration = this.props.bigProgressbarPlayDuration;
        this.smallProgressbarPlayDuration = this.props.smallProgressbarPlayDuration;
        this.missionNum = props.missionNumber;
        this.score = props.score;
        this.maxScore = props.maxScore;
        this.speed = props.speed;
        this.maxSpeed = props.maxSpeed;
        this.day = props.day; // 0: Sunday, 1: Monday, etc
        this.goal = props.goal;
        this.maxGoal = props.maxGoal;
        this.totalStar = 3;
        this.shownStar = 0;
    }

    componentDidMount() {
        this.setState({
            playSound: true,
        });

        this.sparkle = new Sparkle(this.particleRef.current, 80);

        // Show popup
        this.showAnimation = domAnimate({
            dom: this.statContainerRef.current,
            duration: this.statContainerShowDuration, // duration
            startX: "-50%",
            endX: "-50%",
            startY: -2000, // startY
            endY: "-50%", // endY
            curve: Bounce.easeOut, // animation curve
            callback: this.statContainerShowAnimationFinished,
        });
    }

    statContainerShowAnimationFinished = () => {
        setTimeout(
            () =>
                this.setState({
                    enableStarShowAnimation: true,
                    enableStarLightAnimation: false,
                    enableScoreProgressAnimation: false,
                    enableSpeedProgressAnimation: false,
                    enableGoalProgressAnimation: false,
                    playSound: false,
                }),
            1500
        );
    };

    starShowAnimationFinished = () => {
        this.shownStar++;

        if (this.shownStar < this.totalStar) return;

        this.setState({
            enableStarShowAnimation: false,
            enableStarLightAnimation: true,
            enableScoreProgressAnimation: false,
            enableSpeedProgressAnimation: false,
            enableGoalProgressAnimation: false,
            playSound: false,
        });
    };

    starLightAnimationFinished = () => {
        this.setState({
            enableStarShowAnimation: false,
            enableStarLightAnimation: false,
            enableScoreProgressAnimation: true,
            enableSpeedProgressAnimation: false,
            enableGoalProgressAnimation: false,
            playSound: false,
        });
    };

    scoreProgressbarAnimationFinished = () => {
        this.setState({
            enableStarShowAnimation: false,
            enableStarLightAnimation: false,
            enableScoreProgressAnimation: false,
            enableSpeedProgressAnimation: true,
            enableGoalProgressAnimation: false,
            playSound: false,
        });
    };

    speedProgressbarAnimationFinished = () => {
        this.setState({
            enableStarShowAnimation: false,
            enableStarLightAnimation: false,
            enableScoreProgressAnimation: false,
            enableSpeedProgressAnimation: false,
            enableGoalProgressAnimation: true,
            playSound: false,
        });
    };

    goalProgressbarAnimationFinished = () => {
        this.setState({
            enableStarShowAnimation: false,
            enableStarLightAnimation: false,
            enableScoreProgressAnimation: false,
            enableSpeedProgressAnimation: false,
            enableGoalProgressAnimation: false,
            playSound: false,
        });

        setTimeout(() => {
            this.showAnimation.reverse();
        }, 2000);

        setTimeout(() => {
            this.props.statAnimationFinished();
        }, 2000 + this.statContainerShowDuration * 1000);
    };

    addSparkles = (x, y) => {
        this.sparkle.addSparkles(x, y);
    };

    render() {
        const {
            stars,
            enableStarShowAnimation,
            enableStarLightAnimation,
            enableScoreProgressAnimation,
            enableSpeedProgressAnimation,
            enableGoalProgressAnimation,
            playSound,
        } = this.state;

        return (
            <div className="stat-container" ref={this.statContainerRef}>
                <img src={statBoard} className="board" alt="stat board" />

                <div className="stat-content">
                    <div className="mission-row">
                        <p>WORKOUT {this.missionNum}</p>
                    </div>
                    <div className="star-row">
                        {stars.map((star, index) => {
                            return (
                                <Star
                                    rotateDeg={star.rotateDeg}
                                    marginTop={star.marginTop}
                                    starShowAnimationFinished={
                                        this.starShowAnimationFinished
                                    }
                                    starLightAnimationFinished={
                                        this.starLightAnimationFinished
                                    }
                                    addSparkles={this.addSparkles}
                                    enableStarShowAnimation={
                                        enableStarShowAnimation
                                    }
                                    enableStarLightAnimation={
                                        enableStarLightAnimation
                                    }
                                    starShowDuration={this.starShowDuration}
                                    starLightDuration={this.starLightDuration}
                                    delay={this.starShowDuration * index}
                                    key={index}
                                />
                            );
                        })}
                    </div>
                    <div className="score-row">
                        <BigProgressbar
                            label="SCORE"
                            value={this.score}
                            maxValue={this.maxScore}
                            maxValueHidden={false}
                            enableProgressAnimation={
                                enableScoreProgressAnimation
                            }
                            progressbarPlayDuration={
                                this.bigProgressbarPlayDuration
                            }
                            progressbarAnimationFinished={
                                this.scoreProgressbarAnimationFinished
                            }
                        />
                    </div>
                    <div className="speed-row">
                        <BigProgressbar
                            label="SPEED"
                            value={this.speed}
                            maxValue={this.maxSpeed}
                            maxValueHidden={true}
                            subLabel="Questions/Min"
                            enableProgressAnimation={
                                enableSpeedProgressAnimation
                            }
                            progressbarPlayDuration={
                                this.bigProgressbarPlayDuration
                            }
                            progressbarAnimationFinished={
                                this.speedProgressbarAnimationFinished
                            }
                        />
                    </div>
                    <div className="goal-row">
                        <WeeklyGoal
                            value={this.goal}
                            maxValue={this.maxGoal}
                            day={this.day}
                            enableProgressAnimation={
                                enableGoalProgressAnimation
                            }
                            progressbarPlayDuration={
                                this.smallProgressbarPlayDuration
                            }
                            progressbarAnimationFinished={
                                this.goalProgressbarAnimationFinished
                            }
                        />
                    </div>
                </div>
                <div className="particle-content" ref={this.particleRef}></div>
                {playSound && (
                    <ReactAudioPlayer
                        src={awardSound}
                        autoPlay
                        controls={false}
                    />
                )}
            </div>
        );
    }
}

export default StatContainer;
