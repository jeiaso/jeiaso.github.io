import React, { useState } from 'react';
import { Heart, Sparkles, Star, Mail, Linkedin } from 'lucide-react';

export default function Portfolio() {
  const [hoveredImage, setHoveredImage] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Jeia So
            </h1>
            <nav className="flex gap-6">
              <a href="#about" className="text-gray-700 hover:text-pink-500 transition-colors">About</a>
              <a href="#research" className="text-gray-700 hover:text-pink-500 transition-colors">Research</a>
              <a href="#projects" className="text-gray-700 hover:text-pink-500 transition-colors">Projects</a>
              <a href="#design" className="text-gray-700 hover:text-pink-500 transition-colors">Design</a>
              <a href="#art" className="text-gray-700 hover:text-pink-500 transition-colors">Art</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-5xl font-bold mb-6 flex items-center gap-3">
              hi, i'm jeia ♡
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              expressing love through creation, and combining my passions for tech, art, and service through my work ˚₊· ͟͟͞͞➳❥ specifically interested in <span className="font-semibold text-purple-600">product design</span>, 
              <span className="font-semibold text-purple-600"> entertainment engineering</span>, and 
              <span className="font-semibold text-purple-600"> robotics/bionics</span>!
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">currently:</span> researching @ the mechanics of soft materials lab + 
              designing a temperature controlled desk fan for creativelabs@ucla
            </p>
            <div className="flex gap-4 items-center text-gray-700">
              <Mail size={20} className="text-pink-500" />
              <span>jeia @ ucla . edu</span>
              <a href="https://linkedin.com/in/jeiaso" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                <Linkedin size={20} />
                linkedin.com/in/jeiaso
              </a>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img src="/JeiaSo_Headshot.jpg" alt="Jeia So" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="bg-white/50 backdrop-blur-sm py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
            research ﾟ+*:ꔫ:*﹤
          </h2>

          {/* Research 1 */}
          <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-purple-600 mb-3">
              Manufacturing and mechanics of 3D printed woven domes
            </h3>
            <p className="text-sm text-gray-600 mb-4 font-semibold">
              June 2025: Summer Undergraduate Research Program (SURP), Samueli Research Scholars
            </p>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Created CAD models of woven shells using SolidWorks and simulated their behavior under indentation using Abaqus FEA. 
                  Fabricated shells with the UltiMaker S5 Fused Deposition Modeling 3D Printer using TPU and PVA filament. 
                  Tested printed samples against manually woven samples to verify that they have the same behavior under indentation. 
                  Once verified, produced designs manually infeasible to produce and tested to discover new mechanical behaviors.
                </p>
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-4">
                  <p className="text-gray-700 font-semibold">
                    🏆 First Place Best Poster Award and Research Presentation Honorable Mention!
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href="https://drive.google.com/file/d/1eeUwMGLN8WFmXxJquU1SwAg6ZmSr8_fg/view" className="text-sm text-blue-600 hover:text-blue-700 underline">View Research Journal</a>
                  <a href="https://drive.google.com/file/d/1s_JpJRAaWY_l13-_h5D5Hjck3oEBxcoo/view" className="text-sm text-blue-600 hover:text-blue-700 underline">View Poster</a>
                  <a href="https://drive.google.com/file/d/1Icubpum0WNAE4NQvhcMv6eTpGyR5jOBc/view" className="text-sm text-blue-600 hover:text-blue-700 underline">View Presentation</a>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-144 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex items-center justify-center text-4xl shadow-md">
                  <img src="/shell.gif" alt="surp" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* Research 2 */}
          <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-purple-600 mb-3">
              Generating synthetic acoustic emissions from material damage
            </h3>
            <p className="text-sm text-gray-600 mb-4 font-semibold">
              July 2023: UCSB Summer Research Academies, Track 6: Decoding the Black Box
            </p>
            <p className="text-gray-700 leading-relaxed">
              Conducted research with two other students under the guidance of PhD students. 
              Researched machine learning algorithms, and developed a program capable of producing the sound made when an object 
              is broken to help with structural monitoring and material testing.

            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://docs.google.com/document/d/1xjN5wKOKfAcAd5AorJRHQzJotGT6L9aF6UKblV2_8I0/edit?usp=drivesdk" className="text-sm text-blue-600 hover:text-blue-700 underline">View Research Paper</a>
              <a href="https://docs.google.com/presentation/d/1RWF7IT34EElPWP2nnUTv3scwTptuB9F0Ha5p9slhLUs/edit?usp=drivesdk" className="text-sm text-blue-600 hover:text-blue-700 underline">View Presentation</a>
            </div>
          </div>

          {/* Research 3 */}
          <div className="p-8 bg-white rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-purple-600 mb-3">
              Novel tools used in human-swarm interaction
            </h3>
            <p className="text-sm text-gray-600 mb-4 font-semibold">
              July 2022: California State Summer School for Math and Science (COSMOS) at UCSC
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Researched and summarized the applications of swarm robotics. 
              Designed and wrote an informal research poster with two other students.
            </p>
            <a href="https://drive.google.com/file/d/16CUVf1rmexZoogBpK_1fBijQj27L7zX0/view" className="text-sm text-blue-600 hover:text-blue-700 underline">View Poster</a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
            my projects ⋆ ˚｡⋆୨୧˚
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Drone Project */}
            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-pink-600 mb-2">Drone</h3>
              <p className="text-sm text-gray-600 mb-3 font-semibold">March 2025: Engineering 1 Project</p>
              <div className="bg-gradient-to-br from-blue-200 to-cyan-200 rounded-2x1 overflow-hidden">
                <img src="/drone.avif" alt="drone" className="w-full h-auto" />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Designed, prototyped, and tested a drone optimized for speed and maneuverability. 
                Created a CAD model of the drone using Fusion 360 software with 3 other students, 
                and led construction and electronics management.
              </p>
            </div>

            {/* Micromouse */}
            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-pink-600 mb-2">Micromouse</h3>
              <p className="text-sm text-gray-600 mb-3 font-semibold">September 2024: IEEE Project</p>
              <div className="w-full h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg mb-4 flex items-center justify-center text-5xl">
                🤖
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Created circuit schematic and designed printed circuit board using KiCAD. 
                Chose and soldered surface mount devices and through hole components. 
                Programmed maze solving algorithm using PID controller algorithm on CubeIDE.
              </p>
            </div>

            {/* PCB Design */}
            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-pink-600 mb-2">PCB Design: Decision Maker</h3>
              <p className="text-sm text-gray-600 mb-3 font-semibold">March 2024: Honors Digital Electronics Project</p>
              <div className="bg-gradient-to-br from-green-200 to-teal-200 rounded-2x1 overflow-hidden">
                <img src="/8ball.png" alt="8ball" className="w-full h-auto" />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Designed and prototyped a printed circuit board (PCB) that helps the user make a decision or answer a question. 
                Function mimics that of a magic 8 ball.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://drive.google.com/file/d/1lXibV16pjCSTEqPKoAZqpG72rVY5jK6e/view" className="text-sm text-blue-600 hover:text-blue-700 underline">View Project Demo</a>
                <a href="https://docs.google.com/document/d/1b_niQjHHpxlo4deRGw7PoqTlz-bQVxWBJ4ucOS8r-PQ/edit?tab=t.0" className="text-sm text-blue-600 hover:text-blue-700 underline">View Documentation</a>
              </div>            
            </div>

            {/* CENSE */}
            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-pink-600 mb-2">CENSE: Crowd Sense</h3>
              <p className="text-sm text-gray-600 mb-3 font-semibold">April 2023: Dublin Engineering Project</p>
              <div className="bg-gradient-to-br from-orange-200 to-red-200 rounded-2x1 overflow-hidden">
                <img src="/cense.jpg" alt="cense" className="w-full h-auto" />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Created a sensor system used to monitor room capacity. 
                Designed the interface of a connected website that would display the room capacity and generate analytics 
                telling users when a room is likely to be full. Designed project logo and presentation materials.
              </p>
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-4">
                  <p className="text-gray-700 font-semibold">
                    🏆 Top 30 Projects at the 2023 DEDA Engineering Competition!
                  </p>
              </div>
              <a href="https://drive.google.com/file/d/1Ayj9Dwch33BfMiX2iTt1Xse702xu9hZ9/view" className="text-sm text-blue-600 hover:text-blue-700 underline">View Documentation</a>
            </div>

            {/* Productivity Points */}
            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow md:col-span-2">
              <h3 className="text-xl font-bold text-pink-600 mb-2">VEX Robotics Robot: 5327SWAGon</h3>
              <p className="text-sm text-gray-600 mb-3 font-semibold">
                April 2022 - April 2023: Gael Force Robotics at Dublin High School
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <img src="/robot.png" alt="robot" className="w-full h-70 object-cover" />
                <img src="/states.png" alt="states" className="w-full h-70 object-cover" />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Led team of 15 engineering students across different grades and experience levels. Designed, prototyped, and built subsystems
                optimized for the 2022-2023 VEX game Spin Up, including drivetrain, roller, conveyor belt, and fly wheel mechanisms. Completed all project documentation. 
                Mentored first year interns.
              </p>
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-4">
                  <p className="text-gray-700 font-semibold">
                    🏆 2x Excellence Award Winner + Design Award Winner at State Championships + Qualified to 2022-23 VEX World Championships!
                  </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="https://docs.google.com/presentation/d/1wVfwRzYSYwz4N3A3Uk0cnaeJ6crQhOLYICYAlhmDv4A/edit?usp=sharing" className="text-sm text-blue-600 hover:text-blue-700 underline">View Notebook/Documentation</a>
              </div> 
            </div>

            {/* Productivity Points
            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow md:col-span-2">
              <h3 className="text-xl font-bold text-pink-600 mb-2">Productivity Points: COVID Interactive Story</h3>
              <p className="text-sm text-gray-600 mb-3 font-semibold">
                October 2020 - November 2020: Computer Science Essentials Project
              </p>
              <div className="flex gap-4 mb-4">
                <div className="w-32 h-40 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-lg flex items-center justify-center text-4xl">
                  📱
                </div>
                <div className="w-32 h-40 bg-gradient-to-br from-pink-200 to-rose-200 rounded-lg flex items-center justify-center text-4xl">
                  🎨
                </div>
                <div className="w-32 h-40 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-lg flex items-center justify-center text-4xl">
                  ✏️
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Designed an interactive story app encouraging users to use their time productively during quarantine 
                by awarding points based on their decisions made. All artwork was hand-drawn. App developed using MIT App Inventor.
              </p>
              <a href="https://docs.google.com/document/d/1bFh9uz6_mJyjWci3zQRUlIUNJe16WOwJycIqxFh8w0Q/edit?usp=sharing" className="text-sm text-blue-600 hover:text-blue-700 underline">View Documentation</a>
            </div> */}
          </div>

          <div className="mt-8 text-center">
            <a href="https://sites.google.com/view/jeiaso/about-me" 
               className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg transition-shadow">
              Explore more technical projects from high school →
            </a>
          </div>
        </div>
      </section>

      {/* Design Work Section */}
      <section id="design" className="bg-white/50 backdrop-blur-sm py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
            design work 
            <span className="text-3xl">‧₊˚❀༉‧₊˚.</span>
          </h2>
          <p className="text-gray-700 leading-relaxed mb-12 text-lg">
            i first started engaging with the communities around me through art; this included advocacy graphics for clubs 
            as we navigated the pandemic online, to annual school and event merchandise. below is a gallery of some of my 
            favorite pieces i've worked on! hover over the picture to learn more about the piece, what is was used for, 
            and what tools were used in its creation.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { image: '/kapwa26.png', title: 'Design Tool: Figma' },
              { image: '/ewi.jpg', color: 'from-purple-300 to-indigo-300', title: 'Design Tool: Figma' },
              { image: 'kapwa25.jpg', color: 'from-blue-300 to-cyan-300', title: 'Design Tool: Procreate' },
              { image: '/dial.jpg', color: 'from-yellow-300 to-orange-300', title: 'Design Tool: Procreate' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative aspect-square rounded-lg shadow-md overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredImage(idx)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                {hoveredImage === idx && (
                  <div className="absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center p-4">
                    <p className="text-white text-center font-semibold">{item.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="https://www.behance.net/jeiaso" 
               className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg transition-shadow">
              Explore my full graphic design portfolio →
            </a>
          </div>
        </div>
      </section>

      {/* Personal Art Section */}
      <section id="art" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
            personal art 
            <span className="text-3xl">♥*♡∞:｡.｡</span>
          </h2>
          <p className="text-gray-700 leading-relaxed mb-12 text-lg">
            in my free time, i love drawing my friends and family through traditional and digital art; 
            to me, it's my way of showing others exactly how loved they are from my perspective. 
            below are my favorite pieces so far!
          </p>
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Digital Portrait */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 rounded-2x1 overflow-hidden">
                  <img src="/jibbies.avif" alt="jibbies" className="w-full h-auto" />
                </div>
                <div className="p-6">
                  <p className="text-gray-700 text-lg">
                    digital portrait of my siblings and i (fun fact: i'm the youngest of three!)
                  </p>
                </div>
              </div>

              {/* Traditional Drawing */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200 rounded-2xl overflow-hidden">
                <img src="/youmei.avif" alt="youmei" className="w-full h-auto" />
              </div>
                <div className="p-6">
                  <p className="text-gray-700 text-lg">
                    traditional drawing of my favorite picture of my best friend and i :)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-100 to-purple-100 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            ☆.｡.:* last updated 2/16/2026 ｡･:*:･ﾟ★,｡･:*:･ﾟ☆
          </p>
        </div>
      </footer>
    </div>
  );
}
