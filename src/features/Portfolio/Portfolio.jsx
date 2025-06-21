import React from "react";
import GooeyNav from '../../components/Common/GooeyNav'
import BlurText from '../../components/Common/BlurText'
import SplitText from "../../components/Common/SplitText";
const Portfolio = () => {
    const items = [
        { label: "Home", href: "#" },
        { label: "About", href: "#" },
        { label: "Contact", href: "#" },
    ];
    return (
        <>
            <div className="bg-black " >
                <nav className="bg-black backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-white flex justify-center items-center">  
                    <div className="flex justify-center" style={{ height: '40px', width: '100%', position: 'relative' }}>
                        <GooeyNav
                            items={items}
                            particleCount={15}
                            particleDistances={[90, 10]}
                            particleR={100}
                            initialActiveIndex={0}
                            animationTime={600}
                            timeVariance={300}
                            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                        />
                    </div>
                </nav>
                {/* Home */}
                <section className="flex min-h-screen justify-center items-center text-color-white" >
                    <SplitText
  text="Hello, You are welcome to my portfolio"
  className="font-semibold text-center text-white text-6xl"
  delay={100}
  duration={0.6}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"

/>
                </section>
                {/* About */}
                <setion>

                </setion>
                {/* Contact */}
                <section className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
                    <BlurText
  text="Get in touch"
  delay={150}
  animateBy="words"
  direction="top"
  className="text-2xl mb-8 text-color-white text-center"
/>
                </section>
            </div>
        </>
    );
}
export default Portfolio;