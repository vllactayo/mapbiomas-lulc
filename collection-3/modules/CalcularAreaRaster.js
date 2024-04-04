exports.Clasif_Area_Calc = function(clasification,bands_name,scale,regionsRaster,driveFolder,OuputFileName){

  /**
  * 
  */
  // Territory image
  var territory = regionsRaster;
  
  // LULC raster_clasification image
  var raster_clasification = clasification.selfMask();
  
  // Map.addLayer(raster_clasification.randomVisualizer(),{},'raster_clasification',false)
  // Map.addLayer(territory.randomVisualizer(),{},'territory',false)
  
  // Image area in km2
  var pixelArea = ee.Image.pixelArea().divide(1000000); //km2
  
  // Geometry to export
  var geometry = raster_clasification.geometry();
  
  /**
  * Convert a complex ob to feature collection
  * @param obj 
  */
  var convert2table = function (obj) {
  
      obj = ee.Dictionary(obj);
  
      var territory = obj.get('territory');
  
      var classesAndAreas = ee.List(obj.get('groups'));
  
      var tableRows = classesAndAreas.map(
          function (classAndArea) {
              classAndArea = ee.Dictionary(classAndArea);
  
              var classId = classAndArea.get('class');
              var area = classAndArea.get('sum');
  
              var tableColumns = ee.Feature(null)
                  .set('territory', territory)
                  .set('class', classId)
                  .set('area', area);
  
              return tableColumns;
          }
      );
  
      return ee.FeatureCollection(ee.List(tableRows));
  };
  
  /**
  * Calculate area crossing a cover map (deforestation, raster_clasification)
  * and a region map (states, biomes, municipalites)
  * @param image 
  * @param territory 
  * @param geometry
  */
  var calculateArea = function (image, territory, geometry) {
  
      var reducer = ee.Reducer.sum().group(1, 'class').group(1, 'territory');
  
      var territotiesData = pixelArea.addBands(territory).addBands(image)
          .reduceRegion({
              reducer: reducer,
              geometry: geometry,
              scale: scale,
              maxPixels: 1e12
          });
  
      territotiesData = ee.List(territotiesData.get('groups'));
  
      var areas = territotiesData.map(convert2table);
  
      areas = ee.FeatureCollection(areas).flatten();
  
      return areas;
  };
  
  var areas = bands_name.map(
      function (band) {
          // var image = raster_clasification.select('classification_' + year);
          var image = raster_clasification.select(band)
          
          var areas = calculateArea(image, territory, geometry);
  
          // set additional properties
          areas = areas.map(
              function (feature) {
                  return feature.set('band', band);
              }
          );
  
          return areas;
      }
  );
  
  areas = ee.FeatureCollection(areas).flatten();
  
  Export.table.toDrive({
      collection: areas,
      description: OuputFileName,  
      folder: driveFolder,
      fileNamePrefix: OuputFileName,
      fileFormat: 'CSV'
  });
  
  
}