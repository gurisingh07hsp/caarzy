const CarLoadingComponent = () => {

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative w-full max-w-2xl px-8">
        {/* Main Container */}
        <div className="text-center">
          {/* Brand Text */}
          <div className="mb-12">
            <h1 className="md:text-6xl font-black text-black tracking-tight mb-2">
              CAARZY
            </h1>
            <p className="text-red-600 font-semibold md:text-lg tracking-widest">
              LOADING YOUR EXPERIENCE
            </p>
          </div>

          {/* Car Animation Container */}
          <div className="relative h-40 mb-12">
            {/* Road */}
            <div className="absolute bottom-8 left-0 right-0 h-1 bg-black">
              <div className="flex justify-around h-full">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-full bg-red-600 animate-road-line"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>

            {/* Car */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-car-drive">
              <div className="relative">
                {/* Exhaust Smoke */}
                <div className="absolute -left-6 top-6">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-black rounded-full opacity-30 animate-smoke"
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                  ))}
                </div>

                {/* Car Body */}
                <div className="relative w-32 h-16">
                  {/* Main Body */}
                  <div className="absolute bottom-0 w-20 h-8 md:w-28 md:h-10 bg-red-600 rounded-lg shadow-xl">
                    {/* Window Area */}
                    <div className="absolute -top-6 left-6 w-10 md:w-16 h-8 bg-black rounded-t-lg">
                      <div className="absolute top-1 left-2 w-5 h-5 bg-white rounded-sm" />
                      <div className="absolute top-1 right-2 w-5 h-5 bg-white rounded-sm" />
                    </div>
                    
                    {/* Side Details */}
                    <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full" />
                    <div className="absolute top-2 right-2 w-6 h-3 bg-black rounded-sm" />
                  </div>

                  {/* Wheels */}
                  <div className="absolute -bottom-2 left-2 w-6 h-6 bg-black rounded-full border-2 border-white animate-spin-wheel">
                    <div className="absolute inset-1 bg-red-600 rounded-full" />
                  </div>
                  <div className="absolute -bottom-2 right-6 w-6 h-6 bg-black rounded-full border-2 border-white animate-spin-wheel">
                    <div className="absolute inset-1 bg-red-600 rounded-full" />
                  </div>
                </div>

                {/* Speed Lines */}
                <div className="absolute top-4 -left-20 w-16">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-0.5 bg-red-600 mb-2 animate-speed-line"
                      style={{ 
                        animationDelay: `${i * 0.2}s`,
                        width: `${(3 - i) * 20}px`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes road-line {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(-100%);
            opacity: 0;
          }
        }

        @keyframes car-drive {
          0%, 100% {
            transform: translate(-50%, 0);
          }
          50% {
            transform: translate(-50%, -8px);
          }
        }

        @keyframes smoke {
          0% {
            transform: translateX(0) scale(0.5);
            opacity: 0.4;
          }
          100% {
            transform: translateX(-40px) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes spin-wheel {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes speed-line {
          0% {
            transform: translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(-30px);
            opacity: 0;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-road-line {
          animation: road-line 1.5s linear infinite;
        }

        .animate-car-drive {
          animation: car-drive 0.6s ease-in-out infinite;
        }

        .animate-smoke {
          animation: smoke 1.2s ease-out infinite;
        }

        .animate-spin-wheel {
          animation: spin-wheel 0.4s linear infinite;
        }

        .animate-speed-line {
          animation: speed-line 0.8s ease-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CarLoadingComponent;