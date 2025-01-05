import React from 'react'
import styled from 'styled-components'

const CircularIcon = ({ width, height, color }) => {
    return (
        <CircularIconStyled width={width} height={height} color={color} />


    )
}
export default CircularIcon

const CircularIconStyled = styled.span.withConfig({
    shouldForwardProp: prop => !["width", "height", "color"].includes(prop)
})`
            width: ${props => (props?.width ? props.width + "px" : "14px")};
            height: ${props => (props?.height ? props.height + "px" : "14px")};
            color: ${props => (props?.color ? props.color : "#000")};
            display: inline-block;
            border: 2px solid currentColor;
            border-radius: 50%;
            border-top-color: transparent;
            animation: rotate 1s linear infinite;

            @keyframes rotate {
                from {
                transform: rotate(0deg);
    }
            to {
                transform: rotate(360deg);
    }
  }
            `;

