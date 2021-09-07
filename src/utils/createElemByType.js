import {NavLink} from "react-router-dom";

export function createElem(item, index) {
	if (item["p"]) {
		return(
			<p className="instruction__text" dangerouslySetInnerHTML={{ __html: item["p"] }} key={index}/>
		)
	} else if(item["img"]) {
		return(
			<img className="instruction__img" src={item["img"]}
					 alt="" key={index}/>
		)
	} else if(item["video"]) {
		return(
			<video controls width="100%" height="auto" key={index}>
				<source src={item["video"]} type="video/mp4"/>
			</video>
		)
	} else if(item["bold"]) {
		return(
			<p className="instruction__text bold" dangerouslySetInnerHTML={{ __html: item["bold"] }} key={index}/>
		)
	} else if(item["imgNum"]) {
		return(
			<figure key={index}>
				<img className="instruction__img" src={item["imgNum"].url} alt=""/>
					<figcaption className="instruction__figcaption">Рис. {item["imgNum"].num}</figcaption>
			</figure>
		)
	} else if(item["h3"]) {
		return <h3 className="instruction__title">{item["h3"]}</h3>
	} else if(item["br"]) {
		return <br/>
	} else if (item["NavLink"]) {
		return <NavLink className="instruction__link"  to={item.NavLink.to}>{item.NavLink.text}</NavLink>
	}
}