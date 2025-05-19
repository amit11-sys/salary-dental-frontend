import { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../popup/Auth";

const HamburgerMenu = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  let [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  function close() {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  }

  function handleLinkClick() {
    setIsNavOpen(false); // Close the menu when a link is clicked
  }

  return (
    <>
      <Auth
        isLoginOpen={isLoginOpen}
        isRegisterOpen={isRegisterOpen}
        close={close}
        setIsLoginOpen={setIsLoginOpen}
        setIsRegisterOpen={setIsRegisterOpen}
      />
      <div className="flex items-center justify-between py-8 z-50">
        <nav>
          <section className="flex lg:hidden">
            <div
              className="HAMBURGER-ICON space-y-2"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            </div>

            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              <div
                className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
                onClick={() => setIsNavOpen(false)}
              >
                <svg
                  className="h-8 w-8 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
                <li className="border-b border-gray-400 my-8 uppercase">
                  <Link to="/" onClick={handleLinkClick}>
                    Home
                  </Link>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <Link to="/new-pcb-quote" onClick={handleLinkClick}>
                    New Quote
                  </Link>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <button onClick={() => setIsLoginOpen(true)}>Login</button>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <button onClick={() => setIsRegisterOpen(true)}>
                    SignUp
                  </button>
                </li>
              </ul>
            </div>
          </section>
        </nav>
        <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 50vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 5;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
      </div>
    </>
  );
};

export default HamburgerMenu;
