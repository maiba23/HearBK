import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const PageSlide = ({ slideImg, mSlideImg, slideId, fullpageApi }) => {
  const handlePrev = () => {
    fullpageApi.moveSectionUp();
  };
  const handleNext = () => {
    fullpageApi.moveSectionDown();
  };
  return (
    <section className="section" id={slideId}>
      <div className="flex-col">
        <TransformWrapper>
          <TransformComponent>
            <img className="moble-slide-img" src={mSlideImg} alt="mobile slide show " />
          </TransformComponent>
        </TransformWrapper>
        {slideId === "section1" ? (
          <div>
            <button className="prev deactive" onClick={handlePrev}></button>
            <ul id="menu">
              <li data-menuanchor="MUSICFANS">
                <a href="#MUSICFANS">MUSIC FANS</a>
              </li>
              <li data-menuanchor="MUSICCREATORS">
                <a href="#MUSICCREATORS">MUSIC CREATORS</a>
              </li>
              <li data-menuanchor="FUTUREMUSICPROS">
                <a href="#FUTUREMUSICPROS">FUTURE MUSIC PROS</a>
              </li>
              <li data-menuanchor="ALLMUSICCOMMUNITIES">
                <a href="#ALLMUSICCOMMUNITIES">ALL MUSIC COMMUNITIES</a>
              </li>
              <li data-menuanchor="THEBREAKISOVER">
                <a href="#THEBREAKISOVER">THE BREAK IS OVER</a>
              </li>
            </ul>
            <button className="next" onClick={handleNext}></button>
          </div>
        ) : slideId === "section2" ? (
          <div>
            <button className="prev" onClick={handlePrev}></button>
            <div className="slide-content">
              <h3>MUSIC FANS</h3>
              <ul id="menu-content">
                <li>Hear new music and exclusives</li>
                <li>Get “behind the music” access to everything</li>
                <li>Join the community for all music communities</li>
                <li>Connect with your favorite people in music live</li>
                <li>Represent and help great music breakthrough to the masses</li>
              </ul>
            </div>
            <button className="next" onClick={handleNext}></button>
          </div>
        ) : slideId === "section3" ? (
          <div>
            <button className="prev" onClick={handlePrev}></button>
            <div className="slide-content">
              <h3>MUSIC CREATORS</h3>
              <ul id="menu-content">
                <li>Get honest feedback on your tracks</li>
                <li>Grow your following by attracting new fans </li>
                <li>Receive expert advice to improve your sound</li>
                <li>Interact with your most engaged fans in real time</li>
                <li>Create momentum and run it up for every new music release</li>
              </ul>
            </div>
            <button className="next" onClick={handleNext}></button>
          </div>
        ) : slideId === "section4" ? (
          <div>
            <button className="prev" onClick={handlePrev}></button>

            <div className="slide-content">
              <h3>FUTURE MUSIC PROS</h3>
              <ul id="menu-content">
                <li>Follow your passion to work in music</li>
                <li>Learn what you want — get to your next level</li>
                <li>Network with like minded people & get connected</li>
                <li>Make a name for yourself and gain real credibility</li>
                <li>Be apart of the official global community for everyone in music</li>
              </ul>
            </div>
            <button className="next" onClick={handleNext}></button>
          </div>
        ) : slideId === "section5" ? (
          <div>
            <button className="prev" onClick={handlePrev}></button>
            <div className="slide-content">
              <h3>ALL MUSIC COMMUNITIES</h3>
              <ul id="menu-content">
                <li>Experience something new</li>
                <li>Grow beyond where you are now</li>
                <li>Meet new people to collaborate with</li>
                <li>Discover new sounds, apps, tools and tricks</li>
                <li>Tap-in to the global community for all music communities</li>
              </ul>
            </div>
            <button className="next" onClick={handleNext}></button>
          </div>
        ) : (
          <div>
            <button className="prev" onClick={handlePrev}></button>
            <div className="slide-content">
              <h3>THE BREAK IS OVER</h3>
              <div className="menu-content">
                <p className="mw-5">
                  There are too many gatekeepers in the music industry. The existing systems are old and antiquated. Almost every platform
                  in place is a barrier — preventing musicians from ever being in a position of power.
                  <br />
                  <br /> The Break Is OVER. <br />
                  <br />
                  No more wondering what people think about your music. No more struggling to find new fans. Get real feedback, make real
                  connections, manage your fanbase and do more of what you love.
                  <br /> Welcome Home to Breaker Nation!
                </p>
              </div>
            </div>
            <button className="next deactive" onClick={handleNext}></button>
          </div>
        )}
      </div>
      <img className="slide-img" src={slideImg} alt="slide show " />
    </section>
  );
};

export default PageSlide;
