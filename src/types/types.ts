export interface User {
  username: string;
  password: string;
  name: string;
  image?: string;
  createdAt: number;
  rating: number;
  status: 'user' | 'admin' | 'guest',
  age: number;
  gender: 'male' | 'female' | 'other';
}

export interface Settings {
  themes: 'dark' | 'light' | 'suprise';
  fontSize: 'larger' | 'smaller' | 'normal';
}

export interface Blog {
  id: string;
  title: string;
  text: string;
  author: Author;
  image: string;
  createdAt: number;
  tags: string[];
  likes: number;
  comments: Comment[];
}

export interface Comment {
  author: Author;
  creatAt: number;
  likes: number;
  text: string;
}

export interface Author {
  name: string;
  image: string;
  rating: number;
}

const generateBlog = (
  title: string,
  body: string,
  userId: number,
  id: string,
  imageid: number,
  tags: string[],
  delay1: number
): Blog => {
  return {
    id,
    title,
    text: body,
    author: {
      name: 'Elands',
      image: 'https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg',
      rating: 30,
    },
    image: `https://picsum.photos/id/${imageid}/200/300`,
    createdAt: Date.now() + delay1,
    likes: 0,
    tags: [...tags],
    comments: [
      {
        author: {
          name: 'Janis',
          image: 'https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg',
          rating: 2,
        },
        creatAt: Date.now(),
        likes: 2,
        text: 'sssadfawaea',
      },
    ],
  };
};

