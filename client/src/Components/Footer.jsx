
import { Link } from 'react-router-dom';

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  return (
    <footer className="relative left-0 bottom-0 min-h-[10vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-6 pt-4">
        

        <div className="border-t border-gray-700/50 ">
          <p className="text-sm text-gray-400 mb-4 text-center font-medium">
            © {year} LMS Rides. All rights reserved.
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm">
            <Link 
              to="/privacy" 
              className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 hover:underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              to="/terms" 
              className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 hover:underline underline-offset-4"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;