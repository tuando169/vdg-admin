export type DoodleRequest = {
  title: string,
  image: File,
  description: string,
  category: string
}

export type DoodleResponse = {
  time: {
    end: null,
    event: string,
    dateString: string
  },
  _id: string,
  title: string,
  image: string,
  description: string,
  likes: number,
  views: number,
  doodle_category_id: string[],
  createdAt: string,
  updatedAt: string,
  slug: string,
  status: boolean,
  information: string,
  format: string,
}

export type Category = {
  _id: "6634c04c7be1776408028f6f",
  title: "Tháng 1",
  createdAt: "2024-05-03T10:45:32.080Z",
  updatedAt: "2024-05-03T10:45:32.080Z",
  slug: "thang-1",
}[]