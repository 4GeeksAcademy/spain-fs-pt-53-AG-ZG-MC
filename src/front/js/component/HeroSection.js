import React from 'react';


const HeroSection = () => {
    return (
        <section className="sectionSpaceCarousel">
            <div className="tittleSectionCarousel">
                <h2 className="tittleCarousel">
                Nuestro propósito:
                </h2>
                <h4 className="subtittleCarousel">
                Adaptarnos a las nuevas formas modernas de socialización.
                </h4>
            </div>
            <div className="CarouselPosition">
                <div id="carouselExampleFade" className="carousel slide carousel-fade">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src="../Group 6.png" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                    <img src="../Component 13.png" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                    <img src="../Component 14.png" className="d-block w-100" alt="..." />
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
