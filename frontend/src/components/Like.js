function Like(props) {
  const { Likes } = props;
  return (
    <div className="like">
      <span> {Likes} Likes</span>
    </div>
  );
}
export default Like;
