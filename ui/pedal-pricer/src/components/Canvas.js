import { React, useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import Draggable from 'react-draggable'
import CurrencyInput from 'react-currency-input-field'
import Item from './Item'
import './Canvas.css'

const Bg = styled.div`
  background-color: #282828;
  position: fixed;
  width: 100%;
  height: 100%; 
  z-index: 0;

  --dot-bg: #282828;
  --dot-color: #1c1c1c;
  --dot-size: 3px;
  --dot-space: 50px;
	background:
		linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
		linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
		var(--dot-color);

`

const overridePrices = new Map();

export default function Canvas({ data, ppi }) {

  const [hidden, setHidden] = useState(true);
  const [name, setName] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState(0.0);
  const [selected, setSelected] = useState(false);
  const [selectedID, setSelectedID] = useState(-1);
  const [dbid, setDbid] = useState(-1);

  const nodeRef = useRef(null);

  const createPedalsArray = (data) => {

    let pedalArray = [];

    for(let i in data){

      let item = data[i];

      if(item.pedalID){
        item.itemID = i;
        pedalArray.push(item);
      }
    }

    return pedalArray;

  }

  const createPedalboardArray = (data) => {

    let pedalboardArray = [];

    for(let i in data){

      let item = data[i];

      if(item.pedalboardID){
        item.itemID = i;
        pedalboardArray.push(item);
      }
    }

    return pedalboardArray;

  }

  const createPowerSupplyArray = (data) => {

    let powerSupplyArray = [];

    for(let i in data){

      let item = data[i];

      if(item.powerSupplyID){
        item.itemID = i;
        powerSupplyArray.push(item);
      }
    }

    return powerSupplyArray;

  }

  const mouseClick = (id, name, x, y, price, dbid) => {

    if(!selected){
      setSelected(true);
    }

    setSelectedID(id);
    setName(name);
    setX(x);
    setY(y);
    setPrice(price);
    setHidden(false);
    setDbid(dbid);

  }

  const resetSelections = () => {

    setSelected(false);
    setSelectedID(-1);
    setHidden(true);
    updateTotal();

  }

  const pedalArray = createPedalsArray(data);
  const pedalboardArray = createPedalboardArray(data);
  const powerSupplyArray = createPowerSupplyArray(data);

  const updateTotal = useCallback(() => {

    let t = 0;

    for(let item of pedalArray){

      if(!item.hidden){
        if(!overridePrices.has(item.pedalID) || !overridePrices.get(item.pedalID))
          t += item.pedalPrice;
        else
          t += parseFloat(overridePrices.get(item.pedalID));
      }
        
    }

    for(let item of pedalboardArray){

      if(!item.hidden){
        if(!overridePrices.has(item.pedalboardID) || !overridePrices.get(item.pedalboardID))
          t += item.pedalboardPrice;
        else
          t += parseFloat(overridePrices.get(item.pedalboardID));
      }
        
    }

    for(let item of powerSupplyArray){

      if(!item.hidden){
        if(!overridePrices.has(item.powerSupplyID) || !overridePrices.get(item.powerSupplyID))
          t += item.powerSupplyPrice;
        else
          t += parseFloat(overridePrices.get(item.powerSupplyID));
      }
        
    }

    t = t.toFixed(2);

    setTotal(total => t);

  },[pedalArray, pedalboardArray, powerSupplyArray]);

  const updateOverridePrices = (value, name, values, dbid) => {

    overridePrices.set(dbid, value);
    updateTotal();

  }

  //pricing for some reason doesn't work unless i leave this here
  //it has no negative effect on performance so its here to stay
  useEffect(() => {
    updateTotal();
  });

  //we render each category seperately because i want pedalboards to always be below pedals 
  return (
    <Bg>
      {!hidden && data.length !== 0 &&(<div className="itemcard">
        <div className="itemname">{name}</div>
        <div className="itemdimensions">Dimensions: {x}in x {y}in</div>
        <div className="itemprice">Price: ${price}</div>
        <div className="override">
          <div>Override Price:</div>
          <CurrencyInput 
            defaultValue={overridePrices.get(dbid)}
            value={overridePrices.get(dbid)}
            id="currency-input"
            name="currency-input"
            allowNegativeValue={false}
            prefix="$"
            placeholder="Enter a custom price"
            decimalsLimit={2}
            maxLength={10}
            step={1}
            onValueChange={(value, name, values) => updateOverridePrices(value, name, values, dbid)}
          />
        </div>
      </div>)}
      <div className="total">
        Total: ${total}
      </div>
      {pedalArray.map((item, index) => {
        return <Draggable
        key={index}
        axis="both"
        handle=".p"
        defaultPosition={{x: 1225, y: 450}}
        position={null}
        grid={[1, 1]}
        scale={1}
        nodeRef={nodeRef}
        >
          <div className="p" ref={nodeRef}>
            <Item
            item={item} 
            mouseClick={mouseClick}
            selectedID={selectedID}
            resetSelections={resetSelections}
            ppi={ppi}
            />
          </div>
        </Draggable>
      })}
      {pedalboardArray.map((item, index) => {
        return <Draggable
        key={index}
        axis="both"
        handle=".pb"
        defaultPosition={{x: 1000, y: 450}}
        position={null}
        grid={[1, 1]}
        scale={1}
        nodeRef={nodeRef}
        >
          <div className="pb" ref={nodeRef}>
            <Item
            item={item} 
            mouseClick={mouseClick}
            selectedID={selectedID}
            resetSelections={resetSelections}
            ppi={ppi}
            />
          </div>
        </Draggable>
      })}
      {powerSupplyArray.map((item, index) => {
        return <Draggable
        key={index}
        axis="both"
        handle=".ps"
        defaultPosition={{x: 800, y: 450}}
        position={null}
        grid={[1, 1]}
        scale={1}
        nodeRef={nodeRef}
        >
          <div className="ps" ref={nodeRef}>
            <Item
            item={item}
            mouseClick={mouseClick}
            selectedID={selectedID}
            resetSelections={resetSelections}
            ppi={ppi}
            />
          </div>
        </Draggable>
      })}
      <div className="resetter" onClick={() => resetSelections()}></div>
    </Bg>
  )
}