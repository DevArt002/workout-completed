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

        this.fireworksPlayDuration = 2.5; // 2.5 seconds
        this.wcShowDuration = 1;
        this.wcHiddenDuration = 1;
        this.characterPlayDuration = 1.3;
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
                {enableStatAnimation && <StatContainer />}
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
