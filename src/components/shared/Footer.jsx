import React from 'react';
import { Calendar, Mail, Phone } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="flex justify-center items-center space-x-1">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-base font-semibold">Campus Connect</span>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Connecting campus events with students
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
            <ul className="mt-1 space-y-1">
              <li className="flex justify-center items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <Mail className="h-3 w-3" />
                <span>support@campusconnect.com</span>
              </li>
              <li className="flex justify-center items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <Phone className="h-3 w-3" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
            <ul className="mt-1 space-y-1">
              <li>
                <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Campus Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
