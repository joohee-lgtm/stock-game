// Cloudflare Pages Function: server-side NASDAQ Composite parsing
const FRED = "https://fred.stlouisfed.org/graph/fredgraph.csv?id=NASDAQCOM";
const BACKUP = "https://raw.githubusercontent.com/BenBrady1/Market_Analysis/main/macro-market-analysis/Data/NASDAQCOM.csv";
function parseCSV(csv) {
  const lines=csv.replace(/^\uFEFF/,"").trim().split(/\r?\n/);
  const values=new Map();
  for(const line of lines.slice(1)){
    const [rawDate,rawClose]=line.split(",");
    const date=(rawDate||"").trim(), close=Number(rawClose);
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(close)||close<=0)continue;
    const month=date.slice(0,7);
    if(!values.has(month)||values.get(month).date<date)values.set(month,{date,close});
  }
  return values;
}
export async function onRequestGet() {
  try {
    let csv,source;
    for(const url of [FRED,BACKUP]){
      try {
        const response=await fetch(url,{headers:{Accept:"text/csv"},signal:AbortSignal.timeout(10000),cf:{cacheTtl:21600,cacheEverything:true}});
        if(!response.ok)throw Error("HTTP "+response.status);
        const body=await response.text();
        if(!body.includes("NASDAQCOM")||body.length<1000)throw Error("Invalid CSV");
        csv=body;source=url;break;
      }catch(e){/* Try secondary data source */}
    }
    if(!csv)return Response.json({error:"NASDAQ data unavailable"},{status:503,headers:{"Cache-Control":"no-store"}});
    const map=parseCSV(csv);
    const series=[];
    for(let year=2021;year<=2026;year++)for(let month=2;month<=12;month+=2){
      if(year===2026&&month>10)continue;
      const key=year+"-"+String(month).padStart(2,"0"),v=map.get(key);
      series.push({month:key.replace("-","."),nasdaq:v?.close??null,nasdaqDate:v?.date??null});
    }
    const dates=[...map.values()].map(x=>x.date).sort();
    return Response.json({source,lastAvailable:dates.at(-1)||null,series},{headers:{"Cache-Control":"public, max-age=3600, s-maxage=21600"}});
  }catch(e){return Response.json({error:"NASDAQ parsing failed"},{status:500})}
}
