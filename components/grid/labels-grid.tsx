"use client";

import "@/styles/globals.css";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { recordLabelsData } from "@/public/recordLabelsData";
import { Icon } from "@/components/icon";

import { Suspense } from "react";

interface RecordLabelsGridProps {
  selectedGenre: string | null; // Define the type of selectedGenre
  selectedYear: string | null; // Define the type of selectedYear
  selectedCountry: string | null;
}

export function RecordLabelsGrid({
  selectedYear,
  selectedCountry,
  selectedGenre,
}: RecordLabelsGridProps) {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const expandedLabelRef = useRef(null);

  const handleLabelClick = (labelIndex: number) => {
    setSelectedLabel((prevSelectedLabel) =>
      prevSelectedLabel === labelIndex.toString() ? null : labelIndex.toString()
    );
  };

  // Filter and sort logic
  const sortedAndFilteredLabels = recordLabelsData
    .filter(
      (label) =>
        (selectedGenre === null || label.genres.includes(selectedGenre)) &&
        (selectedYear === null || label.founding_year.includes(selectedYear)) &&
        (selectedCountry === null || label.country.includes(selectedCountry))
    )
    .sort((a, b) => a.name.localeCompare(b.name));
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectedLabel !== null &&
        event.target instanceof Element &&
        event.target.closest(".expanded-label-container")
      ) {
        // Inside the expanded label container, do nothing
        return;
      }
      setSelectedLabel(null);
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedLabel(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [selectedLabel]);

  const initialColumnWidth = 200; // Initial column width
  const [columnWidth, setColumnWidth] = useState(initialColumnWidth);

  const handleResize = (e: React.SyntheticEvent) => {
    setColumnWidth((e.target as HTMLDivElement).offsetWidth);
  };

  return (
    <>
      <div
        id="djs-grid"
        className="sm:music-grid music-grid-mobile scrollable-container -z-10 grow overflow-y-scroll border-muted pl-4 pt-2 pb-12 pr-8 @container sm:pl-12"
      >
        <div className="grid grid-flow-row-dense grid-cols-2 gap-4 @xs:grid-cols-3 @sm:grid-cols-4 @md:grid-cols-5 @lg:grid-cols-6 @xl:grid-cols-6 @2xl:grid-cols-7 @3xl:grid-cols-8 @4xl:grid-cols-9">
          <Suspense fallback={<RecordLabelsGridSkeleton />}>
            {sortedAndFilteredLabels.map((label, index) => (
              <React.Fragment key={index}>
                <div
                  key={label.id}
                  className={`relative cursor-pointer items-center justify-center text-center ${
                    selectedLabel === index.toString() ? "" : ""
                  }`}
                  onClick={() => handleLabelClick(index)}
                >
                  <Image
                    width={400}
                    height={400}
                    src={label.image}
                    alt={label.name}
                    className="my-4 cursor-pointer rounded-full border-4 border-muted"
                  />
                  <h3 className="cursor-pointer text-sm font-bold text-texthigh hover:text-theme sm:text-xl">
                    {label.name}
                  </h3>
                  <p className="cursor-pointer text-xs text-textlow hover:text-theme">
                    {label.genres.join(", ")}
                  </p>
                  {String(selectedLabel) === String(index) && (
                    <div className="arrow-up absolute top-[96%] left-0 right-0 flex justify-center z-100 text-muted">
                      <Icon name="chevron-up" className="h-10 w-10" />
                    </div>
                  )}
                  {String(selectedLabel) === String(index) && (
                    <div className="arrow-up absolute top-[98%] left-0 right-0 flex justify-center z-100 text-gray-100 dark:text-gray-900/50">
                      <Icon name="chevron-up" className="h-10 w-10" />
                    </div>
                  )}
                </div>
                {String(selectedLabel) === String(index) && (
                  <div
                    ref={expandedLabelRef}
                    className="sm:-ml-12 -ml-4 -mr-12 col-span-full hidden border-spacing-2 border-y-2 border-muted bg-gray-100 dark:bg-gray-900/50 py-8 @container @xs:block"
                  >
                    <div className="flex gap-4 px-12">
                      <div className="flex justify-center border-r-2 border-muted">
                        <Link href={`labels/${label.id}`} className="">
                          <Image
                            src={label.image}
                            width={380}
                            height={380}
                            alt={label.id}
                            className="cursor-pointer object-contain"
                          />
                        </Link>
                      </div>
                      <section className="flex flex-col w-full pl-8 gap-8">
                        <div className="">
                          <Link href={`labels/${label.id}`}>
                            <h3 className="cursor-pointer text-4xl font-bold text-texthigh">
                              {label.name}
                            </h3>
                          </Link>
                          <div className="flex text-sm text-textlow gap-1.5">
                            <span>{label.founding_year}</span>
                            <span> - </span>
                            <span>{label.country}</span>
                            <span> - </span>

                            <span>{label.genres}</span>
                          </div>
                        </div>
                        <div className="">
                          <p>
                            <strong className="text-lg text-texthigh">
                              Description:
                            </strong>
                          </p>
                          <p className="text-textlow">{label.description}</p>
                        </div>
                      </section>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </Suspense>
        </div>
      </div>
    </>
  );
}

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-theme/10 before:to-transparent`;

function RecordLabelSkeleton() {
  return (
    <div className="flex flex-col col-span-4 lg:col-span-1">
      <div className={`bg-card h-[400px] w-[400px] rounded-t-lg ${shimmer}`}>
        <div className={`bg-card ${shimmer}`} />
      </div>
    </div>
  );
}

export function RecordLabelsGridSkeleton() {
  // Define the number of skeletons you want in the array
  return (
    <div className="grid grid-flow-row-dense grid-cols-2 gap-4 @xs:grid-cols-3 @sm:grid-cols-4 @md:grid-cols-5 @lg:grid-cols-6 @xl:grid-cols-6 @2xl:grid-cols-7 @3xl:grid-cols-8 @4xl:grid-cols-9">
      {[...Array(12)].map((_, index) => (
        <RecordLabelSkeleton key={index} />
      ))}
    </div>
  );
}
