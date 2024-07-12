import React, { useEffect, useRef, useCallback } from "react";
import { COLORS } from "../constants/colors";

import styled from "styled-components";
const ColorsS = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  overflow-x: hidden;
  .tray__slide {
    position: absolute;
    display: flex;
    left: 0;
    /*   transform: translateX(-50%);
    animation: wheelin 1s 2s ease-in-out forwards; */
    }
    .tray__swatch {
  transition: 0.1s ease-in;
  height: 50px;
  min-width: 50px;
  flex: 1;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  background-size: cover;
  background-position: center;
}

    .tray__swatch:nth-child(5n+5) {
    margin-right: 20px;
    }
`;





const ColorsSlider = ({ selectSwatch }) => {
    const slider = useRef(null);
    const sliderItems = useRef(null);

    let posX1 = 0,
        posX2 = 0,
        posInitial = 0,
        difference = 0;

    const dragStart = (e) => {
        const items = sliderItems.current;
        posInitial = items.offsetLeft;
        difference = sliderItems.current.offsetWidth - slider.current.offsetWidth;
        difference = difference * -1;

        if (e.type === 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    }

    const dragAction = (e) => {
        const items = sliderItems.current;
        if (e.type === 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }

        if (items.offsetLeft - posX2 <= 0 && items.offsetLeft - posX2 >= difference) {
            items.style.left = items.offsetLeft - posX2 + "px";
        }
    }

    const dragEnd = () => {
        const threshold = 20;
        let posFinal = 0;

        const items = sliderItems.current;
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < -threshold) {
            // Optionally handle this case
        } else if (posFinal - posInitial > threshold) {
            // Optionally handle this case
        } else {
            items.style.left = posInitial + "px";
        }
        document.onmouseup = null;
        document.onmousemove = null;
    }

    return (
        <ColorsS id="js-tray" className="tray" ref={slider}>
            <div
                id="js-tray-slide"
                className="tray__slide"
                ref={sliderItems}
                onMouseDown={dragStart}
                onTouchStart={dragStart}
                onTouchMove={dragAction}
                onTouchEnd={dragEnd}
            >
                {COLORS.map((color, idx) => (
                    <div
                        key={idx}
                        className="tray__swatch"
                        style={{
                            background: color.texture
                                ? `url(${color.texture})`
                                : `#${color.color}`
                        }}
                        data-key={idx}
                        onClick={selectSwatch}
                    />
                ))}
            </div>
        </ColorsS>
    );
}

export default ColorsSlider;
