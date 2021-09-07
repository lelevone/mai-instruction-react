import React from "react";
import {Link} from "react-router-dom";

export default function Header({isActiveMenu, setIsActiveMenu}) {
	return (
		<header className={`header ${isActiveMenu ? "active" : ''}`}>
			<div className="container">
				<div className="header__row">
					<Link className="header__column header__logo logo" to="/">
						<img src="./img/mai-web.svg" alt="" className="logo__img"/>
							<h1 className="logo__title">Инструкция</h1>
					</Link>
					<div className="header__column header__links">
						<a href="https://lms.mai.ru/" className="header__link" target="_blank">
							<span>LMS.MAI.RU</span>
						</a>

					</div>
					<button className="header__toggle" id="burger" onClick={() => {setIsActiveMenu(true)}}>
						<span/>
						<p>меню</p>
					</button>
					<button
						onClick={() => {setIsActiveMenu(false)}}
						className="header__toggle"
						id="close">
						<span/>
						<p>закрыть</p>
					</button>
				</div>
			</div>
		</header>
	);
}
