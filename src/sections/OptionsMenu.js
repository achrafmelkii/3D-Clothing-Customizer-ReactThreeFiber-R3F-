import React from "react";

const options = [
    {
        name: "Object_1",
        img:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/legs.svg"},
    {
        name:"Object_2",
        img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/cushions.svg"},
    {
        name:"Object_3",
        img:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/base.svg"},
    {
        name:"Object_4",
        img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/supports.svg"},
    // {
    //     name:"Object_4",
    //     img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/back.svg"},
    ]

export const OptionsMenu = ({activeOption, setActiveOption}) => {
    return(
        
        <div className="options">
            
            {options.map(({name, img}, idx) => (
                <div
                    className={`option ${activeOption === name ? "--is-active" : ""}`}
                    data-option={name}
                    onClick={() => setActiveOption(name)}
                    key={name}
                >
                    <img src={img} alt=""/>
                </div>
            ))}
        </div>
    )
}