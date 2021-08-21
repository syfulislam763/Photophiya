import React, { useEffect, useState } from 'react'

const Caption = () => {

    const words = ["life", "moments", "happiness", "emotions", "action", "impression", "beauty"];
    const [index, setIndex] = useState(0);


    useEffect(() => {
        let interval = setTimeout(() => {
            if(words.length-1 > index){
                setIndex(i => i+1);
            }else {
                setIndex(0)
            }
        }, 2000)

        return () => {
            clearInterval(interval);
        }

    }, [words.length, index]);

    return (
        <div className="caption">
            <p>Hi. I am a photographer</p>
            <p>I capture <span className="highlight-w">{words[index]}</span></p>
        </div>
    )
}

export default Caption;
