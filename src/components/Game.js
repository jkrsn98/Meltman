import React, { Component } from 'react';
import Snowman from "./Snowman";
import randomWords from "../services/randomWords.js";
import Snowflakes from "../assets/effects/snowflakes.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSnowflake, faVolumeMute, faVolumeUp, faRedo } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'

import MyKeyboard from "./Keyboard"
import Sounder from "./Sounder"

export default class Game extends Component {
    constructor() {
        super();
        this.state = ({
            word: randomWords(),
            input: "",
            lettersGuessed: [],
            renderedWord: [],
            image: 1,
            snow: true,
            keySound: true,
            sound: true
        })
    }
    initialState = () => {
        return ({
            word: randomWords(),
            input: "",
            lettersGuessed: [],
            renderedWord: [],
            image: 1,
            keySound: true,
        })
    }

    initialRender = () => {
        let renderedWord = []
        for (let i = 0; i < this.state.word.length; i++) {
            renderedWord.push(" _ ")
        }
        this.setState({ renderedWord })
    }

    componentDidMount() {
        this.initialRender();
    }

    renderWord = (letter) => {
        let indices = [];
        let word = this.state.word.split('');
        let idx = word.indexOf(letter);
        if (idx == -1) this.setState({ image: this.state.image + 1 })
        while (idx != -1) {
            indices.push(idx);
            idx = word.indexOf(letter, idx + 1);
        }
        let renderedWord = this.state.renderedWord;
        if (renderedWord.indexOf(" _ ") === -1) this.setState({ keySound: false });
        indices.forEach(idx => { renderedWord[idx] = ` ${letter} ` })
        return renderedWord;

    }


    onKeyPress = (letter) => {
        if (this.state.renderedWord.indexOf(" _ ") !== -1) {
            const input = (this.state.image < 6) ? letter.toLowerCase() : "";
            let lettersGuessed = this.state.lettersGuessed;
            if (lettersGuessed.indexOf(input) === -1 && this.state.image != 6)
                lettersGuessed.push(input);
            else
                return;
            this.setState({ renderedWord: this.renderWord(input), lettersGuessed: lettersGuessed })
        }
        else this.forceUpdate(this.setState({ keySound: false }));

        console.log(this.state.renderedWord);

    }

    handleNewGame = (e) => {
        this.setState(this.initialState(), () => {
            this.initialRender();
        })
    }

    handleSnowEffect = () => {
        this.setState({ snow: !this.state.snow });
    }

    handleSound = () => {
        this.setState({ sound: !this.state.sound })
    }

    render() {
        console.log(this.state.word);
        const playSound = () => {
            if ((this.state.renderedWord.indexOf(" _ ") === -1))
                return <Sounder toPlay={"win"} sound={this.state.sound} />
            else if ((this.state.image == 6))
                return <Sounder toPlay={"lose"} sound={this.state.sound} />
        }
        return (
            <>
                {this.state.snow === true ? <Snowflakes /> : ''}
                {playSound()}
                <div className="title">
                    <h1>M E  L  T  M  A  N</h1>
                </div>
                <div className="snowman-container">
                    <Snowman image={this.state.image} word={this.state.word} />
                </div>
                <div className="renderedWord">
                    {this.state.renderedWord}
                </div>
                <div className="lettersGuessed">
                    {this.state.lettersGuessed.join(' ')}
                </div>
                <div className="keyboard-container">
                    <MyKeyboard onKeyPress={this.onKeyPress} usedLetters={this.state.lettersGuessed} image={this.state.image} clickable={this.state.keySound} sound={this.state.sound} />
                </div>
                <div className="newgame-button-container">
                    <FontAwesomeIcon icon={faRedo} size="3x" onClick={this.handleNewGame} className="clickable" />
                </div>
                <div className="effect-button-container">
                    {this.state.snow === true ? <FontAwesomeIcon icon={faSnowflake} size="3x" onClick={this.handleSnowEffect} className="clickable" /> : <FontAwesomeIcon icon={faCircle} size="3x" onClick={this.handleSnowEffect} className="clickable" />}
                    {this.state.sound == true ? <FontAwesomeIcon icon={faVolumeUp} size="3x" onClick={this.handleSound} className="clickable" /> : <FontAwesomeIcon icon={faVolumeMute} size="3x" onClick={this.handleSound} className="clickable" />}
                </div>

            </>
        )
    }
}