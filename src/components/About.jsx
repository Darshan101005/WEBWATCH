import { ChevronRight, Target, Zap, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const values =[
    {
      icon: Zap,
      title: 'Speed',
      description: 'We believe in lightning-fast detection and response. Every millisecond counts when infrastructure is down.'
    },
    {
      icon: Target,
      title: 'Reliability',
      description: 'With 99.99% uptime, we practice what we preach. Your monitoring infrastructure should never fail.'
    },
    {
      icon: Heart, 
      title: 'Customer First',
      description: 'Your success is our success. We\'re committed to providing the best support and product in the industry.'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] px-4 sm:px-6 lg:px-8 py-20 flex items-center overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full text-center">
          <h1 className="text-5xl lg:text-6xl font-black leading-tight text-dark mb-6">
            About <span style={{backgroundImage: 'linear-gradient(to right, #F48024, #007791)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Webwatch</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            We're on a mission to make infrastructure monitoring simple, reliable, and accessible to everyone.
          </p>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-dark text-center mb-16">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 hover:border-primary group text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6 mx-auto group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                    <IconComponent className="w-8 h-8" style={{color: '#F48024'}} />
                  </div>
                  <h3 className="font-bold text-2xl mb-3 text-dark">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-dark mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            To empower teams worldwide to build and maintain resilient, always-on infrastructure. We believe every organization, regardless of size, deserves access to world-class monitoring tools. By making uptime monitoring simple, affordable, and powerful, we're enabling businesses to focus on what matters most: serving their users.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl lg:text-5xl font-black text-dark">
            Start Monitoring <span style={{backgroundImage: 'linear-gradient(to right, #F48024, #007791)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>With Webwatch</span>
          </h2>
          <p className="text-xl text-gray-600">Experience the difference with our comprehensive monitoring platform.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/signup" className="glow-btn glow-btn-primary text-lg">
              Get Started Free
              <ChevronRight size={24} />
            </Link>
            <Link to="/pricing" className="px-8 py-3 rounded-lg font-semibold border-2 border-gray-300 text-dark hover:border-primary hover:bg-gray-50 transition-all duration-300 inline-flex items-center gap-2 justify-center">
              View Pricing
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}