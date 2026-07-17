import fs from 'fs';

const path = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\scratch\\AccessApp\\website\\src\\App.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add MagneticCursor import
content = content.replace(
  'import { motion } from "framer-motion";',
  'import { motion } from "framer-motion";\nimport { MagneticCursor } from "./components/ui/magnetic-cursor";'
);

// 2. Wrap main div in MagneticCursor and update Hero section
content = content.replace(
  `<div className="w-full relative pointer-events-none text-[#FFFFFF] selection:bg-white selection:text-black font-['Inter']">`,
  `<MagneticCursor magneticFactor={0.5} blendMode="exclusion" cursorSize={40}>\n    <div className="w-full relative pointer-events-none text-[#FFFFFF] selection:bg-white selection:text-black font-['Inter']">`
);

content = content.replace(
  `<h1 className="text-6xl md:text-8xl font-['Sora'] font-extrabold uppercase tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-[#666666] drop-shadow-2xl">`,
  `<h1 data-magnetic className="text-6xl md:text-8xl font-['Sora'] font-extrabold uppercase tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-[#666666] drop-shadow-2xl mix-blend-difference">`
);

content = content.replace(
  `<p className="text-lg md:text-xl text-[#A3A3A3] font-normal max-w-3xl leading-relaxed">
          Engineered specifically for individuals with visual or auditory impairments. Leveraging edge-based machine learning paradigms to provide real-time spatial awareness without reliance on cloud-based processing.
        </p>
      </motion.section>`,
  `<p className="text-lg md:text-xl text-[#A3A3A3] font-normal max-w-3xl leading-relaxed mb-12">
          Engineered specifically for individuals with visual or auditory impairments. Leveraging edge-based machine learning paradigms to provide real-time spatial awareness without reliance on cloud-based processing.
        </p>
        <a 
          data-magnetic
          href="https://github.com/madd69x/AccessApp" 
          target="_blank" 
          rel="noreferrer"
          className="uiverse-shimmer-btn bg-white text-black px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#E5E5EA] transition-colors shadow-[0_0_40px_rgba(255,255,255,0.3)] pointer-events-auto mix-blend-difference"
        >
          Download Now
        </a>
      </motion.section>`
);

// 3. Close MagneticCursor tag at the end of App component
content = content.replace(
  `          </div>
        </div>
      </motion.footer>

    </div>
  );
}`,
  `          </div>
        </div>
      </motion.footer>

    </div>
    </MagneticCursor>
  );
}`
);

// 4. Remove Header component definition
content = content.replace(
  /\/\/ Premium Full-Width Glassmorphic Header Component[\s\S]*?<\/header>\n\);\n/,
  ''
);

// 5. Remove Header from the main render function
content = content.replace(
  /      \{\/\* \n        This is where our static UI lives \(like a standard Navbar\)\. \n        It sits IN FRONT of the 3D Canvas because of absolute positioning and z-index\.\n      \*\/\}\n      <Header \/>/,
  ''
);

fs.writeFileSync(path, content);
console.log('App.tsx updated successfully');
