import banner from "../assets/images/banner2.png";

export default function Banner() {
  return (
    <div>
      <img srcSet={`${banner} 2x`} alt="banner" className="object-cover w-full h-full aspect-[2000/400]" />
    </div>
  );
}
