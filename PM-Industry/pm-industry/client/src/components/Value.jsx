import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import data from "../utils/accordion";
import "../styles/Value.scss";
import value from "../assets/7.jpg";

const Value = () => {
  return (
    <div className="v-container" id="value">
      {/* left side */}
      <div className="v-left">
        <div className="image-container">
          <img src={value} alt="" />
        </div>
      </div>

      {/* right */}
      <div className="v-right">
        <h3 className="orangeText">Our Value</h3>

        <h2 className="primaryText">Value We Give to You</h2>

        <p className="secondaryText">
          We always ready to help by providing the best services for you.
          <br />
          We believe a good place to live can make your life better
        </p>

        <Accordion
          className="accordion"
          allowMultipleExpanded={false}
          preExpanded={[0]}
        >
          {data.map((item, i) => (
            <AccordionItem key={i}>
              <AccordionItemHeading>
                <AccordionItemButton className="flexCenter accordionButton">
                  <AccordionItemState>
                    {({ expanded }) => (
                      <div
                        className={`flexCenter icon ${
                          expanded ? "expanded" : "collapsed"
                        }`}
                      >
                        {item.icon}
                      </div>
                    )}
                  </AccordionItemState>
                  <span className="primaryText">{item.heading}</span>
                  <div className="flexCenter icon">
                    <MdOutlineArrowDropDown size={20} />
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p className="secondaryText">{item.detail}</p>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Value;
