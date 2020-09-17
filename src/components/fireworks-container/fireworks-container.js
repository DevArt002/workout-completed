import React, { Component } from "react";
import Fireworks from "../../utils/fireworks";
import ReactAudioPlayer from "react-audio-player";

import "./fireworks-container.css";

import fireworksSound from "../../assets/sounds/fireworks.mp3";

class FireworksContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playSound: false,
        };

        this.fireworksContainerRef = React.createRef();
    }

    componentDidMount() {
        const container = this.fireworksContainerRef.current;
        const options = {
            maxRockets: 5, // max # of rockets to spawn
            rocketSpawnInterval: 300, // millisends to check if new rockets should spawn
            numParticles: 80, // number of particles to spawn when rocket explodes (+0-10)
            explosionMinHeight: 0.5, // percentage. min height at which rockets can explode
            explosionMaxHeight: 0.8, // percentage. max height before a particle is exploded
            explosionChance: 0.05, // chance in each tick the rocket will explode
        };
        const fireworks = new Fireworks(container, options);
        fireworks.start();

        this.setState({
            playSound: true,
        });

        setTimeout(() => {
            fireworks.stop();
            this.props.fireworksAnimationFinished();
        }, this.props.fireworksPlayDuration * 1000);

        setTimeout(() => {
            this.setState({
                playSound: false,
            });
        }, this.props.fireworksPlayDuration * 1000 + 1000);
    }

    render() {
        const { playSound } = this.state;

        return (
            <div
                className="fireworks-container"
                ref={this.fireworksContainerRef}
            >
                {playSound && (
                    <ReactAudioPlayer
                        src={fireworksSound}
                        autoPlay
                        controls={false}
                    />
                )}
            </div>
        );
    }
}

export default FireworksContainer;
