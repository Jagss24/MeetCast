import React, { useState, useEffect, memo } from 'react'
import styled from 'styled-components'

const DummyImage = ({ width, height, userName }) => {
    const colors = ["#ef4444", "#84cc16", "#06b6d4", "#ef4444", "#ec4899", "#8b5cf6"]
    const [backgroundColor, setBackgroundColor] = useState('');

    useEffect(() => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setBackgroundColor(randomColor);
    }, []);
    return (
        <DummyWrapperImage width={width} height={height} backgroundColor={backgroundColor}>
            <span>{userName}</span>
        </DummyWrapperImage>
    )
}
const DummyWrapperImage = styled.div.withConfig({
    shouldForwardProp: prop => !["width", "height", "backgroundColor"].includes(prop)
})` 
width: ${props => props?.width ? props.width + "px" : "40px"};
height: ${props => props?.height ? props.height + "px" : "40px"};
display: flex;
justify-content: center;
align-items: center;
border-radius: 50%;
background-color: ${props => props?.backgroundColor ? props.backgroundColor : "transparent"};
span{
    font-size: 1.2rem;
}`
export default memo(DummyImage)