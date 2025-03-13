import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0047AB] text-white">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold">Welcome to Our Service</h1>
        <p className="text-lg">Join us and explore amazing features.</p>
        <button
          className="bg-white text-[#0047AB] px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          <Link href = "/login">
          시작하기  
          </Link>
        </button>
      </div>
    </div>
  );
}
