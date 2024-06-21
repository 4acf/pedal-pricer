import { React, useState, useEffect } from 'react'
import { variables } from '../Variables.js'
import { IconContext } from 'react-icons'
import * as AiIcons from 'react-icons/ai'
import './Item.css'

export default function Item({ item, mouseClick, selectedID, resetSelections, ppi }) {

    const [imagepath, setImagepath] = useState("");
    const [rotation, setRotation] = useState(0);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {

        let filepath = "";

        if(item.pedalImageFilename){
            filepath = `${variables.IMAGES_URL}PedalImages/${item.pedalImageFilename}`;
        }
        else if(item.pedalboardImageFilename){
            filepath = `${variables.IMAGES_URL}PedalboardImages/${item.pedalboardImageFilename}`;
        }
        else if(item.powerSupplyImageFilename){
            filepath = `${variables.IMAGES_URL}PowerSupplyImages/${item.powerSupplyImageFilename}`;
        }
        else{
            //the placeholder for errors will go here :)
        }

        //do i really need state for this?
        setImagepath(filepath);

    }, [item.pedalImageFilename, item.pedalboardImageFilename, item.powerSupplyImageFilename]);

    const rotateItem = () => {
        if(rotation === 270){
            setRotation(0);
        }
        else{
            setRotation(rotation + 90);
        }

    }

    const hideItem = (e) => {

        e.stopPropagation();
        item.hidden = true; //we add this so that we dont count it later when calculating total price
        setHidden(true);
        resetSelections();

    }

    const keyDown = (event) => {
        if(event.key === 'r')
            rotateItem();
    }

    return (
        <>
            {item.pedalID && !hidden && (
                <div className={item.itemID === selectedID ? "pedals selected" : "pedals"} 
                    onClick={() => mouseClick(item.itemID, item.pedalBrand + " " + item.pedalName, item.pedalWidth, item.pedalHeight, item.pedalPrice, item.pedalID)}
                    onKeyDown={keyDown}
                    tabIndex={0}
                >
                    <div className="rotatable" style={{transform: `rotate(${rotation}deg)`}}>
                        <img src={imagepath} alt={item.pedalName}  draggable="false" width={ppi * item.pedalWidth} height={ppi * item.pedalHeight}/> 
                    </div>
                    <div className="options">
                        <IconContext.Provider value={{ color: '#fff' }}>
                            <AiIcons.AiOutlineRotateRight onClick={rotateItem}/>
                            <AiIcons.AiOutlineClose onClick={hideItem}/>
                        </IconContext.Provider>
                    </div>
                </div>   
            )}
            {item.pedalboardID && !hidden && (
                <div className={item.itemID === selectedID ? "pedalboards selected" : "pedalboards"} 
                    onClick={() => mouseClick(item.itemID, item.pedalboardBrand + " " + item.pedalboardName, item.pedalboardWidth, item.pedalboardHeight, item.pedalboardPrice, item.pedalboardID)}
                    onKeyDown={keyDown}
                    tabIndex={0}
                >
                    <div className="rotatable" style={{transform: `rotate(${rotation}deg)`}}>
                        <img src={imagepath} alt={item.pedalboardName}  draggable="false" width={ppi * item.pedalboardWidth} height={ppi * item.pedalboardHeight}/>
                    </div>
                    <div className="options">
                        <IconContext.Provider value={{ color: '#fff' }}>
                            <AiIcons.AiOutlineRotateRight onClick={rotateItem}/>
                            <AiIcons.AiOutlineClose onClick={hideItem}/>
                        </IconContext.Provider>
                    </div>
                </div>
            )}
            {item.powerSupplyID && !hidden && (
                <div className={item.itemID === selectedID ? "powersupplies selected" : "powersupplies"} 
                    onClick={() => mouseClick(item.itemID, item.powerSupplyBrand + " " + item.powerSupplyName, item.powerSupplyWidth, item.powerSupplyHeight, item.powerSupplyPrice, item.powerSupplyID)}
                    onKeyDown={keyDown}
                    tabIndex={0}
                >
                    <div className="rotatable" style={{transform: `rotate(${rotation}deg)`}}>
                        <img src={imagepath} alt={item.powerSupplyName}  draggable="false" width={ppi * item.powerSupplyWidth} height={ppi * item.powerSupplyHeight}/>
                    </div>
                    <div className="options">
                        <IconContext.Provider value={{ color: '#fff' }}>
                            <AiIcons.AiOutlineRotateRight onClick={rotateItem}/>
                            <AiIcons.AiOutlineClose onClick={hideItem}/>
                        </IconContext.Provider>
                    </div>
                </div>
            )}
        </>
    )
}
