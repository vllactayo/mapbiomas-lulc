exports.listpaths = function(country){return {  
  
  /**  
   * Rutas generales usadas en toda la metodología 
   */ 
          mensaje: country,
      // GENERAL
          regionVector:       'projects/mapbiomas-raisg/MAPBIOMAS-PERU/DATOS-AUXILIARES/VECTORES/per-clasificacion-regiones-3',
          regionVectorBuffer: 'projects/mapbiomas-raisg/MAPBIOMAS-PERU/DATOS-AUXILIARES/VECTORES/per-clasificacion-regiones-3',
          regionClasRaster:   '',
          regionMosVector:    'projects/mapbiomas-raisg/MAPBIOMAS-PERU/DATOS-AUXILIARES/VECTORES/per-clasificacion-mosaicos-3',
          regionMosRaster:    '',
          grids:'projects/mapbiomas-raisg/DATOS_AUXILIARES/VECTORES/grid-world',
        
      // // AMBITO RAISG 
      //     gridsRaisg:'projects/mapbiomas-raisg/DATOS_AUXILIARES/VECTORES/cartas-mapbiomas-2',
      //     cartasRaisg: 'projects/mapbiomas-raisg/DATOS_AUXILIARES/VECTORES/cartas-RAISG-regiones-2',


      // GENERAL
        // mosaics_c3_v2: 'projects/nexgenmap/MapBiomas2/LANDSAT/PANAMAZON/mosaics-1',
        // mosaics_path_row_L2: 'projects/mapbiomas-raisg/MOSAICOS/mosaics-pathrow-2',
        
        mosaics_c4_raisg: 'projects/mapbiomas-raisg/MOSAICOS/mosaics-2',
        mosaics_c4_nexgen:'projects/nexgenmap/MapBiomas2/LANDSAT/PANAMAZON/mosaics-2', //Para perú
        
        
        mosaics: 'projects/nexgenmap/MapBiomas2/LANDSAT/PANAMAZON/', //colecciones de mosaico
        terrain:       'JAXA/ALOS/AW3D30_V1_1', //DEM
        collection1:   'projects/mapbiomas-raisg/COLECCION1/integracion',
        collection2: 'projects/mapbiomas-raisg/SUBPRODUCTOS/MOORE/classification/mapbiomas-raisg-collection20-integration-v8',
        collection3: 'projects/mapbiomas-raisg/public/collection3/mapbiomas_raisg_panamazonia_collection3_integration_v2',
        collection4: 'projects/mapbiomas-raisg/public/collection4/mapbiomas_raisg_panamazonia_collection4_integration_v1',
        collection5: "projects/mapbiomas-raisg/public/collection5/mapbiomas_raisg_panamazonia_collection5_integration_v1",
        collection6: "projects/mapbiomas-raisg/public/collection5/mapbiomas_raisg_panamazonia_collection6_integration_v1",   
        collection1_PE: "projects/mapbiomas-public/assets/peru/collection1/mapbiomas_peru_collection1_integration_v1",
        collection2_PE: "projects/mapbiomas-raisg/MAPBIOMAS-PERU/COLECCION2/INTEGRACION/mapbiomas_peru_collection2_integration_v1",
        Ref_lulc2: "users/mapbiomas_c1/lulc2",
        // classification_DEMERN:'projects/mapbiomas-raisg/DATOS_AUXILIARES/RASTERS/per_classification_DEMERN',
        // CobVeg_MINAM:'projects/mapbiomas-raisg/DATOS_AUXILIARES/RASTERS/per_cobveg2015_homologado',
        // midagri2020:'projects/mapbiomas-raisg/DATOS_AUXILIARES/RASTERS/per_midagri2020',
        // bosqueseco2018_SERFOR:'projects/mapbiomas-raisg/DATOS_AUXILIARES/RASTERS/per_bosqueseco2018_SERFOR',
        // cofopri2015: 'projects/mapbiomas-raisg/DATOS_AUXILIARES/RASTERS/per_cofopri2015',
    
  /**
   * Rutas correspondientes al step-3
   */
  basePath: 'projects/mapbiomas-raisg/MAPBIOMAS-PERU/COLECCION3/',
  muestrasestables: 'projects/mapbiomas-raisg/MAPBIOMAS-PERU/COLECCION3/MUESTRAS/',
  pixelesEstables: 'projects/mapbiomas-raisg/MAPBIOMAS-PERU/COLECCION3/MUESTRAS/pixeles-estables/', 

  trainingPoints01: 'projects/mapbiomas-raisg/MAPBIOMAS-PERU/COLECCION3/MUESTRAS/ENTRENAMIENTO/',
  AreasClass: 'projects/mapbiomas-raisg/MAPBIOMAS-PERU/COLECCION3/MUESTRAS/AREAS_CLASE_REGION/',

  /**
   * Rutas correspondientes al  step-4
   */
      // AMBITO PERU 
       classification:       'projects/mapbiomas-raisg/MAPBIOMAS-PERU/COLECCION3/clasificacion',
       clasificacionFiltros: 'projects/mapbiomas-raisg/MAPBIOMAS-PERU/COLECCION3/clasificacion-ft',
       filtrosMetadata:      'projects/mapbiomas-raisg/MAPBIOMAS-PERU/COLECCION3/metadata',

       
  // /**
  // * Rutas correspondientes al step-4
  // */
  //     // AMBITO RAISG 
  //       clasificacionFiltrosRaisg: 'projects/mapbiomas-raisg/COLECCION5/clasificacion-ft',
  //       filtrosMetadataRaisg: 'projects/mapbiomas-raisg/COLECCION5/metadata',
  //     // AMBITO NO RAISG 
  //       clasificacionFiltros: 'projects/mapbiomas-raisg/MAPBIOMAS-PERU/COLECCION3/clasificacion-ft',
  //       filtrosMetadata: 'projects/mapbiomas-raisg/MAPBIOMAS-PERU/COLECCION3/metadata',

}
  
};

















