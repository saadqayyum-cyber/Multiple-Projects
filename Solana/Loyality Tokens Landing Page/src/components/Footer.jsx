import React from 'react'
import '../css/footer.css'
import * as im from 'react-icons/im'
import * as fa from 'react-icons/fa'
import * as fi from 'react-icons/fi'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="f-inner">
            <span>Contact HR for all your questions</span>
            <div className="icons">
          <im.ImPhone />
          <fa.FaEnvelope />
          <fi.FiSend />
        </div>
        </div>
    </div>
  )
}

export default Footer