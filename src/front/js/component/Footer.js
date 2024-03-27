import React from 'react';
import LOGO from './../../img/VIBING.webp';


const Footer = () => {
  return (
    <section className="footerSection">
      <div className="footerCentered">
        <div className="footerLeftContent">
          <div>
            <img id='footerLogo' src={LOGO} alt="..." className="logoFooter" />
            <h4 style={{ color: "white" }}>Our social media</h4>
            <a className='a ah' href="https://github.com/alondragerke"><p>Alondra</p></a>
            <a className='a ah' href="https://github.com/gilzaira"><p>Zaira</p></a>
            <a className='a ah' href="https://github.com/atlasraw"><p>Atlas</p></a>
          </div>
          <div>
            <p className="a">This site is property of VIBING, S.L. -Calle Tres Islas nº 23, 08045, Barcelona - (Spain)</p>
          </div>
        </div>
        <div className="footerRightContent">
        </div>
      </div>
    </section>
  )

};

export default Footer;
