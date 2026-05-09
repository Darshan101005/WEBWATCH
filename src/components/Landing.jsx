import { ChevronRight, Activity, Bell, TrendingUp, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-section.png';

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Viewport Height */}
      <section className="relative min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-0 py-0 flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-5 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-black leading-tight text-dark mb-2">
              Keep Your
            </h1>
            <h1 className="text-5xl lg:text-6xl font-black leading-tight text-dark mb-2">
              Infrastructure
            </h1>
            <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-8">
              <span style={{backgroundImage: 'linear-gradient(to right, #F48024, #007791)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Always Online</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl">
              Real-time uptime monitoring and status page platform. Detect downtime instantly and keep your users informed.
            </p>
            <Link to="/signup" className="glow-btn glow-btn-primary">
              Get Started
              <ChevronRight size={20} />
            </Link>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <img src={heroImage} alt="Hero Section" className="max-w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-dark mb-12">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 - Normal */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 hover:border-primary group">
              <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                <Activity className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Real-time Monitoring</h3>
              <p className="text-gray-600 text-sm">Track uptime and performance metrics continuously</p>
            </div>

            {/* Card 2 - Instant Alerts */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 hover:border-primary group">
              <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                <Bell className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Instant Alerts</h3>
              <p className="text-gray-600 text-sm">Get notified within seconds of an outage</p>
            </div>

            {/* Card 3 - Normal */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 hover:border-primary group">
              <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Analytics</h3>
              <p className="text-gray-600 text-sm">Comprehensive insights into your infrastructure health</p>
            </div>

            {/* Card 4 - Normal */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 hover:border-primary group">
              <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                <Globe className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Status Page</h3>
              <p className="text-gray-600 text-sm">Beautiful public status page for transparency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-black text-center mb-4 text-dark">Why Choose Webwatch?</h2>
          <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">Everything you need to keep your infrastructure running smoothly</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: '01', title: '99.9% Uptime', desc: 'Industry-leading reliability' },
              { num: '02', title: 'Global Coverage', desc: 'Monitor from 50+ locations' },
              { num: '03', title: 'Lightning Fast', desc: 'Get alerts within seconds' },
              { num: '04', title: 'Easy Integration', desc: 'Works with all platforms' },
              { num: '05', title: 'Beautiful UI', desc: 'Intuitive dashboard' },
              { num: '06', title: '24/7 Support', desc: 'Expert support always ready' },
            ].map((item) => (
              <div key={item.num} className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-primary hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 space-y-3">
                  <div style={{backgroundImage: 'linear-gradient(to right, #F48024, #007791)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}} className="text-5xl font-black">{item.num}</div>
                  <h3 className="text-xl font-bold text-dark">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl lg:text-5xl font-black text-dark">
            Ready to Monitor Your <span style={{backgroundImage: 'linear-gradient(to right, #F48024, #007791)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Infrastructure?</span>
          </h2>
          <p className="text-xl text-gray-600">Join thousands of companies trusting Webwatch for their uptime needs</p>
          <Link to="/signup" className="glow-btn glow-btn-primary text-lg">
            Get Started Now
            <ChevronRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
}
