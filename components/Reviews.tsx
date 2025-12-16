'use client';

import React, { useEffect, useMemo, useState } from 'react';
import AuthModal from './AuthModal';
import { useUser } from '@/context/UserContext';
import axios from 'axios';

export interface UserReview {
  _id?: string;
  username: string;
  title: string;
  rating: number; // 1-5
  experience: string;
  postedAt: Date;
}

interface ReviewsProps {
  carId: string;
  reviews: UserReview[];
}

export function Reviews({ carId, reviews }: ReviewsProps) {
  const {user} = useUser();
  const [sort, setSort] = useState<'latest' | 'top'>('latest');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    username: '',
    rating: 0,
    title: '',
    experience: '',
    postedAt: new Date()
  })



  const avg = useMemo(() => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
  }, [reviews]);



  const submit = async(e: React.FormEvent)=> {
    e.preventDefault();
    if(user && user.username && reviewForm.title && reviewForm.rating && reviewForm.experience)
    {
      const review = {
        username: user.username,
        rating: reviewForm.rating,
        title: reviewForm.title,
        experience: reviewForm.experience,
        postedAt: reviewForm.postedAt
      }

      const response = await axios.post(`/api/reviews/${carId}`, review);
      if(response.status == 200){
        setReviewForm({
          username: '',
          rating: 0,
          title: '',
          experience: '',
          postedAt: new Date()
        })
        console.log(response.data);
      }
    }
    else{
      setIsAuthModalOpen(true);
    }
  }


  return (
    <div className="mt-12 bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
      <div className="px-4 py-4 border-b flex items-center justify-between">
        <h3 className="text-lg font-semibold">User Reviews</h3>
        <div className="text-sm text-gray-600">Average Rating: <span className="font-semibold">{avg.toFixed(1)}</span> / 5 ({reviews.length})</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-4 border-b md:border-b-0 md:border-r">
          <form onSubmit={submit} className="space-y-3">
            <input value={reviewForm.title} onChange={(e) => setReviewForm({...reviewForm, title: e.target.value})} placeholder="Enter Title" className="border rounded-lg px-3 py-2 w-full" />
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-700">Rating</label>
              <input type="range" min={1} max={5} value={reviewForm.rating} onChange={(e) => setReviewForm({...reviewForm, rating: Number(e.target.value)})} />
              <span className="text-sm font-medium">{reviewForm.rating}</span>
            </div>
            <textarea value={reviewForm.experience} onChange={(e) => setReviewForm({...reviewForm, experience: e.target.value})} placeholder="Share your experience" className="border rounded-lg px-3 py-2 w-full min-h-24" />
            <button type="submit" className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800">Submit Review</button>
          </form>
        </div>
        <div className="p-4 max-h-96 overflow-y-auto">

          <div className="flex items-center justify-between mb-3">
            {/* <p className="text-sm font-medium">All Reviews ({reviews.length})</p> */}
            <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="border rounded px-2 py-1 text-sm">
              <option value="latest">Latest</option>
              <option value="top">Top Rated</option>
            </select>
          </div>
          {/* {reviews.length === 0 && <p className="text-sm text-gray-600">No reviews yet. Be the first to review.</p>} */}
          <ul className="space-y-3">
            {[...reviews]
              .sort((a,b) => sort==='latest' ? (new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()) : (b.rating - a.rating))
              .map((r) => (
              <li key={r._id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{r.username}</p>
                  <span className="text-sm">{r.rating} / 5</span>
                </div>
                <p>{r.title}</p>
                <p className="text-sm text-gray-700 mt-1">{r.experience}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(r.postedAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isAuthModalOpen && <AuthModal closeModal={setIsAuthModalOpen}/>}
    </div>
  );
}


