import { useEffect, useRef } from "react";
import Masonry from "masonry-layout";

const MasonryGrid = ({ children }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      // Initialisation de Masonry
      new Masonry(gridRef.current, {
        itemSelector: ".grid-item", // Sélecteur pour chaque élément
        columnWidth: ".grid-sizer", // Largeur fixe des colonnes
        percentPosition: true, // Gestion des positions en pourcentage
        gutter: 20, // Espacement entre les colonnes
      });
    }
  }, []);

  return (
    <div ref={gridRef} className="grid w-full max-w-5xl mx-auto">
      {/* Élément de dimensionnement */}
      <div className="grid-sizer w-1/3"></div>
      {children}
    </div>
  );
};

export default MasonryGrid;
