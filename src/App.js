import React, { Component } from "react";
import {
    FireworksContainer,
    CharacterContainer,
    StatContainer,
} from "./components";

import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            enableCharacterAnimation: false,
            enableStatAnimation: false,
        };

        // Durations
        this.fireworksPlayDuration = 2.5; // 2.5 seconds
        this.wcShowDuration = 1;
        this.wcHiddenDuration = 1;
        this.characterPlayDuration = 1.3;
        this.statContainerShowDuration = 1;
        this.statContainerHiddenDuration = 1;
        this.starShowDuration = 0.5;
        this.starLightDuration = 1;
        this.bigProgressbarPlayDuration = 2.5;
        this.smallProgressbarPlayDuration = 1.5;

        // Props from parent
        this.missionNumber = props.missionNumebr || 8;
        this.score = props.score || 12;
        this.maxScore = props.maxScore || 12;
        this.speed = props.speed || 33.2;
        this.maxSpeed = props.maxSpeed || 100;
        this.day = props.day || 1; // 0: Sunday, 1: Monday, etc
        this.goal = props.goal || 3;
        this.maxGoal = props.maxGoal || 10;
    }

    fireworksAnimationFinished = () => {
        this.setState({
            enableCharacterAnimation: true,
        });
    };

    characterAnimationFinished = () => {
        this.setState({
            enableStatAnimation: true,
            enableCharacterAnimation: false,
        });
    };

    render() {
        const { enableCharacterAnimation, enableStatAnimation } = this.state;

        return (
            <div className="app">
                {enableStatAnimation && (
                    <StatContainer
                        statContainerShowDuration={
                            this.statContainerShowDuration
                        }
                        statContainerHiddenDuration={
                            this.statContainerHiddenDuration
                        }
                        starShowDuration={this.starShowDuration}
                        starLightDuration={this.starLightDuration}
                        bigProgressbarPlayDuration={
                            this.bigProgressbarPlayDuration
                        }
                        smallProgressbarPlayDuration={
                            this.smallProgressbarPlayDuration
                        }
                        missionNumber={this.missionNumber}
                        score={this.score}
                        maxScore={this.maxScore}
                        speed={this.speed}
                        maxSpeed={this.maxSpeed}
                        day={this.day}
                        goal={this.goal}
                        maxGoal={this.maxGoal}
                    />
                )}
                {enableCharacterAnimation && (
                    <CharacterContainer
                        characterAnimationFinished={
                            this.characterAnimationFinished
                        }
                        wcShowDuration={this.wcShowDuration}
                        wcHiddenDuration={this.wcHiddenDuration}
                        characterPlayDuration={this.characterPlayDuration}
                    />
                )}
                <FireworksContainer
                    fireworksPlayDuration={this.fireworksPlayDuration}
                    fireworksAnimationFinished={this.fireworksAnimationFinished}
                />
                <div className="black-overlay"></div>
            </div>
        );
    }
}

export default App;
