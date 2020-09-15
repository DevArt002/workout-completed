import React, { Component } from "react";
import { FireworksContainer, CompletedContainer } from "./components";

import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playCompletedContainer: false,
        };

        this.delayCompletedContainer = 2; //1 second
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                playCompletedContainer: true,
            });
        }, this.delayCompletedContainer * 1000);
    }

    render() {
        const { playCompletedContainer } = this.state;
        return (
            <div className="app">
                {playCompletedContainer && <CompletedContainer />}
                <FireworksContainer />
                <div className="black-overlay"></div>
            </div>
        );
    }
}

export default App;
