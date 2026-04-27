import { useState } from 'react';
import { X, Phone, User, MessageSquare } from 'lucide-react';

export default function CourseRegistrationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to admin
    setTimeout(() => {
      // Adminlarga xabar yuboriladi
      const message = `Yangi kursga yozilish arizasi:\nIsm: ${formData.name}\nTelefon: ${formData.phone}\nIzoh: ${formData.comment}`;
      console.log('Admin notification:', message);
      
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Formni tozalash
      setTimeout(() => {
        setFormData({ name: '', phone: '', comment: '' });
        setShowSuccess(false);
        onClose();
      }, 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Kursga yozilish</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {showSuccess ? (
          <div className="text-center py-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-400">
              <Phone size={32} />
            </div>
            <h4 className="mt-4 text-lg font-semibold text-white">Arizangiz qabul qilindi!</h4>
            <p className="mt-2 text-gray-300">
              Tez orada adminlar siz bilan bog'lanishadi.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                <User className="inline mr-2" size={16} />
                Ism
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                placeholder="Ismingizni kiriting"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                <Phone className="inline mr-2" size={16} />
                Telefon raqam
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                placeholder="+998 90 000 00 00"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                <MessageSquare className="inline mr-2" size={16} />
                Izoh
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all resize-none"
                placeholder="Qaysi kursga qiziqish bildirayapsiz?"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-green-500/20 transition-all hover:from-green-500 hover:to-emerald-600 hover:shadow-green-500/30 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Yuborilmoqda...' : 'Yuborish'}
            </button>
          </form>
        )}

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Adminlar siz kiritgan ma'lumotlar bilan bog'lanishadi
          </p>
        </div>
      </div>
    </div>
  );
}
