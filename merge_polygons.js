const fs = require('fs');
const path = require('path');

function parseGeojson(fn){
   let info = path.parse(fn);
   if(info.ext !== '.geojson'){
      // console.log(`${fn} not a geojson. skipping.`);
      return;
   }
   let data = fs.readFileSync(fn);
   let polygon = JSON.parse(data).features[0];
   polygon['id'] = info.name;
    
   return polygon;
}


function main(inDir){
   let dir = fs.readdirSync(inDir);
   
   let polygons = {type: "FeatureCollection"};
   polygons['features'] = dir.map(fn => parseGeojson(fn));

   console.log(JSON.stringify(polygons, null, 2));
}

let inDir = process.argv[2];

main(inDir)
