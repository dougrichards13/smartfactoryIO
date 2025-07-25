import React, { useState } from 'react';
import {Link} from "react-router-dom";
import navbarData from "../../../data/Navbar/navbar";

function NavbarItem(props) {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleMouseEnter = (itemId) => {
        setActiveDropdown(itemId);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    return(
        navbarData.map(item=>(
            <li key={item.id}
                className={`${item.subMenu || item.megaMenu ? 'has-submenu' : ''} menu-item-${item.id}`}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
                style={{position: 'relative'}}
            >
                <Link to={`${process.env.PUBLIC_URL + item.link}`}>{item.title}</Link>
                {(() => {
                    if(item.subMenu){
                        return(
                            <ul className={`submenu-nav ${activeDropdown === item.id ? 'active' : ''}`}>
                                {
                                    item.subMenu.map((subItem,index)=>{
                                        return <li key={index}><Link to={`${process.env.PUBLIC_URL + subItem.link}`}>{subItem.title}</Link></li>
                                    })
                                }
                            </ul>
                        )
                    }

                    if(item.megaMenu){
                        return(
                            <ul className={`submenu-nav submenu-nav-mega ${activeDropdown === item.id ? 'active' : ''}`}>
                                {
                                    item.megaMenu.map((megaItem, indx)=>(
                                        <li key={indx} className="mega-menu-item"><Link to={megaItem.link}>{megaItem.title}</Link>
                                            <ul>
                                                {
                                                    megaItem.lists.map((listItem,idx)=>{
                                                        return <li key={idx}><Link to={`${process.env.PUBLIC_URL + listItem.link}`}>{listItem.title}</Link></li>
                                                    })
                                                }
                                            </ul>
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }
                })()}
            </li>
        ))
    )
}

export default NavbarItem