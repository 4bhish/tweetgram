import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    imgSrc:'https://avatars.githubusercontent.com/u/77970855?s=280&v=4',
    username: "adarshbalika",
    password: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Rahul",
    lastName: "Hadimani",
    imgSrc:'https://im.rediff.com/cricket/2017/dec/14rohit2.jpg?w=670&h=900',
    username: "rahul",
    password: "rahul",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Cristiano",
    lastName: "Ronaldo",
    imgSrc:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSPFrhrdxE76ug8Dq6HivaQg9va2rUv1xX5Sw&usqp=CAU',
    username: "cristiano",
    link:"wwww.cristianoronaldo.com",
    password: "cristiano",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Leo",
    lastName: "Messi",
    imgSrc:'https://i.pinimg.com/736x/5e/61/7b/5e617ba27b0cbdd6d2424d02630b2a68.jpg',
    username: "messi",
    password: "messi",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
