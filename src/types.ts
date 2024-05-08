export type Doodle = {
  time: {
    end: null,
    event: string,
    dateString: string
  },
  id: string,
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
  id: string,
  title: string,
  createdAt: string,
  updatedAt: string,
  slug: string,
}