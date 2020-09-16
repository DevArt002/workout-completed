import React, { Component, createRef } from "react";
import Fireworks from "../../utils/fireworks";

import "./fireworks-container.css";

class FireworksContainer extends Component {
    constructor(props) {
        super(props);

        this.fireworksContainerRef = new createRef();
    }

    componentDidMount() {
        const container = this.fireworksContainerRef.current;
        const options = {
            maxRockets: 5, // max # of rockets to spawn
            rocketSpawnInterval: 200, // millisends to check if new rockets should spawn
            numParticles: 100, // number of particles to spawn when rocket explodes (+0-10)
            explosionMinHeight: 0.5, // percentage. min height at which rockets can explode
            explosionMaxHeight: 0.8, // percentage. max height before a particle is exploded
            explosionChance: 0.05, // chance in each tick the rocket will explode
        };
        const fireworks = new Fireworks(container, options);
        fireworks.start();

        setTimeout(() => {
            fireworks.stop();
            this.props.fireworksAnimationFinished();
        }, this.props.fireworksPlayDuration * 1000);
    }

    render() {
        return (
            <div
                className="fireworks-container"
                ref={this.fireworksContainerRef}
            ></div>
        );
    }
}

export default FireworksContainer;
