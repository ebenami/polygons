const fs = require('fs');
const path = require('path');

function parseGeojson(fn){
   let info = path.parse(fn);
   if(info.ext !== '.geojson'){
      console.error(`${fn} not a geojson. skipping.`);
      return;
   }
   let data = fs.readFileSync(fn);
   let polygon = JSON.parse(data).features[0];
   polygon['id'] = info.name;
   console.error(`parsing ${fn} ${polygon.constructor = Object}`);
   return polygon;
}


function main(inDir){
   let dir = fs.readdirSync(inDir).filter(f => path.extname(f) === '.geojson');


   let polygons = {type: "FeatureCollection"};
   polygons['features'] = dir.map(fn => parseGeojson(path.join(inDir, fn)));

   console.log(JSON.stringify(polygons, null, 2));
}

let inDir = process.argv[2];

main(inDir)
