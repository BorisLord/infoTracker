import { fontsToTest } from "./fontTest";
import { InfoBox } from "./InfoBox";

function App() {
  // * system info
  const userAgent = navigator.userAgent;
  const language = navigator.language;

  ///////////////////////////

  // * webGL
  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  const debugInfo = (gl as WebGLRenderingContext).getExtension(
    "WEBGL_debug_renderer_info"
  );
  const webGl: Record<string, string | undefined> = {};
  if (debugInfo) {
    webGl.vendor = (gl as WebGLRenderingContext).getParameter(
      debugInfo.UNMASKED_VENDOR_WEBGL
    );
    webGl.renderer = (gl as WebGLRenderingContext).getParameter(
      debugInfo.UNMASKED_RENDERER_WEBGL
    );
  }

  ///////////////////////////

  // * screen resolution
  const screenInfo: Record<string, number> = {
    width: window.screen.width,
    height: window.screen.height,
    colorDepth: window.screen.colorDepth,
    pixelDepth: window.screen.pixelDepth,
  };

  ///////////////////////////

  const timeFormat = Intl.DateTimeFormat().resolvedOptions();

  ///////////////////////////

  // const detectInstalledFonts = () => {
  //   const testString = "mmmmmmmmmmlli"; // Une chaîne générique pour mesurer les largeurs
  //   const defaultWidth: Record<string, boolean> = {};
  //   const canvas = document.createElement("canvas");
  //   const context = canvas.getContext("2d");

  //   // Liste des polices à tester, par région linguistique

  //   if (context) {
  //     const baseFont = "monospace";
  //     context.font = `72px ${baseFont}`;
  //     const baseWidth = context.measureText(testString).width;

  //     // Teste chaque police
  //     fontsToTest.forEach((font) => {
  //       context.font = `72px ${font}, ${baseFont}`;
  //       const width = context.measureText(testString).width;
  //       defaultWidth[font] = width !== baseWidth; // Si la largeur diffère, la police est probablement installée
  //     });
  //   }

  //   return defaultWidth;
  // };

  // console.log("Installed Fonts:", detectInstalledFonts());

  ///////////////////////////

  localStorage.setItem("canIstorValue", "Yes, i can store value");
  const storedValue = localStorage.getItem("canIstorValue");

  ///////////////////////////

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-green-500 space-y-6">
      <InfoBox title="System Info" data={{ userAgent, language }} />
      <InfoBox title="WebGL" data={webGl} />
      <InfoBox title="Screen Resolution" data={screenInfo} />
      <InfoBox title="Time Format" data={{ timeFormat }} />
      <InfoBox title="Local Storage" data={{ storedValue }} />
      {/* <InfoBox title="Fonts" data={{ detectInstalledFonts }}></InfoBox> */}
    </div>
  );
}

export default App;
