import React, { Component } from 'react';
import Snowman from "./Snowman";
import randomWords from "../services/randomWords.js";
import Snowflakes from "../assets/effects/snowflakes.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSnowflake } from '@fortawesome/free-solid-svg-icons'
import MyKeyboard from "./Keyboard"
import Sounder from "./Sounder"
export default class Game extends Component {
    constructor() {
        super();
        this.state = this.initialState();
    }
    initialState = () => {
        return ({
            word: randomWords(),
            input: "",
            lettersGuessed: [],
            renderedWord: [],
            image: 1,
            snow: true,
            keySound: true
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
        if(renderedWord.indexOf(" _ ")===-1) this.setState({keySound:false});
        indices.forEach(idx => { renderedWord[idx] = ` ${letter} ` })
        return renderedWord;
        
    }

    
    onKeyPress = (letter) => {
        if(this.state.renderedWord.indexOf(" _ ")!==-1){
            const input = (this.state.image < 6) ? letter.toLowerCase() : "";
            let lettersGuessed = this.state.lettersGuessed;
            if (lettersGuessed.indexOf(input) === -1 && this.state.image != 6)
            lettersGuessed.push(input);
            else
                return;
            this.setState({ renderedWord: this.renderWord(input), lettersGuessed: lettersGuessed})
        }
        else this.forceUpdate(this.setState({keySound:false}));
        
        console.log(this.state.renderedWord);
        
    }
    
    handleNewGame = (e) => {
        this.setState(this.initialState(), () => {
            this.initialRender();
        })
    }

    handleSnowEffect = () =>{
        const snow = !this.state.snow;
        this.setState({snow});
    }

    render() {
        console.log(this.state.word);
        
        const playSound = () =>{
            let win = (this.state.renderedWord.indexOf(" _ ") === -1)?true:false;
            if(win) {
                win=false;
                return <Sounder toPlay={"win"} />
            }
        }
        return (
            <>
                {this.state.snow===true?<Snowflakes />: ''}
                {/* {(this.state.renderedWord.indexOf(" _ ") === -1)?<Sounder toPlay={"win"} />:''} */}
                {/* <Sounder toPlay={"win"} /> */}
                {playSound()}
                <div className="title">
                    {this.state.image===6?<h1>Game Over</h1>:<h1>M E  L  T  M  A  N</h1>}
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
                    <MyKeyboard onKeyPress={this.onKeyPress} usedLetters={this.state.lettersGuessed} image={this.state.image} clickable={this.state.keySound}/>
                </div>
                <div className="newgame-button-container">
                    <button className="newgame-button" onClick={this.handleNewGame}>New Game</button>
                    <FontAwesomeIcon icon={faSnowflake} size="3x" onClick={this.handleSnowEffect} className="clickable"/>
                </div>
            </>
        )
    }
}