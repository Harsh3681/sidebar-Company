import React, { useEffect, useState } from 'react'
import {AnimatePresence,motion} from "framer-motion"
import { FaAngleDown } from 'react-icons/fa'
import {NavLink} from "react-router-dom"

const SidebarMenu = ({showAnimation,route,isOpen,setIsOpen}) => {
  const menuAnimation = {
    hidden: {
      height:0,
      opacity: 0,
      transition: {
        duration: 0.3, when:"afterChildren"
      },
    },
    show: {
      opacity: 1,
      height:"auto",
      transition: {
        duration: 0.3,
        when:"beforeChildren"
      },
    },
  };

  const menuItemAnimation = {
    hidden:(i) => ({
      padding:0,
      x:"-100%",
      transition:{
        duration: (1+i) * 0.1,
      },
    }),
    show: (i) => ({
      x:0,
      transition:{
        duration: (1+i) * 0.1,
      },
    }),
  }
  const [isMenuOpen, SetisMenuOpen] = useState(false);
  const toggleMenu = () => {
    SetisMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };

  useEffect(()=>{
    if(!isOpen){
      SetisMenuOpen(false)
    }
  },[isOpen]);
    
    return (
        <>
        <div className="menu" onClick={toggleMenu}>
            <div className="menu_item">
                <div className="icon">
                    {
                    route.icon
                }</div>
                <AnimatePresence> {
                    isOpen && (
                        <motion.div variants={showAnimation}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="link_text">
                            {
                            route.name
                        } </motion.div>
                    )
                } </AnimatePresence>
            </div>

            { isOpen && (<motion.div animate={isMenuOpen ? {rotate:-90} : {rotate:0}}>
                <FaAngleDown/>
            </motion.div>
            )}

        </div>

        
        <AnimatePresence>
        {isMenuOpen && (<motion.div 
          variants={menuAnimation}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="menu_container">

            {route.subRoutes.map((subRoute,i)=>
                <motion.div variants={menuItemAnimation} custom={i} key={i}>
                  <NavLink
                to={subRoute.path}
                
                className="link"
                activeClassName="active">
                <div className="icon">{subRoute.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      
                      className="link_text"
                    >
                      {subRoute.name}
                    </motion.div>
                  )}
                </AnimatePresence>
                </NavLink>
              </motion.div>
            )}
        </motion.div>)}
        </AnimatePresence>

        </>

    )
}

export default SidebarMenu
