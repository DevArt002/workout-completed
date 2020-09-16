import React, { Component } from "react";

import "./stat-container.css";

import statBoard from "../../assets/img/stat_board.png";
import starBase from "../../assets/img/star_base.png";
import starSprite from "../../assets/img/star_sprite.png";

class StatContainer extends Component {
    constructor(props) {
        super(props);

        this.missionNum = 8;
    }

    render() {
        return (
            <div className="stat-container">
                <img src={statBoard} className="board" alt="stat board" />
                <div className="stat-content">
                    <div className="mission">
                        <p>WORKOUT {this.missionNum}</p>
                    </div>
                    <div className="star">
                        <div id="star1">
                            <img src={starBase} alt="star1" />
                        </div>
                        <div id="star2">
                            <img src={starBase} alt="star2" />
                        </div>
                        <div id="star3">
                            <img src={starBase} alt="star3" />
                        </div>
                    </div>
                    <div className="score">
                        <p>WORKOUT {this.missionNum}</p>
                    </div>
                    <div className="speed">
                        <p>WORKOUT {this.missionNum}</p>
                    </div>
                    <div className="goal">
                        <p>WORKOUT {this.missionNum}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default StatContainer;
