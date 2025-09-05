import React, { useEffect, useState } from 'react';
import { fetchData } from '../api/api.js';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedPosts, setExpandedPosts] = useState<{ [key: number]: boolean }>({});
  const postsPerPage = 10;

  useEffect(() => {
    const getData = async () => {
      try {
        const [postsData, usersData] = await Promise.all([
          fetchData('posts'),
          fetchData('users')
        ]);
        setPosts(postsData);
        setUsers(usersData);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };
    getData();
  }, []);

  // Sayfalama hesaplamaları
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Kullanıcı adını getir
  const getUserName = (userId: number) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Bilinmeyen Kullanıcı';
  };

  // Post içeriğini genişlet/daralt
  const toggleExpandPost = (postId: number) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Sayfa değiştir
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Post detay sayfasına yönlendir (şimdilik alert)
  const goToPost = (postId: number) => {
    alert(`Post ${postId} detay sayfasına yönlendirilecek`);
  };

  // Kullanıcı detay sayfasına yönlendir (şimdilik alert)
  const goToUser = (userId: number) => {
    alert(`Kullanıcı ${userId} detay sayfasına yönlendirilecek`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Gönderiler</h2>
      
      {/* Posts Kartları */}
      <div className="grid gap-6 w-full max-w-4xl">
        {currentPosts.map((post) => {
          const isExpanded = expandedPosts[post.id];
          const shouldTruncate = post.body.length > 150;
          const displayBody = isExpanded || !shouldTruncate 
            ? post.body 
            : post.body.substring(0, 150) + '...';
          
          return (
            <div key={post.id} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              {/* Post Başlık */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 
                    onClick={() => goToPost(post.id)}
                    className="text-xl font-bold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors duration-200"
                  >
                    {post.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Yazan:</span>
                    <button
                      onClick={() => goToUser(post.userId)}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {getUserName(post.userId)}
                    </button>
                  </div>
                </div>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                  #{post.id}
                </span>
              </div>

              {/* Post İçeriği */}
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {displayBody}
                </p>
                
                {shouldTruncate && (
                  <button
                    onClick={() => toggleExpandPost(post.id)}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {isExpanded ? 'Daha Az Göster' : 'Devamını Oku'}
                  </button>
                )}
              </div>

              {/* Post Aksiyonları */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex space-x-4">
                  <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                    👍 Beğen
                  </button>
                  <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                    💬 Yorum Yap
                  </button>
                  <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                    📤 Paylaş
                  </button>
                </div>
                <button
                  onClick={() => goToPost(post.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                >
                  Detayları Gör
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sayfalama */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Önceki
          </button>

          {/* Sayfa numaraları */}
          {(() => {
            const pages = [];
            const maxVisiblePages = 5;
            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            
            if (endPage - startPage + 1 < maxVisiblePages) {
              startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
              pages.push(
                <button
                  key={i}
                  onClick={() => paginate(i)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    currentPage === i
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {i}
                </button>
              );
            }
            return pages;
          })()}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Sonraki
          </button>
        </div>
      )}

      {/* Sayfa Bilgisi */}
      <div className="mt-4 text-sm text-gray-600">
        {posts.length > 0 && (
          <span>
            Toplam {posts.length} gönderiden {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, posts.length)} arası gösteriliyor
          </span>
        )}
      </div>

      {/* Yükleme durumu */}
      {posts.length === 0 && (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">Gönderiler yükleniyor...</div>
        </div>
      )}
    </div>
  );
};

export default Posts;