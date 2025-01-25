import { fontsToTest } from "./fontTest";
import { useState } from "react";
import { InfoBox } from "./components/InfoBox";

function App() {
  // * system info
  function getPosition() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const crd = pos.coords;
          resolve({
            latitude: crd.latitude,
            longitude: crd.longitude,
            precision: crd.accuracy,
          });
        },
        () => {
          reject({ error: "Can't get position" });
        },
        options
      );
    });
  }

  // if (navigator.userAgentData) {
  //   navigator.userAgentData
  //     .getHighEntropyValues(["platform", "platformVersion"])
  //     .then((data) => {
  //       console.log("Platform:", data.platform);
  //       console.log("Platform Version:", data.platformVersion);
  //     });
  // } else {
  //   console.log("User-Agent Client Hints not supported.");
  // }

  console.log("Platform Info:", getPosition());
  const userAgent = navigator.userAgent;
  const language = navigator.language;

  ///////////////////////////

  // webGL
  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  const debugInfo = gl.getExtension(
    "WEBGL_debug_renderer_info"
  );
  const webGl = {};
  if (debugInfo) {
    webGl.vendor = gl.getParameter(
      debugInfo.UNMASKED_VENDOR_WEBGL
    );
    webGl.renderer = gl.getParameter(
      debugInfo.UNMASKED_RENDERER_WEBGL
    );
  }

  ///////////////////////////

  // * screen resolution
  const screenInfo = {
    width: window.screen.width,
    height: window.screen.height,
    colorDepth: window.screen.colorDepth,
    pixelDepth: window.screen.pixelDepth,
  };

  ///////////////////////////

  const timeFormat = Intl.DateTimeFormat().resolvedOptions();

  ///////////////////////////

  const detectInstalledFonts = () => {
    const testString = "mmmmmmmmmmlli"; // Une chaîne générique pour mesurer les largeurs
    const defaultWidth = {};
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Liste des polices à tester, par région linguistique

    if (context) {
      const baseFont = "monospace";
      context.font = `72px ${baseFont}`;
      const baseWidth = context.measureText(testString).width;

      // Teste chaque police
      fontsToTest.forEach((font) => {
        context.font = `72px ${font}, ${baseFont}`;
        const width = context.measureText(testString).width;
        defaultWidth[font] = width !== baseWidth; // Si la largeur diffère, la police est probablement installée
      });
    }

    return defaultWidth;
  };

  ///////////////////////////

  const [inputValue, setInputValue] = useState("");
  const [storedValue, setStoredValue] = useState(
    localStorage.getItem("canIstorValue") || "Change my value"
  );

  const handleSave = () => {
    localStorage.setItem("canIstorValue", inputValue);
    setStoredValue(inputValue);
    setInputValue("");
  };

  ///////////////////////////

  function getNetworkInfo() {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    if (!connection) return { error: "Network information not available" };

    return {
      effectiveType: connection.effectiveType, // ex: '4g', '3g'
      downlink: connection.downlink, // Vitesse de téléchargement estimée (Mb/s)
      rtt: connection.rtt, // Round-Trip Time estimé (ms)
    };
  }

  // ///////////////////////////

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
    <div className="flex flex-col bg-gray-900 min-h-screen items-center">
      <div className="flex items-center justify-center mt-10">
        <img
          src="tracker.svg"
          width="40"
          className="bg-orange-400 rounded-2xl mr-8"
        />
        <h1 className="text-green-500 text-4xl font-bold text-center">
          Info Tracker
        </h1>
        <img
          src="tracker.svg"
          width="40"
          className="ml-8 bg-orange-400 rounded-2xl"
        />
      </div>
      <p className="text-center mt-6 max-w-2xl text-white">
        Explore the wealth of information your browser can provide and the
        actions a web application can perform without your knowledge. These
        include technical details, your settings, and your device's
        capabilities.
      </p>
      <div className="flex flex-col w-full max-w-5xl mt-10 space-y-4 px-4">
        {/* InfoBox System Info */}
        <div className="bg-gray-800 p-6 rounded-md text-white">
          <InfoBox title="System Info" data={{ userAgent, language }} />
        </div>

        {/* Plateforme Info */}

        <div className="bg-gray-800 p-6 rounded-md text-white">
          <InfoBox title="Plateforme Info" data={getPosition()} />
        </div>

        {/*  WebGL  */}
        <div className="flex flex-row justify-between space-x-4">
          <div className="bg-gray-800 p-6 rounded-md text-white flex-1">
            <InfoBox title="WebGL" data={webGl} />
          </div>
          {/* Screen Resolution */}
          <div className="bg-gray-800 p-6 rounded-md text-white flex-1">
            <InfoBox title="Screen Resolution" data={screenInfo} />
          </div>
        </div>

        {/* Time Format */}
        <div className="flex flex-row justify-between space-x-4">
          <div className="bg-gray-800 p-6 rounded-md text-white flex-1">
            <InfoBox title="Time Format" data={{ timeFormat }} />
          </div>
          {/* Local Storage */}
          <div className="bg-gray-800 p-6 rounded-md text-white flex-1">
            <div className="p-6 rounded-md border border-green-500">
              <h1 className="text-xl mb-4 font-bold text-green-400">
                Local Storage
              </h1>
              <p className="mb-4">
                Value :
                <span className="font-mono">
                  {storedValue
                    ? (storedValue.match(/.{0,35}/g) || []).join("\n")
                    : "No value stored"}
                </span>
              </p>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  className="p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Enter a value to store"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-md"
                >
                  Save to Local Storage
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Network */}
        <div className="bg-gray-800 p-6 rounded-md text-white flex-1">
          <InfoBox title="Network Info" data={getNetworkInfo()} />
        </div>

        {/* Fonts */}
        <div>
          <div className="bg-gray-800 p-6 rounded-md text-white flex-1">
            <div className="p-6 rounded-md border border-green-500">
              <h1 className="text-xl mb-4 font-bold text-green-400">Fonts</h1>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(detectInstalledFonts()).map(([key, value]) => (
                  <div key={key} className={`flex  border-gray-700 `}>
                    <div>{key} :&nbsp; </div>
                    <div
                      className={
                        value ? "text-orange-400 font-bold" : "text-white"
                      }
                    >
                      {value ? "true" : value.toString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
