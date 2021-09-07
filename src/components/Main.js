import React from "react";
import {Switch, Route} from "react-router-dom"
import Instruction from "./Instruction";
import InstructionWithChildren from "./InstructionWithChildren";

export default function Main({paths}) {
	if (Object.keys(paths).length === 0) return "";
	return (
		<Switch>
			<Route exact path='/' key="/">
				<Instruction path="startPage"/>
			</Route>
			{
				Object.keys(paths).map(path => {
				if (paths[path] && !paths[path]["children"]){
				return(
						<Route exact path={`/${path}`} key={path}>
							<Instruction path={path}/>
						</Route>
				);
				} else if (paths[path] && paths[path]["children"]){
					return paths[path].children.map((li,index) => {
						return(
							<Route exact path={`/${path}${index+1}`} key={path}>
								<InstructionWithChildren childIndex={index} parentPath={path}/>
							</Route>)
					}
					);
				} else return "";
			})
			}
		</Switch>
	);
}

