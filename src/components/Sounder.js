import React from 'react';
import Sound from 'react-sound';
import gameover from "../assets/audio/gameover.mp3";
import win from "../assets/audio/win.mp3";

export default function Sounder(props) {

    const [played, setPlayed] = React.useState(false);

    const url = () => {
        if (props.toPlay === "win") return win;
        if (props.toPlay === "lose") return gameover;
    }

    const handleSongFinishedPlaying = () => {
        setPlayed(true);
    }

    const renderSound = () => {
        if (played === false && props.sound===true) {
            return (
                <Sound
                    url={url()}
                    playStatus={(props.sound===true)?Sound.status.PLAYING:Sound.status.PAUSED}
                    onFinishedPlaying={handleSongFinishedPlaying}
                />
            )
        }
    }

    return (
        <div>
            {renderSound()}
        </div>
    )
}
