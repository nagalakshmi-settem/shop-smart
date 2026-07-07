import { useState } from 'react';
import { useSelector } from 'react-redux';
import useReviews from './useReviews';

export default function ReviewSection({ productId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { isAuthenticated } = useSelector(state => state.auth);

  const { reviews, loading, addReview } = useReviews(productId);

  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      setError(null);
      await addReview(rating, comment);
      setComment('');
      setRating(5);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return (
    <div className="mt-8 text-center text-gray-400 animate-pulse">
      Loading reviews...
    </div>
  );

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Customer Reviews ({reviews.length})
      </h3>

      {/* Add Review Form */}
      {isAuthenticated ? (
        <div className="border rounded-lg p-4 mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            Write a Review
          </h4>

          {/* Star Rating */}
          <div className="flex gap-2 mb-3">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </button>
            ))}
            <span className="text-sm text-gray-500 self-center ml-2">
              {rating}/5
            </span>
          </div>

          {/* Comment */}
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Share your experience..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-[#2874f0] resize-none"
          />

          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          {success && <p className="text-green-500 text-xs mt-1">Review added! ✅</p>}

          <button
            onClick={handleSubmit}
            disabled={submitLoading || !comment.trim()}
            className="mt-3 bg-[#2874f0] text-white px-6 py-2 rounded text-sm font-medium hover:bg-[#1a5dc7] disabled:opacity-50"
          >
            {submitLoading ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      ) : (
        <div className="border rounded-lg p-4 mb-6 text-center">
          <p className="text-gray-500 text-sm">
            Please <a href="/login" className="text-[#2874f0] font-medium">login</a> to write a review
          </p>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p className="text-4xl mb-2">💬</p>
          <p className="text-sm">No reviews yet — be the first!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {review.user?.name || 'Anonymous'}
                  </p>
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        className={`text-sm ${
                          star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}