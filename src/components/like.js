import React, {useState, useEffect, useRef} from 'react';

let imgUrl = 'https://www.semana.com/resizer/2sar7iLFSpoiknWkhUh-sAFwKDM=/1200x675/filters:format(jpg):quality(50)//cloudfront-us-east-1.images.arcpublishing.com/semana/RE55ORS5VRHPPLSJPA5LA3PBKY.jpg'
const Like = () => {
	const [style, setStyle] = useState({})
	const [like, setLike] = useState(false)
	const likeButtonRef = useRef('like')
	const likeButton = () => {
		setLike(!like)
	}
	useEffect(() => {
		setStyle({
			backgroundColor: like ? 'cyan' : 'white'
		})
	}, [like])
	return (
		<div>
			<img src={imgUrl} alt="perritos" width='500px'/>
			<br/>
			<button ref={likeButtonRef}
			 style={style}
			 onClick={likeButton} >
			 {like ? 'dislike' : 'like'}
			 </button>
		</div>
		)
}

export default Like;


//hecho en main jeje

