import { MailIcon } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="bg-white py-18 px-4 sm:px-6 lg:px-8 rounded-3xl mx-auto shadow-xs mt-32 mb-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="size-16 bg-white rounded-xl flex-center mx-auto mb-6 shadow">
          <MailIcon className="size-8 text-app-green" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-semibold text-app-green mb-4">
          در خبرنامه ما عضو شوید
        </h2>
        <p className="text-app-text-light mb-8 text-base">
          به‌روزرسانی های هفتگی، پیشنهادات فصلی و تخفیفات ویژه را در ایمیل خود
          دریافت کنید.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            name="email"
            placeholder="ایمیل خود را وارد کنید"
            required
            className="flex-1 px-5 py-3.5 rounded-xl border border-app-border focus:border-app-green 
            focus:ring bg-white text-sm transition-all"
          />
          <button
            type="submit"
            className="px-8 bg-app-green text-white font-semibold rounded-xl hover:bg-app-green-light 
          transition-colors shadow-sm whitespace-nowrap active:scale-98"
          >
            عضو شوید
          </button>
        </form>
      </div>
    </section>
  );
}
