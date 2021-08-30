import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import PageSlide from "./PageSlide";
import { Slide1, Slide2, Slide3, Slide4, Slide5, MS1, MS2, MS3, MS4, MS5, MS6 } from "../../../utils/imgLoader";

const anchors = ["", "MUSICFANS", "MUSICCREATORS", "FUTUREMUSICPROS", "ALLMUSICCOMMUNITIES", "THEBREAKISOVER"];

const FullPageWrapper = () => {
  return (
    <ReactFullpage
      anchors={anchors}
      navigation
      menu="menu"
      navigationTooltips={anchors}
      afterLoad={(origin, destination, direction) => {
        let isFirst = destination.isFirst;
        let isLast = destination.isLast;
        let btnPrev = document.getElementsByClassName("btn-prev")[0];
        let btnNext = document.getElementsByClassName("btn-next")[0];
        if (isLast) {
          btnPrev.classList.remove("deactive");
          btnNext.classList.add("deactive");
        } else if (isFirst) {
          btnPrev.classList.add("deactive");
          btnNext.classList.remove("deactive");
        } else {
          btnNext.classList.remove("deactive");
          btnPrev.classList.remove("deactive");
        }
      }}
      licenseKey=""
      render={({ state, fullpageApi }) => {
        return (
          <div>
            <PageSlide mSlideImg={MS1} slideId="section1" fullpageApi={fullpageApi} />
            <PageSlide slideImg={Slide1} mSlideImg={MS2} slideId="section2" fullpageApi={fullpageApi} />
            <PageSlide slideImg={Slide2} mSlideImg={MS3} slideId="section3" fullpageApi={fullpageApi} />
            <PageSlide slideImg={Slide3} mSlideImg={MS4} slideId="section4" fullpageApi={fullpageApi} />
            <PageSlide slideImg={Slide4} mSlideImg={MS5} slideId="section5" fullpageApi={fullpageApi} />
            <PageSlide slideImg={Slide5} mSlideImg={MS6} slideId="section6" fullpageApi={fullpageApi} />
          </div>
        );
      }}
    />
  );
};

export default FullPageWrapper;
