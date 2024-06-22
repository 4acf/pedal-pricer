import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as FaIcons from 'react-icons/fa'   //for hamburger icon
import * as AiIcons from 'react-icons/ai'   //for 'X' icon and zoom in/out icons
import * as FiIcons from 'react-icons/fi'   //info icon
import { IconContext } from 'react-icons'
import { SidebarData } from './SidebarData'
import SubMenu from './SubMenu'
import Modal from 'react-modal'
import "./Sidebar.css"


const Header = styled.div`
  background: #1c1c1c;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
`

const HeaderIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const HeaderIconsRight = styled.div`
  display: flex;
  margin-right: 0.75rem;
`

const HeaderIconRight = styled(Link)`
  margin-left: 1rem;
  margin-right: 1rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SidebarOptions = styled.div`
  background: #1c1c1c;
  width: 300px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({$sidebar}) => ($sidebar ? '0' : '-100%')};
  transition: 500ms;
  z-index: 10;
`

const SidebarWrapper = styled.div`
  width: 100%;
`

const CloseButton = styled.button`
    background-color: #04AA6D;
    border: none;
    color: white;
    font-size: 15px;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    margin: 20px;
    cursor: pointer;
    position: absolute;
    top: 84%;
    left: 89%;
`

const customStyles = {
  content: {
    display: "flex",
    flexDirection: "column",
    padding: "30px",
    paddingTop: "0px",
    fontSize: "18px",
    lineHeight: "1.4",
    position: "absolute",
    borderRadius: "20px",
    color: "white",
    border: "none",
    background: "#222222",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    filter: "drop-shadow(rgb(0, 0, 0, 0.5) 5px 5px 7px)",
    width: "800px"
  },
};

export default function Sidebar({ updateList, clearList, zoomIn, zoomOut }) {

  const [sidebar, setSidebar] = useState(false);
  const[modalIsOpen, setModalIsOpen] = useState(false);

  const toggleSidebar = () => setSidebar(!sidebar);

  const openModal = () => setModalIsOpen(true);
  
  const closeModal = () => setModalIsOpen(false);

  Modal.setAppElement('#root');

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <Header>
        <HeaderIcon to='#'>
          <FaIcons.FaBars onClick={toggleSidebar}/>
        </HeaderIcon>
        <HeaderIconsRight>
          <HeaderIconRight>
            <AiIcons.AiOutlineZoomIn onClick={zoomIn}/>
          </HeaderIconRight>
          <HeaderIconRight>
            <AiIcons.AiOutlineZoomOut onClick={zoomOut}/>
          </HeaderIconRight>
          <HeaderIconRight>
            <FiIcons.FiInfo onClick={openModal}/>
          </HeaderIconRight>
        </HeaderIconsRight>
      </Header>
      <SidebarOptions $sidebar={sidebar}>
        <SidebarWrapper>
          <HeaderIcon to='#'>
            <AiIcons.AiOutlineClose onClick={toggleSidebar}/>
          </HeaderIcon>
          {SidebarData.map((section, index) => {
            return <SubMenu section={section} key={index} updateList={updateList} clearList={clearList}/>;
          })}
        </SidebarWrapper>
      </SidebarOptions>
      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        style={customStyles} 
        contentLabel="About Page Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
      <h2>About</h2>
      <div>Welcome to Pedal Pricer, a way for guitar players (or any musicians, really) to plan pedalboards.</div>
      <h2>This looks just like Pedal Playground, why does this exist?</h2>
      <div>I wanted to learn the basics of making a full stack web app, and this is my first attempt. I didn't see a point in reinventing a layout when Pedal Playground's is ultimately ideal. This site was made using React as opposed to jQuery, and the only Pedal Playground source code I consulted was concerned with styling. I was not given express permissision to use the data, however it is openly available on the Pedal Playground GitHub page and I do not plan on ever monetizing this site. Again, this site is meant as a learning tool for myself, not as competition with the original. </div>
      <br></br>
      <CloseButton onClick={closeModal}>Close</CloseButton>
      </Modal>
    </IconContext.Provider>
  )
}
