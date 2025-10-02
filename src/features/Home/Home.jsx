import React, { useState, useEffect } from 'react';
import FadeContent from '../../components/Common/FadeContent';
import CardSwap, { Card } from '../../components/Common/Cardswap';
import PixelBlast from '../../components/Common/Background/PixelBlast';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-screen h-full overflow-hidden" style={{ height: "calc(100vh - 64px)" }}>
      {/* PixelBlast background full screen */}
      <div className="absolute inset-0 -z-10">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#B19EEF"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div>

      <FadeContent blur={true} duration={1200} easing="ease-out" initialOpacity={1}>
        {/* Căn giữa theo cả 2 chiều */}
        <div className="flex items-center overflow-hidden h-screen text-white">
          <div className=" max-w-4xl w-full px-4">
            <h2 className="text-3xl font-bold mb-6">3D Card Swap Example</h2>

            <CardSwap
              cardDistance={80}
              verticalDistance={90}
              delay={5000}
              pauseOnHover={false}
            >
              {/* === Card 1: JavaScript === */}
              <Card>
                <h3 className="mb-2 text-lg font-semibold">JavaScript</h3>
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex  space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 ml-4 ">JavaScript</span>
                  </div>
                  <pre className="text-green-400 text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap">
{`// Tạo email tạm thời
const response = await fetch('https://temp.zikdev.io.vn/createmail', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log('Email tạm:', data.email);
// Output: temp_abc123@tempmail.vn`}
                  </pre>
                </div>
              </Card>

              {/* === Card 2: Python === */}
              <Card>
                <h3 className="mb-2 text-lg font-semibold">Python</h3>
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                    <span className="text-gray-400 ml-4">Python</span>
                  </div>
                  <pre className="text-sky-300 text-xs sm:text-sm overflow-x-auto whitespace-pre">
{`# Tạo email tạm thời với requests
import requests

url = "https://temp.zikdev.io.vn/createmail"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

resp = requests.post(url, headers=headers)
data = resp.json()
print("Email tạm:", data.get("email"))
# Output: temp_abc123@tempmail.vn`}
                  </pre>
                </div>
              </Card>

              {/* === Card 3: Rust === */}
              <Card>
                <h3 className="mb-2 text-lg font-semibold">Rust</h3>
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
                    <span className="text-gray-400 ml-4">Rust</span>
                  </div>
                  <pre className="text-orange-300 text-xs sm:text-sm overflow-x-auto whitespace-pre">
{`// Tạo email tạm thời bằng reqwest (async)
use reqwest::Client;
use serde::Deserialize;

#[derive(Deserialize)]
struct Resp {
    email: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new();
    let resp: Resp = client.post("https://temp.zikdev.io.vn/createmail")
        .header("Authorization", "Bearer YOUR_API_KEY")
        .header("Content-Type", "application/json")
        .send()
        .await?
        .json()
        .await?;

    println!(\"Email tạm: {}\", resp.email);
    Ok(())
}`}
                  </pre>
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>
      </FadeContent>
    </div>
  );
};

export default Home;
