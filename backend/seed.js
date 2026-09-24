import mongoose from 'mongoose';
import User from './models/User.js';
import Job from './models/Job.js';
import Proposal from './models/Proposal.js';
import Contract from './models/Contract.js';

const seedDatabase = async () => {
  try {
    console.log('🌱 Checking seed data...');

    // 1. Seed or update demo client: Suyog
    let suyog = await User.findOne({ email: 'suyog@freelancehub.com' });
    if (!suyog) {
      suyog = await User.create({
        name: 'Suyog',
        email: 'suyog@freelancehub.com',
        password: 'password123',
        role: 'client',
        companyName: 'Suyog Tech Ventures',
        title: 'Founder & Hiring Manager',
        bio: 'Looking for talented developers and designers for high-impact projects.',
        location: 'Pune, India',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
        totalSpent: '$4,500.00',
        verified: true,
        rating: 5.0
      });
      console.log('✅ Seeded demo client: Suyog (suyog@freelancehub.com)');
    }

    // 2. Seed or update demo freelancer: Pratik
    let pratik = await User.findOne({ email: 'pratik@freelancehub.com' });
    if (!pratik) {
      pratik = await User.create({
        name: 'Pratik',
        email: 'pratik@freelancehub.com',
        password: 'password123',
        role: 'freelancer',
        title: 'Fullstack Web Developer',
        bio: 'Passionate developer creating fast, beautiful React and Node.js web applications.',
        hourlyRate: 50,
        skills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'Tailwind CSS'],
        location: 'Mumbai, India',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        totalEarned: '$0.00',
        totalSpent: '$0.00',
        reviewsCount: 0,
        rating: 5.0,
        successScore: 100,
        activeProjects: 0,
        completedProjects: 0,
        verified: true
      });
      console.log('✅ Seeded demo freelancer: Pratik (pratik@freelancehub.com)');
    }

    // 3. Seed open jobs if none exist
    const jobCount = await Job.countDocuments();
    if (jobCount === 0) {
      const initialJobs = [
        {
          title: 'Build Modern E-Commerce Web Store',
          category: 'Web & Software Dev',
          badge: 'Featured',
          badgeType: 'creative',
          postedTime: '15 minutes ago',
          budget: '$2,800',
          minBudget: 2800,
          maxBudget: 2800,
          type: 'Fixed-Price • Safe Payment',
          engagement: 'Fixed-Price',
          escrow: true,
          description: 'We need an experienced developer to build a modern, high-converting e-commerce storefront with shopping cart, Stripe checkout, and an easy admin dashboard.',
          tags: ['React', 'Node.js', 'Tailwind CSS', 'Stripe'],
          clientId: suyog._id,
          client: {
            name: suyog.name,
            verified: true,
            rating: 5.0,
            spent: '$4,500+ spent',
            location: suyog.location,
            avatar: suyog.avatar
          },
          proposalsCount: 0,
          deadline: '14 days remaining',
          experience: 'Intermediate',
          status: 'open'
        },
        {
          title: 'Design Mobile App UI/UX in Figma',
          category: 'Design & Creative',
          badge: 'Urgent',
          badgeType: 'urgent',
          postedTime: '1 hour ago',
          budget: '$1,500',
          minBudget: 1500,
          maxBudget: 1500,
          type: 'Fixed-Price • Safe Payment',
          engagement: 'Fixed-Price',
          escrow: true,
          description: 'Seeking a creative UI/UX designer to craft 12 clean, user-friendly mobile screens for our delivery tracking mobile application.',
          tags: ['Figma', 'UI/UX Design', 'Mobile App', 'Wireframing'],
          clientId: suyog._id,
          client: {
            name: suyog.name,
            verified: true,
            rating: 5.0,
            spent: '$4,500+ spent',
            location: suyog.location,
            avatar: suyog.avatar
          },
          proposalsCount: 0,
          deadline: '7 days remaining',
          experience: 'Intermediate',
          status: 'open'
        },
        {
          title: 'Create Content & SEO Blog Articles',
          category: 'Writing & Translation',
          badge: 'New Job',
          badgeType: 'verified',
          postedTime: '2 hours ago',
          budget: '$45 / hr',
          minBudget: 45,
          maxBudget: 45,
          type: 'Hourly Rate • Safe Payment',
          engagement: 'Hourly Rate',
          escrow: true,
          description: 'Looking for a skilled English content writer to write 5 engaging, SEO-friendly guides about web development and tech careers.',
          tags: ['SEO', 'Content Writing', 'Copywriting', 'Blogging'],
          clientId: suyog._id,
          client: {
            name: suyog.name,
            verified: true,
            rating: 5.0,
            spent: '$4,500+ spent',
            location: suyog.location,
            avatar: suyog.avatar
          },
          proposalsCount: 0,
          deadline: '10 days remaining',
          experience: 'Entry',
          status: 'open'
        }
      ];

      await Job.insertMany(initialJobs);
      console.log('✅ Seeded 3 starter jobs posted by Suyog');
    }

    console.log('🎉 Seed check completed successfully.');
  } catch (err) {
    console.error('❌ Error during seedDatabase:', err.message);
  }
};

export default seedDatabase;
