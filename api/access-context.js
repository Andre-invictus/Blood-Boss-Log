const SUPABASE_URL='https://esysuyjparcthlfxdpks.supabase.co';
const SUPABASE_KEY='sb_publishable_p1obVXsYWqvhfjHTnAYaCA_21ZHCSHH';
export default async function handler(req,res){
  try{
    const auth=req.headers.authorization||'';
    if(!auth.startsWith('Bearer '))return res.status(401).json({success:false});
    const check=await fetch(SUPABASE_URL+'/auth/v1/user',{headers:{apikey:SUPABASE_KEY,Authorization:auth}});
    if(!check.ok)return res.status(401).json({success:false});
    const h=req.headers,decode=v=>{try{return decodeURIComponent(String(v||''))}catch{return String(v||'')}};
    res.setHeader('Cache-Control','no-store');
    return res.status(200).json({success:true,country:h['x-vercel-ip-country']||null,region:h['x-vercel-ip-country-region']||null,city:decode(h['x-vercel-ip-city'])||null,latitude:h['x-vercel-ip-latitude']||null,longitude:h['x-vercel-ip-longitude']||null});
  }catch(e){return res.status(500).json({success:false,message:e.message})}
}
