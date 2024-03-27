import React from 'react';
import background from './../../img/BCNINICIO.webp';


const Header = () => {
  return (
    <div>
        <header id="webHeader" style={{backgroundImage: `url(${background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
    }}>
          <div id="centeredContent">
              <section id="quotes">
                  <h1 id="quoteHeader1">“Friends are the family you choose”</h1>
                  <h3 id="quoteHeader2">Meet new people, enjoy Barcelona like never before!</h3>
              </section>
          </div>
      </header>
    </div>
  );
};

export default Header;

