import course1 from "../assets/course1.webp";
import course2 from "../assets/course2.webp";
import course3 from "../assets/course3.png";
import course4 from "../assets/course5.png";

const images = [course1, course2, course3, course4];

function generateImageUrl() {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

export default generateImageUrl;
