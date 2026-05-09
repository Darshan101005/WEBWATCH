import { useState, useEffect } from 'react';
import logo from '../assets/webwatch-logo.png';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.02-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.155.285-.314.74-.465 2.889-.87 5.487-1.652 7.273-2.334 1.73-.656 3.157-1.26 4.525-2.4z"/>
  </svg>
);

export default function Footer() {
  const [ipInfo, setIpInfo] = useState({ ip: 'Loading...', city: '', country: '', isp: '' });

  useEffect(() => {
    const fetchIpData = async () => {
      try {
        const response = await fetch('http://demo.ip-api.com/json/?fields=66842623&lang=en');
        const data = await response.json();

        if (data.status === 'success') {
          setIpInfo({
            ip: data.query || 'N/A',
            city: data.city || '',
            country: data.country || '',
            isp: data.isp || ''
          });
        }
      } catch (error) {
        setIpInfo({ ip: 'N/A', city: '', country: '', isp: '' });
      }
    };
    fetchIpData();
  }, []);

  return (
    <footer className="bg-black text-white border-t-2 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Webwatch" className="h-12 w-auto rounded-lg" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">Real-time uptime monitoring for your infrastructure</p>
          </div>

          <div>
            <h3 className="font-bold text-primary mb-4 uppercase text-sm tracking-wide">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition text-sm">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition text-sm">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition text-sm">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition text-sm">Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-primary mb-4 uppercase text-sm tracking-wide">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition text-sm">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition text-sm">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition text-sm">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition text-sm">Terms</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-primary mb-4 uppercase text-sm tracking-wide">Connect</h3>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-900 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110" title="GitHub">
                <GithubIcon />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-900 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110" title="Telegram">
                <TelegramIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="px-4 py-3 rounded-lg border border-primary/30 backdrop-blur-sm" style={{backgroundImage: 'linear-gradient(to right, rgba(244, 128, 36, 0.2), rgba(0, 119, 145, 0.2))'}}>
            <div className="flex items-center gap-2 flex-wrap text-sm">
              <span className="text-primary font-bold uppercase text-xs tracking-wide">IP:</span>
              <span className="font-mono font-bold text-white text-base">{ipInfo.ip}</span>
              {ipInfo.city && (
                <>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-300">{ipInfo.city}</span>
                </>
              )}
              {ipInfo.country && (
                <>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-300">{ipInfo.country}</span>
                </>
              )}
              {ipInfo.isp && (
                <>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-300">{ipInfo.isp}</span>
                </>
              )}
            </div>
          </div>
          <p className="text-gray-500 text-sm">&copy; 2026 Webwatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
