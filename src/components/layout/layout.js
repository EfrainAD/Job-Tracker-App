import React from 'react'
import Footer from '../footer/footer'
import Header from '../header/header'
import Sidebar from '../sidebar/sidebar'

const Layout = ({ children }) => {
   return (
      <Sidebar>
         <Header />
         <div style={{ minHeight: '80vh' }} className="--pad">
            {children}
         </div>
         <Footer />
      </Sidebar>
   )
}

export default Layout
