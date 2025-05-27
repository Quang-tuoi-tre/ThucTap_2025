import axios from "axios";
import { useEffect, useState } from "react";
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Định nghĩa kiểu Post
interface Post {
  id: number;
  title: string;
  body: string;
}

export function AxiosPage() {
  const [posts, setPosts] = useState<Post[]>([]); // Xác định kiểu của posts là mảng Post
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animals, setAnimals] = useState([
    {
      id: 1,
      name: 'Chó',
      age: 2,
      type: 'Động vật nuôi',
    },
    {
      id: 2,
      name: 'Mèo',
      age: 3,
      type: 'Động vật nuôi',
    },
    {
      id: 3,
      name: 'Hổ',
      age: 5,
      type: 'Động vật hoang dã',
    },
  ]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get<Post[]>(API_URL); // Xác định rằng dữ liệu nhận được là mảng các đối tượng Post
        const getPosts = response.data.slice(0, 3); // Giới hạn số lượng bài viết hiển thị
        setPosts(getPosts);
        console.log(getPosts);
        setLoading(false);
      } catch (errors: unknown) {
        if (errors instanceof Error) {
          setError(errors.message || 'Đã xảy ra lỗi khi tải dữ liệu.');
        } else {
          setError('Lỗi không xác định.');
        }
        setLoading(true);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  return (
    <div>
      <h1>Danh sách các loài động vật</h1>
      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>
            <h2>{animal.name}</h2>
            <p>{animal.age}</p>
            <p>{animal.type}</p>
            <button onClick={() => setAnimals(animals.filter((item) => item.id !== animal.id))}>
              Xóa
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <h1>Danh sách bài viết</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>- {post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}


// const responseInterceptor = axios.interceptors.response.use(function (response) {
//   // Tạo một phản hồi giả lập
//   const fakeResponse = {
//     data: [
//       {
//         id: 1,
//         title: "Mèo",
//         body: "Động vật nuôi"
//       },
//       {
//         id: 2,
//         title: "Hổ",
//         body: "Động vật hoang dã"
//       },
//       {
//         id: 3,
//         title: "Chó",
//         body: "Động vật nuôi"
//       },
//       {
//         id: 4,
//         title: "Gà",
//         body: "Động vật nuôi"
//       },
//       {
//         id: 5,
//         title: "Cá",
//         body: "Động vật nuôi"
//       }
//     ],
//     status: 200, // Mã trạng thái HTTP
//     statusText: "OK",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     config: {
//       url: API_URL,
//       method: "get"
//     },
//     channelname: "Fake Channel" // Thêm thông tin kênh giả
//   };

//   console.log('Phản hồi giả lập:', fakeResponse); // Log phản hồi giả lập
//   return fakeResponse; // Trả về phản hồi giả lập
// }, function (error) {
//   return Promise.reject(error); // Xử lý lỗi nếu có
// });

// Interceptors giống như một người kiểm tra thư trước khi gửi hoặc nhận thư. Bạn có thể thay đổi hoặc kiểm tra yêu cầu trước khi gửi đi và kiểm tra phản hồi trước khi xử lý.

// Request Interceptor giúp bạn thay đổi yêu cầu trước khi gửi (như thêm con tem).

// Response Interceptor giúp bạn kiểm tra phản hồi trước khi làm gì đó với nó (như kiểm tra thư có bị hỏng không).

// Bạn có thể gỡ bỏ interceptor nếu không cần nó nữa.

// Bạn có thể tạo nhiều kiểu thư (instance Axios) với các interceptor riêng biệt cho mỗi yêu cầu.


// Interceptors giống như một hệ thống kiểm tra trước và sau khi gửi hoặc nhận bưu kiện. Bạn có thể thêm thông tin, kiểm tra hoặc chỉnh sửa bưu kiện hoặc phản hồi.

// Bạn có thể xóa các interceptor nếu không cần nữa.

// Nếu bạn muốn chạy interceptor chỉ trong một số trường hợp nhất định (ví dụ: yêu cầu GET), bạn có thể sử dụng runWhen.

// Các interceptors thực thi theo chuỗi và dữ liệu sẽ được xử lý lần lượt.