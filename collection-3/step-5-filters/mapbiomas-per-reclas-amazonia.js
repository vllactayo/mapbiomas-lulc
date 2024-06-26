/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var imageVisParam = {"opacity":1,"bands":["Agricultura_2020_MINAGRI"],"min":0,"max":34,"palette":["ffffff","129912","1f4423","006400","00ff00","687537","76a5af","29eee4","77a605","935132","bbfcac","45c2a5","b8af4f","f1c232","ffffb2","ffd966","f6b26b","f99f40","e974ed","d5a6bd","c27ba0","ff3d4f","ea9999","dd7e6b","aa0000","ff99ff","0000ff","d5d5e5","dd497f","b2ae7c","af2a2a","8a2be2","968c46","0000ff","4fd3ff"]},
    imageVisParam2 = {"opacity":1,"bands":["Agricultura_2020_MINAGRI"],"min":0,"max":34,"palette":["ffffff","129912","1f4423","006400","00ff00","687537","76a5af","29eee4","77a605","935132","bbfcac","45c2a5","b8af4f","f1c232","ffffb2","ffd966","f6b26b","f99f40","e974ed","d5a6bd","c27ba0","fdff2b","ea9999","dd7e6b","aa0000","ff99ff","0000ff","d5d5e5","dd497f","b2ae7c","af2a2a","8a2be2","968c46","0000ff","4fd3ff"]};
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// LIMPIEZA POR PIXEL ESTABLE Y CAPAS REFERENCIA MINAM Y MINAGRI
// Aplicado por region de clasificacion

var param = {
    ID_pais: 8,
    pais: 'PERU',
    region: 70102,
    year: 2022,          // Solo visualizacion
    version_input: 22,
    version_output:25,
    clase_destino: 21,    // Destino de clases 1 y 2 de Deforestación
    periodo: [1985,2022], // Indicar el periodo para el remap aplicado solo para remap MINAM
    dist_buffer: 300,       // metros
    buffer_agua: true,      // Incluir clase 33 al buffer
    inclusion_geometrias: true, // true: Agrega geometrias INCLUSION, SOLO si existen geometrias dentro de la region
                                // false: Elegir cuando no existen geometrías dentro de la región o no se desea agregar
    // use_stablePixel: false //condicionar remap pixel estable aplicado para todos los años
};

var palettes = require('users/mapbiomas/modules:Palettes.js');
var dirs = require('users/raisgmb01/projects-mapbiomas:mapbiomas-peru/collection-5/modules/CollectionDirectories.js');
var paths = dirs.listpaths(param.pais);
var assetClasif = paths.classification;
var assetFiltros = paths.clasificacionFiltros
var dirout  = paths.clasificacionFiltros
var regionesclass = paths.regionVectorBuffer
var pathpixelstable = 'projects/mapbiomas-raisg/MUESTRAS/'+ param.pais + '/COLECCION5/MUESTRAS_ESTABLES/muestras-estables/ME-' + param.pais  +'-' + param.region + '-1'
var AssetMosaic= [ paths.mosaics_c4_raisg,  paths.mosaics_c4_nexgen]

// var assetMosaic =  'projects/nexgenmap/MapBiomas2/LANDSAT/PANAMAZON/mosaics-2';
var assetCountries = 'projects/mapbiomas-raisg/DATOS_AUXILIARES/VECTORES/paises-2';
var assetBosqueMINAM = "projects/mapbiomas-raisg/DATOS_AUXILIARES/RASTERS/per_bosque_no_bosque_2020" //2020
var assetAgriMINAGRI = "projects/mapbiomas-raisg/DATOS_AUXILIARES/RASTERS/per_midagri2020" //2020

var assetDefoMINAM2021 = "projects/mapbiomas-raisg/DATOS_AUXILIARES/RASTERS/DEF_MINAM_FILTRO"
var inclusion = "projects/mapbiomas-raisg/DATOS_AUXILIARES/RASTERS/PERU/Inclusion_deforestacion-2021"

var region = ee.FeatureCollection(regionesclass).filterMetadata('id_regionC', 'equals', param.region)


var palettes = require('users/mapbiomas/modules:Palettes.js');
var pal = palettes.get('classification2');
var vis = {
      bands: 'classification_'+param.year,
      min:0,
      max:34,
      palette: pal,
      format: 'png'
    };

var setVersion = function(item) { return item.set('version', 1) };
var regioesRaster = region
                      .map(setVersion)
                      .reduceToImage({
  properties: ['version'],
  reducer: ee.Reducer.first(),
  });
                      
var pixelstable = ee.Image(pathpixelstable)
print(pixelstable)

var Classif_Input
if(param.version_input == 1 || param.version_input == 2){
    var assetPath = assetClasif + '/' + param.pais + '-' + param.region;
    Classif_Input = ee.Image(assetPath  + '-' + param.version_input);
   } else {
    Classif_Input = ee.ImageCollection(assetFiltros)
              .filterMetadata('code_region', 'equals', param.region)
              .filterMetadata('version', 'equals', param.version_input)
              .min();
   }

// *******************Limpieza con pixel estable col3*************************
// if(param.use_stablePixel){
//     Map.addLayer(Classif_Input
//             .reproject('EPSG:4326', null, 30), 
//             vis, 'Clasif-Col4-Original'+param.year, false);  
            
//     Classif_Input = Classif_Input.where(pixelstable.eq(21).and(Classif_Input.eq(3)), 21) 
//                                 .where(pixelstable.eq(21).and(Classif_Input.eq(25)),21)
//                                 .where(pixelstable.eq(14).and(Classif_Input.eq(3)), 21) 
//                                 .where(pixelstable.eq(14).and(Classif_Input.eq(25)),21)
//     Map.addLayer(Classif_Input
//             .reproject('EPSG:4326', null, 30), 
//             vis, 'Clasif-Col4-Remap-PixEst-'+param.year, false);               
// }

//***************************************************************************************

var country = ee.FeatureCollection(assetCountries).filterMetadata('name', 'equals', 'Perú');

// Capa de DEFORESTACIÓN MIMAM 2021
var DefoMINAM2021 = ee.Image(assetDefoMINAM2021)
                      .remap([1,2,3,4,5],[param.clase_destino,param.clase_destino,3,33,0])
                      .rename('Deforest_MINAM_2021')
                      .updateMask(regioesRaster);
                      
// Capa de geometrias inclusión
                      
//----Añade geometrias creadas a la capa DefoMINAM2021----//

var inclusion_raster = ee.Image(inclusion)

// Visualiza el raster
print(inclusion_raster);
Map.addLayer(inclusion_raster, {palette: ['000000', 'ebebeb']}, 'Inclusion-geometrias', true);

// Blend Deforestacion - inclusion

if(param.inclusion_geometrias){
  DefoMINAM2021 = DefoMINAM2021.blend(inclusion_raster)
                      .updateMask(regioesRaster)
}
                      
// spatial filtrer mask

var conect = DefoMINAM2021.connectedPixelCount(100).rename('connected')
var moda = DefoMINAM2021.select(0).focal_mode(1, 'square', 'pixels')
moda = moda.mask(conect.select('connected').lte(5))
var DefoMINAM2021_ref = DefoMINAM2021.select(0).blend(moda)


//--
var years = []
for (var y = param.periodo[0]; y <= param.periodo[1]; y++) {years.push(y)}

var bandNamesPeriodo = ee.List(
    years.map(
        function (year) {
            return 'classification_' + String(year);
        }
    )
);

 

//buffer around - Deforestacion
var No_Bosque_2020_def = DefoMINAM2021_ref.eq(param.clase_destino)
                                                   // .or(DefoMINAM2021_ref.eq(33))
                                                    .or(DefoMINAM2021_ref.eq(5));
 
var No_Bosque_2020_def;

if(param.buffer_agua){
  No_Bosque_2020_def = DefoMINAM2021_ref.eq(param.clase_destino)
                                                    .or(DefoMINAM2021_ref.eq(33))
                                                    .or(DefoMINAM2021_ref.eq(5));
  } else {
  No_Bosque_2020_def = DefoMINAM2021_ref.eq(param.clase_destino)
                                                    .or(DefoMINAM2021_ref.eq(5));
}



var buffer_def = ee.Image(1)
    .cumulativeCost({
      source: No_Bosque_2020_def, 
      maxDistance: param.dist_buffer,
    }).lt(param.dist_buffer);

buffer_def = ee.Image(0).where(buffer_def.eq(1), 1).clip(country)
var Classif_InputRemap_def =  Classif_Input.select(bandNamesPeriodo)
                                      .where(Classif_Input.select(bandNamesPeriodo).eq(21)
                                                .and(DefoMINAM2021_ref.eq(3))
                                                .and(buffer_def.neq(1)), 3)
                                        .where(Classif_Input.select(bandNamesPeriodo).eq(25)
                                                .and(DefoMINAM2021_ref.eq(3))
                                                .and(buffer_def.neq(1)), 3)
                                      // .where(Classif_Input.select(bandNamesPeriodo).eq(33)
                                      //           .and(DefoMINAM2021_ref.eq(3))
                                      //           .and(buffer_def.neq(1)), 3)
                                        .where(Classif_Input.select(bandNamesPeriodo).eq(3)
                                                .and(DefoMINAM2021_ref.eq(param.clase_destino))
                                                .and(buffer_def.neq(1)), param.clase_destino)

Classif_InputRemap_def = Classif_Input.addBands(Classif_InputRemap_def, null, true)


var remapDif = Classif_InputRemap_def.select('classification_'+param.year)
              .neq(Classif_Input.select('classification_'+param.year))



var mosaicRegion = param.region.toString().slice(0, 3);
var collMosaic = ee.ImageCollection(AssetMosaic[0]).merge(ee.ImageCollection(AssetMosaic[1]))
            .filterMetadata('region_code', 'equals', Number(mosaicRegion))
            .select(['swir1_median', 'nir_median', 'red_median'])
            .filterMetadata('year', 'equals', param.year);
            
Map.addLayer(collMosaic.mosaic().updateMask(regioesRaster), {
        'bands': ['swir1_median', 'nir_median', 'red_median'],
        "min":150,
        "max":4700,
   }, 'Mosaic-'+param.year, false)
   
if(param.use_stablePixel !== true){
Map.addLayer(Classif_Input
            .reproject('EPSG:4326', null, 30), 
            vis, 'Clasif-Col4-Original-'+param.year, true);
}
            
Map.addLayer(Classif_InputRemap_def
            .reproject('EPSG:4326', null, 30),
            vis, 'Clasif-Remap-DEFOREST2021-Col4', true);


Map.addLayer(DefoMINAM2021_ref
            .reproject('EPSG:4326', null, 30), 
            {min:0, max:34, palette: pal}, 'DefoMINAM2021_ref', false)            
Map.addLayer(buffer_def.mask(buffer_def)
            .reproject('EPSG:4326', null, 30), 
            {min: 0, max: 1, palette: ['ff4c3b'], opacity:0.5}, 'DefoMINAM2021_ref_buffer'+param.dist_buffer+'m', false);
Map.addLayer(remapDif.updateMask(remapDif)
            .reproject('EPSG:4326', null, 30), 
            {max:1, min:0, palette:['ff0000']}, 'Pixeles con REMAP', false) 


// // TODOS LOS AÑOS
// for (var year = 1985; year <= 2018; year++) {

//     Map.addLayer(collMosaic.filterMetadata('year', 'equals', year).mosaic().clip(country), {
//         'bands': ['swir1_median', 'nir_median', 'red_median'],
//         'gain': [0.08, 0.06, 0.3],
//         'gamma': 0.5
//     },
//         'Mosaic ' + String(year), false);

//     var palettes = require('users/mapbiomas/modules:Palettes.js');

//     Map.addLayer(Classif_InputRemap, {
//         'bands': ['classification_' + String(year)],
//         'palette': palettes.get('classification2'),
//         'min': 0,
//         'max': 34
//     }, 'Classification ' + String(year), false);
// }

Classif_InputRemap_def = Classif_InputRemap_def
          .set('code_region', param.region)
          .set('pais', param.pais)
          .set('version', param.version_output)
          .set('descripcion', 'filtro bosque')
          .set('paso', 'P14');
          
print(Classif_InputRemap_def)


var prefijo_out = param.pais+ '-' + param.region + '-' +  param.version_output;

Export.image.toAsset({
    'image': Classif_InputRemap_def,
    'description': prefijo_out,
    'assetId': dirout+'/'+prefijo_out,
    'pyramidingPolicy': {
        '.default': 'mode'
    },
    'region': region.geometry().bounds(),
    'scale': 30,
    'maxPixels': 1e13
});






// APUNTES REF
// Script de recuperacion de pixeles estables
//  recuperar los pixeles estables de la coll 3 y remplazaria a la col4
//  col3 estable clase 3, col4 estable clase 12.   revisar
//  col3 estable clase 3, col4 no estable clase 12.   remplaza la col 3

//preferencia bosque y agricultura


