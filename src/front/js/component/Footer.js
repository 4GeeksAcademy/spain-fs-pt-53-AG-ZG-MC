import React from 'react';


const Footer = () => {
  return (
    <section className="footerSection">
      <div className="footerCentered">
        <div className="footerLeftContent">
          <div>
            <img src="../LOGO.png" alt="..." className="logoFooter" />
            <h4 style={{ color: "white" }}>Nuestras Redes</h4>
            <a href=""><p>Alondra</p></a>
            <a href=""><p>Zaira</p></a>
            <a href=""><p>Atlas</p></a>
          </div>
          <div>
            <p className="a">Este sitio es propiedad de “” , S.L. -Calle Tres islas nº 23, 08045, Barcelona - (España) </p>
          </div>
        </div>
        <div className="footerRightContent">
          <a href=""><img src="../entypo-social_instagram-with-circle.svg" alt="" /></a>
          <a href=""><img src="../entypo-social_facebook.svg" alt="" /></a>
        </div>
      </div>
    </section>
  )

};

export default Footer;
