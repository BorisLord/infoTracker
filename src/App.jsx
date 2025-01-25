import { fontsToTest } from "./fontTest";
import { useEffect, useState } from "react";
import { InfoBox } from "./components/InfoBox";

function App() {
  const [onClick, setOnClick] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getPosition = async () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error("Failed to fetch address");
            }
            const data = await response.json();

            resolve({
              latitude,
              longitude,
              address: data.address,
            });
          } catch (error) {
            console.error(error);
            reject("Failed to fetch address from Nominatim");
          }
        },
        (err) => {
          reject(`Error getting position: ${err.message}`);
        },
        options
      );
    });
  };

  const handleClick = async () => {
    setOnClick(true);
    try {
      const position = await getPosition();
      setLocation(position);
      setError(null);
    } catch (err) {
      setLocation(null);
      setError(err);
    }
  };

  const [batteryInfo, setBatteryInfo] = useState({});
  const [infoSystem, setInfoSystem] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        let info = {};
        if (navigator.userAgentData) {
          const data = await navigator.userAgentData.getHighEntropyValues([
            "platform",
            "platformVersion",
          ]);
          info.Platform = data.platform;
          info.Version = data.platformVersion;
        } else {
          info.User_Agent = "Client Hints not supported";
        }
        info.userAgent = navigator.userAgent;
        info.language = navigator.language;
        info.navigator_memory = navigator.deviceMemory + " GB";
        (info.logicalCores = navigator.hardwareConcurrency),
          setInfoSystem(info);
      } catch (err) {
        setInfoSystem({ error: err.message });
      }

      try {
        if (!navigator.getBattery) {
          setBatteryInfo({
            battery: "Battery API not supported on this browser.",
          });
          return;
        }
        const battery = await navigator.getBattery();
        setBatteryInfo({
          charging: battery.charging,
          level: battery.level * 100,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime,
        });
      } catch (err) {
        setBatteryInfo({ error: err.message });
      }
    };

    fetchData();
  }, []);

  ///////////////////////////

  // webGL
  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  const webGl = {};
  if (debugInfo) {
    webGl.vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    webGl.renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
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
    const testString = "mmmmmmmmmmlli";
    const defaultWidth = {};
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (context) {
      const baseFont = "monospace";
      context.font = `72px ${baseFont}`;
      const baseWidth = context.measureText(testString).width;

      fontsToTest.forEach((font) => {
        context.font = `72px ${font}, ${baseFont}`;
        const width = context.measureText(testString).width;
        defaultWidth[font] = width !== baseWidth;
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
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
    };
  }

  const [motionData, setMotionData] = useState({
    x: null,
    y: null,
    z: null,
  });

  useEffect(() => {
    if (!window.DeviceMotionEvent) {
      setMotionData({
        x: "unsupported",
        y: "unsupported",
        z: "unsupported",
      });
      return;
    }
    const handleMotion = (event) => {
      const { x, y, z } = event.acceleration || {};
      setMotionData({
        x: x?.toFixed(2) || 0,
        y: y?.toFixed(2) || 0,
        z: z?.toFixed(2) || 0,
      });
    };
    window.addEventListener("devicemotion", handleMotion);
    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, []);

  function getPerformanceMetrics() {
    const [navigation] = performance.getEntriesByType("navigation");
    if (!navigation) {
      return "PerformanceNavigationTiming API not supported.";
    }
    return {
      loadTime: navigation.loadEventEnd - navigation.startTime,
      domComplete: navigation.domComplete - navigation.startTime,
      domContentLoaded:
        navigation.domContentLoadedEventEnd - navigation.startTime,
      responseTime: navigation.responseEnd - navigation.requestStart,
      redirectCount: navigation.redirectCount,
    };
  }

  const [fps, setFps] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let startTime = performance.now();

    const calculateFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;
      if (elapsed >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        startTime = currentTime;
      }
      requestAnimationFrame(calculateFPS);
    };
    const animationFrame = requestAnimationFrame(calculateFPS);
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="flex flex-col bg-gray-900 min-h-screen items-center">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-center mt-10 space-y-4 md:space-y-0">
        <img
          src="tracker.svg"
          width="40"
          className="bg-orange-400 rounded-2xl md:mr-4"
        />
        <h1 className="text-green-500 text-4xl font-bold text-center">
          Info Tracker
        </h1>
        <img
          src="tracker.svg"
          width="40"
          className="hidden md:block ml-4 bg-orange-400 rounded-2xl"
        />
      </div>

      {/* Description */}
      <p className="text-center mt-6 max-w-2xl text-white text-sm sm:text-base px-4">
        Discover how much information your browser can provide, from system
        details to device capabilities. These details are often used by
        companies for analytics, personalization, and tracking. <br />
        However, this site does not store or share any data, it serves solely to
        demonstrate the possibilities of your browser.
      </p>

      <div className="flex flex-col w-full max-w-5xl mt-10 space-y-4 px-4">
        {/*  System Info */}
        <div className="bg-gray-800 p-6 rounded-md text-white">
          <InfoBox title="System Info" data={infoSystem} />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {/* Position */}
          <div className="bg-gray-800 p-6 rounded-md text-white flex-1">
            <button
              onClick={handleClick}
              className="bg-green-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-md mb-2"
            >
              Ask for position
            </button>
            {onClick && location && (
              <div className="flex flex-col p-6 rounded-md border border-green-500 w-full">
                <div className="flex flex-col md:flex-row">
                  <pre>latitude: {location.latitude}</pre>
                  <pre className="md:ml-4">longitude: {location.longitude}</pre>
                </div>
                <div className="flex flex-col items-start mt-4 sm:text-base">
                  <pre>
                    {location.address.house_number}&nbsp;
                    {location.address.road}
                    <br />
                    {location.address.postcode}&nbsp;
                    {location.address.town}
                  </pre>
                </div>
              </div>
            )}
            {onClick && error && (
              <div className="text-red-500 mt-4">
                <p>Error: {error}</p>
              </div>
            )}
          </div>

          {/* FPS Monitor */}
          <div className="p-6 bg-gray-800 text-white rounded-md flex">
            <div className="p-6 rounded-md border border-green-500 w-full">
              <h1 className="text-lg font-bold text-green-400">FPS Monitor</h1>
              <p className="text-sm mt-4">Current FPS: {fps}</p>
            </div>
          </div>
        </div>

        {/* Responsive Grid Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* WebGL */}
          <div className="bg-gray-800 p-6 rounded-md text-white">
            <InfoBox title="WebGL" data={webGl} />
          </div>
          {/* Screen Resolution */}
          <div className="bg-gray-800 p-6 rounded-md text-white">
            <InfoBox title="Screen Resolution" data={screenInfo} />
          </div>
          {/* Time Format */}
          <div className="bg-gray-800 p-6 rounded-md text-white">
            <InfoBox title="Time Format" data={{ timeFormat }} />
          </div>
          {/* Local Storage */}
          <div className="bg-gray-800 p-6 rounded-md text-white">
            <div className="p-6 rounded-md border border-green-500">
              <h1 className="text-xl mb-4 font-bold text-green-400">
                Local Storage
              </h1>
              <p className="mb-4">
                Value :&nbsp;
                <span className="font-mono">
                  {storedValue
                    ? (storedValue.match(/.{0,25}/g) || []).join("\n")
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
          {/* Network Info */}
          <div className="bg-gray-800 p-6 rounded-md text-white">
            <InfoBox title="Network Info" data={getNetworkInfo()} />
          </div>
          {/* Battery Info */}
          <div className="bg-gray-800 p-6 rounded-md text-white">
            <InfoBox title="Battery Info" data={batteryInfo} />
          </div>
          {/* Motion Info */}
          <div className="bg-gray-800 p-6 rounded-md text-white">
            <InfoBox title="Motion" data={motionData} />
          </div>
          {/* Performance Info */}
          <div className="bg-gray-800 p-6 rounded-md text-white">
            <InfoBox title="Performance" data={getPerformanceMetrics()} />
          </div>
        </div>

        {/* Fonts Section */}
        <div className="bg-gray-800 p-6 rounded-md text-white">
          <div className="p-6 rounded-md border border-green-500">
            <h1 className="text-xl mb-4 font-bold text-green-400">
              Tested Fonts
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(detectInstalledFonts()).map(([key, value]) => (
                <div key={key} className="flex border-gray-700">
                  <div>{key} :&nbsp;</div>
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
  );
}

export default App;
