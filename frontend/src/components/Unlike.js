function Unlike(props) {
  const { Likes } = props;
  return (
    <div className="unlike">
      <span> {Likes} Unlikes </span>
    </div>
  );
}
export default Unlike;
