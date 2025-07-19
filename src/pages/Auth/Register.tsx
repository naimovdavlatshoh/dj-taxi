import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, UploadCloud } from "lucide-react";

const Register = () => {
    type FormDataType = {
        firstName: string;
        lastName: string;
        experience: string;
        phone: string;
        password: string;
        confirmPassword: string;
        photo: File | null;
    };

    const [formData, setFormData] = useState<FormDataType>({
        firstName: "",
        lastName: "",
        experience: "",
        phone: "",
        password: "",
        confirmPassword: "",
        photo: null,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;

        if (name === "phone") {
            const cleaned = value.replace(/\D/g, "");
            if (cleaned.length <= 9) {
                setFormData((prev) => ({ ...prev, phone: cleaned }));
            }
        } else if (name === "photo") {
            setFormData((prev) => ({
                ...prev,
                photo: files ? files[0] : null,
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const {
            firstName,
            lastName,
            experience,
            phone,
            password,
            confirmPassword,
        } = formData;

        if (
            !firstName ||
            !lastName ||
            !experience ||
            !phone ||
            !password ||
            !confirmPassword
        ) {
            setError("Iltimos, barcha maydonlarni to‘ldiring.");
            return;
        }

        if (phone.length !== 9) {
            setError(
                "Telefon raqami noto‘g‘ri. 9 ta raqam kiriting (901234567)."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Parollar mos emas.");
            return;
        }

        const fullPhone = `+998${phone}`;

        const userData = {
            ...formData,
            phone: fullPhone,
        };

        console.log("User registered:", userData);
        setError("");
    };

    return (
        <div className="min-h-screen bg-[#F2F7FC] flex items-center justify-center p-5">
            <div className="w-full px-5">
                <h2 className="text-3xl font-bold text-center mb-6 text-[#333]">
                    Ro'yxatdan o'tish
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

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Ismingiz"
                            className="p-3 rounded-lg border border-[#56CCF2] bg-white placeholder-gray-400 focus:outline-none"
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Familiyangiz"
                            className="p-3 rounded-lg border border-[#56CCF2] bg-white placeholder-gray-400 focus:outline-none"
                        />
                    </div>

                    <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="Haydovchilik staj (yil)"
                        className="w-full p-3 rounded-lg border border-[#56CCF2] bg-white placeholder-gray-400 focus:outline-none"
                    />

                    <div className="flex items-center border border-[#56CCF2] rounded-lg overflow-hidden bg-white/70">
                        <span className="pl-4 pr-2 text-gray-500 text-sm">
                            +998
                        </span>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="901234567"
                            className="w-full p-3 text-[#333333] placeholder-gray-400 bg-transparent focus:outline-none"
                            maxLength={9}
                        />
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Parol"
                            className="w-full p-3 pr-12 rounded-lg border border-[#56CCF2] bg-white placeholder-gray-400 focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2F80ED]"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type={showConfirm ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Parolni tasdiqlang"
                            className="w-full p-3 pr-12 rounded-lg border border-[#56CCF2] bg-white placeholder-gray-400 focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2F80ED]"
                        >
                            {showConfirm ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>

                    <div className="w-full">
                        <label className="block text-[#333333] font-medium mb-2">
                            Rasmingiz
                        </label>
                        <label className="flex items-center gap-3 px-4 py-2 border border-[#56CCF2] rounded-lg bg-white cursor-pointer hover:bg-blue-50 transition">
                            <UploadCloud size={20} className="text-[#2F80ED]" />
                            <span className="text-sm text-[#333]">
                                {formData.photo
                                    ? formData.photo.name
                                    : "Rasm tanlang..."}
                            </span>
                            <input
                                type="file"
                                name="photo"
                                accept="image/*"
                                onChange={handleChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#56CCF2] to-[#2F80ED] hover:from-[#4bb0e4] hover:to-[#2566c5] transition-all duration-300 shadow-md"
                    >
                        Ro'yxatdan o'tish
                    </button>
                </form>

                <p className="mt-6 text-center text-[#333333]">
                    Hisobingiz bormi?{" "}
                    <Link
                        to="/"
                        className="text-[#2F80ED] hover:underline font-medium"
                    >
                        Kirish
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
