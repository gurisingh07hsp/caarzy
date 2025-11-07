'use client';

import React, { useEffect, useMemo, useState } from 'react';

export interface UserReview {
  id: string;
  carId: string;
  name: string;
  rating: number; // 1-5
  comment: string;
  ratings?: {
    exterior?: number;
    comfort?: number;
    performance?: number;
    fuelEconomy?: number;
    valueForMoney?: number;
  };
  images?: string[];
  createdAt: string;
}

interface ReviewsProps {
  carId: string;
}

export function Reviews({ carId }: ReviewsProps) {
  const storageKey = `autodeal-reviews-${carId}`;
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [imagesText, setImagesText] = useState('');
  const [sort, setSort] = useState<'latest' | 'top'>('latest');
  const [subRatings, setSubRatings] = useState({ exterior: 5, comfort: 5, performance: 5, fuelEconomy: 5, valueForMoney: 5 });

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setReviews(JSON.parse(saved));
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(reviews));
  }, [reviews, storageKey]);

  const avg = useMemo(() => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
  }, [reviews]);

  const avgBy = useMemo(() => {
    const keys = ['exterior','comfort','performance','fuelEconomy','valueForMoney'] as const;
    const sums: Record<string, number> = {};
    const counts: Record<string, number> = {};
    for (const k of keys) { sums[k] = 0; counts[k] = 0; }
    reviews.forEach(r => {
      keys.forEach(k => {
        const val = r.ratings?.[k];
        if (typeof val === 'number') { sums[k] += val; counts[k] += 1; }
      });
    });
    const res: Record<string, number> = {};
    keys.forEach(k => { res[k] = counts[k] ? sums[k] / counts[k] : 0; });
    return res;
  }, [reviews]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !comment) return;
    const imgs = imagesText.split(/\s*,\s*/).filter(Boolean);
    const review: UserReview = {
      id: `${Date.now()}`,
      carId,
      name,
      rating: Math.min(5, Math.max(1, rating)),
      comment,
      ratings: { ...subRatings },
      images: imgs,
      createdAt: new Date().toISOString(),
    };
    setReviews((list) => [review, ...list]);
    setName('');
    setComment('');
    setRating(5);
    setImagesText('');
  }

  return (
    <div className="mt-12 bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-4 border-b flex items-center justify-between">
        <h3 className="text-lg font-semibold">User Reviews</h3>
        <div className="text-sm text-gray-600">Average Rating: <span className="font-semibold">{avg.toFixed(1)}</span> / 5 ({reviews.length})</div>
      </div>

      {/* Category summary */}
      <div className="px-4 py-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          ['Exterior','exterior'],
          ['Comfort','comfort'],
          ['Performance','performance'],
          ['Fuel Economy','fuelEconomy'],
          ['Value For Money','valueForMoney'],
        ].map(([label, key]) => (
          <div key={key} className="flex flex-col items-center rounded-lg border p-3">
            <span className="text-lg font-semibold">{(avgBy[key] || 0).toFixed(1)}</span>
            <span className="text-xs text-gray-600 mt-1">{label as string}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-4 border-b md:border-b-0 md:border-r">
          <form onSubmit={submit} className="space-y-3">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="border rounded-lg px-3 py-2 w-full" />
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-700">Rating</label>
              <input type="range" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} />
              <span className="text-sm font-medium">{rating}</span>
            </div>
            {/* Sub ratings */}
            <div className="grid grid-cols-2 gap-3">
              {[
                ['Exterior','exterior'],
                ['Comfort','comfort'],
                ['Performance','performance'],
                ['Fuel Economy','fuelEconomy'],
                ['Value For Money','valueForMoney'],
              ].map(([label, key]) => (
                <label key={key} className="flex items-center gap-2 text-sm">
                  <span className="w-28 text-gray-700">{label}</span>
                  <input type="range" min={1} max={5} value={(subRatings as any)[key]}
                         onChange={(e) => setSubRatings((s) => ({ ...s, [key as any]: Number(e.target.value) }))} />
                  <span className="w-6 text-right">{(subRatings as any)[key]}</span>
                </label>
              ))}
            </div>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your experience" className="border rounded-lg px-3 py-2 w-full min-h-24" />
            <div>
              <label className="block text-sm text-gray-700 mb-1">Image URLs (comma separated)</label>
              <input value={imagesText} onChange={(e) => setImagesText(e.target.value)} className="border rounded-lg px-3 py-2 w-full" placeholder="https://..., https://..." />
            </div>
            <button type="submit" className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800">Submit Review</button>
          </form>
        </div>
        <div className="p-4 max-h-96 overflow-y-auto">
          {/* Reviews with images gallery */}
          {reviews.some(r => (r.images && r.images.length)) && (
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Reviews with Images</p>
              <div className="flex gap-2 overflow-x-auto">
                {reviews.flatMap(r => r.images || []).map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={src + i} src={src} alt="review" className="h-16 w-24 object-cover rounded" />
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium">All Reviews ({reviews.length})</p>
            <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="border rounded px-2 py-1 text-sm">
              <option value="latest">Latest</option>
              <option value="top">Top Rated</option>
            </select>
          </div>
          {reviews.length === 0 && <p className="text-sm text-gray-600">No reviews yet. Be the first to review.</p>}
          <ul className="space-y-3">
            {[...reviews]
              .sort((a,b) => sort==='latest' ? (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) : (b.rating - a.rating))
              .map((r) => (
              <li key={r.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{r.name}</p>
                  <span className="text-sm">{r.rating} / 5</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{r.comment}</p>
                {r.images && r.images.length > 0 && (
                  <div className="mt-2 flex gap-2">
                    {r.images.map((src, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={src + i} src={src} alt="review img" className="h-14 w-20 object-cover rounded" />
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">{new Date(r.createdAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


