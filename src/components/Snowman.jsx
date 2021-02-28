import {React} from 'react'
import image1 from "../assets/images/pic1_cropped.png";
import image2 from "../assets/images/pic2_cropped.png";
import image3 from "../assets/images/pic3_cropped.png";
import image4 from "../assets/images/pic4_cropped.png";
import image5 from "../assets/images/pic5_cropped.png";
import image6 from "../assets/images/pic6_cropped.png";


function Snowman(props) {

    const imageArr = [image1, image2, image3, image4, image5, image6];

    return (
        <div className="snowman">
            <img src={imageArr[props.image-1]} alt={""}/>
            {/* {props.image>5?<p>melted</p>:<p></p>} */}
        </div>
    )
}

export default Snowman;
