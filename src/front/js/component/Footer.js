import React from 'react';
import LOGO from './../../img/LOOGO.png';


const Footer = () => {
  return (
    <section className="footerSection">
      <div className="footerCentered">
        <div className="footerLeftContent">
          <div>
            <img id='footerLogo' src={LOGO} alt="..." className="logoFooter" />
            <h4 style={{ color: "white" }}>Our social media</h4>
            <a className='a ah' href=""><p>Alondra</p></a>
            <a className='a ah' href=""><p>Zaira</p></a>
            <a className='a ah' href="https://www.instagram.com/atlasraw.az/"><p>Atlas</p></a>
          </div>
          <div>
            <p className="a">This site is property of “”, S.L. -Calle Tres Islas nº 23, 08045, Barcelona - (Spain)</p>
          </div>
        </div>
        <div className="footerRightContent">
        </div>
      </div>
    </section>
  )

};

export default Footer;
