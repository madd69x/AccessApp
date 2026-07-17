import fs from 'fs';

let appPath = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\scratch\\AccessApp\\website\\src\\App.tsx';
let appContent = fs.readFileSync(appPath, 'utf8');

// App.tsx fixes
appContent = appContent.replace(`import { motion } from "framer-motion";\n`, ``);
appContent = appContent.replace(`useFrame((state, delta) => {`, `useFrame((_state, delta) => {`);
appContent = appContent.replace(`const SecurityIcon = () => (\n  <IconWrapper>\n    <svg className="w-3 h-3 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />\n    </svg>\n  </IconWrapper>\n);\n`, ``);

fs.writeFileSync(appPath, appContent);

let cursorPath = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\scratch\\AccessApp\\website\\src\\components\\ui\\magnetic-cursor.tsx';
let cursorContent = fs.readFileSync(cursorPath, 'utf8');

// Cursor fixes
cursorContent = cursorContent.replace(`import React, { useRef, useEffect, FC, ReactNode, useState } from 'react';`, `import React, { useRef, useEffect, useState, type FC, type ReactNode } from 'react';`);
cursorContent = cursorContent.replace(`import { vec2, Vec2 } from 'vecteur';`, `import { vec2 } from 'vecteur';\ntype Vec2 = any;`);
cursorContent = cursorContent.replace(`const handleClick = (event: MouseEvent) => {};`, `const handleClick = (_event: MouseEvent) => {};`);
cursorContent = cursorContent.replace(/overwrite: 'all'/g, `overwrite: 'auto'`);

fs.writeFileSync(cursorPath, cursorContent);
console.log('Fixed TS errors');
