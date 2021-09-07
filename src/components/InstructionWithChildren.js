import React, {useEffect, useState} from "react";
import Loader from "./Loader";
import {createElem} from "../utils/createElemByType";
import Error from "./Error";

export default function InstructionWithChildren({childIndex, parentPath}) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [content, setContent] = useState({});

	useEffect(() => {
		setIsLoaded(false);
		fetch(`${process.env.REACT_APP_DB_URL}/${parentPath}.json`)
			.then(res => res.json())
			.then(
				result => {
					setContent(result);
					setIsLoaded(true);
				})
	}, [parentPath])
	return(
	<main className="page__instruction instruction">
		{
			(() => {
			if (!isLoaded){
				return <Loader/>
			} else if (
				isLoaded
				&& content
				&& typeof content.list[childIndex] === "object"
				&& typeof content.list[childIndex][0].title === "string"
				&& content.list[childIndex].length > 0
			) {
				return (
					<>
						<h3 className="instruction__title">{`${childIndex+1}.	 ${content.list[childIndex][0].title}`}</h3>
						<ol className="instruction__list">
							{
								content.list[childIndex].map((item,index) => {
									return createElem(item, index);
								})
							}
						</ol>
					</>
				)
			} else {
				return <Error/>
			}
		})()
		}
	</main>
	);
}