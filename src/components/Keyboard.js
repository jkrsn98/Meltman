import React from 'react'
import Keyboard from 'react-simple-keyboard';
import "react-simple-keyboard/build/css/index.css";
import useSound from 'use-sound';
import click from "../assets/audio/click.mp3";

export default function MyKeyboard(props) {

    const [played, setPlayed] = React.useState(false);

    const [playActive] = useSound(
        click,
        { volume: 1 }
    );

    let handleSound = () => {
        if(props.sound===true){
            if (played === true && props.image === 1) setPlayed(false);

            if (props.image <= 5 && props.clickable === true)
                return playActive;
            else return;
        }
    }

    return (
        <div>
            <Keyboard
                onKeyPress={props.onKeyPress}
                onChange={handleSound()}

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
                        buttons: props.usedLetters.join(' ').toUpperCase(),
                    }
                ]}
            />
        </div>
    )
}
