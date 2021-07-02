import React, {} from 'react';

let imgUrl = 'https://www.semana.com/resizer/2sar7iLFSpoiknWkhUh-sAFwKDM=/1200x675/filters:format(jpg):quality(50)//cloudfront-us-east-1.images.arcpublishing.com/semana/RE55ORS5VRHPPLSJPA5LA3PBKY.jpg'
const Like = () => {

	return (
		<div>
			<img src={imgUrl} alt="perritos" width='500px'/>
			<br/>
			<button>like</button>
		</div>
		)
}

export default Like;