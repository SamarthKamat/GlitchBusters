import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Food sustainability expert with 10+ years in waste management',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    },
    // Keep other team members...
  ];

  const values = [
    {
      title: 'Reduce Waste',
      description: 'Save millions of meals from landfills annually'
    },
    {
      title: 'Community Focus',
      description: 'Serve vulnerable populations through local partnerships'
    },
    {
      title: 'Tech Driven',
      description: 'AI-powered logistics for efficient distribution'
    }
  ];

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6 lg:px-20">
        <motion.div {...fadeIn} className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Fighting Hunger, Reducing Waste
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connecting surplus food with communities in need through technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700">
                At GlitchBusters, we bridge the gap between food surplus and 
                food insecurity using real-time data and community networks.
              </p>
            </div>
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="relative h-96 rounded-3xl overflow-hidden shadow-xl"
            >
              <img
                src="/food-rescue.jpg"
                alt="Food rescue team"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <h2 className="text-4xl font-bold text-center mb-16">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="p-8 bg-green-50 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-green-500 rounded-lg mb-6 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <h2 className="text-4xl font-bold text-center mb-16">Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-green-600 mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 text-center">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="p-6">
              <div className="text-4xl font-bold mb-4">5M+</div>
              <div className="text-sm uppercase tracking-wider">Meals Saved</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-4">200+</div>
              <div className="text-sm uppercase tracking-wider">Cities Served</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-4">1k+</div>
              <div className="text-sm uppercase tracking-wider">Partners</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-4">24h</div>
              <div className="text-sm uppercase tracking-wider">Response Time</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;