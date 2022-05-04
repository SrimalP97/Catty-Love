function Review(props) {
  const { numReviews } = props;
  return (
    <div className="review">
      <span> {numReviews} Reviews</span>
    </div>
  );
}
export default Review;
