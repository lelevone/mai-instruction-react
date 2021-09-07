import React, {useEffect, useState} from "react";
import {createElem} from "../utils/createElemByType";
import Loader from "./Loader";
import Error from "./Error";

export default function Instruction({path}) {

	const [isLoaded, setIsLoaded] = useState(false);
	const [content, setContent] = useState({});

	useEffect(() => {
		setIsLoaded(false);
		fetch(`${process.env.REACT_APP_DB_URL}/${path}.json`)
			.then(res => res.json())
			.then(
				result => {
					setContent(result);
					setIsLoaded(true);
				})
	}, [path])

	return(
		<main className="page__instruction instruction">
			{
				(() => {
				if (!isLoaded){
					return <Loader/>
				} else if (
					isLoaded
					&& content
					&& typeof content.list === "object"
					&& content.list.length > 0
				) {
					return (
					<>
						<h3 className="instruction__title">{content.title}</h3>
						<ol className="instruction__list" style={{"listStyle": content.list.length < 2 ? "none" : ""}}>
							{
								content.list.map((li,index) => {
									return (
										<li className="instruction__item" key={index}>
											{
												li.map(item => {
													return createElem(item, index);
												})
											}
										</li>
									)
								})
							}
						</ol>
					</>
					)
				} else {
					return <Error/>;
				}
			})()
			}
	</main>
	);
}