'use client';

import { useState, useEffect } from 'react';
import { getDailyPost, socialPosts, SocialPost } from './data/posts';

export default function Home() {
  const [dailyPost, setDailyPost] = useState<SocialPost | null>(null);
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [copied, setCopied] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(false);

  useEffect(() => {
    const post = getDailyPost();
    setDailyPost(post);
    setSelectedPost(post);
  }, []);

  const copyToClipboard = (post: SocialPost) => {
    const text = `${post.content}\n\n${post.hashtags.join(' ')}\n\n🔗 Visit: https://mindsonautomation.com/`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayPost = selectedPost || dailyPost;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Minds on Automation
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-2">Daily Social Media Posts</p>
          <p className="text-sm text-gray-500">
            A one-stop solution for innovative automation | 15+ Years Excellence
          </p>
        </div>

        {/* Daily Post Card */}
        {displayPost && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{displayPost.emoji}</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{displayPost.title}</h2>
                  <p className="text-sm text-purple-600 font-semibold">{displayPost.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Post #{displayPost.id}</p>
                {selectedPost?.id === dailyPost?.id && (
                  <span className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    Today's Post
                  </span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">{displayPost.content}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {displayPost.hashtags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-600">
                  🔗 <strong>Website:</strong>{' '}
                  <a
                    href="https://mindsonautomation.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-semibold underline"
                  >
                    mindsonautomation.com
                  </a>
                </p>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(displayPost)}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              {copied ? '✓ Copied to Clipboard!' : '📋 Copy Post for Social Media'}
            </button>
          </div>
        )}

        {/* All Posts Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <button
            onClick={() => setShowAllPosts(!showAllPosts)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-xl font-bold text-gray-900">
              Browse All {socialPosts.length} Posts
            </h3>
            <span className="text-2xl">{showAllPosts ? '▲' : '▼'}</span>
          </button>

          {showAllPosts && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto p-2">
              {socialPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => {
                    setSelectedPost(post);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg ${
                    selectedPost?.id === post.id
                      ? 'border-purple-500 bg-purple-50'
                      : post.id === dailyPost?.id
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-2xl">{post.emoji}</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{post.title}</h4>
                      <p className="text-xs text-purple-600 font-semibold">{post.category}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-3">{post.content}</p>
                  {post.id === dailyPost?.id && (
                    <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                      Today
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 border border-blue-200">
            <h4 className="font-bold text-gray-900 mb-3">About Minds on Automation</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div>
                <p className="font-semibold text-blue-600">321+</p>
                <p>Projects Completed</p>
              </div>
              <div>
                <p className="font-semibold text-purple-600">280+</p>
                <p>Satisfied Clients</p>
              </div>
              <div>
                <p className="font-semibold text-green-600">15+</p>
                <p>Years of Excellence</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-600">
              Serving Pune, Mumbai, Ahmednagar, Goa & Nashik | Commercial & Residential Automation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
