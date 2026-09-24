import { Mail, Phone, MessageCircle, Trash2, Ban } from "lucide-react";

export default function UserCard({ user, onDelete, onBlacklist }) {
  const { name, age, email, phone, feedback } = user;

  return (
    <div className="relative bg-white rounded-2xl shadow-md shadow-emerald-100 border border-emerald-100 overflow-hidden hover:shadow-xl hover:shadow-emerald-100 hover:-translate-y-1 transition-all duration-300">

      {/* Top accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-lime-400 to-yellow-300" />

      <div className="p-5">

        {/* Avatar + Name + Age */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-lime-400 flex items-center justify-center text-emerald-900 font-extrabold text-lg shadow-md shadow-emerald-200 flex-shrink-0">
            {name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 leading-tight">{name}</h3>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Age {age}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-emerald-50 mb-4" />

        {/* Info rows */}
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <Mail size={13} className="text-emerald-500" />
            </div>
            <span className="text-xs text-slate-500 truncate">{email}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-lime-50 flex items-center justify-center flex-shrink-0">
              <Phone size={13} className="text-lime-600" />
            </div>
            <span className="text-xs text-slate-500">{phone}</span>
          </div>
        </div>

        {/* Feedback box */}
        <div className="bg-gradient-to-br from-emerald-50 to-lime-50 border border-emerald-100 rounded-xl p-3 mb-5">
          <div className="flex items-center gap-1.5 mb-1.5">
            <MessageCircle size={12} className="text-emerald-500" />
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Feedback</p>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{feedback}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            // onClick={() => onBlacklist(user)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-xl border-2 border-slate-200 text-slate-500 hover:border-orange-300 hover:text-orange-500 hover:bg-orange-50 active:scale-95 transition-all duration-200"
          >
            <Ban size={13} />
            Blacklist
          </button>
          <button
            // onClick={() => onDelete(user._id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-xl border-2 border-slate-200 text-slate-500 hover:border-rose-300 hover:text-rose-500 hover:bg-rose-50 active:scale-95 transition-all duration-200"
          >
            <Trash2 size={13} />
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}