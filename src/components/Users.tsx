import { useEffect, useState } from 'react';
import { fetchData } from '../api/api.ts';
import { User } from 'lucide-react';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedPosts, setExpandedPosts] = useState<{ [key: number]: boolean }>({});
  const usersPerPage = 5;

  useEffect(() => {
    const getData = async () => {
      try {
        const [usersData, postsData] = await Promise.all([
          fetchData('users'),
          fetchData('posts')
        ]);
        setUsers(usersData as User[]);
        setPosts(postsData as Post[]);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };
    getData();
  }, []);

  // Sayfalama hesaplamaları
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Kullanıcının postlarını getir
  const getUserPosts = (userId: number) => {
    return posts.filter(post => post.userId === userId);
  };

  // Daha fazla post göster/gizle
  const toggleExpandPosts = (userId: number) => {
    setExpandedPosts(prev => ({
      ...prev,
      [userId]: !prev[userId]
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
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Users</h2>
      
      {/* Kullanıcı Kartları */}
      <div className="grid grid-cols-3 gap-6 ">
        {currentUsers.map((user) => {
          const userPosts = getUserPosts(user.id);
          const isExpanded = expandedPosts[user.id];
          const postsToShow = isExpanded ? userPosts : userPosts.slice(0, 3);
          
          return (
            <div key={user.id} className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              {/* Kullanıcı Başlık Bilgileri
              
              <button
                  onClick={() => goToUser(user.id)}
                  className="relative top-2 -right-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                >
                  Profili Görüntüle
                </button>
                */}
                <div className='flex flex-row items-center gap-4 border-b pb-4 mb-4 w-full border border-gray-400 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200' onClick={() => goToUser(user.id)}>
                    <div className='flex items-center justify-center border-2 border-gray-400 rounded-full px-2 py-2'>
                <User className="w-16 h-16 text-gray-400 " />
                    </div>
              <div className="flex flex-col items-start justify-between mb-4 ">   
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h3>
                  <p className="text-gray-600 text-sm">@{user.username}</p>
              </div>
                </div>

              {/* Kullanıcı Temel Bilgileri */}
              <div className="flex flex-col items-start text-left gap-4 mb-6 p-4 bg-gray-50 rounded-lg w-full">
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span> <a href={`mailto:${user.email}`} className='text-blue-600 hover:underline'>{user.email.toLowerCase()}</a>
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Mobile:</span> <a href={`tel:${user.phone}`} className='text-blue-600 hover:underline'>{user.phone}</a>
                  </p>
                  <span className="text-sm text-gray-600">
                    <span className="font-medium">Website:</span> <a className='text-blue-600 hover:underline' href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a>
                  </span>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Company:</span> {user.company.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">City:</span> {user.address.city}
                  </p>
                  
                </div>
               
              </div>

              {/* Kullanıcının Postları */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Posts ({userPosts.length})
                </h4>
                
                {postsToShow.length > 0 ? (
                  <div className="flex flex-col items-center w-52">
                    {postsToShow.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => goToPost(post.id)}
                        className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all duration-200 w-full"
                      >
                        <h5 className="text-sm font-medium text-gray-900 hover:text-blue-600 leading-relaxed line-clamp-1">
                          {post.title}
                        </h5>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic">No posts yet</p>
                )}

                {/* Daha Fazla Göster Butonu */}
                {userPosts.length > 3 && (
                  <button
                    onClick={() => toggleExpandPosts(user.id)}
                    className="mt-3 px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium"
                  >
                    {isExpanded
                      ? `Show Less (${userPosts.length - 3} hidden)`
                      : `Show More (${userPosts.length - 3} more)`
                    }
                  </button>
                )}
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
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Yükleme durumu */}
      {users.length === 0 && (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">Loading users...</div>
        </div>
      )}
    </div>
  );
};

export default Users;