import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/5 bg-night-900">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            Premium automotive parts and accessories, engineered for the roads
            we actually drive on. Vision. Aroma. Care. One standard, the
            NightFury standard.
          </p>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-flame-500">
            Drive the Difference
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            Product Lines
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
            <li><Link href="/vision" className="hover:text-flame-400">NightFury Vision</Link></li>
            <li><Link href="/aroma" className="hover:text-flame-400">NightFury Aroma</Link></li>
            <li><Link href="/care" className="hover:text-flame-400">NightFury Care</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            Authorized Distributor
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
            <li className="font-semibold text-slate-300">Yash Marketing, Kanpur</li>
            <li>
              <a href="mailto:yashp.marketing@gmail.com" className="hover:text-flame-400">
                yashp.marketing@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+919839187898" className="hover:text-flame-400">
                +91 98391 87898
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            Contact
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
            <li>
              <a href="mailto:support@nightfury.co.in" className="hover:text-flame-400">
                support@nightfury.co.in
              </a>
            </li>
            <li>
              <a href="tel:+919839600197" className="hover:text-flame-400">
                +91 98396 00197
              </a>
            </li>
            <li>Mon - Sat, 10:00 - 19:00 IST</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} NightFury Automotive. All rights reserved.
      </div>
    </footer>
  );
}
