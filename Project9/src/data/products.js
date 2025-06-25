import headphones from '../assets/headphones.WEBP';
import watch from '../assets/watch.WEBP';
import speaker from '../assets/speaker.WEBP';
import mouse from '../assets/mouse.WEBP';
const products = [
  {
    id: 1,
    title: 'Wireless Headphones',
    description: 'High quality wireless sound with noise cancellation.',
    price: 59.99,
    image: headphones,
  },
  {
    id: 2,
    title: 'Smart Watch',
    description: 'Track your health and stay connected on the go.',
    price: 99.99,
    image: watch,
  },
  {
    id: 3,
    title: 'Bluetooth Speaker',
    description: 'Portable speaker with amazing sound and bass.',
    price: 29.99,
    image: speaker,
  },
  {
    id: 4,
    title: 'Gaming Mouse',
    description: 'Ergonomic mouse with RGB lighting for gamers.',
    price: 39.99,
    image: mouse,
  }
];

export default products;
