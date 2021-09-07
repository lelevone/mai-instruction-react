import React, {useState} from "react";
import {NavLink} from "react-router-dom";

export default function NavSpoiler({setIsActiveMenu, childrenTitles, title, path}) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<li className="nav__item">
			<div className={`nav__spoiler spoiler ${isOpen ? "open" : ""}`}>
				<div className="spoiler__header" data-id="spoilerHeader" onClick={() => setIsOpen(!isOpen)}>
					<i className="fa fa-chevron-up" aria-hidden="true"/>
					{title}
				</div>
				<ol className="spoiler__list">
					{childrenTitles.map((item, index) => (
						<li className="spoiler__item" key={`${path}${index+1}`}>
							<NavLink
								to={`${path}${index+1}`}
								className="spoiler__link"
								activeClassName="selected"
								onClick={() => {
									document.querySelector("html").scrollTop = 0;
									setIsActiveMenu(false);
								}}
							>
								{`${index+1}. ${item}`}
							</NavLink>
						</li>
					))}
				</ol>
			</div>
		</li>
	);
}