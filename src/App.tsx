// import { fontsToTest } from "./fontTest";
import { InfoBox } from "./InfoBox";
import MasonryGrid from "./MansoryGrid";

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

  // // function getNetworkInfo() {
  // //   const connection =
  // //     navigator.connection ||
  // //     navigator.mozConnection ||
  // //     navigator.webkitConnection;
  // //   if (!connection) return "Network information not available";

  // //   return {
  // //     effectiveType: connection.effectiveType, // ex: '4g', '3g'
  // //     downlink: connection.downlink, // Vitesse de téléchargement estimée (Mb/s)
  // //     rtt: connection.rtt, // Round-Trip Time estimé (ms)
  // //   };
  // // }

  // // console.log("Network Info:", getNetworkInfo());

  // ///////////////////////////

  // function getPlatformInfo() {
  //   if (navigator.userAgentData) {
  //     navigator.userAgentData
  //       .getHighEntropyValues(["platform", "platformVersion"])
  //       .then((data) => {
  //         console.log("Platform:", data.platform); // Exemple : "Windows"
  //         console.log("Platform Version:", data.platformVersion); // Exemple : "10.0"
  //       });
  //   } else {
  //     console.log("User-Agent Client Hints not supported.");
  //   }
  // }

  // // console.log("Platform Info:", getPlatformInfo());

  // ///////////////////////////

  // function getPageLoadTime() {
  //   const timing = performance.timing;
  //   return {
  //     loadTime: timing.loadEventEnd - timing.navigationStart, // Temps total de chargement
  //     domComplete: timing.domComplete - timing.navigationStart, // DOM prêt
  //   };
  // }

  // // console.log("Page Load Time:", getPageLoadTime());

  // ///////////////////////////

  // async function getBatteryInfo() {
  //   if (!navigator.getBattery) {
  //     return "Battery API not supported on this browser.";
  //   }

  //   const battery = await navigator.getBattery();
  //   return {
  //     charging: battery.charging, // true si l'appareil est en charge
  //     level: battery.level * 100, // Niveau de batterie en pourcentage
  //     chargingTime: battery.chargingTime, // Temps restant pour charger complètement (en secondes)
  //     dischargingTime: battery.dischargingTime, // Temps restant avant décharge complète (en secondes)
  //   };
  // }

  // // getBatteryInfo().then((info) => console.log("Battery Info:", info));

  // function getMemoryInfo() {
  //   if (!navigator.deviceMemory) {
  //     return "Device Memory API not supported.";
  //   }

  //   return {
  //     memory: `Navigator use around ${navigator.deviceMemory} GB`, // RAM estimée en gigaoctets
  //   };
  // }

  // // console.log("Memory Info:", getMemoryInfo());

  // function getFullNetworkInfo() {
  //   const connection =
  //     navigator.connection ||
  //     navigator.mozConnection ||
  //     navigator.webkitConnection;
  //   if (!connection) {
  //     return "Network information not available.";
  //   }

  //   return {
  //     effectiveType: connection.effectiveType, // ex: '4g', '3g', 'wifi'
  //     downlink: connection.downlink, // Vitesse de téléchargement estimée (Mb/s)
  //     rtt: connection.rtt, // Round-Trip Time estimé (ms)
  //     saveData: connection.saveData, // true si l'utilisateur utilise le mode "Data Saver"
  //   };
  // }

  // // console.log("Full Network Info:", getFullNetworkInfo());

  // function setupMotionListener() {
  //   if (!window.DeviceMotionEvent) {
  //     console.log("DeviceMotionEvent not supported.");
  //     return;
  //   }

  //   window.addEventListener("devicemotion", (event) => {
  //     const acceleration = event.acceleration; // Accélération linéaire
  //     console.log("Device Motion:", {
  //       x: acceleration?.x,
  //       y: acceleration?.y,
  //       z: acceleration?.z,
  //     });
  //   });
  // }

  // // setupMotionListener();

  // // Add trigger action
  // function getLocation() {
  //   if (!navigator.geolocation) {
  //     return "Geolocation API not supported.";
  //   }

  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       console.log("Location:", {
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //         accuracy: position.coords.accuracy, // Précision en mètres
  //       });
  //     },
  //     (error) => console.error("Error getting location:", error),
  //     { enableHighAccuracy: true }
  //   );
  // }

  // // getLocation();

  // function getThemePreference() {
  //   const prefersDark = window.matchMedia(
  //     "(prefers-color-scheme: dark)"
  //   ).matches;
  //   return prefersDark ? "Dark Mode" : "Light Mode";
  // }

  // // console.log("Theme Preference:", getThemePreference());

  // function getProcessorInfo() {
  //   if (!navigator.hardwareConcurrency) {
  //     return "Hardware Concurrency API not supported.";
  //   }

  //   return {
  //     logicalCores: navigator.hardwareConcurrency, // Nombre de cœurs logiques
  //   };
  // }

  // // console.log("Processor Info:", getProcessorInfo());

  // function getPerformanceMetrics() {
  //   const [navigation] = performance.getEntriesByType("navigation");

  //   if (!navigation) {
  //     return "PerformanceNavigationTiming API not supported.";
  //   }

  //   return {
  //     loadTime: navigation.loadEventEnd - navigation.startTime, // Temps total de chargement
  //     domComplete: navigation.domComplete - navigation.startTime, // DOM prêt
  //     domContentLoaded:
  //       navigation.domContentLoadedEventEnd - navigation.startTime, // DOM Content Loaded
  //     responseTime: navigation.responseEnd - navigation.requestStart, // Temps de réponse du serveur
  //     redirectCount: navigation.redirectCount, // Nombre de redirections
  //   };
  // }

  // console.log("Performance Metrics:", getPerformanceMetrics());

  return (
    <div className="bg-gray-900 min-h-screen">
      <h1 className="text-gray-400 text-3xl font-bold text-center mt-6">
        Browser Insights
      </h1>
      <p className="text-gray-400 text-center mt-2 max-w-2xl mx-auto">
        Explore the wealth of information your browser can provide and the
        actions a web application can perform without your knowledge. These
        include technical details, your settings, and your device's
        capabilities.
      </p>
      <MasonryGrid>
        <div className="grid-item bg-gray-800 p-6 rounded-md text-white col-span-2">
          {/* Cette InfoBox occupe deux colonnes */}
          <InfoBox title="System Info" data={{ userAgent, language }} />
        </div>
        <div className="grid-item flex space-x-6">
          {/* Deux InfoBox côte à côte */}
          <div className="bg-gray-800 p-6 rounded-md text-white">
            <InfoBox title="WebGL" data={webGl} />
          </div>
          <div className="bg-gray-800 p-6 rounded-md text-white">
            <InfoBox title="Screen Resolution" data={screenInfo} />
          </div>
        </div>
        <div className="grid-item bg-gray-800 p-6 rounded-md text-white">
          <InfoBox title="Time Format" data={{ timeFormat }} />
        </div>
        <div className="grid-item bg-gray-800 p-6 rounded-md text-white">
          <InfoBox title="Local Storage" data={{ storedValue }} />
        </div>
      </MasonryGrid>
    </div>
  );
}

export default App;
