import React, { useState } from "react"
import { recordLabelsData } from "@/public/recordLabelsData"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface YearsFilterProps {
  selectedYear: number | null
  handleYearSelection: (year: number | null) => void
}

export const YearsFilter: React.FC<YearsFilterProps> = ({
  selectedYear,
  handleYearSelection,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  const yearOptions = Array.from(
    new Set(recordLabelsData.map((label) => label.founding_year))
  )

  return (
    <div className="@container">
      <div className="divide-y">
        <Collapsible>
          <CollapsibleTrigger
            onClick={handleToggle}
            className="w-full py-4 text-texthigh"
          >
            <span className="float-left pl-6">Year</span>
            <span className="float-right mr-2">{isExpanded ? "-" : "+"}</span>
          </CollapsibleTrigger>
          {isExpanded && (
            <CollapsibleContent className="w-full pb-4">
              <div>
                {yearOptions.map((year) => (
                  <div
                    key={year}
                    className={`cursor-pointer divide-y divide-y-reverse bg-accent py-4 pl-8 font-normal ${
                      year === String(selectedYear)
                        ? "bg-accent-1 text-texthigh"
                        : ""
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
  )
}
