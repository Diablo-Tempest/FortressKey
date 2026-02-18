import React from 'react'

const Footer = () => {
  return (
    <footer>
          <ul className='footerUL'>
              <div className="left-footer">
                  <span id='logoBox'><img id='footerLogo' height={'0'} width={'0'} src={'/logo.png'} alt="logo" /></span>
              </div>
              <div className="right-footer">
                  Created By <span id='footerName'>Biprosom Majumder</span>
              </div>
          </ul>
    </footer>
  )
}

export default Footer