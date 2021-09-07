import React from "react";
import NavItem from "./NavItem";
import NavSpoiler from "./NavSpoiler";
import Error from "./Error";

export default function Nav({paths = {}, isActiveMenu, setIsActiveMenu}) {
	if (Object.keys(paths).length === 0) return <Error/>
	return (
		<>
		<nav className={`page__nav nav ${isActiveMenu ? "active" : ""}`} data-id="nav">
			<ul className="nav__list">
				{Object.keys(paths).map(path => {
					console.log(path);
					if (!paths[path]["children"]) {
						return <NavItem
							setIsActiveMenu={setIsActiveMenu}
							title={paths[path]["navTitle"]}
							path={path}
							key={path}
						/>
					} else if (paths[path]["children"]) {
						return <NavSpoiler
							setIsActiveMenu={setIsActiveMenu}
							childrenTitles={paths[path]["children"]}
							title={paths[path]["navTitle"]}
							path={path}
							key={path}
						/>
					} else return "";
				})}
			</ul>
		</nav>
			</>
	);
}

