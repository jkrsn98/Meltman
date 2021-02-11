import React, { Component } from 'react';
import Snowman from "./Snowman";
import randomWords from "../services/randomWords.js";
import Keyboard from 'react-simple-keyboard';
import "react-simple-keyboard/build/css/index.css";

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
            lettersLeft: [],
            renderedWord: [],
            image: 1,
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

    updateInput = (e) => {
        e.preventDefault();
        const input = (this.state.image < 6) ? e.target.value : "";
        this.setState({ input })
    }


    handleSubmit = (e) => {
        if (e) e.preventDefault();
        let lettersGuessed = this.state.lettersGuessed;
        if (lettersGuessed.indexOf(this.state.input) === -1 && this.state.image != 6) {
            lettersGuessed.push(this.state.input);
        }
        else {
            this.setState({ input: "" });
            return;
        }
        this.setState({ renderedWord: this.renderWord(this.state.input), lettersGuessed: lettersGuessed, input: '' })
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
        indices.forEach(idx => { renderedWord[idx] = ` ${letter} ` })
        return renderedWord;
    }

    handleNewGame = (e) => {
        this.setState(this.initialState(), () => {
            this.initialRender();
        })
    }

    onKeyPress = (button) => {
        console.log("Button pressed", button);
        const input = (this.state.image < 6) ? button.toLowerCase() : "";
        this.setState({ input })
        this.handleSubmit();
    }

    render() {
        let usedLetters;
        if (this.state.lettersGuessed.length > 0)
            usedLetters = this.state.lettersGuessed.join(' ').toUpperCase();
        console.log(usedLetters);
        console.log(this.state.word);
        return (
            <>
                <div class="snowflakes" aria-hidden="true">
                    <div class="snowflake">
                        ❅
  </div>
                    <div class="snowflake">
                        ❆
  </div>
                    <div class="snowflake">
                        ❅
  </div>
                    <div class="snowflake">
                        ❆
  </div>
                    <div class="snowflake">
                        ❅
  </div>
                    <div class="snowflake">
                        ❆
  </div>
                    <div class="snowflake">
                        ❅
  </div>
                    <div class="snowflake">
                        ❆
  </div>
                    <div class="snowflake">
                        ❅
  </div>
                    <div class="snowflake">
                        ❆
  </div>
                    <div class="snowflake">
                        ❅
  </div>
                    <div class="snowflake">
                        ❆
  </div>
                </div>
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
                    {this.state.lettersGuessed}
                </div>
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <input className="input" type="text" maxLength="1" value={this.state.input} onChange={this.updateInput}>

                        </input>
                        <br></br>
                    </form>
                </div>
                <div className="keyboard-container">
                    <Keyboard
                        onChange={this.onChange}
                        onKeyPress={this.onKeyPress}
                        layout={{
                            default: [
                                "A B C D E F G H I",
                                "J K L M N O P Q R",
                                "S T U V W X Y Z",
                            ]
                        }}
                        theme={"hg-theme-default"}
                        buttonAttributes={[{
                            attribute: "style",
                            value: "fontSize: '100px' ",
                            buttons: "B"
                        }]}
                        buttonTheme={[
                            {
                                class: "usedLetter",
                                buttons: usedLetters,
                            }
                        ]}
                    />
                </div>
                <div className="newgame-button-container">
                    <button className="newgame-button" onClick={this.handleNewGame}>New Game</button>
                    <button className="options-button" onClick={this.handleOptions}>Options</button>
                </div>
            </>
        )
    }
}