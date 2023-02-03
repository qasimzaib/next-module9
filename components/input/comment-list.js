import classes from "./comment-list.module.css";

function CommentList(props) {
	const { items } = props;

	return (
		<ul className={classes.comments}>
			{items.map((comment) => (
				<li key={comment._id}>
					<p>{comment.text}</p>
					<div>
						by <address>{comment.name}</address>
					</div>
				</li>
			))}
		</ul>
	);
}

export default CommentList;
