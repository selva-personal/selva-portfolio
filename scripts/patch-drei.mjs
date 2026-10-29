import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const esmFile = path.join(__dirname, "../node_modules/@react-three/drei/web/Html.js");
if (fs.existsSync(esmFile)) {
  let content = fs.readFileSync(esmFile, "utf8");
  if (content.includes("const currentRoot = root.current = ReactDOM.createRoot(el);")) {
    content = content.replace(
      "const currentRoot = root.current = ReactDOM.createRoot(el);",
      "if (!root.current) { root.current = ReactDOM.createRoot(el); }",
    );
    content = content.replace(
      /return \(\) => \{\s*if \(target\) target\.removeChild\(el\);\s*(?:currentRoot\.unmount\(\);|setTimeout\([^}]+\}\s*,\s*0\);)?\s*\};/,
      "return () => { if (target) { try { target.removeChild(el); } catch (_) {} } };\n    }\n  }, [target, transform]);\n  React.useEffect(() => {\n    return () => {\n      if (root.current) {\n        const r = root.current;\n        root.current = null;\n        setTimeout(() => { try { r.unmount(); } catch (_) {} }, 0);\n      }\n    };\n  }, []);",
    );
    fs.writeFileSync(esmFile, content, "utf8");
    console.log(`Patched ${esmFile}`);
  }
}

const cjsFile = path.join(__dirname, "../node_modules/@react-three/drei/web/Html.cjs.js");
if (fs.existsSync(cjsFile)) {
  let content = fs.readFileSync(cjsFile, "utf8");
  if (content.includes("const e=G.current=l.createRoot(D);")) {
    content = content.replace(
      "const e=G.current=l.createRoot(D);",
      "if(!G.current){G.current=l.createRoot(D);}",
    );
    content = content.replace(
      /return U&&\(s\?U\.prepend\(D\):U\.appendChild\(D\)\),\(\)=>\{U&&U\.removeChild\(D\)[^}]*\}\}\}/,
      "return U&&(s?U.prepend(D):U.appendChild(D)),()=>{U&&U.removeChild(D)}}}),c.useEffect((()=>{return()=>{if(G.current){const e=G.current;G.current=null;setTimeout((()=>{try{e.unmount()}catch(e){}}),0)}}}),[])",
    );
    fs.writeFileSync(cjsFile, content, "utf8");
    console.log(`Patched ${cjsFile}`);
  }
}
