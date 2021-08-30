import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Brand, Close, Hamburger, AppStore, GooglePlay } from "../../utils/imgLoader";
import "./home.styles.scss";

const HomeLayout = ({ children }) => {
  const [show, setShow] = useState(false);

  const handlePrev = () => {
    window.fullpage_api.moveSectionUp();
  };
  const handleNext = () => {
    window.fullpage_api.moveSectionDown();
  };

  return (
    <div className="home">
      <header className="home-header">
        <div className="home-header-container">
          <Link to="/">
            <img className="brand" src={Brand} alt="home brand" />
          </Link>
          <div className="right-side">
            <p className="header-txt">THE FORCE IS UPON US</p>
            <img className="hamburger" src={Hamburger} alt="hamburger" onClick={() => setShow(true)} />
          </div>
        </div>
      </header>
      <main>
        <button className="btn-prev" onClick={handlePrev}></button>
        <button className="btn-next" onClick={handleNext}></button>
        {children}
        <div className={show ? "active side-nav" : "side-nav"}>
          <div className="close" onClick={() => setShow(false)}>
            <img src={Close} alt="close" />
          </div>
          <div className="d-flex">
            <a href="https://testing.breakernation.com/login" className="btn-login">
              LOGIN
            </a>
          </div>
          <ul>
            <li>
              <a href="https://www.notion.so/Terms-of-Service-14290b5f4ef24f4289bdf20f904fbc1b">TERMS</a>
            </li>
            <li>
              <a href="https://www.notion.so/Privacy-Policy-ab5b0b7fea1a42bc8551a3a03dad3e35">PRIVACY</a>
            </li>
            <li>
              <a href="https://www.notion.so/Community-Guidelines-66175d3e3c444786a78220847c24ea93">GUIDELINES</a>
            </li>
            <li>
              <a href="mailto:mailto:hello@breakernation.com">CONTACT US</a>
            </li>
          </ul>
          <div className="app-select">
            <div className="app-select-text">
              BREAK NEW MUSIC.
              <br /> BREAK OLD TRADITIONS. <br />
              BREAK YOURSELF — YOUR WAY!
            </div>
            <div className="apps">
              <a className="app-store2" href="https://apps.apple.com/us/app/breaker-nation/id1533950005">
                <img src={AppStore} alt="download app" />
              </a>
              <a className="google-play2" href="https://play.google.com/store/apps/details?id=com.breakernation">
                <img src={GooglePlay} alt="download app" />
              </a>
            </div>
          </div>
          <div className="nav-bottom">
            <img src={Brand} alt="brand" />
            <p className="nav-bottom-text">BREAKER NATION 2020-2021 All rights reserved</p>
          </div>
        </div>
        <a className="app-store1" href="https://apps.apple.com/us/app/breaker-nation/id1533950005">
          <img src={AppStore} alt="download app" />
        </a>
        <a className="google-play1" href="https://play.google.com/store/apps/details?id=com.breakernation">
          {" "}
          <img src={GooglePlay} alt="download app" />
        </a>
      </main>
      <footer className="home-footer">
        <div className="home-footer-text">BREAK NEW MUSIC. BREAK OLD TRADITIONS. BREAK YOURSELF — YOUR WAY!</div>
      </footer>
    </div>
  );
};

export default HomeLayout;
