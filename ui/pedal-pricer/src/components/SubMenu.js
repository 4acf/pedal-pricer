import { React, useState, useEffect } from 'react'
import styled from 'styled-components'
import WindowedSelect from 'react-windowed-select'
import { createFilter } from 'react-select'
import { variables } from '../Variables.js'

const SidebarSection = styled.div`
    display: flex;
    color: #e1e9fc;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    height: 60px;  
    text-decoration: none;
    font-size: 20px;

    &:hover {
        transition: 100ms;
        background: #2c2c2c;
        border-left: 4px solid;
        border-color: ${({$redborder}) => ($redborder ? '#FF6363' : '#00FF94')};
        cursor: pointer;
    }
`

const SectionLabel = styled.span`
    margin-left: 16px;
`

const SubNavWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #252525;
`

const AddButton = styled.button`
    background-color: #04AA6D;
    border: none;
    color: white;
    font-size: 15px;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    margin: 20px;
    cursor: pointer;
`

const ReactSelectWrapper = styled.div`
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
`

const fetchData = async (type) => {

    try {
        const response = await fetch(`${variables.API_URL}${type}/GetBasicInfo`);
    

    if(!response.ok) {
        throw new Error("Error fetching data");
    }

    const newData = await response.json();
    return newData;

    } catch (error){
        console.error("Error with fetch operation", error);
    }

}

const fetchItem = async (itemCart, type) => {

    let commaSeparatedItems = ""
    for(let items of itemCart){
        commaSeparatedItems += (items + ",");
    }
    commaSeparatedItems = commaSeparatedItems.slice(0, -1); //get rid of last comma

    try {
        const response = await fetch(variables.API_URL + type + "?" + new URLSearchParams({
            item: commaSeparatedItems
        }));
    

    if(!response.ok) {
        throw new Error("Error fetching items");
    }

    const newData = await response.json();
    return newData;

    } catch (error){
        console.error("Error with fetch items operation", error);
    }

  }

export const compareValue = (a, b) => {
    if(a.value < b.value)
        return -1;
    if(a.value > b.value)
        return 1;
    return 0;
}

export const compareLabel = (a, b) => {
    if(a.label < b.label)
        return -1;
    if(a.label > b.label)
        return 1;
    return 0;
}

export const interpretData = (itemData, type) => {

    if(!itemData)
        return [];

    let map = new Map(); 
    let data = [];       

    if(type === "Pedal"){
        for(let item of itemData){

            if(!item.pedalName || !Number.isInteger(item.pedalID))
                continue;

            if(!map.has(item.pedalBrand)){
                let idx = map.size;
                map.set(item.pedalBrand, idx);
                data.push([]);
            }

            data[map.get(item.pedalBrand)].push({
                id: item.pedalID,
                name: item.pedalName
            });

        }
    }

    else if(type === "Pedalboard"){
        for(let item of itemData){

            if(!item.pedalboardName || !Number.isInteger(item.pedalboardID))
                continue;

            if(!map.has(item.pedalboardBrand)){
                let idx = map.size;
                map.set(item.pedalboardBrand, idx);
                data.push([]);
            }

            data[map.get(item.pedalboardBrand)].push({
                id: item.pedalboardID,
                name: item.pedalboardName
            });

        }
    }

    else if(type === "PowerSupply"){
        for(let item of itemData){

            if(!item.powerSupplyName || !Number.isInteger(item.powerSupplyID))
                continue;

            if(!map.has(item.powerSupplyBrand)){
                let idx = map.size;
                map.set(item.powerSupplyBrand, idx);
                data.push([]);
            }

            data[map.get(item.powerSupplyBrand)].push({
                id: item.powerSupplyID,
                name: item.powerSupplyName
            });

        }
    }

    let groupedOptions = [];

    for(let key of map.keys()){

        if(!key)
            continue;

        let i = map.get(key);
        let items = data[i];

        let arr = [];
        for(let item of items){
            arr.push({
                id: item.id,
                value: item.name,
                label: `${key} ${item.name}`
            })
        }  

        arr.sort(compareValue);

        groupedOptions.push(
            {
                label: key,
                options: arr
            }
        );

    }

    groupedOptions.sort(compareLabel);
    return groupedOptions;

}

export default function SubMenu({ section, updateList, clearList }) {

  const [subnav, setSubnav] = useState(false);
  const [redborder, setRedborder] = useState(0);
  const [items, setItems] = useState([]);
  const [choice, setChoice] = useState([])

  const toggleSubnav = () => setSubnav(!subnav);

  useEffect(() => {
    if(section.title === 'Clear Canvas'){
        setRedborder(1);
    }
  }, [section.title]);

  useEffect(() => {
    if(section.endpoint){
        fetchData(section.endpoint).then((data) => {
            setItems(data);
        });
    }
  }, [section.endpoint]);


  const addItems = () => {

    //choice is an array of objects, we are looking for the "id" attribute within every object in the choice array

    if(choice.length === 0)
        return;

    //add all the items to an array
    let cart = []
    for(let item of choice){
        cart.push(item.id);
    }

    fetchItem(cart, section.endpoint).then((data) => {

        for(let item of data){
            item.selected = 0;
        }

        //once we have the json data stored, send it up to the app component so it can be sent to the canvas
        updateList(data);

    });

  }


  let groupedOptions = [];

  if(section.endpoint){
    groupedOptions = interpretData(items, section.endpoint);
  }

  return (
    <>
        <SidebarSection onClick={section.subNav ? toggleSubnav : clearList} $redborder={redborder}>
            <div>
                {section.icon}
                <SectionLabel>{section.title}</SectionLabel>
            </div>
            <div>
                {section.subNav && subnav ? section.iconOpen : section.subNav ? section.iconClosed : null}
            </div>
        </SidebarSection>
        {subnav && section.subNav.map((section, index) => {
            return (
                <SubNavWrapper key={index}>
                    <ReactSelectWrapper>
                        <WindowedSelect 
                        isMulti 
                        options={groupedOptions} 
                        filterOption={createFilter({ ignoreAccents: false })}
                        onChange={(choice) => setChoice(choice)}
                        />
                    </ReactSelectWrapper>
                    <AddButton onClick={addItems}>
                        {section.button}
                    </AddButton>
                    
                </SubNavWrapper>
            )
        })}
    </>
  )
}
