export interface PostType {
  id: number;
  imgSrc: string[];
  link: {
    title: string;
    url: string;
  }[];
  type: string;
  title: string;
  content: string;
  createdAt: string;
}
