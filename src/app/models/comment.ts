export interface Comment {
  id: Number;
  idProduct: Number;
  idUser: Number;
  fullname: string;
  content: string;
  star1: string;
  star2: string;
  star3: string;
  star4: string;
  star5: string;
  createdAt: Date;
  updatedAt: Date;
};
export interface CommentCreate {
  idProduct: Number;
  idUser: Number;
  fullname: string;
  content: string;
  star1: string;
  star2: string;
  star3: string;
  star4: string;
  star5: string;
};
