import React from 'react'
import loaderImg from '../../assets/loader.gif'
import ReactDOM from 'react-dom'
import './Loader.scss'

const Loader = () => {
     return ReactDOM.createPortal(
          <div className="rapper">
               <div className="loader">
                    <img src={loaderImg} alt="loading..." />
               </div>
          </div>,
          document.getElementById('loader')
     )
}

export const SpinningImg = () => {
     return (
          <div className="--center-all">
               <img src={loaderImg} alt="loading..." />
          </div>
     )
}

export default Loader