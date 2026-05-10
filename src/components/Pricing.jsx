import { ChevronRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const plans =[
    {
      name: 'Starter',
      price: '29',
      description: 'Perfect for small projects',
      features:[
        'Up to 5 monitors',
        'Email & SMS alerts',
        'Public status page',
        '7-day incident history',
        'Basic analytics',
        'Community support',
        '99.9% uptime SLA',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '79',
      description: 'For growing teams',
      features:[
        'Up to 50 monitors',
        'Email, SMS & Slack alerts',
        'Advanced status page',
        '90-day incident history',
        'Advanced analytics',
        'Priority email support',
        'API access',
        '99.95% uptime SLA',
        'Custom branding',
      ],
      cta: 'Get Started',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: '200', 
      description: 'For large organizations',
      features:[
        'Unlimited monitors',
        'All notification channels',
        'White-label status page',
        'Unlimited incident history',
        'Custom analytics & reporting',
        '24/7 phone support',
        'Advanced API access',
        '99.99% uptime SLA',
        'Dedicated account manager',
        'Single sign-on (SSO)',
        'Advanced security',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] px-4 sm:px-6 lg:px-8 py-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-5 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full text-center">
          <h1 className="text-5xl lg:text-6xl font-black leading-tight text-dark mb-6">
            Simple, Transparent <span style={{backgroundImage: 'linear-gradient(to right, #F48024, #007791)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Choose the perfect plan for your monitoring needs. All plans include email support and a 14-day free trial.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                  plan.highlighted 
                    ? 'bg-white border-2 border-primary shadow-2xl scale-105 md:scale-110' 
                    : 'bg-white border border-gray-200 hover:border-primary hover:shadow-xl'
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-gradient-to-r from-primary/20 to-secondary/20 px-6 py-2 text-center">
                    <span className="text-sm font-bold" style={{color: '#F48024'}}>MOST POPULAR</span>
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-black text-dark mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-black text-dark">${plan.price}</span>
                    {plan.price !== '' && <span className="text-gray-600 ml-2">/month</span>}
                  </div>
                  
                  <Link 
                    to="/signup" 
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 mb-8 ${
                      plan.highlighted 
                        ? 'glow-btn glow-btn-primary' 
                        : 'border-2 border-gray-300 text-dark hover:border-primary hover:bg-gray-50'
                    }`}
                  >
                    {plan.cta}
                    <ChevronRight size={20} />
                  </Link>
                  
                  <div className="space-y-3">
                    {plan.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-3">
                        <Check size={20} style={{color: '#F48024', marginTop: '2px'}} className="flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-dark text-center mb-16">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                q: 'Can I change plans at any time?',
                a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.'
              },
              {
                q: 'Do you offer monthly or annual billing?',
                a: 'We offer both monthly and annual billing. Annual billing comes with a 20% discount.'
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes! Every plan comes with a 14-day free trial. No credit card required to get started.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and wire transfers for enterprise customers.'
              },
              {
                q: 'Can I cancel my subscription?',
                a: 'Yes, you can cancel anytime. No long-term contracts or hidden fees. You\'ll have access until the end of your billing period.'
              },
              {
                q: 'Do you offer custom plans?',
                a: 'Absolutely! Contact our sales team for custom enterprise packages tailored to your needs.'
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-primary transition-all duration-300">
                <h3 className="font-bold text-lg text-dark mb-3">{item.q}</h3>
                <p className="text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Money Back Guarantee */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-dark mb-4">30-Day Money Back Guarantee</h2>
          <p className="text-lg text-gray-600 mb-8">
            If you're not completely satisfied with Webwatch within the first 30 days, we'll refund 100% of your payment. No questions asked.
          </p>
          <Link to="/signup" className="glow-btn glow-btn-primary text-lg">
            Start Your Free Trial
            <ChevronRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
}