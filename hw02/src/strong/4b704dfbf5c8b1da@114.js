function _1(md){return(
md`# HW2 Strong baseline (2pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _constellationCounts(){return(
[]
)}

function _constellations(){return(
["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "摩羯座", "水瓶座", "雙魚座"]
)}

function _5(constellationCounts,constellations,data)
{
  constellationCounts.length = 0; //將constellationCounts清空
  for (var y=0; y<constellations.length; y++) { 
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    constellationCounts.push({number: y, constellation:constellations[y], gender:"male", count:0}); 
    //Object包含：0. index，1. 星座，2.男性，3.人數(設為0)
    constellationCounts.push({number: y, constellation:constellations[y], gender:"female", count:0}); 
    //Object包含：0. index，1. 星座，2.女性，3.人數(設為0)
  }
  data.forEach (x=> {
    var i = x.Constellation*2 + (x.Gender== "男" ? 0 : 1); 
    constellationCounts[i].count++;
    //讀取data array，加總每個年份出生的人
  })
  return constellationCounts;
}


function _6(Plot,constellationCounts){return(
Plot.plot({
  width:800,
  grid: true,
   // x: {domain: ["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "摩羯座", "水瓶座", "雙魚座"]},
  y: {label: "count"},

  marks: [
    Plot.rectY(constellationCounts, Plot.binX({y: "count"}, {x: "constellation", fill: "gender", tip: true})),
    Plot.gridY({ interval: 1, stroke: "white", strokeOpacity: 0}),
  ]
})
)}

function _7(Plot,constellationCounts){return(
Plot.plot({
  grid: true,
  x: {domain: ["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "摩羯座", "水瓶座", "雙魚座"]},
  y: {label: "count"},

  marks: [
    Plot.ruleY([0]),
    Plot.barY(constellationCounts, {x: "constellation", y: "count", fill: "gender", tip: true}),
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("constellationCounts")).define("constellationCounts", _constellationCounts);
  main.variable(observer("constellations")).define("constellations", _constellations);
  main.variable(observer()).define(["constellationCounts","constellations","data"], _5);
  main.variable(observer()).define(["Plot","constellationCounts"], _6);
  main.variable(observer()).define(["Plot","constellationCounts"], _7);
  return main;
}
