import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handlePhoneChange = (e: any) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 9) {
            setPhone(value);
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!phone || phone.length !== 9) {
            setError(
                "Iltimos, to‘liq telefon raqamini kiriting (masalan, 901234567)"
            );
            return;
        }

        if (!password) {
            setError("Iltimos, parolni kiriting");
            return;
        }

        const fullPhoneNumber = `+998${phone}`;
        console.log("Login:", { phone: fullPhoneNumber, password });
        setError("");
    };

    return (
        <div className="min-h-screen bg-[#F2F7FC] flex items-center justify-center p-5">
            <div className="backdrop-blur-lg bg-white/60 shadow-2xl p-10 rounded-3xl w-full max-w-md border border-blue-100 transition-transform hover:scale-[1.03]">
                <h2 className="text-3xl font-bold text-center mb-8 text-[#333333]">
                    Xush Kelibsiz
                </h2>

                {error && (
                    <div className="mb-6 p-3 rounded-lg bg-red-100/60 border border-red-300 text-red-700 flex gap-2 items-center">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* PHONE */}
                    <div>
                        <label className="block text-[#333333] font-medium mb-2">
                            Telefon raqami
                        </label>
                        <div className="flex items-center border border-[#56CCF2] rounded-lg overflow-hidden bg-white/70">
                            <span className="pl-4 pr-2 text-gray-500 text-sm">
                                +998
                            </span>
                            <input
                                type="text"
                                value={phone}
                                onChange={handlePhoneChange}
                                placeholder="901234567"
                                className="w-full p-3 text-[#333333] placeholder-gray-400 bg-transparent focus:outline-none"
                                maxLength={9}
                            />
                        </div>
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="block text-[#333333] font-medium mb-2">
                            Parol
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Parolingizni kiriting"
                                className="w-full p-3 pr-12 border border-[#56CCF2] rounded-lg text-[#333333] bg-white/70 placeholder-gray-400 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2F80ED] hover:opacity-80"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        className="w-full p-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#56CCF2] to-[#2F80ED] hover:from-[#4bb0e4] hover:to-[#2566c5] transition-all duration-300 shadow-md"
                    >
                        Kirish
                    </button>
                </form>

                <p className="mt-6 text-center text-[#333333]">
                    Hisobingiz yo'qmi?{" "}
                    <Link
                        to="/register"
                        className="text-[#2F80ED] hover:underline font-medium"
                    >
                        Ro'yxatdan o'tish
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
