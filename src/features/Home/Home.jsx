import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Users, Zap, Shield, ArrowRight, Menu, X, Play, Check } from 'lucide-react';
import FadeContent from '../../components/Common/FadeContent';

import AuthForm from '../Auth/AuthForm';


const Home = () => {
  
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Built for speed with cutting-edge technology that delivers results in milliseconds."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guaranteed for your peace of mind."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description: "Seamless collaboration tools that bring your team together, wherever they are."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CEO, TechStart",
      content: "This platform transformed how we work. The results speak for themselves.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Developer",
      content: "Incredibly intuitive interface with powerful features under the hood.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Product Manager",
      content: "Game-changing solution that scaled perfectly with our growing team.",
      rating: 5
    }
  ];

  return (
<FadeContent blur={true} duration={1200} easing="ease-out" initialOpacity={0}>

    <div className="min-h-screen w-full bg-gray-100 text-gray-700">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
              Build Something
              <br />
              <span className="text-gray-900">Extraordinary</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-600">
              Transform your ideas into reality with our cutting-edge platform. 
              Join thousands of creators who are already building the future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group bg-gray-800 text-white px-8 py-4 rounded-xl hover:bg-gray-900 transition-all transform hover:scale-105 hover:shadow-xl flex items-center text-lg font-semibold">
                Get TempMail
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            
            </div>
            

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the perfect blend of power, simplicity, and innovation 
              designed to accelerate your success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-gray-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-gradient-to-r from-gray-600 to-gray-800 text-white p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-gray-300">Support</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold mb-2">150+</div>
              <div className="text-gray-300">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our community
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-100 to-gray-200">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-gray-600 leading-relaxed">
            Join thousands of creators who are already building amazing things. 
            Start your journey today with our free trial.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button className="group bg-gray-800 text-white px-8 py-4 rounded-xl hover:bg-gray-900 transition-all transform hover:scale-105 hover:shadow-xl flex items-center text-lg font-semibold">
              Start Free Trial
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-gray-800 text-gray-800 px-8 py-4 rounded-xl hover:bg-gray-800 hover:text-white transition-all transform hover:scale-105 text-lg font-semibold">
              Schedule Demo
            </button>
          </div>
          
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>


    </div>
    </FadeContent>
  );
}

export default Home;