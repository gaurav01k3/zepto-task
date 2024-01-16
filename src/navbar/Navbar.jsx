import React from "react";

const Navbar = () => {
    return (
        <div
            className="h-max py-4 px-8 md:px-16 flex md:justify-between justify-center items-center"
            style={{ background: "#3c006b" }}
        >
            <div>
                <img
                    src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/6.21.0/images/logo.svg"
                    alt=""
                />
            </div>
            <div className="hidden md:block font-semibold text-white md:text-3xl">
                Hii, this is{" "}
                <a
                    target="_blank"
                    href="https://www.linkedin.com/in/gauravkumar0130/"
                    rel="noreferrer"
                >
                    Gaurav Kumar
                </a>
            </div>
        </div>
    );
};

export default Navbar;
