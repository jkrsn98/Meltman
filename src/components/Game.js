import React, { Component } from 'react';
import Snowman from "./Snowman";
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
        // this.setState({ renderedWord })
        return renderedWord;
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
                        {/* <button onClick={this.handleSubmit}>Submit</button> */}
                    </form>
                </div>
            </>
        )
    }
}