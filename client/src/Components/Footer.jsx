import {
  Facebook,
  Globe,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  return (
    <footer className="bg-gradient-to-r from-teal-800 to-teal-900 border-t border-teal-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-white text-xl font-semibold flex items-center">
              <span className="bg-teal-600 p-2 rounded-lg mr-3">
                <Globe className="w-6 h-6 text-white" />
              </span>
               LMS Academy
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering learners worldwide with quality education. Your
              success is our mission.
            </p>
            <div className="flex items-center space-x-5 mt-6">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 bg-teal-600 hover:bg-teal-500 rounded-full transition-all duration-300 group"
                  aria-label={Icon.name}
                >
                  <Icon className="w-5 h-5 text-gray-200 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-white text-lg font-semibold mb-4">
              Get in Touch
            </h3>
            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  text: "123 Education Ave, Tech City, TC 54321",
                },
                {
                  icon: Phone,
                  text: "+91 99880 95656",
                },
                {
                  icon: Mail,
                  text: "support@coursify.com",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start text-gray-300 group">
                  <item.icon className="w-5 h-5 mt-1 mr-3 text-teal-300 flex-shrink-0" />
                  <span className="text-sm hover:text-white transition-colors duration-300">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Access
            </h3>
            <ul className="space-y-4">
              {[
                { path: "/about", icon: Globe, label: "About Us" },
                { path: "/services", icon: Heart, label: "Our Services" },
                { path: "/careers", icon: Linkedin, label: "Careers" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 group"
                  >
                    <link.icon className="w-5 h-5 mr-3 text-teal-300 group-hover:text-white" />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-white text-lg font-semibold mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for course updates and learning resources.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-teal-800/50 border border-teal-600/30 text-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400 text-sm"
              />
              <button className="bg-white hover:bg-gray-100 text-teal-800 px-6 py-3 rounded-lg transition-all duration-300 font-semibold text-sm whitespace-nowrap shadow-md hover:shadow-teal-400/20">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-teal-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-300 text-center">
              © {year} Coursify. Crafted with{" "}
              <Heart className="inline w-4 h-4 text-rose-400" /> in India
            </p>
            <div className="flex items-center space-x-6">
              <Link
                to="/privacy"
                className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium"
              >
                Privacy Policy
              </Link>
              <div className="w-px h-4 bg-teal-600/50" />
              <Link
                to="/terms"
                className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;