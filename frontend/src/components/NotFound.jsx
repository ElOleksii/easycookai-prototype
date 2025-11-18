import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-mainBackground text-darkBrown font-montserrat">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Сторінку не знайдено</p>
      <Link
        to="/"
        className="px-6 py-3 bg-darkBrown text-[#FDF8EF] rounded-full hover:opacity-90 transition"
      >
        На головну
      </Link>
    </div>
  );
}
