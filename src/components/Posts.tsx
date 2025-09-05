const Posts = () => {
  return (
    <div className="flex flex-col items-center justify-between">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <ul>
          <li className="border-b border-gray-200 py-2">Post 1</li>
          <li className="border-b border-gray-200 py-2">Post 2</li>
          <li className="border-b border-gray-200 py-2">Post 3</li>
        </ul>
      </div>
    </div>
  );
};

export default Posts;
