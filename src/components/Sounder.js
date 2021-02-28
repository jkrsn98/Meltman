import React from 'react'
import useSound from 'use-sound';
import click from "../assets/audio/click.mp3";
import gameover from "../assets/audio/gameover.mp3";
import win from "../assets/audio/win.mp3";

export default function Sounder(props) {

    const [played, setPlayed] = React.useState(false);

    const [playActive] = useSound(
        click,
        { volume: 1 }
    );
    const [playGameOver] = useSound(
        gameover,
        {
            volume: 1,
            onplay: () => {
                setPlayed(true);
            }
        }
    );
    const [playWin] = useSound(
        win,
        {
            volume: 1,
            onplay: () => {
                setPlayed(true)
            }
        }
    )

    console.log("in sounder.js", props.toPlay);

    let handleSound = () =>{
        console.log("in handle sound function", props.toPlay);
        if(props.toPlay=="win" && played==false){
            console.log("returning")
            return playWin();
        }
        else if(props.toPlay==="lost"){
            return playGameOver();
        }
    }

    let audio = new Audio(win)
    const start = () => {
        audio.play()
      }

    return (
        <div>
            {start}
            {/* <button onClick={start}>test</button> */}
        </div>
    )
}
