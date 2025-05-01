import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Mellow</h3>
            <p className="mb-4">
              We provide high-quality products at competitive prices, with a focus on customer satisfaction and sustainable practices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=men's clothing" className="hover:text-white transition-colors">
                  Men's Clothing
                </Link>
              </li>
              <li>
                <Link to="/products?category=women's clothing" className="hover:text-white transition-colors">
                  Women's Clothing
                </Link>
              </li>
              <li>
                <Link to="/products?category=jewelery" className="hover:text-white transition-colors">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link to="/products?category=electronics" className="hover:text-white transition-colors">
                  Electronics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 text-gray-400" />
                <span>123 Mellow St, Fashion District, CA 90210, USA</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-gray-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-gray-400" />
                <span>support@mellow.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Mellow. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <img 
                src="https://images.pexels.com/photos/5699645/pexels-photo-5699645.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=300" 
                alt="Payment Methods" 
                className="h-6" 
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;