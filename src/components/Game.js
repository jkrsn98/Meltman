import React, { Component } from 'react';
import randomWords from "../services/randomWords.js";

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

    render() {
        let usedLetters;
        if (this.state.lettersGuessed.length > 0)
            usedLetters = this.state.lettersGuessed.join(' ').toUpperCase();
        console.log(usedLetters);
        console.log(this.state.word);
        return (
            <>
                <div className="title">
                    <h1>M E  L  T  M  A  N</h1>
                </div>
                <div className="snowman-container">
                </div>
                <div className="renderedWord">
                </div>
                <div className="lettersGuessed">
                </div>
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <input className="input" type="text" maxLength="1" value={this.state.input} onChange={this.updateInput}>

                        </input>
                        <br></br>
                        {/* <button onClick={this.handleSubmit}>Submit</button> */}
                    </form>
                </div>
            </>
        )
    }
}