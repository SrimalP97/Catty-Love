import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'srimal',
      email: 'admin@example.com',
      password: bcrypt.hashSync('12345'),
      isAdmin: true,
    },
    {
      name: 'Sahan',
      email: 'user@example.com',
      password: bcrypt.hashSync('12345'),
      isAdmin: false,
    },
  ],

  cats: [
    {
      // _id: '1',
      Cat_id: 'c1',
      name: ' Snoowy',
      age: '2 yr',
      gender: 'Male',
      description: 'Domestic Short Hair Cat',
      image: '/images/cat1.jpg',
      contact: '0768057625',
      Likes: 10,
      unlikes: 5,
      numReviews: 11,
      Geolocation: 'Matara',
    },
    {
      // _id: '2',
      Cat_id: 'c2',
      name: ' Mark',
      age: '2 yr',
      gender: 'Male',
      description: 'Domestic Short Hair Cat',
      image: '/images/cat2.jpg',
      contact: '0776557625',
      Likes: 20,
      unlikes: 5,
      numReviews: 21,
      Geolocation: 'Galle',
    },

    {
      // _id: '3',
      Cat_id: 'c3',
      name: ' Cherry',
      age: '3 yr',
      gender: 'Female',
      description: 'Domestic Short Hair Cat',
      image: '/images/cat3.jpg',
      contact: '0776557325',
      Likes: 30,
      unlikes: 5,
      numReviews: 31,
      Geolocation: 'Colombo',
    },

    {
      // _id: '4',
      Cat_id: 'c4',
      name: ' Dumble',
      age: '3 yr',
      gender: 'Male',
      description: 'Domestic Short Hair Cat',
      image: '/images/cat4.jpg',
      contact: '0756557625',
      Likes: 40,
      unlikes: 5,
      numReviews: 41,
      Geolocation: 'Kandy',
    },
  ],
};
export default data;
