import React from 'react';


const Header = () => {
  return (
    <body>
        <header id="webHeader">
          <div id="centeredContent">
              <nav id="navbarNoLog1">
                  <div id="brandNavbar">
                      <img id="logo" src="../LOGO.svg" alt="Logo"></img>
                  </div>
                  <div id="buttonsNavbar">
                      <button id="inicio">Inicio</button>
                      <button id="destacados">Destacados</button>
                      <button id="info">Info</button>
                      <div id="dropPerfil" className="dropdown">
                          <button id="perfil" className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="width: 100%; height: 100%;"><i className="fa-regular fa-user fa-xl" style="color: #ffffff;"></i></button>
                          <ul className="dropdown-menu">
                              <div className="form-check">
                                  <button id="verPerfil">Ver perfil</button>
                              </div>
                              <div className="form-check">
                                  <button id="cerrarSesion">Cerrar sesión</button>
                              </div>
                          </ul>
                      </div>
                      <button id="create" className="btn">CREATE EVENT</button>
                  </div>
              </nav>
              <section id="quotes">
                  <h1 id="quoteHeader1">“Los amigos son la familia que se escoge”</h1>
                  <h3 id="quoteHeader2">¡Conoce nuevas personas, disfruta de Barcelona como nunca antes!</h3>
              </section>
              <section id="browser">
                  <form id="browserForm">
                      <div id="where" className="dropdown">
                          <button id="typeEvent" className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="width: 100%; height: 100%;">
                          TIPO DE EVENTO
                          </button>
                          <ul className="dropdown-menu">
                          <div className="form-check checkdiv">
                              <input type="checkbox" className="form-check-input" id="dropdownCheck1"></input>
                              <label className="form-check-label" for="dropdownCheck1">
                                    Nature
                              </label>
                          </div>
                          <div className="form-check checkdiv">
                              <input type="checkbox" className="form-check-input" id="dropdownCheck2"></input>
                              <label className="form-check-label" for="dropdownCheck2">
                                    Party
                              </label>
                          </div>
                          <div className="form-check checkdiv">
                              <input type="checkbox" className="form-check-input" id="dropdownCheck3"></input>
                              <label className="form-check-label" for="dropdownCheck3">
                                    Culture
                              </label>
                          </div>
                          <div className="form-check checkdiv">
                              <input type="checkbox" className="form-check-input" id="dropdownCheck4"></input>
                              <label className="form-check-label" for="dropdownCheck4">
                                    Relax
                              </label>
                          </div>
                          <div className="form-check checkdiv">
                              <input type="checkbox" className="form-check-input" id="dropdownCheck5"></input>
                              <label className="form-check-label" for="dropdownCheck5">
                                    Family
                              </label>
                          </div>
                          <div className="form-check checkdiv">
                              <input type="checkbox" className="form-check-input" id="dropdownCheck6"></input>
                              <label className="form-check-label" for="dropdownCheck6">
                                    Sport
                              </label>
                          </div>
                          </ul>
                      </div>
                      <img id="break" src="../BreakOrange.svg" alt="|"/>
                      <div id="when" className="dropdown">
                          <button id="dateEvent" className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="width: 100%; height: 100%;">
                          FECHA
                          </button>
                          <ul className="dropdown-menu divdate">
                              <div className="form-check checkdiv">
                                  <input type="checkbox" className="form-check-input" id="dropdownCheck7"></input>
                                  <label className="form-check-label" for="dropdownCheck7">
                                          Hoy
                                  </label>
                              </div>
                              <div className="form-check checkdiv">
                                  <input type="checkbox" className="form-check-input" id="dropdownCheck8"></input>
                                  <label className="form-check-label" for="dropdownCheck8">
                                          Mañana
                                  </label>
                              </div>
                              <div className="form-check checkdiv">
                                  <input type="checkbox" className="form-check-input" id="dropdownCheck9"></input>
                                  <label className="form-check-label" for="dropdownCheck9">
                                          Esta semana
                                  </label>
                              </div>
                              <div className="form-check checkdiv">
                                  <input type="checkbox" className="form-check-input" id="dropdownCheck10"></input>
                                  <label className="form-check-label" for="dropdownCheck10">
                                          Este finde
                                  </label>
                              </div>
                              <div className="form-check checkdiv">
                                  <input type="checkbox" className="form-check-input" id="dropdownCheck11"></input>
                                  <label className="form-check-label" for="dropdownCheck11">
                                          Próxima semana
                                  </label>
                              </div>
                              <div className="checkdiv tittleBr">
                                  O...
                              </div>
                              <div className="checkdiv">
                                  <label for="fechaInicio">Fecha de Inicio:</label><br/>
                                  <input type="date" name="fechaInicio" id="fechaInicio"></input><br/>
                                  <label for="fechaFin">Fecha de Fin:</label><br/>
                                  <input type="date" name="fechaFin" id="fechaFin"></input>
                              </div>
                          </ul>
                      </div>
                      <img id="break" src="../BreakOrange.svg" alt="|"/>
                      <div id="filtros" className="dropdown">
                          <button id="btnFiltros" className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="width: 100%; height: 100%;">
                          Filtros
                          </button>
                          {//FILTROS
                          }
                          <ul className="dropdown-menu">
                              <div className=" checkdiv">
                                  <div className="tittleBr">Duración</div>
                                  <span id="durationValue">0</span>
                                  <input className="slider" type="range" name="duration" value="0" min="0" max="240" step="15" ></input>
                              </div>

                              <div className="checkdiv">
                                  {//Edad min/max range
                                  }
                                  <div className="tittleBr">Edad</div>
                                  <div className="tittleBrSmall">Min:</div>
                                  <span id="minAgeValue">18</span>
                                  <input className="slider" type="range" name="minAge" value="0" min="18" max="100" step="1" ></input>
                                  
                                  <div className="tittleBrSmall">Max:</div>
                                  <span id="maxAgeValue">18</span>
                                  <input className="slider" type="range" name="maxAge" value="0" min="18" max="100" step="1" ></input>
                              </div>

                              <div className="checkdiv">
                                  {//Cantidad min/max pax range
                                  }
                                  <div className="tittleBr">Nro.Personas</div>

                                  <div className="tittleBrSmall">Min:</div>
                                  <span id="minPaxValue">1</span>
                                  <input className="slider" type="range" name="minPax" value="0" min="1" max="20" step="1" ></input>
                                  <div className="tittleBrSmall">Max:</div>
                                  <span id="minPaxValue">1</span>
                                  <input className="slider" type="range" name="minPax" value="0" min="1" max="20" step="1" ></input>
                                  
                              </div>

                              <div className="checkdiv tittleBr">Género</div>
                              <div className="form-check checkdiv">
                                  <input type="checkbox" className="form-check-input" id="genderFilter1"></input>
                                  <label className="form-check-label" for="genderFilter1">
                                          Solo mujeres
                                  </label>
                              </div>
                              <div className="form-check checkdiv">
                                  <input type="checkbox" className="form-check-input" id="genderFilter2"></input>
                                  <label className="form-check-label" for="genderFilter2">
                                          Solo Queer
                                  </label>
                              </div>
                              <div className="form-check checkdiv">
                                  <input type="checkbox" className="form-check-input" id="genderFilter2"></input>
                                  <label className="form-check-label" for="genderFilter2">
                                          Todos los géneros
                                  </label>
                              </div>
                              <div className="form-check checkdiv">
                                  <input type="checkbox" className="form-check-input" id="genderFilter3"></input>
                                  <label className="form-check-label" for="genderFilter3">
                                          Todos los géneros
                                  </label>
                              </div>
                              <div className="checkdiv tittleBr">Idioma</div>
                              <div className="form-check checkdiv">
                                  <input type="checkbox" className="form-check-input" id="languageFilter1"></input>
                                  <label className="form-check-label" for="languageFilter1">
                                          Español
                                  </label>
                              </div>
                              <div className="form-check checkdiv">
                                  <input type="checkbox" className="form-check-input" id="languageFilter2"></input>
                                  <label className="form-check-label" for="languageFilter2">
                                          Catalán
                                  </label>
                              </div>
                              <div className="form-check checkdiv">
                                  <input type="checkbox" className="form-check-input" id="languageFilter3"></input>
                                  <label className="form-check-label" for="languageFilter3">
                                          Inglés
                                  </label>
                              </div>
                              <div className="form-check checkdiv">
                                  <input type="checkbox" className="form-check-input" id="languageFilter4"></input>
                                  <label className="form-check-label" for="languageFilter4">
                                          Alemán
                                  </label>
                              </div>
                              <div className="form-check checkdiv">
                                  <input type="checkbox" className="form-check-input" id="languageFilter5"></input>
                                  <label className="form-check-label" for="languageFilter5">
                                          Francés
                                  </label>
                              </div>
                              <div className="checkdiv tittleBr">Precio</div>
                              <div className="form-check checkdiv">
                                  <input type="checkbox" className="form-check-input" id="priceFilter1"></input>
                                  <label className="form-check-label" for="priceFilter1">
                                          Gratis
                                  </label>
                              </div>
                              <div className="form-check checkdiv">
                                  <input type="checkbox" className="form-check-input" id="priceFilter2"></input>
                                  <label className="form-check-label" for="priceFilter2">
                                          De pago
                                  </label>
                              </div>
                              <div className="checkdiv tittleBr">LGTBI amigable</div>
                              <div className="form-check checkdiv">
                                  <input type="checkbox" className="form-check-input" id="lgtbiFilter1"></input>
                                  <label className="form-check-label" for="lgtbiFilter1">
                                          Si
                                  </label>
                              </div>
                              <div className="checkdiv tittleBr">Se permiten niños</div>
                              <div className="form-check checkdiv">
                                  <input type="checkbox" className="form-check-input" id="kidsFilter1"></input>
                                  <label className="form-check-label" for="kidsFilter1">
                                          se permiten
                                  </label>
                              </div>
                              <div className="checkdiv tittleBr">Se permiten mascotas</div>
                              <div className="form-check checkdiv">
                                  <input type="checkbox" className="form-check-input" id="petFilter1"></input>
                                  <label className="form-check-label" for="petFilter1">
                                          Se permiten 
                                  </label>
                              </div>
                              
                          </ul>
                      </div>
                      <button id="buscar" className="btn btn-secondary"><i className="fa-solid fa-magnifying-glass" style="color: #ffffff;"></i></button>
                  </form>
              </section>
          </div>
      </header>
    </body>
  );
};

export default Header;

