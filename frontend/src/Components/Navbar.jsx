import React from 'react'

const Navbar = () => {
  return (
    <nav>
        <ul className='navUL'>
            <div className="left-nav">
                  <span id='logoBox'><img id='logo' height={'0'} width={'0'} src={'/logo.png'} alt="logo" /></span>
                  <span id='logoTextBox'><img id='logoText' src="/logoText.png" height={'0'} width={'0'} alt="logo text" /></span>

            </div>
            <div className="right-nav">
                <li>Home</li>
                <li>Contact Us</li>
                <li>About Us</li>
            </div>
        </ul>
    </nav>
  )
}

export default Navbar