import React from 'react'
import '../css/filter-cards.css';
import * as bi from 'react-icons/bi';
import * as ai from 'react-icons/ai';
import * as bs from 'react-icons/bs';
import eclipse21 from '../img/eclipse21.png'
import eclipse22 from '../img/eclipse22.png'
import eclipse18 from '../img/eclipse18.png'
import horse from '../img/horse.png'
import Card from './Card';
import { useState } from 'react';

const FilterWithCards = () => {
    const [activeFilter,setActiveFilter] = useState(false);
  return (
    <div className='filter-cards'>
        <img src={eclipse21} className='eclipse21' alt="" />
        <img src={eclipse22} className='eclipse22' alt="" />    
        <img src={eclipse18} className='eclipse18' alt="" />
        <div className="heading">
            <span>Things for Life that can</span>
            <span>Make you happier</span>
        </div>
        <div className="row">
            <div className="col-lg-3 left">
                <div onClick={()=>setActiveFilter(!activeFilter)} className="filter-heading">
                <span>Filter</span>
                <bs.BsChevronDown className='arrow-down' />
                </div>
                <div className={activeFilter ? 'active-filter-container filter-container' : 'filter-container'}>
                    <select>
                        <option value="">SORT BY:</option>
                    </select>
                    <div className="price">
                        <span>Price</span>
                        <div className="line"></div>
                    </div>
                    <div className="from-to">
                        <input type="number" className='glass-input' placeholder='From' />
                        <input type="number" className='glass-input' placeholder='To' />
                    </div>
                    <div className="brand">
                        <span>Brand</span>
                        <div className="line"></div>
                    </div>
                    <div className="list">
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>

                    <div className="available">
                    <span>Availability</span>
                    <div className="line"></div>
                        <input type="text" className='glass-input' />
                    </div>

                </div>
                <div className="cart">
                    <span>Cart</span>
                    <ai.AiOutlineShoppingCart />
                </div>
            </div>
            <div className="col-lg-9 right">
                <div className="text-box">
                    <input type="text" placeholder='Search:' />
                    <bi.BiSearchAlt2 className='search-icon' />
                </div>
               {/* Cards  */}
               <Card />
               <Card />

            </div>
            {/* End of col-lg-9  */}
        </div>
        {/* End of row  */}
        <img src={horse} className='horseMobile' alt="" />
    </div>
  )
}

export default FilterWithCards