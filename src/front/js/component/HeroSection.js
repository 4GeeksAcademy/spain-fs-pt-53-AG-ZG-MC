import React from 'react';
import Hero1 from './../../img/HERO1.png';
import Hero2 from './../../img/HERO2.png';
import Hero3 from './../../img/HERO3.png';


const HeroSection = () => {
    return (
        <section className="sectionSpaceCarousel">
            <div className="tittleSectionCarousel">
                <h2 className="tittleCarousel">
                Our purpose:
                </h2>
                <h4 className="subtittleCarousel">
                Adapt to new modern forms of socialization.
                </h4>
            </div>
            <div className="CarouselPosition carouselShadow carouselBorder">
                <div id="carouselExampleFade" className="carousel slide carousel-fade">
                <div className="carousel-inner carouselInner2">
                    <div className="carousel-item active carouselInner2">
                        <div style={{backgroundImage: `url(${Hero1})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                            }} className="d-block w-100 h-100 carouselBorder">
                        </div>
                    </div>
                    <div className="carousel-item carouselInner2">
                        <div style={{backgroundImage: `url(${Hero2})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                            }} className="d-block w-100 h-100 carouselBorder">
                        </div>
                    </div>
                    <div className="carousel-item carouselInner2">
                        <div style={{backgroundImage: `url(${Hero3})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                            }} className="d-block w-100 h-100 carouselBorder">
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
