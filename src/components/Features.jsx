import { ChevronRight, Activity, Bell, TrendingUp, Globe, Zap, Shield, Code, Users, BarChart3, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Features() {
  const features = [
    {
      icon: Activity,
      title: 'Real-time Monitoring',
      description: 'Monitor your entire infrastructure continuously with sub-second accuracy and real-time status updates.'
    },
    {
      icon: Bell,
      title: 'Instant Alerts',
      description: 'Receive notifications within seconds of an outage via email, SMS, Slack, or webhooks.'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Get comprehensive insights into your infrastructure health with detailed performance metrics and trends.'
    },
    {
      icon: Globe,
      title: 'Public Status Page',
      description: 'Beautiful, customizable status page to keep your customers informed during incidents.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Experience blazing-fast monitoring with minimal latency and maximum reliability.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security with GDPR compliance and SOC 2 certification.'
    },
    {
      icon: Code,
      title: 'API Integration',
      description: 'Powerful REST API for seamless integration with your existing tools and workflows.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Manage multiple team members with granular permissions and role-based access control.'
    },
    {
      icon: BarChart3,
      title: 'Detailed Reports',
      description: 'Generate comprehensive uptime reports for compliance, audits, and stakeholder reporting.'
    },
    {
      icon: Clock,
      title: 'Historical Data',
      description: 'Access historical uptime data with 99% retention for long-term trend analysis.'
    },
    {
      icon: AlertCircle,
      title: 'Smart Escalation',
      description: 'Automated escalation policies ensure the right person is notified at the right time.'
    },
    {
      icon: CheckCircle,
      title: '99.9% Uptime SLA',
      description: 'Industry-leading reliability backed by our 99.9% uptime guarantee.'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] px-4 sm:px-6 lg:px-8 py-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-5 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full text-center">
          <h1 className="text-5xl lg:text-6xl font-black leading-tight text-dark mb-6">
            Powerful Features for <span style={{backgroundImage: 'linear-gradient(to right, #F48024, #007791)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Complete Control</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Everything you need to monitor your infrastructure, detect outages, and keep your users informed.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 hover:border-primary group">
                  <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                    <IconComponent className="w-7 h-7" style={{color: '#F48024'}} />
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-dark">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-dark text-center mb-16">Why Teams Love Webwatch</h2>
          
          <div className="space-y-12">
            {/* Highlight 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 h-64 flex items-center justify-center">
                <Activity size={120} className="text-primary/50" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-dark mb-4">Global Monitoring Network</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Monitor your services from 50+ locations worldwide. Detect issues faster than anyone else with our distributed monitoring infrastructure.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-dark">
                    <CheckCircle size={20} style={{color: '#F48024'}} />
                    <span>Multiple geographic locations</span>
                  </li>
                  <li className="flex items-center gap-2 text-dark">
                    <CheckCircle size={20} style={{color: '#F48024'}} />
                    <span>Sub-second response times</span>
                  </li>
                  <li className="flex items-center gap-2 text-dark">
                    <CheckCircle size={20} style={{color: '#F48024'}} />
                    <span>Redundant infrastructure</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Highlight 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 h-64 flex items-center justify-center">
                <Bell size={120} className="text-primary/50" />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-black text-dark mb-4">Intelligent Notifications</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Never miss an outage with our multi-channel notification system. Alerts through email, SMS, Slack, Discord, and custom webhooks.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-dark">
                    <CheckCircle size={20} style={{color: '#F48024'}} />
                    <span>Multi-channel delivery</span>
                  </li>
                  <li className="flex items-center gap-2 text-dark">
                    <CheckCircle size={20} style={{color: '#F48024'}} />
                    <span>Smart escalation policies</span>
                  </li>
                  <li className="flex items-center gap-2 text-dark">
                    <CheckCircle size={20} style={{color: '#F48024'}} />
                    <span>Customizable alert thresholds</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Highlight 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 h-64 flex items-center justify-center">
                <Globe size={120} className="text-primary/50" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-dark mb-4">Beautiful Status Pages</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Keep your customers informed with an elegant, customizable status page. Choose from pre-built themes or create your own.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-dark">
                    <CheckCircle size={20} style={{color: '#F48024'}} />
                    <span>Fully customizable branding</span>
                  </li>
                  <li className="flex items-center gap-2 text-dark">
                    <CheckCircle size={20} style={{color: '#F48024'}} />
                    <span>Incident history tracking</span>
                  </li>
                  <li className="flex items-center gap-2 text-dark">
                    <CheckCircle size={20} style={{color: '#F48024'}} />
                    <span>Component-level status</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl lg:text-5xl font-black text-dark">
            Ready to Experience All <span style={{backgroundImage: 'linear-gradient(to right, #F48024, #007791)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>These Features?</span>
          </h2>
          <p className="text-xl text-gray-600">Get started with a free account today. No credit card required.</p>
          <Link to="/signup" className="glow-btn glow-btn-primary text-lg">
            Start Free Trial
            <ChevronRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
}
