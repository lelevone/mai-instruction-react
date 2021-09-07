import React from "react";
import {NavLink} from "react-router-dom";

export default function NavItem({title, path, setIsActiveMenu}) {
	return (
					<li className="nav__item" key={`/${path}`}>
						<NavLink
							to={path}
							className="nav__link"
							activeClassName="selected"
							data-id="link"
							onClick={() => {
								document.querySelector("html").scrollTop = 0;
								setIsActiveMenu(false);
							}}
						>
							{title}
						</NavLink>
					</li>
	);
}
