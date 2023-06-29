"use client";
import * as React from "react";
import { recordLabels } from '@public/data.js';
import { Banner } from '@components';



const LabelCard: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <Banner />
      {/* Content */}
      <main className="container mx-auto py-8 px-6">
        <div className="flex flex-wrap -mx-4">
          {/* Left column */}
          <div className="w-full px-4">
            {/* Releases section */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Releases</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recordLabels.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg p-4 shadow-md">
                    <img
                      src={item.image}
                      alt={item.id}
                      className="w-full h-auto rounded-lg"
                    />
                 
                    <div className="mt-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg">
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right column */}
          {/* ... */}
        </div>
      </main>
    </div>
  );
};

export default LabelCard;