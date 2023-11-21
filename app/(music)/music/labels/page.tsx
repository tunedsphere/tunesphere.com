"use client"
import { RecordLabelsGrid, RecordLabelsGridSkeleton } from "@/components/grid/labels-grid";
import { useMusicContext } from "@/components/grid/music-context"


export default function LabelsPage() {

  const { selectedYear, selectedCountry, selectedGenre } = useMusicContext();
 

  return (
 <>

         <RecordLabelsGrid 
            selectedGenre={selectedGenre || null} // Pass the selectedGenre prop
            selectedYear={selectedYear || null}   // Pass the selectedYear prop
            selectedCountry={selectedCountry|| null}/>

     </>
  );
}
