import { recordLabels } from "@public/data";
import React, { useState } from 'react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@components/ui/collapsible";

interface YearsFilterProps {
    selectedYear: number | null;
    handleYearSelection: (year: number | null) => void;
  }
  

  export const YearsFilter: React.FC<YearsFilterProps> = ({ selectedYear, handleYearSelection }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const handleToggle = () => {
      setIsExpanded(!isExpanded);
    };
  
    const yearOptions = Array.from(
      new Set(recordLabels.map((label) => label.founding_year))
    );
  
    return (
        <div className="@container">
          <div className="divide-y">
            <Collapsible>
              <CollapsibleTrigger
                onClick={handleToggle}
                className="text-texthigh w-full py-4"
              >
                <span className="float-left pl-6">Year</span>
                <span className="mr-2 float-right">{isExpanded ? '-' : '+'}</span>
              </CollapsibleTrigger>
              {isExpanded && (
                <CollapsibleContent className="pb-4 w-full">
                  <div>
                    {yearOptions.map((year) => (
                      <div
                        key={year}
                        className={`py-4 bg-accent0 cursor-pointer pl-8 font-normal divide-y divide-y-reverse ${
                          year === String(selectedYear) ? "bg-accent1 text-texthigh" : ""
                        }`}
                        onClick={() => handleYearSelection(parseInt(year))}
                      >
                        {year}
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              )}
            </Collapsible>
          </div>
        </div>
      );
    };