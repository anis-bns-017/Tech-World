import { useState } from "react";
import { motion } from "framer-motion";

const NavigationDesktop = ({ navLinksData }) => {
  const [showSubMenu, setShowSubMenu] = useState([]);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  const subMenuOnMouseEnterHandler = (subMenuId) => {
    setShowSubMenu((prev) => {
      let arr = [...prev];
      arr[subMenuId] = true;
      return arr;
    });
  };
  const subMenuOnMouseLeaveHandler = (subMenuId) => {
    setShowSubMenu((prev) => {
      let arr = [...prev];
      arr[subMenuId] = false;
      return arr;
    });
  };

  return (
    <nav>
      <ul className="main-nav">
        {navLinksData.map((el) => {
          if (!el.children) {
            return (
              <li key={el.id}>
                <a href="#" className="header-nav-link">
                  <span>{el.name}</span>
                </a>
              </li>
            );
          }

          return (
            <li
              onMouseEnter={() => subMenuOnMouseEnterHandler(el.id)}
              onMouseLeave={() => subMenuOnMouseLeaveHandler(el.id)}
              key={el.id}
              className="header-nav-options options-hover"
            >
              <div className="header-nav-div">
                <span>{el.name}</span>
              </div>
              <motion.ul
                variants={variants}
                animate={showSubMenu[el.id] ? "open" : "closed"}
                className="header-nav-ul"
              >
                {showSubMenu[el.id] &&
                  el.children.map((ele) => {
                    if (!ele.children) {
                      return (
                        <li key={ele.id} 
                        className="sub-menu-li"
                        >
                          <a
                            href="#"
                            className="sub-menu-link absolute"
                            style={{ textDecoration: "none" }}
                          >
                            <span>{ele.name}</span>
                          </a>
                        </li>
                      );
                    }

                    return (
                      <li
                        onMouseEnter={() => subMenuOnMouseEnterHandler(ele.id)}
                        onMouseLeave={() => subMenuOnMouseLeaveHandler(ele.id)}
                        key={ele.id}
                        className="sub-menu-options bg-red-700 sub-menu-hover"
                      >
                        <div className="sub-menu-div">
                          <span>{ele.name}</span>
                          <span className="arrow text-[5vh] text-red-400">{"»"}</span>               
                        </div>
                        <motion.ul
                          variants={variants}
                          animate={showSubMenu[ele.id] ? "open" : "closed"}
                          className="sub-menu-ul"
                        >
                          {showSubMenu[ele.id] &&
                            ele.children.map((elem) => {
                              return (
                                <li key={elem.id} 
                                className="grand-child-link"
                                >
                                  <a href="#">
                                    <span>{elem.name}</span>
                                  </a>
                                </li>
                              );
                            })}
                        </motion.ul>
                      </li>
                    );
                  })}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavigationDesktop;
